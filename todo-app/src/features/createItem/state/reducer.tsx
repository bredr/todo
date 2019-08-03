import produce from "immer";
import { createReducer } from "typesafe-actions";
import { Actions, close, open } from "./actions";

export interface IState {
  readonly isOpen: boolean;
}

const initState: IState = {
  isOpen: false
};

export default createReducer<IState, Actions>(initState)
  .handleAction(open, state =>
    produce(state, draft => {
      draft.isOpen = true;
    })
  )
  .handleAction(close, state =>
    produce(state, draft => {
      draft.isOpen = false;
    })
  );
