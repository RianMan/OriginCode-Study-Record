export function take(type){
    return {
        type: 'TAKE',
        action_type: type,
    }
}

export function put(action){
    return {
        type: 'PUT',
        action,
    }
}

export function call(fn,...args){
    return {
        type: 'CALL',
        fn,
        args,
    }
}

function fork(fn){
    return {
        type: 'FORK',
        fn,
    }
}

export function * takeEvery(type, cb){
    yield fork(function * () {
        while(true){
            const action = yield take(type);
            console.log(action,'action')
            yield cb();
        }
    })
}
