import {v1} from "uuid";

export type FilterType = 'all' | 'active' | 'completed'
type InitialStateType = {
    todoLists: Array<TodoListType>
}
type TodoListType = {id: string, title: string, filter: FilterType}

export type AddTodoListActionType = ReturnType<typeof addTodoList>
export type RemoveTodoListActionType = ReturnType<typeof removeTodoList>
type ChangeTodoListFilterActionType = ReturnType<typeof changeTodoListFilter>
type ChangeTodoListTitleActionType = ReturnType<typeof changeTodoListTitle>
type TodoListsActionsType = AddTodoListActionType | RemoveTodoListActionType | ChangeTodoListFilterActionType | ChangeTodoListTitleActionType

export enum TodoListsActions {
    ADD_TODOLIST = 'TODOLISTS/ADD_TODOLIST',
    REMOVE_TODOLIST = 'TODOLISTS/REMOVE_TODOLIST',
    CHANGE_TODOLIST_FILTER = 'TODOLISTS/CHANGE_TODOLIST_FILTER',
    CHANGE_TODOLIST_TITLE = 'TODOLISTS/CHANGE_TODOLIST_TITLE',
}

export const todoListID1: string = v1()
export const todoListID2: string = v1()

const initialState = {
    todoLists: [
        {id: todoListID1, title: 'What to learn', filter: 'all' as const},
        {id: todoListID2, title: 'What to buy', filter: 'all' as const},
    ]
}

export const todoListReducer = (state: InitialStateType = initialState, action: TodoListsActionsType): InitialStateType => {
    switch (action.type) {

        case TodoListsActions.ADD_TODOLIST:
            const newTodoList: TodoListType = {id: action.todoListID, title: action.todoListTitle, filter: 'all'}
            return {...state, todoLists: [...state.todoLists, newTodoList]}

        case TodoListsActions.REMOVE_TODOLIST:
            return {...state, todoLists: state.todoLists.filter(tl => tl.id !== action.todoListID)}

        case TodoListsActions.CHANGE_TODOLIST_FILTER:
            return {...state, todoLists: state.todoLists.map(tl => tl.id === action.todoListID ? {...tl, filter: action.newFilter} : tl)}

        case TodoListsActions.CHANGE_TODOLIST_TITLE:
            return {...state, todoLists: state.todoLists.map(tl => tl.id === action.todoListID ? {...tl, title: action.newTodoListTitle} : tl)}

        default:
            return state
    }
}

export const addTodoList = (todoListTitle: string) => {
    return {
        type: TodoListsActions.ADD_TODOLIST  as const,
        todoListTitle: todoListTitle,
        todoListID: v1()
    }
}
export const removeTodoList = (todoListID: string) => {
    return {
        type: TodoListsActions.REMOVE_TODOLIST  as const,
        todoListID: todoListID
    }
}
export const changeTodoListFilter = (todoListID: string, newFilter: FilterType) => {
    return {
        type: TodoListsActions.CHANGE_TODOLIST_FILTER  as const,
        todoListID: todoListID,
        newFilter: newFilter,
    }
}
export const changeTodoListTitle = (todoListID: string, newTodoListTitle: string) => {
    return {
        type: TodoListsActions.CHANGE_TODOLIST_TITLE  as const,
        todoListID: todoListID,
        newTodoListTitle: newTodoListTitle,
    }
}