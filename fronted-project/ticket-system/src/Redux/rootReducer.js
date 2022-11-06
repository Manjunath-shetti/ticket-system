import { combineReducers } from 'redux'
import userReducer from './User/userReducer'
import { persistReducer } from 'redux-persist'
import encryptTransform from 'redux-persist-transform-encrypt'
import storage from 'redux-persist/lib/storage'

const persistConfig = {
    key: 'core',
    storage,
    whitelist: ['user'],
    blacklist: []
};

const rootReducer = combineReducers({
    user: userReducer
});

export default persistReducer(persistConfig, rootReducer);