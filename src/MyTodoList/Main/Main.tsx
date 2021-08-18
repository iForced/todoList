import React, {useState} from 'react';
import s from './Main.module.css'
import List from "../List/List";
import {v1} from 'uuid'

export type TaskItemType = {
    id: string
    title: string
    isDone: boolean
}
type FilterType = 'all' | 'active' | 'completed'
type TodolistsType = {
    id: string
    title: string
    filter: FilterType
}

const Main: React.FC = () => {

    let todolistID1 = v1();
    let todolistID2 = v1();

    let [todolists, setTodolists] = useState<Array<TodolistsType>>([
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'},
    ])

    let [tasks, setTasks] = useState({
        [todolistID1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
            {id: v1(), title: "Rest API", isDone: false},
            {id: v1(), title: "GraphQL", isDone: false},
        ],
        [todolistID2]: [
            {id: v1(), title: "HTML&CSS2", isDone: true},
            {id: v1(), title: "JS2", isDone: true},
            {id: v1(), title: "ReactJS2", isDone: false},
            {id: v1(), title: "Rest API2", isDone: false},
            {id: v1(), title: "GraphQL2", isDone: false},
        ]
    });

    const addTask = (text: string, todolistID: string) => {
        const newTask = {id: v1(), title: text, isDone: false}
        tasks[todolistID].unshift(newTask)
        setTasks({...tasks})
    }

    const removeTask = (taskID: string, todolistID: string) => {
        const tasksForList = tasks[todolistID]
        tasks[todolistID] = tasksForList.filter(t => t.id !== taskID)
        setTasks({...tasks})
    }

    const changeStatus = (taskID: string, newStatus: boolean, todolistID: string) => {
        const updatedTask = tasks[todolistID].find((t) => t.id === taskID)
        if (updatedTask) updatedTask.isDone = newStatus
        setTasks({...tasks})
    }

    const changeFilter = (todolistID: string, filterValue: FilterType) => {
        const todolist = todolists.find(tl => tl.id === todolistID)
        if (todolist) todolist.filter = filterValue
        setTodolists([...todolists])
    }

    const removeList = (todoListID: string) => {
        const updatedLists = todolists.filter(tl => tl.id !== todoListID)
        setTodolists(updatedLists)
    }

    return (
        <div className={s.container}>
            {todolists.map(tl => {
                let filteredTasks = tasks[tl.id]
                if (tl.filter === 'active') filteredTasks = tasks[tl.id].filter((t) => !t.isDone)
                if (tl.filter === 'completed') filteredTasks = tasks[tl.id].filter((t) => t.isDone)
                return <List
                    todolistID={tl.id}
                    key={tl.id}
                    title={tl.title}
                    tasks={filteredTasks}
                    addTask={addTask}
                    removeTask={removeTask}
                    changeStatus={changeStatus}
                    changeFilter={changeFilter}
                    filter={tl.filter}
                    removeList={removeList}
                />
            })}
        </div>
    );
}

export default Main;
