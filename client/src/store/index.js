import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import AuthReducer from "./reducer/AuthReducer";

const rootReducer = combineReducers({
    AuthReducer,
})

const middleware = [thunkMiddleware];
const Store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(...middleware))
);

export default Store;

