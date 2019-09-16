import { applyMiddleware,createStore } from 'redux';
import reducer from './reducer';
// import createSagaMiddleware from '../../redux-saga/src/index';
import createSagaMiddleware from '../../my_saga';
import rootsaga from '../saga';
// 创建一个saga中间价
const sagaMiddleware = createSagaMiddleware();

const store = createStore(reducer,applyMiddleware(sagaMiddleware));
sagaMiddleware.run(rootsaga);

export default store;