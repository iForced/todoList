import React, {ChangeEvent, useState} from 'react';
import {TextField} from "@material-ui/core";

type PropsType = {
    title: string
    todoListID?: string
    taskID?: string
    onValueChange: (text: string) => void
}

export const EditableTextField: React.FC<PropsType> = React.memo((props) => {
    console.log('editable text field')

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
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        onValueChange(e.currentTarget.value)
    }

    return (
        <div>
            {editMode
                ? <TextField
                    autoFocus
                    value={title}
                    onChange={onChangeHandler}
                    onBlur={onEditBlur}
                    onKeyPress={onEnterPress}
                />
                : <span onDoubleClick={onEditMode}>{title}</span>
            }
        </div>
    )
})
