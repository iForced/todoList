import React, {useState} from 'react';
import s from './List.module.css'
import {TaskItemType} from "../Main/Main";
import {FilterType} from "../../App";

type ListPropsType = {
    todolistID: string
    title: string
    tasks: Array<TaskItemType>
    addTask: (text: string, todolistID: string) => void
    removeTask: (taskID: string, todolistID: string) => void
    changeStatus: (taskID: string, newStatus: boolean, todolistID: string) => void
    changeFilter: (todolistID: string, filterValue: FilterType) => void
    filter: FilterType
    removeList: (todoListID: string) => void
}

const List: React.FC<ListPropsType> = (
    {
        title,
        tasks,
        addTask,
        removeTask,
        changeStatus,
        changeFilter,
        filter,
        todolistID,
        removeList
    }
) => {

    const taskElement = tasks.map((t) => {
            const onChangeStatus = (e: React.ChangeEvent<HTMLInputElement>) => {
                changeStatus(t.id, e.currentTarget.checked, todolistID)
            }
            const onRemove = () => {
                removeTask(t.id, todolistID)
            }
            return (
                <li className={s.list_item + ' ' + (t.isDone && s.list_item_completed)} key={t.id}>
                    <input type={"checkbox"} checked={t.isDone} onChange={onChangeStatus}/>
                    <span>{t.title}</span>
                    <button onClick={onRemove} className={s.remove_button}>X</button>
                </li>
            )
        }
    )

    const [inputValue, setInputValue] = useState<string>('')
    const [error, setError] = useState<string>('')

    const onAdd = () => {
        if (inputValue.trim()) {
            addTask(inputValue.trim(), todolistID)
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

    const onRemoveList = () => {
        removeList(todolistID)
    }

    const onAllFilter = () => changeFilter(todolistID,'all')
    const onActiveFilter = () => changeFilter(todolistID,'active')
    const onCompletedFilter = () => changeFilter(todolistID,'completed')

    return (
        <div className={s.todo}>
            <div className={s.list_header}>
                <h3 className={s.list_header_title}>{title}</h3>
                <button onClick={onRemoveList} className={s.list_header_remove}>X</button>
            </div>
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
            <ul className={s.list}>
                {taskElement}
            </ul>
            <div className={s.filter_buttons}>
                <button
                    onClick={onAllFilter}
                    className={filter === 'all' ? s.filter_button : s.active_filter}>All
                </button>
                <button
                    onClick={onActiveFilter}
                    className={filter === 'active' ? s.filter_button : s.active_filter}>Active
                </button>
                <button
                    onClick={onCompletedFilter}
                    className={filter === 'completed' ? s.filter_button : s.active_filter}>Completed
                </button>
            </div>
        </div>
    );
}

export default List;