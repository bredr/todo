import { ActionType, createAction } from "typesafe-actions";

export const open = createAction("OPEN_CREATE");
export const close = createAction("CLOSE_CREATE");

export type Actions = ActionType<typeof open> | ActionType<typeof close>;

export default { open, close };
