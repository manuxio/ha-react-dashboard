import { combineReducers } from 'redux';
import commentReducer from './index';
import smartHomeReducer from './smarthome';

const reducers = combineReducers({
    comments: commentReducer,
    smarthome: smartHomeReducer
});

export default reducers;
export type RootState = ReturnType<typeof reducers>;