import { takeEvery, put } from 'redux-saga/effects';
import * as types from '../store/action_types';

const delay = (ms) => new Promise((reslove)=>{
    setTimeout(function(){
        reslove();
    }, ms);
})

function * asyncAdd(){
    yield delay(1000);
    yield  put({ type: types.ADD })
}

export default function * (){
    yield takeEvery(types.ASYNC_ADD, asyncAdd)
}