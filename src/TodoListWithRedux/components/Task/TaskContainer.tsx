import React from "react";
import {Task} from "./Task";
import {useDispatch, useSelector} from "react-redux";
import {Dispatch} from "redux";
import {selectTasksState} from "../../store/selectors";
import {changeTaskStatus, removeTask} from "../../store/tasksReducer";
import {todoListID1} from "../../store/todoListReducer";

export const TaskContainer = (props: {todoListID: string}) => {

    const dispatch = useDispatch<Dispatch>()
    const {tasks} = useSelector(selectTasksState)

    const onStatusChange = (todoListID: string, taskID: string, newTaskStatus: boolean) => {
        dispatch(changeTaskStatus(todoListID, taskID, newTaskStatus))
    }
    const onRemoveTask = (todoListID: string, taskID: string) => {
        dispatch(removeTask(todoListID, taskID))
    }

    const taskElement = tasks[props.todoListID].map(t =>
        <Task key={t.id}
            todoListID={props.todoListID}
            taskID={t.id}
            title={t.title}
            isDone={t.isDone}
            onStatusChange={onStatusChange}
            onRemoveTask={onRemoveTask}
        />)

    return (

        <>
            {taskElement}
        </>

    )
}