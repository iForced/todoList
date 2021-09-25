import React from "react";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {TodoListContainer} from "./TodoListWithRedux/components/TodoList/TodoListContainer";
import {AddItemForm} from "./TodoListWithRedux/components/AddItemForm/AddItemForm";
import {useDispatch} from "react-redux";
import {addTodoList} from "./TodoListWithRedux/store/todoListReducer";

export const App = () => {
    const dispatch = useDispatch()

    const onAddTodoList = (text: string) => {
        dispatch(addTodoList(text))
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
                    <AddItemForm addItem={onAddTodoList} />
                </Grid>
                <Grid container spacing={3} justifyContent={"center"}>

                </Grid>
            </Container>
            <TodoListContainer />
        </>
    )
}