
function channel(){
    const listeners = {};
    function on(type,value){
        listeners[type] = listeners[type] ? [...listeners[type],value] : [value];
    }

    function emit(type){
        const cbs = listeners[type];
        if(cbs){
            delete listeners[type]
            cbs.forEach(l => l());
        }
    }

    return {
        on,
        emit
    }
}
function createSagaMiddleware(){
    
    function SagaMiddleware({dispatch,getState}){

        const channelEmiter = channel();

        function run(generator){
            // 如果不是一个迭代器就不走
            let it = typeof generator==='function' ? generator() : generator;
            function next(action){
                let { value: effect, done } = it.next(action);
                if(done) return;
                if(effect && effect[Symbol.iterator]){
                    run(effect);
                    next(action)
                }else{
                    switch (effect.type) {
                        case "TAKE":
                            channelEmiter.on(effect.action_type,next)
                            break;
                        case "PUT":
                            dispatch(effect.action);   
                            break;
                        case "CALL":
                            effect.fn(...effect.args).then(next)
                            break;
                        case "FORK":
                            run(effect.fn);
                            next()
                            break;
                        default:
                            break;
                    }
                }
                
            };
            next();
        }

        SagaMiddleware.run = run;

        return function(next){
            return function(action){
                channelEmiter.emit(action.type)
                next(action)
            }
        }
    }


    return SagaMiddleware
}

export default createSagaMiddleware;