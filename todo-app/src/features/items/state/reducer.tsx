import produce from "immer";
import { createReducer } from "typesafe-actions";
import { Item } from "../../../proto/todo_pb";
import { Actions, getItems, loadingItems, setItems } from "./actions";

export interface IState {
  readonly total: number;
  readonly limit: number;
  readonly offset: number;
  readonly items: Item.AsObject[];
  readonly loading: boolean;
}

const initState: IState = {
  items: [],
  limit: 100,
  loading: false,
  offset: 0,
  total: 0
};

export default createReducer<IState, Actions>(initState)
  .handleAction(loadingItems, (state, action) =>
    produce(state, draft => {
      draft.loading = true;
      draft.items = [];
      draft.limit = action.payload.limit;
      draft.offset = action.payload.offset;
    })
  )
  .handleAction(setItems, (state, action) =>
    produce(state, draft => {
      draft.loading = false;
      draft.limit = action.payload.limit;
      draft.offset = action.payload.offset;
      draft.total = action.payload.total;
      draft.items = action.payload.itemsList;
    })
  );
