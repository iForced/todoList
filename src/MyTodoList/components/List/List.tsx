import React from 'react';
import s from './List.module.css'
import {TaskItemType} from "../Main/Main";
import {FilterType} from "../../../App";
import {Button} from "../Button/Button";
import {AddItemForm} from "../AddItemForm/AddItemForm";
import {EditableSpan} from "../EditableSpan/EditableSpan";

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
    changeListTitle: (text: string, todolistID: string) => void
    changeTaskTitle: (text: string, taskID: string, todolistID: string) => void
}

export const List: React.FC<ListPropsType> = (
    {
        title,
        tasks,
        addTask,
        removeTask,
        changeStatus,
        changeFilter,
        filter,
        todolistID,
        removeList,
        changeListTitle,
        changeTaskTitle,
    }
) => {

    const onRemoveList = () => {
        removeList(todolistID)
    }
    const onAddTask = (text: string) => {
        addTask(text, todolistID)
    }
    const onListTitleChange = (text: string) => {
        changeListTitle(text, todolistID)
    }

    const taskElement = tasks.map((t) => {
            const onChangeStatus = (e: React.ChangeEvent<HTMLInputElement>) => {
                changeStatus(t.id, e.currentTarget.checked, todolistID)
            }
            const onRemove = () => {
                removeTask(t.id, todolistID)
            }
            const onTaskTitleChange = (text: string) => {
                changeTaskTitle(text, t.id, todolistID)
            }
            return (
                <li className={s.list_item + ' ' + (t.isDone && s.list_item_completed)} key={t.id}>
                    <input type={"checkbox"} checked={t.isDone} onChange={onChangeStatus}/>
                    <EditableSpan text={t.title} onChange={onTaskTitleChange}/>
                    <button onClick={onRemove} className={s.remove_button}>X</button>
                </li>
            )
        }
    )

    return (
        <div className={s.todo}>
            <div className={s.list_header}>
                <h3 className={s.list_header_title}>
                    <EditableSpan text={title} onChange={onListTitleChange}/>
                </h3>
                <button onClick={onRemoveList} className={s.list_header_remove}>X</button>
            </div>
            <AddItemForm addItem={onAddTask}/>
            <ul className={s.list}>
                {taskElement}
            </ul>
            <div className={s.filter_buttons}>
                <Button name={'all'} onClick={changeFilter} todolistID={todolistID} filter={filter}/>
                <Button name={'active'} onClick={changeFilter} todolistID={todolistID} filter={filter}/>
                <Button name={'completed'} onClick={changeFilter} todolistID={todolistID} filter={filter}/>
            </div>
        </div>
    )
}
