import { ActionType, createAction } from "typesafe-actions";

export const addError = createAction("ADD_ERROR", action => {
  return (message: string) => action(message);
});
export const addSuccess = createAction("ADD_SUCCESS", action => {
  return (message: string) => action(message);
});
export const clearMessage = createAction("REMOVE_NOTIFICATION");

export type Actions =
  | ActionType<typeof addError>
  | ActionType<typeof addSuccess>
  | ActionType<typeof clearMessage>;

export default { addError, addSuccess, clearMessage };
