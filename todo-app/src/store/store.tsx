import {
  applyMiddleware,
  combineReducers,
  createStore,
  ReducersMapObject
} from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import items from "../features/items";
import toaster from "../features/toaster";
import { newGrpcMiddleware } from "../middleware/grpc";

const reducers = combineReducers({
  [items.slice]: items.reducer,
  [toaster.slice]: toaster.reducer
} as ReducersMapObject);

export default createStore(
  reducers,
  composeWithDevTools(applyMiddleware(newGrpcMiddleware()))
);
