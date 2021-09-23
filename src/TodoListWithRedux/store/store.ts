import {todoListReducer} from "./todoListReducer";
import {combineReducers, createStore} from 'redux'
import {tasksReducer} from "./tasksReducer";

export type AppStateType = ReturnType<typeof rootReducer>

const rootReducer = combineReducers({
    todolists: todoListReducer,
    // tasks: tasksReducer,
})

export const store = createStore(rootReducer)