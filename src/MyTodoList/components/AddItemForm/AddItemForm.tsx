import React, {useState} from 'react';
import s from './AddItemForm.module.css'
import {IconButton, TextField} from "@material-ui/core";
import {AddBox} from "@material-ui/icons";

type PropsType = {
    addItem: (text: string) => void
}

export const AddItemForm: React.FC<PropsType> = ({addItem}) => {
    const [inputValue, setInputValue] = useState<string>('')
    const [error, setError] = useState<string>('')

    const onEnterPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        e.key === 'Enter' ? onAdd() : setError('Введите текст')
    }

    const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setError('')
        const newInputValue = e.currentTarget.value
        setInputValue(newInputValue)
    }

    const onAdd = () => {
        if (inputValue.trim()) {
            addItem(inputValue.trim())
            setInputValue('')
        } else {
            setError('Введите текст')
        }
    }
    return (
        <>
            <div className={s.add_task}>
                <TextField
                    variant={"outlined"}
                    value={inputValue}
                    onChange={onInputChange}
                    onKeyPress={onEnterPress}
                    error={!!error}
                    label={"Enter title"}
                    helperText={error}
                    size={"small"}
                />
                <IconButton
                    onClick={onAdd}
                    color={"primary"}
                >
                    <AddBox />
                </IconButton>
            </div>
        </>
    )
}
