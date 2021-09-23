import {todoListReducer} from "./todoListReducer";
import {combineReducers, createStore} from 'redux'

export type AppStatetype = typeof rootReducer

const rootReducer = combineReducers({
    todolist: todoListReducer,
})

export const store = createStore(rootReducer)