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
const hasNext = createSelector(
  sliceSelector,
  state => state.total > 0 && state.total - (state.limit + state.offset) > 0
);
const hasPrevious = createSelector(
  sliceSelector,
  state => state.offset > 0 && state.total > 0
);

export default { items, loading, hasNext, hasPrevious };
