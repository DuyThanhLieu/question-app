import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk'
import rootReducer from "./reducer/rootReducer"
import { composeWithDevTools } from 'redux-devtools-extension';
import storage from 'redux-persist/lib/storage'
import { persistStore, persistReducer } from 'redux-persist'

const persistConfig = {
    key: 'root',
    storage,
}//luu tt nguoi dung 
const persistedReducer = persistReducer(persistConfig, rootReducer)
const store = createStore(persistedReducer, composeWithDevTools(applyMiddleware(thunk)));
let persistor = persistStore(store)
export { store, persistor }