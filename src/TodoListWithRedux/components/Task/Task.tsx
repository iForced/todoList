import React from "react";
import {Checkbox, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import {EditableTextFieldContainer} from "../EditableTextField/EditableTextFieldContainer";
import {useDispatch, useSelector} from "react-redux";
import {Dispatch} from "redux";
import {selectTasksState} from "../../store/selectors";

type  PropsType = {
    todoListID: string
    taskID: string
    title: string
    isDone: boolean
    onStatusChange: (todoListID: string, taskID: string, newTaskStatus: boolean) => void
    onRemoveTask: (todoListID: string, taskID: string) => void
}

export const Task: React.FC<PropsType> = (props) => {

    const {todoListID, taskID, title, isDone, onStatusChange, onRemoveTask} = props

    return (
        <li>
            <Checkbox
                checked={isDone}
                color={"primary"}
                onChange={(e) => onStatusChange(todoListID, taskID, e.currentTarget.checked)}
            />
            <EditableTextFieldContainer id={taskID} title={title} />
            <IconButton onClick={() => onRemoveTask(todoListID, taskID)}>
                <Delete/>
            </IconButton>
        </li>
    )
}