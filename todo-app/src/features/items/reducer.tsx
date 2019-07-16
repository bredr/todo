import { Item, Items } from "../../proto/todo_pb";
import produce from "immer";
import { createReducer } from "typesafe-actions";
import { setItems, loadingItems, getItems, Actions } from "./actions";

interface IState {
  readonly total: number;
  readonly limit: number;
  readonly offset: number;
  readonly items: Array<Item.AsObject>;
  readonly loading: boolean;
}

const initState: IState = {
  total: 0,
  limit: 100,
  offset: 0,
  items: [],
  loading: false
}

export default createReducer<IState, Actions>(initState).
  handleAction(getItems, (state, action) => produce(state, (draft) => {
    draft.items = [];
    draft.limit = action.payload.request.getLimit();
    draft.offset = action.payload.request.getOffset();
    draft.total = 0;
  })).
  handleAction(loadingItems, (state, _action) => produce(state, (draft) => {
    draft.loading = true;
  })).
  handleAction(setItems, (state, action) => produce(state, (draft) => {
    draft.loading = false;
    draft.limit = action.payload.limit;
    draft.offset = action.payload.offset;
    draft.total = action.payload.total;
    draft.items = action.payload.itemsList;
  }))
