import React, {KeyboardEvent, FormEvent, useState, ChangeEvent} from "react";
import {FilterType} from "./App";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type TodoListPropsType = {
    todoListID: string
    title: string
    tasks: Array<TaskType>
    removeTask: (id: string, todoListID: string) => void
    changeFilter: (value: FilterType, todoListID: string) => void
    addTask: (text: string, todoListID: string) => void
    changeStatus: (taskID: string, isDone: boolean, todoListID: string) => void
    filter: FilterType
    removeList: (todoListID: string) => void
}

export function TodoList(props: TodoListPropsType) {
    const todoElement = props.tasks.map((t: TaskType) => {
        const removeTask = () => props.removeTask(t.id, props.todoListID)
        const changeStatus = (e: ChangeEvent<HTMLInputElement>) => {
            props.changeStatus(t.id, e.currentTarget.checked, props.todoListID)
        }

        return (
            <li key={t.id} className={t.isDone ? 'done' : ''}>
                <input type="checkbox" checked={t.isDone} onChange={changeStatus}/>
                <span>{t.title}</span>
                <button onClick={removeTask}>X</button>
            </li>
        )
    })

    const [inputValue, setInputValue] = useState<string>('')
    const [error, setError] = useState<string | null>(null)

    const onInputChangeHandler = (e: FormEvent<HTMLInputElement>) => {
        setError(null)
        const text = e.currentTarget.value
        setInputValue(text)
    }

    const onEnterKeyHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (inputValue.trim() && e.key === 'Enter') {
            props.addTask(inputValue.trim(), props.todoListID)
            setInputValue('')
        } else {
            setError('error')
        }
    }

    const onClickAddHandler = () => {
        if (inputValue.trim() !== '') {
            props.addTask(inputValue.trim(), props.todoListID)
            setInputValue('')
        } else {
            setError('error')
        }
    }

    const onRemoveList = () => {
        props.removeList(props.todoListID)
    }

    const switchFilterAll = () => {
        props.changeFilter('all', props.todoListID)
    }
    const switchFilterActive = () => {
        props.changeFilter('active', props.todoListID)
    }
    const switchFilterCompleted = () => {
        props.changeFilter('completed', props.todoListID)
    }

    return (
        <div>
            <h3>{props.title}
                <button onClick={onRemoveList}>x</button>
            </h3>
            <div>
                <input value={inputValue}
                       onChange={onInputChangeHandler}
                       onKeyPress={onEnterKeyHandler}
                       className={error ? 'error' : ''}
                />
                <button onClick={onClickAddHandler}>+</button>
                <div className={'error_text'}>{error}</div>
            </div>
            <ul>
                {todoElement}
            </ul>
            <div>
                <button onClick={switchFilterAll} className={props.filter === 'all' ? 'active_filter' : ''}>All</button>
                <button onClick={switchFilterActive}
                        className={props.filter === 'active' ? 'active_filter' : ''}>Active
                </button>
                <button onClick={switchFilterCompleted}
                        className={props.filter === 'completed' ? 'active_filter' : ''}>Completed
                </button>
            </div>
        </div>
    )
}