import { createStore, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from "redux-persist";
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import { AsyncStorage } from "react-native";
import thunk from 'redux-thunk';
//redux-thunk => You can't use fetch in actions without middleware. actions must be plain objects.You can use a middleware like redux-thunk or redux-saga to do fetch and then dispatch another action.
import rootReducer from '../reducers'

const persistConfig = {
    key: "root",
    storage: AsyncStorage,
    stateReconciler: autoMergeLevel2
    //blackList: ['sessionReducers']
}

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(persistedReducer, applyMiddleware(thunk));
export const persistor = persistStore(store);