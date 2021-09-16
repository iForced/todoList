import {FilterType, TodolistsType} from "../MyTodoList/components/Main/Main";
import {v1} from "uuid";

export type RemoveTodoListAT = {
    type: 'REMOVE_TODOLIST'
    id: string
}
export type AddTodoListAT = {
    type: 'ADD_TODOLIST'
    text: string
    id: string
}
type ChangeTodoListTitleAT = {
    type: 'CHANGE_TODOLIST_TITLE'
    id: string
    text: string
}
type ChangeTodoListFilterAT = {
    type: 'CHANGE_TODOLIST_FILTER'
    id: string
    filterValue: FilterType
}
type AllActionsType = RemoveTodoListAT | AddTodoListAT | ChangeTodoListTitleAT | ChangeTodoListFilterAT

export const todoListsReducer = (todoLists: Array<TodolistsType>, action: AllActionsType) => {
    switch (action.type) {
        case "REMOVE_TODOLIST":
            return todoLists.filter(tl => tl.id !== action.id)
        case "ADD_TODOLIST":
            const newTodoList: TodolistsType = {id: action.id, title: action.text, filter: 'all'}
            return [...todoLists, newTodoList]
        case 'CHANGE_TODOLIST_TITLE':
            return todoLists.map(tl => tl.id === action.id ? {...tl, title: action.text} : tl)
        case 'CHANGE_TODOLIST_FILTER':
            return todoLists.map(tl => tl.id === action.id ? {...tl, filter: action.filterValue} : tl)
        default:
            return todoLists
    }
}

export const RemoveTodoListAC = (id: string): RemoveTodoListAT => {
    return {
        type: 'REMOVE_TODOLIST',
        id: id
    }
}
export const AddTodoListAC = (text: string): AddTodoListAT => {
    return {
        type: 'ADD_TODOLIST',
        text: text,
        id: v1()
    }
}
export const ChangeTodoListTitleAC = (id: string, text: string): ChangeTodoListTitleAT => {
    return {
        type: 'CHANGE_TODOLIST_TITLE',
        id: id,
        text: text
    }
}
export const ChangeTodoListFilterAC = (id: string, filterValue: FilterType): ChangeTodoListFilterAT => {
    return {
        type: 'CHANGE_TODOLIST_FILTER',
        id: id,
        filterValue: filterValue
    }
}