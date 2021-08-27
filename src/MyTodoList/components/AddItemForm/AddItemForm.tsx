import React, {useState} from 'react';
import s from './AddItemForm.module.css'

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
                <input
                    value={inputValue}
                    onChange={onInputChange}
                    onKeyPress={onEnterPress}
                    className={error ? s.error_input : s.add_input}
                />
                <button onClick={onAdd} className={s.add_button}>+</button>
            </div>
            <div className={s.error_text}>{error}</div>
        </>
    )
}
