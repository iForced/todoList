import {EditableTextField} from "./EditableTextField";
import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Dispatch} from "redux";
import {selectTodolistsState} from "../../store/selectors";
import {changeTodoListTitle} from "../../store/todoListReducer";

type PropsType = {
    id: string
}

export const EditableTextFieldContainer: React.FC<PropsType> = (props) => {

    const dispatch = useDispatch<Dispatch>()
    const {todoLists} = useSelector(selectTodolistsState)

    const [editMode, setEditMode] = useState<boolean>(false)
    const spanValue = todoLists.filter(tl => tl.id === props.id)[0].title

    const onValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(changeTodoListTitle(props.id, e.currentTarget.value))
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
            spanValue={spanValue}
            onValueChange={onValueChange}
            onEditBlur={onEditBlur}
            onEditMode={onEditMode}
            onEnterPress={onEnterPress}
        />
    )
}