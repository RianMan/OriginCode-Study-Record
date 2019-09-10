import * as types from './action_types';

const initialState = { number: 0 };

export default function (state = initialState, action){
    switch (action.type) {
        case types.ADD:
            return {...state,number: state.number + 1 }
        default:
            return state
    }
}