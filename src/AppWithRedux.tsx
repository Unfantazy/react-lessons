import React, {useCallback, useReducer, useState} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";
import {AppBar, Button, IconButton, Typography, Toolbar, Container, Grid, Paper} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {
    addTodoListAC,
    changeTodoListFilterAC,
    changeTodoListTitleAC,
    removeTodoListAC,
    todoListsReducer
} from "./state/todolists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./state/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";


export type FilterValuesType = "all" | "active" | "completed"

export type todoListType = {
    id: string
    title: string
    filter: FilterValuesType
}
export type taskStateType = {
    [key: string]: Array<TaskType>
}

export function AppWithRedux() {

    //BLL: business logic layer

    // const todoListId_1 = v1()
    // const todoListId_2 = v1()

    // const [todoLists, dispatchToTodoLists] = useReducer(todoListsReducer, [
    //     {id: todoListId_1, title: "What to learn", filter: "all"},
    //     {id: todoListId_2, title: "What to buy", filter: "all"}
    // ])

    // const [tasks, dispatchToTasks] = useReducer(tasksReducer, {
    //     [todoListId_1]: [
    //         {id: v1(), title: "HTML&CSS", isDone: true},
    //         {id: v1(), title: "JS", isDone: true},
    //         {id: v1(), title: "ReactJS", isDone: false}
    //     ],
    //     [todoListId_2]: [
    //         {id: v1(), title: "Milk", isDone: true},
    //         {id: v1(), title: "Bread", isDone: true},
    //         {id: v1(), title: "Meat", isDone: false}
    //     ],
    // })


    let todoLists = useSelector<AppRootStateType, todoListType[]>(state => state.todolists)
    let tasks = useSelector<AppRootStateType, taskStateType>(state => state.tasks)

    let dispatch = useDispatch()

    const removeTask = useCallback((taskID: string, todoListId: string) => {
        let action = removeTaskAC(taskID, todoListId)
        dispatch(action)
    }, [dispatch] )

    const addTask = useCallback((title: string, todoListId: string) => {
        let action = addTaskAC(title, todoListId)
        dispatch(action)
    }, [dispatch])

    const changeTaskStatus = useCallback((taskID: string, newIsDoneValue: boolean, todoListId: string) => {
        let action = changeTaskStatusAC(taskID, newIsDoneValue, todoListId)
        dispatch(action)
    }, [dispatch] )

    const changeTaskTitle = useCallback((taskID: string, newTitle: string, todoListId: string) => {
        let action = changeTaskTitleAC(taskID, newTitle, todoListId)
        dispatch(action)
    }, [dispatch] )

    const changeFilter = useCallback((newFilterValue: FilterValuesType, todoListId: string) => {
        let action = changeTodoListFilterAC(todoListId, newFilterValue)
        dispatch(action)
    }, [dispatch] )

    const changeTodoListTitle = useCallback((newTitle: string, todoListId: string) => {

        let action = changeTodoListTitleAC(todoListId, newTitle)
        dispatch(action)
    }, [dispatch] )

    const removeTodoList = useCallback((todoListId: string) => {
        let action = removeTodoListAC(todoListId)
        dispatch(action)
    }, [dispatch] )

    const addTodoList = useCallback((title: string) => {

        let action = addTodoListAC(title)
        dispatch(action)

    }, [dispatch] )

    //UI:

    // CRUD : Create, Read, Update, Delete

    const todoListComponents = todoLists.map((tl) => {
        // let tasksForToDoList =
        // if (tl.filter === "active") {
        //     tasksForToDoList = tasksForToDoList.filter(t => t.isDone === false)
        // }
        // if (tl.filter === "completed") {
        //     tasksForToDoList = tasksForToDoList.filter(t => t.isDone === true)
        // }
        return (
            <Grid item key={tl.id}>
                <Paper style={{padding: 20}} elevation={6}>
                    <Todolist
                        todoID={tl.id}
                        title={tl.title}
                        tasks={tasks[tl.id]}
                        removeTask={removeTask}
                        removeTodoList={removeTodoList}
                        changeFilter={changeFilter}
                        addTask={addTask}
                        changeTaskStatus={changeTaskStatus}
                        filter={tl.filter}
                        changeTaskTitle={changeTaskTitle}
                        changeTodoListTitle={changeTodoListTitle}
                    />
                </Paper>
            </Grid>
        )
    })

    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        News
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={{padding: "20px 0"}}>
                    <AddItemForm addItem={addTodoList}/>
                </Grid>
                <Grid container spacing={5}>
                    {todoListComponents}
                </Grid>
            </Container>
        </div>
    );
}

// export default App;
