import React from "react";
import {Button} from "@material-ui/core";
import {FilterType} from "../Main/Main";

type PropsType = {
    name: FilterType
    onClick: (todolistID: string, filter: FilterType) => void
    todolistID: string
    filter: FilterType
}

export const MyButton: React.FC<PropsType> = ({name, onClick, todolistID, filter}) => {
    const onClickHandler = () => {
        onClick(todolistID, name);
    }

    return (
        <Button
            onClick={onClickHandler}
            variant={"contained"}
            color={filter === name ? "secondary" : "primary"}
        >{name}</Button>
    )
}