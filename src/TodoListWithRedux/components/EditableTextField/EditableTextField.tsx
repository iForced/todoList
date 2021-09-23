import React from 'react';
import {TextField} from "@material-ui/core";

type PropsType = {
    editMode: boolean
    spanValue: string
    onValueChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    onEditBlur: () => void
    onEditMode: () => void
    onEnterPress: (e: React.KeyboardEvent<HTMLInputElement>) => void
}

export const EditableTextField: React.FC<PropsType> = (props) => {

    const {editMode, spanValue, onValueChange, onEditBlur, onEditMode, onEnterPress} = props

    return (
        <div>
            {editMode
                ? <TextField
                    autoFocus
                    value={spanValue}
                    onChange={onValueChange}
                    onBlur={onEditBlur}
                    onKeyPress={onEnterPress}
                />
                : <span onDoubleClick={onEditMode}>{spanValue}</span>
            }
        </div>
    )
}
