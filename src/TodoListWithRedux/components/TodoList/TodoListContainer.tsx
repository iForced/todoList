import React, {ChangeEvent} from "react";
import {Dispatch} from "redux";
import {useDispatch, useSelector} from 'react-redux'
import {TodoList} from "./TodoList";
import {selectTodolistsState} from "../../store/selectors";
import {
    addTodoList,
    changeTodoListFilter,
    changeTodoListTitle,
    FilterType,
    removeTodoList
} from "../../store/todoListReducer";

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

    const todoListElements = todoLists.map(tl => {
        const onChangeTodoListTitle = (e: ChangeEvent<HTMLInputElement>) => {
            dispatch(changeTodoListTitle(tl.id, e.currentTarget.value))
        }
        return <TodoList key={tl.id}
                         todoListID={tl.id}
                         title={tl.title}
                         filter={tl.filter}
                         onAddList={onAddList}
                         onRemoveList={onRemoveList}
                         onChangeTodoListTitle={onChangeTodoListTitle}
                         onChangeTodoListFilter={onChangeTodoListFilter}
        />
    })


    return (

        <>
            {todoListElements}
        </>

    )
}