import { store } from 'redux';
import * as types from './action_types';

export const add = () => {
    return {
        type: types.ADD,
    }
}

export const asyncAdd = () => {
    return {
        type: types.ASYNC_ADD,
    }
}
