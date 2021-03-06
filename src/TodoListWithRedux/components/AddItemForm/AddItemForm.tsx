import s from "../../../MyTodoList/components/AddItemForm/AddItemForm.module.css";
import {IconButton, TextField} from "@material-ui/core";
import {AddBox} from "@material-ui/icons";
import React, {useState} from "react";

type PropsType ={
    addItem: (text: string) => void
}

export const AddItemForm: React.FC<PropsType> = React.memo((props) => {
    console.log('add item form')

    const {addItem} = props

    const [inputValue, setInputValue] = useState<string>('')
    const [error, setError] = useState<string>('')

    const onAdd = () => {
        if (inputValue.trim()) {
            addItem(inputValue.trim())
            setInputValue('')
        } else {
            setError('Введите текст')
        }
    }

    const onEnterPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        e.key === 'Enter' ? onAdd() : setError('Введите текст')
    }

    const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setError('')
        const newInputValue = e.currentTarget.value
        setInputValue(newInputValue)
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
})