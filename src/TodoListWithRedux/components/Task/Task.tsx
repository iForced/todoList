import React, {ChangeEvent} from "react";
import s from './Task.module.css'
import {Checkbox, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import {EditableTextField} from "../EditableTextField/EditableTextField";

type  PropsType = {
    todoListID: string
    taskID: string
    title: string
    isDone: boolean
    onTaskTitleChange: (e: ChangeEvent<HTMLInputElement>) => void
    onStatusChange: (todoListID: string, taskID: string, newTaskStatus: boolean) => void
    onRemoveTask: (todoListID: string, taskID: string) => void
}

export const Task: React.FC<PropsType> = (props) => {

    const {todoListID, taskID, title, isDone, onTaskTitleChange, onStatusChange, onRemoveTask} = props

    return (
        <li className={s.task_item + ' ' + (isDone && s.completed)}>
            <Checkbox
                checked={isDone}
                color={"primary"}
                onChange={(e) => onStatusChange(todoListID, taskID, e.currentTarget.checked)}
            />
            <EditableTextField title={title} onValueChange={onTaskTitleChange} taskID={taskID} todoListID={todoListID} />
            <IconButton onClick={() => onRemoveTask(todoListID, taskID)}>
                <Delete/>
            </IconButton>
        </li>
    )
}