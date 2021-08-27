import React from "react";
import s from './Button.module.css'
import {FilterType} from "../../../App";

type PropsType = {
    name: FilterType
    onClick: (todolistID: string, filter: FilterType) => void
    todolistID: string
    filter: FilterType
}

export const Button: React.FC<PropsType> = ({name, onClick, todolistID, filter}) => {
    const onClickHandler = () => {
        onClick(todolistID, name);
    }

    return (
        <button className={s.filter_button + ' ' + (filter === name ? s.active_filter : '')} onClick={onClickHandler}>
            {name}
        </button>
    )
}