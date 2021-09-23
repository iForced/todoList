import React from "react";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";

export const App = () => {
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

                </Grid>
                <Grid container spacing={3} justifyContent={"center"}>

                </Grid>
            </Container>
        </>
    )
}