import React, {useState} from 'react';
import {TextField} from "@material-ui/core";

type PropsType = {
    text: string
    onChange: (text: string) => void
}

export const EditableSpan: React.FC<PropsType> = ({text, onChange}) => {

    const [editMode, setEditMode] = useState<boolean>(false)
    const [spanValue, setSpanValue] = useState<string>(text)

    const onEditMode = () => {
        setEditMode(true)
        setSpanValue(text)
    }
    const onEditBlur = () => {
        setEditMode(false)
        onChange(spanValue)
    }
    const onValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSpanValue(e.currentTarget.value)
    }
    const onEnterPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            setSpanValue(e.currentTarget.value)
            onEditBlur()
        }
    }
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
