import { ActionType, createAction } from "typesafe-actions";
import { grpcRequest } from "../../../middleware/grpc";
import { Empty, ID, Items, Pagination } from "../../../proto/todo_pb";

export const setItems = createAction("SET_ITEMS", action => {
  return (items: Items.AsObject) => action(items);
});

export const editItem = createAction("EDIT_ITEM", action => {
  return (id: string) => action(id);
});

export const removeItem = grpcRequest<ID, Empty>();

export const cancelEditItem = createAction("CANCEL_EDIT_ITEM", action => {
  return (id: string) => action(id);
});

interface IPagination {
  limit: number;
  offset: number;
}

export const loadingItems = createAction("LOADING_ITEMS", action => {
  return (pagination: IPagination) => action(pagination);
});

export const getItems = grpcRequest<Pagination, Items>();

export type Actions =
  | ActionType<typeof setItems>
  | ActionType<typeof loadingItems>
  | ActionType<typeof getItems>
  | ActionType<typeof editItem>
  | ActionType<typeof removeItem>
  | ActionType<typeof cancelEditItem>;
