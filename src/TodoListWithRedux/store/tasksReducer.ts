import {v1} from "uuid";
import {useSelector} from "react-redux";
import {selectTodolistsState} from "./selectors";
import {
    AddTodoListActionType,
    RemoveTodoListActionType,
    todoListID1,
    todoListID2,
    TodoListsActions
} from "./todoListReducer";

type InitialStateType = typeof initialState
type TaskType = { id: string, title: string, isDone: boolean }

type AddTaskActionType = ReturnType<typeof addTask>
type RemoveTaskActionType = ReturnType<typeof removeTask>
type ChangeTaskStatusActionType = ReturnType<typeof changeTaskStatus>
type ChangeTaskTitleActionType = ReturnType<typeof changeTaskTitle>
type TasksActionsType =
    AddTaskActionType
    | RemoveTaskActionType
    | ChangeTaskStatusActionType
    | ChangeTaskTitleActionType
    | AddTodoListActionType
    | RemoveTodoListActionType

export enum TasksActions {
    ADD_TASK = 'TASKS/ADD_TASK',
    REMOVE_TASK = 'TASKS/REMOVE_TASK',
    CHANGE_TASK_STATUS = 'TASKS/CHANGE_TASK_STATUS',
    CHANGE_TASK_TITLE = 'TASKS/CHANGE_TASK_TITLE',
}

const initialState = {
    [todoListID1]: [
        {id: v1(), title: "HTML&CSS", isDone: true},
        {id: v1(), title: "JS", isDone: true},
        {id: v1(), title: "ReactJS", isDone: false},
        {id: v1(), title: "Rest API", isDone: false},
        {id: v1(), title: "GraphQL", isDone: false},
    ],
    [todoListID2]: [
        {id: v1(), title: "Milk", isDone: true},
        {id: v1(), title: "Bread", isDone: true},
        {id: v1(), title: "Sugar", isDone: false},
        {id: v1(), title: "Oil", isDone: false},
        {id: v1(), title: "Salt", isDone: false},
    ]
}

export const tasksReducer = (state: InitialStateType = initialState, action: TasksActionsType): InitialStateType => {
    switch (action.type) {

        case TasksActions.ADD_TASK:
            const newTask: TaskType = {id: v1(), title: action.taskTitle, isDone: false}
            return {...state, [action.todoListID]: [newTask, ...state[action.todoListID]]}

        case TasksActions.REMOVE_TASK:
            return {...state, [action.todoListID]: state[action.todoListID].filter(t => t.id !== action.taskID)}

        case TasksActions.CHANGE_TASK_STATUS:
            return {...state,
                [action.todoListID]: state[action.todoListID].map(t => t.id === action.taskID ? {
                    ...t,
                    isDone: action.newTaskStatus
                } : t)
            }

        case TasksActions.CHANGE_TASK_TITLE:
            return {...state,
                [action.todoListID]: state[action.todoListID].map(t => t.id === action.taskID ? {
                    ...t,
                    title: action.newTaskTitle
                } : t)
            }

        case TodoListsActions.ADD_TODOLIST:
            return {...state, [action.todoListID]: []}

        case TodoListsActions.REMOVE_TODOLIST:
            const stateCopy = {...state}
            delete stateCopy[action.todoListID]
            return stateCopy

        default:
            return state
    }
}

export const addTask = (todoListID: string, taskTitle: string) => {
    return {
        type: TasksActions.ADD_TASK as const,
        todoListID: todoListID,
        taskTitle: taskTitle,
    }
}
export const removeTask = (todoListID: string, taskID: string) => {
    return {
        type: TasksActions.REMOVE_TASK as const,
        todoListID: todoListID,
        taskID: taskID,
    }
}
export const changeTaskStatus = (todoListID: string, taskID: string, newTaskStatus: boolean) => {
    return {
        type: TasksActions.CHANGE_TASK_STATUS as const,
        todoListID: todoListID,
        taskID: taskID,
        newTaskStatus: newTaskStatus,
    }
}
export const changeTaskTitle = (todoListID: string, taskID: string, newTaskTitle: string) => {
    return {
        type: TasksActions.CHANGE_TASK_TITLE as const,
        todoListID: todoListID,
        taskID: taskID,
        newTaskTitle: newTaskTitle,
    }
}