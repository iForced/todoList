import React, {ChangeEvent, useState} from 'react';
import {TextField} from "@material-ui/core";
import {useDispatch} from "react-redux";
import {Dispatch} from "redux";
import {changeTodoListTitle} from "../../store/todoListReducer";

type PropsType = {
    title: string
    todoListID?: string
    taskID?: string
    // editMode: boolean
    // spanValue: string
    onValueChange: (e: ChangeEvent<HTMLInputElement>) => void
    // onEditBlur: () => void
    // onEditMode: () => void
    // onEnterPress: (e: React.KeyboardEvent<HTMLInputElement>) => void
}

export const EditableTextField: React.FC<PropsType> = (props) => {

    const {title, onValueChange} = props
    const [editMode, setEditMode] = useState<boolean>(false)

    const onEditBlur = () => {
        setEditMode(false)
    }
    const onEditMode = () => {
        setEditMode(true)
    }
    const onEnterPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') setEditMode(false)
    }

    return (
        <div>
            {editMode
                ? <TextField
                    autoFocus
                    value={title}
                    onChange={onValueChange}
                    onBlur={onEditBlur}
                    onKeyPress={onEnterPress}
                />
                : <span onDoubleClick={onEditMode}>{title}</span>
            }
        </div>
    )
}
