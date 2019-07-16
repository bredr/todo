// package: todo
// file: todo.proto

import * as todo_pb from "./todo_pb";
import {grpc} from "@improbable-eng/grpc-web";

type TodoUpsertItem = {
  readonly methodName: string;
  readonly service: typeof Todo;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof todo_pb.Item;
  readonly responseType: typeof todo_pb.ID;
};

type TodoGetItems = {
  readonly methodName: string;
  readonly service: typeof Todo;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof todo_pb.Pagination;
  readonly responseType: typeof todo_pb.Items;
};

type TodoGetItem = {
  readonly methodName: string;
  readonly service: typeof Todo;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof todo_pb.ID;
  readonly responseType: typeof todo_pb.Item;
};

type TodoRemoveItem = {
  readonly methodName: string;
  readonly service: typeof Todo;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof todo_pb.ID;
  readonly responseType: typeof todo_pb.Empty;
};

export class Todo {
  static readonly serviceName: string;
  static readonly UpsertItem: TodoUpsertItem;
  static readonly GetItems: TodoGetItems;
  static readonly GetItem: TodoGetItem;
  static readonly RemoveItem: TodoRemoveItem;
}

export type ServiceError = { message: string, code: number; metadata: grpc.Metadata }
export type Status = { details: string, code: number; metadata: grpc.Metadata }

interface UnaryResponse {
  cancel(): void;
}
interface ResponseStream<T> {
  cancel(): void;
  on(type: 'data', handler: (message: T) => void): ResponseStream<T>;
  on(type: 'end', handler: (status?: Status) => void): ResponseStream<T>;
  on(type: 'status', handler: (status: Status) => void): ResponseStream<T>;
}
interface RequestStream<T> {
  write(message: T): RequestStream<T>;
  end(): void;
  cancel(): void;
  on(type: 'end', handler: (status?: Status) => void): RequestStream<T>;
  on(type: 'status', handler: (status: Status) => void): RequestStream<T>;
}
interface BidirectionalStream<ReqT, ResT> {
  write(message: ReqT): BidirectionalStream<ReqT, ResT>;
  end(): void;
  cancel(): void;
  on(type: 'data', handler: (message: ResT) => void): BidirectionalStream<ReqT, ResT>;
  on(type: 'end', handler: (status?: Status) => void): BidirectionalStream<ReqT, ResT>;
  on(type: 'status', handler: (status: Status) => void): BidirectionalStream<ReqT, ResT>;
}

export class TodoClient {
  readonly serviceHost: string;

  constructor(serviceHost: string, options?: grpc.RpcOptions);
  upsertItem(
    requestMessage: todo_pb.Item,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: todo_pb.ID|null) => void
  ): UnaryResponse;
  upsertItem(
    requestMessage: todo_pb.Item,
    callback: (error: ServiceError|null, responseMessage: todo_pb.ID|null) => void
  ): UnaryResponse;
  getItems(
    requestMessage: todo_pb.Pagination,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: todo_pb.Items|null) => void
  ): UnaryResponse;
  getItems(
    requestMessage: todo_pb.Pagination,
    callback: (error: ServiceError|null, responseMessage: todo_pb.Items|null) => void
  ): UnaryResponse;
  getItem(
    requestMessage: todo_pb.ID,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: todo_pb.Item|null) => void
  ): UnaryResponse;
  getItem(
    requestMessage: todo_pb.ID,
    callback: (error: ServiceError|null, responseMessage: todo_pb.Item|null) => void
  ): UnaryResponse;
  removeItem(
    requestMessage: todo_pb.ID,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: todo_pb.Empty|null) => void
  ): UnaryResponse;
  removeItem(
    requestMessage: todo_pb.ID,
    callback: (error: ServiceError|null, responseMessage: todo_pb.Empty|null) => void
  ): UnaryResponse;
}

