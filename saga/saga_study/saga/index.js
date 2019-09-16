// import { takeEvery, put,take } from '../../redux-saga/src/effects';
import { take , put,takeEvery,call } from '../../my_saga/effects';
import * as types from '../store/action_types';
const delay = (ms) => new Promise((reslove)=>{
    setTimeout(function(){
        reslove(10);
    }, ms);
})

function * asyncAdd(){
    let res = yield call(delay,1000);
    yield put({ type: types.ADD })
}

export default function * (){
    // yield take(types.ASYNC_ADD);
    // yield put({ type: types.ADD })
    yield takeEvery(types.ASYNC_ADD, asyncAdd);
    console.log('takeEvery after')
}