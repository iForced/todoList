import React, {useCallback} from "react";
import {Dispatch} from "redux";
import {useDispatch, useSelector} from 'react-redux'
import {TodoList} from "./TodoList";
import {selectTodolistsState} from "../../store/selectors";
import {
    changeTodoListFilter,
    changeTodoListTitle,
    FilterType,
    removeTodoList
} from "../../store/todoListReducer";

export const TodoListContainer = React.memo(() => {
    console.log('todolist container')

    const dispatch = useDispatch<Dispatch>()
    const {todoLists} = useSelector(selectTodolistsState)

    const onRemoveList = useCallback((todoListID: string) => {
        dispatch(removeTodoList(todoListID))
    }, [])
    const onChangeTodoListFilter = useCallback((todoListID: string, newFilter: FilterType) => {
        dispatch(changeTodoListFilter(todoListID, newFilter))
    }, [])
    const onTitleChange = useCallback((id: string, text: string) => {
        dispatch(changeTodoListTitle(id, text))
    }, [])

    const todoListElements = todoLists.map(tl => {
        return <TodoList key={tl.id}
                         todoListID={tl.id}
                         title={tl.title}
                         filter={tl.filter}
                         onRemoveList={onRemoveList}
                         onChangeTodoListTitle={onTitleChange}
                         onChangeTodoListFilter={onChangeTodoListFilter}
        />
    })

    return (

        <>
            {todoListElements}
        </>

    )
})