import { combineReducers } from 'redux';
import sessionReducer from './sessionReducer';
import groupReducer from './groupReducer'
import membersReducer from './membersReducer';
import groupPostReducer from './groupPostReducer';

const allReducers = combineReducers({
    sessionReducer,
    groupReducer,
    membersReducer,
    groupPostReducer,
});

export default rootReducer = (state, action) => {
    if (action.type === "INITIAL_STATE") {
        state = undefined;
    }
    return allReducers(state, action);
  };
