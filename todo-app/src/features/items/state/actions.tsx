import { ActionType, createAction } from "typesafe-actions";
import { grpcRequest } from "../../../middleware/grpc";
import { Items, Pagination } from "../../../proto/todo_pb";

export const setItems = createAction("SET_ITEMS", action => {
  return (items: Items.AsObject) => action(items);
});

export const loadingItems = createAction("LOADING_ITEMS");

export const getItems = grpcRequest<Pagination, Items>();

export type Actions =
  | ActionType<typeof setItems>
  | ActionType<typeof loadingItems>
  | ActionType<typeof getItems>;
