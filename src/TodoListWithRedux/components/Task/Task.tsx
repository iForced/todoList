import React, {ChangeEvent, useCallback} from "react";
import s from './Task.module.css'
import {Checkbox, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import {EditableTextField} from "../EditableTextField/EditableTextField";

type  PropsType = {
    todoListID: string
    taskID: string
    title: string
    isDone: boolean
    onTitleChange: (id: string, text: string) => void
    onStatusChange: (todoListID: string, taskID: string, newTaskStatus: boolean) => void
    onRemoveTask: (todoListID: string, taskID: string) => void
}

export const Task: React.FC<PropsType> = React.memo((props) => {
    console.log('task')

    const {todoListID, taskID, title, isDone, onTitleChange, onStatusChange, onRemoveTask} = props

    const onTitleChangeHandler = useCallback((text: string) => {
        onTitleChange(taskID, text)
    }, [])
    const onRemoveTaskHandler = useCallback(() => {
        onRemoveTask(todoListID, taskID)
    }, [])
    const onStatusChangeHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        onStatusChange(todoListID, taskID, e.currentTarget.checked)
    }, [])

    return (
        <li className={s.task_item + ' ' + (isDone && s.completed)}>
            <Checkbox
                checked={isDone}
                color={"primary"}
                onChange={onStatusChangeHandler}
            />
            <EditableTextField title={title} onValueChange={onTitleChangeHandler} taskID={taskID} todoListID={todoListID} />
            <IconButton onClick={onRemoveTaskHandler}>
                <Delete/>
            </IconButton>
        </li>
    )
})