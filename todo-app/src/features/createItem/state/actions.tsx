import { ActionType, createAction } from "typesafe-actions";
import { grpcRequest } from "../../../middleware/grpc";
import { ID, Item } from "../../../proto/todo_pb";

export const open = createAction("OPEN_CREATE");
export const close = createAction("CLOSE_CREATE");

export const upsertItem = grpcRequest<Item, ID>();

export type Actions =
  | ActionType<typeof open>
  | ActionType<typeof close>
  | ActionType<typeof upsertItem>;

export default { open, close, upsertItem };
