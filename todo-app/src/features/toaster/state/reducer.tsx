import produce from "immer";
import { createReducer } from "typesafe-actions";
import { Actions, addError, addSuccess, clearMessage } from "./actions";

interface IMessage {
  error: boolean;
  message: string;
}
export interface IState {
  readonly messages: IMessage[];
}

const initState: IState = {
  messages: []
};

export default createReducer<IState, Actions>(initState)
  .handleAction(addError, (state, action) =>
    produce(state, draft => {
      draft.messages = [
        { error: true, message: action.payload },
        ...state.messages
      ];
    })
  )
  .handleAction(addSuccess, (state, action) =>
    produce(state, draft => {
      draft.messages = [
        { error: false, message: action.payload },
        ...state.messages
      ];
    })
  )
  .handleAction(clearMessage, state =>
    produce(state, draft => {
      const [, ...remainder] = state.messages;
      draft.messages = remainder;
    })
  );
