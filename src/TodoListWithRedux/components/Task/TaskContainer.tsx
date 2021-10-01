import React, {ChangeEvent} from "react";
import {Task} from "./Task";
import {useDispatch, useSelector} from "react-redux";
import {Dispatch} from "redux";
import {selectTasksState} from "../../store/selectors";
import {changeTaskStatus, changeTaskTitle, removeTask} from "../../store/tasksReducer";
import {FilterType} from "../../store/todoListReducer";

export const TaskContainer = React.memo((props: { todoListID: string, filter: FilterType }) => {
    console.log('task container')

    const {todoListID, filter} = props

    const dispatch = useDispatch<Dispatch>()
    const {tasks} = useSelector(selectTasksState)
    let tasksForTodoList = tasks[todoListID]
    if (filter === 'completed') tasksForTodoList = tasksForTodoList.filter(t => t.isDone)
    if (filter === 'active') tasksForTodoList = tasksForTodoList.filter(t => !t.isDone)

    const onStatusChange = (todoListID: string, taskID: string, newTaskStatus: boolean) => {
        dispatch(changeTaskStatus(todoListID, taskID, newTaskStatus))
    }
    const onRemoveTask = (todoListID: string, taskID: string) => {
        dispatch(removeTask(todoListID, taskID))
    }

    const taskElement = tasksForTodoList.map(t => {
        const onTaskTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
            dispatch(changeTaskTitle(todoListID, t.id, e.currentTarget.value))
        }
        return <Task key={t.id}
                     todoListID={todoListID}
                     taskID={t.id}
                     title={t.title}
                     isDone={t.isDone}
                     onTaskTitleChange={onTaskTitleChange}
                     onStatusChange={onStatusChange}
                     onRemoveTask={onRemoveTask}
        />
    })

    return (

        <>
            {taskElement}
        </>

    )
})