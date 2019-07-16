import { newGrpcMiddleware } from '../middleware/grpc';
import { applyMiddleware, combineReducers, createStore } from 'redux';

const reducers = combineReducers({});

export default createStore(
  reducers,
  applyMiddleware(
    newGrpcMiddleware(),
  )
);
