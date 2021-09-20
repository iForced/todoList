import React, {useState} from 'react';
import {List} from '../List/List';
import {v1} from 'uuid'
import {AddItemForm} from "../AddItemForm/AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";

export type TaskItemType = {
    id: string
    title: string
    isDone: boolean
}
export type FilterType = 'all' | 'active' | 'completed'
export type TodolistsType = {
    id: string
    title: string
    filter: FilterType
}
export type TasksType = {
    [todoListID: string]: Array<TaskItemType>
}

export const Main: React.FC = () => {

    let todolistID1 = v1();
    let todolistID2 = v1();

    const [todolists, setTodolists] = useState<Array<TodolistsType>>([
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'},
    ])

    const [tasks, setTasks] = useState<TasksType>({
        [todolistID1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
            {id: v1(), title: "Rest API", isDone: false},
            {id: v1(), title: "GraphQL", isDone: false},
        ],
        [todolistID2]: [
            {id: v1(), title: "Milk", isDone: true},
            {id: v1(), title: "Bread", isDone: true},
            {id: v1(), title: "Sugar", isDone: false},
            {id: v1(), title: "Oil", isDone: false},
            {id: v1(), title: "Salt", isDone: false},
        ]
    });

    const addTodoList = (text: string) => {
        const newtodolistID = v1()
        const newTodoList: TodolistsType = {id: newtodolistID, title: text, filter: 'all'}
        setTodolists([...todolists, newTodoList])
        setTasks({...tasks, [newtodolistID]: []})
    }
    const addTask = (text: string, todolistID: string) => {
        const newTask = {id: v1(), title: text, isDone: false}
        setTasks({...tasks, [todolistID]: [newTask, ...tasks[todolistID]]})
    }
    const removeTask = (taskID: string, todolistID: string) => {
        setTasks({...tasks, [todolistID]: tasks[todolistID].filter(t => t.id !== taskID)})
    }
    const changeStatus = (taskID: string, newStatus: boolean, todolistID: string) => {
        setTasks({...tasks, [todolistID]: tasks[todolistID].map(t => t.id === taskID ? {...t, isDone: newStatus} : t)})
    }
    const changeFilter = (todolistID: string, filterValue: FilterType) => {
        setTodolists(todolists.map(tl => tl.id === todolistID ? {...tl, filter: filterValue} : tl))
    }
    const removeList = (todoListID: string) => {
        setTodolists(todolists.filter(tl => tl.id !== todoListID))
        delete tasks[todoListID]
        setTasks({...tasks})
    }
    const changeListTitle = (text: string, todolistID: string) => {
        setTodolists(todolists.map(tl => tl.id === todolistID ? {...tl, title: text} : tl))
    }
    const changeTaskTitle = (text: string, taskID: string, todolistID: string) => {
        setTasks({...tasks, [todolistID]: tasks[todolistID].map(t => t.id === taskID ? {...t, title: text} : t)})
    }

    return (
        <>
            <AppBar position={"static"}>
                <Toolbar>
                    <IconButton edge={"start"} color={"inherit"} aria-label={"menu"}>
                        <Menu/>
                    </IconButton>
                    <Typography variant={"h6"}>
                        Menu
                    </Typography>
                    <Button color={"inherit"}>Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed maxWidth={"xl"}>
                <Grid container style={{padding: "10px"}} alignItems={"center"} direction={"column"}>
                    <h4>Add new todolist</h4>
                    <i>Enter todolist name</i>
                    <AddItemForm addItem={addTodoList}/>
                </Grid>
                <Grid container spacing={3} justifyContent={"center"}>
                    {todolists.map(tl => {
                        let filteredTasks = tasks[tl.id]
                        if (tl.filter === 'active') filteredTasks = tasks[tl.id].filter((t) => !t.isDone)
                        if (tl.filter === 'completed') filteredTasks = tasks[tl.id].filter((t) => t.isDone)
                        return <Grid item key={tl.id}>
                            <Paper style={{padding: "10px"}} elevation={5}>
                                <List
                                    todolistID={tl.id}
                                    title={tl.title}
                                    tasks={filteredTasks}
                                    addTask={addTask}
                                    removeTask={removeTask}
                                    changeStatus={changeStatus}
                                    changeFilter={changeFilter}
                                    filter={tl.filter}
                                    removeList={removeList}
                                    changeListTitle={changeListTitle}
                                    changeTaskTitle={changeTaskTitle}
                                />
                            </Paper>
                        </Grid>
                    })}
                </Grid>
            </Container>
        </>
    )
}

