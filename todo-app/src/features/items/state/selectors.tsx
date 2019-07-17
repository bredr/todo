import { createSelector } from "reselect";
import { IState } from "./reducer";

export const ITEMS_SLICE = "ITEMS_SLICE";

const sliceSelector = (state: { [ITEMS_SLICE]: IState }) => state[ITEMS_SLICE];

const items = createSelector(
  sliceSelector,
  state => state.items
);
const loading = createSelector(
  sliceSelector,
  state => state.loading
);

export default { items, loading };
