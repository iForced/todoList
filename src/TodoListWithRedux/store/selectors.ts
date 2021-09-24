import {AppStateType} from "./store";

export const selectTodolistsState = (state: AppStateType) => state.todolists
export const selectTasksState = (state: AppStateType) => state