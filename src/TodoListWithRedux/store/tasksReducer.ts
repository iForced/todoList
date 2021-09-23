import {v1} from "uuid";

type InitialStateType = typeof initialState
type TaskType = {id: string, title: string, isDone: boolean}

type AddTaskActionType = ReturnType<typeof addTask>
type RemoveTaskActionType = ReturnType<typeof removeTask>
type ChangeTaskStatusActionType = ReturnType<typeof changeTaskStatus>
type ChangeTaskTitleActionType = ReturnType<typeof changeTaskTitle>
type TasksActionsType = AddTaskActionType | RemoveTaskActionType | ChangeTaskStatusActionType | ChangeTaskTitleActionType

export enum TasksActions {
    ADD_TASK = 'TASKS/ADD_TASK',
    REMOVE_TASK = 'TASKS/REMOVE_TASK',
    CHANGE_TASK_STATUS = 'TASKS/CHANGE_TASK_STATUS',
    CHANGE_TASK_TITLE = 'TASKS/CHANGE_TASK_TITLE',
}

const initialState = {
    tasks: [
        {id: v1(), title: "HTML&CSS", isDone: true},
        {id: v1(), title: "JS", isDone: true},
        {id: v1(), title: "ReactJS", isDone: false},
        {id: v1(), title: "Rest API", isDone: false},
        {id: v1(), title: "GraphQL", isDone: false},
    ]
}

export const tasksReducer = (state: InitialStateType, action: TasksActionsType): InitialStateType => {
    switch (action.type) {

        case TasksActions.ADD_TASK:
            const newTask: TaskType = {id: v1(), title: action.taskTitle, isDone: false}
            return {...state, tasks: [newTask, ...state.tasks]}

        case TasksActions.REMOVE_TASK:
            return {...state, tasks: state.tasks.filter(t => t.id !== action.taskID)}

        case TasksActions.CHANGE_TASK_STATUS:
            return {...state, tasks: state.tasks.map(t => t.id === action.taskID ? {...t, isDone: action.newTaskStatus} : t)}

        case TasksActions.CHANGE_TASK_TITLE:
            return {...state, tasks: state.tasks.map(t => t.id === action.taskID ? {...t, title: action.newTaskTitle} : t)}

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