import React from "react";
import {Dispatch} from "redux";
import {useDispatch, useSelector} from 'react-redux'
import {TodoList} from "./TodoList";
import {selectTodolistsState} from "../../store/selectors";
import {addTodoList, changeTodoListFilter, FilterType, removeTodoList} from "../../store/todoListReducer";

export const TodoListContainer = () => {

    const dispatch = useDispatch<Dispatch>()
    const {todoLists} = useSelector(selectTodolistsState)

    const onAddList = (todoListTitle: string) => {
        dispatch(addTodoList(todoListTitle))
    }
    const onRemoveList = (todoListID: string) => {
        dispatch(removeTodoList(todoListID))
    }
    const onChangeTodoListFilter = (todoListID: string, newFilter: FilterType) => {
        dispatch(changeTodoListFilter(todoListID, newFilter))
    }

    const todoListElements = todoLists.map(tl =>
        <TodoList key={tl.id}
            todoListID={tl.id}
            title={tl.title}
            filter={tl.filter}
            onAddList={onAddList}
            onRemoveList={onRemoveList}
            onChangeTodoListFilter={onChangeTodoListFilter}
        />)

    return (

        <>
            {todoListElements}
        </>

    )
}