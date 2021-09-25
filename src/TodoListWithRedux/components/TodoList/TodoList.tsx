import React, {ChangeEvent} from "react";
import {FilterType} from "../../store/todoListReducer";
import s from './TodoList.module.css';
import {Button, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import {TaskContainer} from "../Task/TaskContainer";
import {EditableTextField} from "../EditableTextField/EditableTextField";
import {AddItemForm} from "../AddItemForm/AddItemForm";
import {useDispatch} from "react-redux";
import {addTask} from "../../store/tasksReducer";
import {v1} from "uuid";
import {MyButton} from "../MyButton/MyButton";

type PropsType = {
    todoListID: string
    title: string
    filter: FilterType
    onRemoveList: (todoListID: string) => void
    onChangeTodoListTitle: (e: ChangeEvent<HTMLInputElement>) => void
    onChangeTodoListFilter: (todoListID: string, newFilter: FilterType) => void
}

export const TodoList: React.FC<PropsType> = (props) => {

    const {todoListID, title, filter, onRemoveList, onChangeTodoListTitle, onChangeTodoListFilter} = props
    const dispatch = useDispatch()

    const onAddTask = (text: string) => {
        dispatch(addTask(todoListID, text))
    }

    return (
        <div className={s.todo}>
            <div className={s.list_header}>
                <h3 className={s.list_header_title}>
                    <EditableTextField todoListID={todoListID} title={title} onValueChange={onChangeTodoListTitle} />
                </h3>
                <IconButton onClick={() => onRemoveList(todoListID)}>
                    <Delete/>
                </IconButton>
            </div>
            <AddItemForm addItem={onAddTask} />
            <ul className={s.list}>
                <TaskContainer todoListID={todoListID} />
            </ul>
            <div className={s.filter_buttons}>
                <MyButton name={'all'} onClick={onChangeTodoListFilter} todolistID={todoListID} filter={filter} />
                <MyButton name={'active'} onClick={onChangeTodoListFilter} todolistID={todoListID} filter={filter} />
                <MyButton name={'completed'} onClick={onChangeTodoListFilter} todolistID={todoListID} filter={filter} />
            </div>
        </div>
    )
}