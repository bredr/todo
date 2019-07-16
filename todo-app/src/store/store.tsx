import { applyMiddleware, combineReducers, createStore } from "redux";
import { newGrpcMiddleware } from "../middleware/grpc";

const reducers = combineReducers({});

export default createStore(reducers, applyMiddleware(newGrpcMiddleware()));
