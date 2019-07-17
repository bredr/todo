import { applyMiddleware, combineReducers, createStore } from "redux";
import items from "../features/items";
import { newGrpcMiddleware } from "../middleware/grpc";

const reducers = combineReducers({ [items.slice]: items.reducer });

export default createStore(reducers, applyMiddleware(newGrpcMiddleware()));
