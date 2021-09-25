import React, {ChangeEvent} from "react";
import {Dispatch} from "redux";
import {useDispatch, useSelector} from 'react-redux'
import {TodoList} from "./TodoList";
import {selectTasksState, selectTodolistsState} from "../../store/selectors";
import {
    changeTodoListFilter,
    changeTodoListTitle,
    FilterType,
    removeTodoList
} from "../../store/todoListReducer";

export const TodoListContainer = () => {

    const dispatch = useDispatch<Dispatch>()
    const {todoLists} = useSelector(selectTodolistsState)
    const {tasks} = useSelector(selectTasksState)

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