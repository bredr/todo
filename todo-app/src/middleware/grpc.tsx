import { grpc } from "@improbable-eng/grpc-web";
import * as jspb from "google-protobuf";
import { Action, Dispatch, Middleware, MiddlewareAPI } from "redux";
import { createAction } from "typesafe-actions";

const GRPC_WEB_REQUEST = "GRPC_WEB_REQUEST";
type GRPC_WEB_REQUEST = "GRPC_WEB_REQUEST";
const defaultHost = "/";

function isGrpcWebUnaryAction(
  action: Action<any>
): action is IGrpcAction<jspb.Message, jspb.Message> {
  return (
    action &&
    action.type &&
    action.type === GRPC_WEB_REQUEST &&
    isGrpcWebPayload(action)
  );
}

function isGrpcWebPayload(action: any): boolean {
  return (
    action &&
    action.payload &&
    action.payload.methodDescriptor &&
    action.payload.request &&
    action.payload.onEnd
  );
}

// Descriptor of a grpc-web payload
// life-cycle methods mirror grpc-web but allow for an action to be dispatched when triggered
export interface IGrpcActionPayload<
  RequestType extends jspb.Message,
  ResponseType extends jspb.Message
> {
  // The method descriptor to use for a gRPC request, equivalent to grpc.invoke(methodDescriptor, ...)
  methodDescriptor: grpc.MethodDefinition<RequestType, ResponseType>;
  // toggle debug messages
  debug?: boolean;
  // the URL of a host this request should go to
  host?: string;
  // An instance of of the request message
  request: RequestType;
  // Additional metadata to attach to the request, the same as grpc-web
  metadata?: grpc.Metadata.ConstructorArg;
  // Called immediately before the request is started, useful for toggling a loading status
  onStart?: () => Action | void;
  // Called when response headers are received
  onHeaders?: (headers: grpc.Metadata) => Action | void;
  // Called on each incoming message
  onMessage?: (res: ResponseType) => Action | void;
  // Called at the end of a request, make sure to check the exit code
  onEnd: (
    code: grpc.Code,
    message: string,
    trailers: grpc.Metadata
  ) => Action | void;
}

// Basic type for a gRPC Action
export interface IGrpcAction<
  RequestType extends jspb.Message,
  ResponseType extends jspb.Message
> {
  type: typeof GRPC_WEB_REQUEST;
  payload: IGrpcActionPayload<RequestType, ResponseType>;
}

export const grpcRequest = <
  RequestType extends jspb.Message,
  ResponseType extends jspb.Message
>() =>
  createAction("GRPC_WEB_REQUEST", action => {
    return (payload: IGrpcActionPayload<RequestType, ResponseType>) =>
      action(payload);
  });

/* tslint:disable:no-any*/
export function newGrpcMiddleware(): Middleware {
  return ({ getState, dispatch }: MiddlewareAPI) => (next: Dispatch) => (
    action: any
  ) => {
    // skip non-grpc actions
    if (!isGrpcWebUnaryAction(action)) {
      return next(action);
    }

    const payload = action.payload;

    if (payload.onStart) {
      payload.onStart();
    }

    grpc.invoke(payload.methodDescriptor, {
      debug: payload.debug,
      host: payload.host || defaultHost,
      metadata: payload.metadata,
      request: payload.request,
      onHeaders: headers => {
        if (!payload.onHeaders) {
          return;
        }
        const actionToDispatch = payload.onHeaders(headers);
        return actionToDispatch && dispatch(actionToDispatch);
      },
      onMessage: res => {
        if (!payload.onMessage) {
          return;
        }
        const actionToDispatch = payload.onMessage(res as any);
        return actionToDispatch && dispatch(actionToDispatch);
      },
      onEnd: (code, msg, trailers) => {
        const actionToDispatch = payload.onEnd(code, msg, trailers);
        return actionToDispatch && dispatch(actionToDispatch);
      }
    });

    return next(action);
  };
}
