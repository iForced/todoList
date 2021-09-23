import {v1} from "uuid";

export type FilterType = 'all' | 'active' | 'completed'
type InitialStateType = typeof initialState
type TodolistsType = {id: string, title: string, filter: FilterType}

type AddTodoListActionType = ReturnType<typeof addTodoList>
type RemoveTodoListActionType = ReturnType<typeof removeTodoList>
type ChangeTodoListFilterActionType = ReturnType<typeof changeTodoListFilter>
type ChangeTodoListTitleActionType = ReturnType<typeof changeTodoListTitle>
type TodoListActionsType = AddTodoListActionType | RemoveTodoListActionType | ChangeTodoListFilterActionType | ChangeTodoListTitleActionType

export enum Actions {
    ADD_TODOLIST = 'TODOLISTS/ADD_TODOLIST',
    REMOVE_TODOLIST = 'TODOLISTS/REMOVE_TODOLIST',
    CHANGE_TODOLIST_FILTER = 'TODOLISTS/CHANGE_TODOLIST_FILTER',
    CHANGE_TODOLIST_TITLE = 'TODOLISTS/CHANGE_TODOLIST_TITLE',
}

const initialState = {
    todoLists: [
        {id: v1(), title: 'What to learn', filter: 'all'},
        {id: v1(), title: 'What to buy', filter: 'all'},
    ]
}

export const todoListReducer = (state: InitialStateType = initialState, action: TodoListActionsType): InitialStateType => {
    switch (action.type) {

        case Actions.ADD_TODOLIST:
            const newTodoList: TodolistsType = {id: v1(), title: action.title, filter: 'all'}
            return {...state, todoLists: [...state.todoLists, newTodoList]}

        case Actions.REMOVE_TODOLIST:
            return {...state, todoLists: state.todoLists.filter(tl => tl.id !== action.id)}

        case Actions.CHANGE_TODOLIST_FILTER:
            return {...state, todoLists: state.todoLists.map(tl => tl.id === action.id ? {...tl, filter: action.newFilter} : tl)}

        case Actions.CHANGE_TODOLIST_TITLE:
            return {...state, todoLists: state.todoLists.map(tl => tl.id === action.id ? {...tl, title: action.newTitle} : tl)}

        default:
            return state
    }
}

export const addTodoList = (title: string) => {
    return {
        type: Actions.ADD_TODOLIST,
        title: title
    } as const
}
export const removeTodoList = (id: string) => {
    return {
        type: Actions.REMOVE_TODOLIST,
        id: id
    } as const
}
export const changeTodoListFilter = (id: string, newFilter: FilterType) => {
    return {
        type: Actions.CHANGE_TODOLIST_FILTER,
        id: id,
        newFilter: newFilter,
    } as const
}
export const changeTodoListTitle = (id: string, newTitle: string) => {
    return {
        type: Actions.CHANGE_TODOLIST_TITLE,
        id: id,
        newTitle: newTitle,
    } as const
}