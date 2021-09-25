import React from "react";
import {Button} from "@material-ui/core";
import {FilterType} from "../../store/todoListReducer";

type PropsType = {
    name: FilterType
    onClick: (todolistID: string, filter: FilterType) => void
    todolistID: string
    filter: FilterType
}

export const MyButton: React.FC<PropsType> = (props) => {

    const {name, filter, todolistID, onClick} = props

    const onClickHandler = () => {
        onClick(todolistID, name);
    }

    return (
        <Button
            onClick={onClickHandler}
            variant={"contained"}
            color={filter === name ? "secondary" : "primary"}
        >{name}
        </Button>
    )
}