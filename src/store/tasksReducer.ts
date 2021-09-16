import {TasksType} from "../MyTodoList/components/Main/Main";
import {v1} from "uuid";
import {AddTodoListAT, RemoveTodoListAT} from "./todoListsReducer";

type RemoveTaskAT = ReturnType<typeof RemoveTaskAC>
type AddTaskAT = ReturnType<typeof AddTaskAC>
type ChangeTaskStatusAT = ReturnType<typeof ChangeTaskStatusAC>
type ChangeTaskTitleAT = ReturnType<typeof ChangeTaskTitleAC>

type ActionsType = RemoveTaskAT | AddTaskAT | ChangeTaskStatusAT | ChangeTaskTitleAT | AddTodoListAT | RemoveTodoListAT

export const tasksReducer = (state: TasksType, action: ActionsType): TasksType => {
    switch (action.type) {
        case "REMOVE_TASK":
            return {...state, [action.todoListID]: state[action.todoListID].filter(t => t.id !== action.taskID)}
        case "ADD_TASK":
            const newTask = {id: v1(), title: action.title, isDone: false}
            return {...state, [action.todoListID]: [newTask, ...state[action.todoListID]]}
        case 'CHANGE_TASK_STATUS':
            return {...state, [action.todoListID]: state[action.todoListID].map(t => t.id === action.taskID ? {...t, isDone: action.newStatus} : t)}
        case 'CHANGE_TASK_TITLE':
            return {...state, [action.todoListID]: state[action.todoListID].map(t => t.id === action.taskID ? {...t, title: action.newTitle} : t)}
        case 'ADD_TODOLIST':
            return {...state, [action.id]: []}
        case 'REMOVE_TODOLIST':
            const stateCopy = {...state}
            delete stateCopy[action.id]
            return stateCopy
        default:
            return state
    }
}

export const RemoveTaskAC = (taskID: string, todoListID: string) => {
    return {
        type: 'REMOVE_TASK' as const,
        todoListID: todoListID,
        taskID: taskID
    }
}
export const AddTaskAC = (title: string, todoListID: string) => {
    return {
        type: 'ADD_TASK' as const,
        todoListID: todoListID,
        title: title,
    }
}
export const ChangeTaskStatusAC = (taskID: string, newStatus: boolean, todoListID: string) => {
    return {
        type: 'CHANGE_TASK_STATUS' as const,
        todoListID: todoListID,
        taskID: taskID,
        newStatus: newStatus
    }
}
export const ChangeTaskTitleAC = (taskID: string, newTitle: string, todoListID: string) => {
    return {
        type: 'CHANGE_TASK_TITLE' as const,
        taskID: taskID,
        todoListID: todoListID,
        newTitle: newTitle
    }
}