import { createSelector } from "reselect";
import { IState } from "./reducer";

export const TOASTER_SLICE = "TOASTER_SLICE";

const sliceSelector = (state: { [TOASTER_SLICE]: IState }) =>
  state[TOASTER_SLICE];

const currentMessage = createSelector(
  sliceSelector,
  state => (state.messages.length > 0 ? state.messages[0] : undefined)
);

export default { currentMessage };
