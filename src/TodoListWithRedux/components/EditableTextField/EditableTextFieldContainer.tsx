import {EditableTextField} from "./EditableTextField";
import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Dispatch} from "redux";
import {selectTodolistsState} from "../../store/selectors";
import {changeTodoListTitle} from "../../store/todoListReducer";

type PropsType = {
    id: string
    title: string
}

export const EditableTextFieldContainer: React.FC<PropsType> = (props) => {

    const dispatch = useDispatch<Dispatch>()
    const [editMode, setEditMode] = useState<boolean>(false)
    const {id, title} = props

    const onValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(changeTodoListTitle(id, e.currentTarget.value))
    }
    const onEditBlur = () => {
        setEditMode(false)
    }
    const onEditMode = () => {
        setEditMode(true)
    }
    const onEnterPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') setEditMode(false)
    }

    return (
        <EditableTextField
            editMode={editMode}
            spanValue={title}
            onValueChange={onValueChange}
            onEditBlur={onEditBlur}
            onEditMode={onEditMode}
            onEnterPress={onEnterPress}
        />
    )
}