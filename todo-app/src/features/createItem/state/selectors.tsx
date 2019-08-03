import { createSelector } from "reselect";
import { IState } from "./reducer";

export const CREATE_SLICE = "CREATE_SLICE";

const sliceSelector = (state: { [CREATE_SLICE]: IState }) =>
  state[CREATE_SLICE];

const createItemOpen = createSelector(
  sliceSelector,
  state => state.isOpen
);

export default { createItemOpen };
