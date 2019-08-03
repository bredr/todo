import reducer from "./state/reducer";
import { TOASTER_SLICE } from "./state/selectors";
export { Toaster } from "./Toaster";

export default { slice: TOASTER_SLICE, reducer };
