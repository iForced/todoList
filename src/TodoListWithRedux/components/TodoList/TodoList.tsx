import React from "react";
import {FilterType} from "../../store/todoListReducer";
import s from './TodoList.module.css';
import {IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import {EditableTextFieldContainer} from "../EditableTextField/EditableTextFieldContainer";

type PropsType = {
    id: string
    title: string
    filter: FilterType
    onAddList: (todoListTitle: string) => void
    onRemoveList: (todoListID: string) => void
    onChangeTodoListFilter: (todoListID: string, newFilter: FilterType) => void
}

export const TodoList: React.FC<PropsType> = (props) => {

    const {id, title, filter, onAddList, onRemoveList, onChangeTodoListFilter} = props

    return (
        <div className={s.todo}>
            <div className={s.list_header}>
                <h3 className={s.list_header_title}>
                    <EditableTextFieldContainer id={id} />
                </h3>
                <IconButton onClick={() => onRemoveList(id)}>
                    <Delete/>
                </IconButton>
            </div>
            add form
            <ul className={s.list}>
                tasks
            </ul>
            <div className={s.filter_buttons}>
                buttons
            </div>
        </div>
    )
}