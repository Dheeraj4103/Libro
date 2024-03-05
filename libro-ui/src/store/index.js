import { applyMiddleware, combineReducers, createStore } from 'redux';
import {thunk} from "redux-thunk";
import booksReducer from './Books';

const reducer = combineReducers({
    books: booksReducer
});

const store = createStore(reducer, applyMiddleware(thunk));

export default store;