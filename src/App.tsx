import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";
import {AppBar, Button, IconButton, Typography, Toolbar, Container, Grid, Paper} from "@material-ui/core";
import {Menu} from "@material-ui/icons";


export type FilterValuesType = "all" | "active" | "completed"

export type todoListType = {
    id: string
    title: string
    filter: FilterValuesType
}
export type taskStateType = {
    [key: string]: Array<TaskType>
}

function App() {

    //BLL: business logic layer
    const todoListId_1 = v1()
    const todoListId_2 = v1()

    const [todoLists, setTodoLists] = useState<Array<todoListType>>([
        {id: todoListId_1, title: "What to learn", filter: "all"},
        {id: todoListId_2, title: "What to buy", filter: "all"}
    ])

    const [tasks, setTasks] = useState<taskStateType>({
        [todoListId_1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false}
        ],
        [todoListId_2]: [
            {id: v1(), title: "Milk", isDone: true},
            {id: v1(), title: "Bread", isDone: true},
            {id: v1(), title: "Meat", isDone: false}
        ],
    })


    function removeTask(taskID: string, todoListId: string) {
        const todoListTasks = tasks[todoListId]
        const filteredTasks = todoListTasks.filter(t => t.id !== taskID) // true => вернется
        tasks[todoListId] = filteredTasks
        setTasks({...tasks})
    }

    function addTask(title: string, todoListId: string) {
        const newTask: TaskType = {
            id: v1(),
            title: title,
            isDone: false
        }
        const todoListTasks = tasks[todoListId]
        tasks[todoListId] = [newTask, ...todoListTasks]
        setTasks({...tasks})
        // tasks[todoListId] = [newTask, ...tasks[todoListId]]
        // setTasks([newTask, ...tasks])
    }

   function changeTaskStatus(taskID: string, newIsDoneValue: boolean, todoListId: string) {
        const todoListTasks = tasks[todoListId]
        const task = todoListTasks.find(t => t.id === taskID)
        if (task) {
            task.isDone = newIsDoneValue
            setTasks({...tasks})
        }
    }

    function changeTaskTitle(taskID: string, newTitle: string, todoListId: string) {
        const todoListTasks = tasks[todoListId]
        const task = todoListTasks.find(t => t.id === taskID)
        if (task) {
            task.title = newTitle
            setTasks({...tasks})
        }
    }


    function changeFilter(newFilterValue: FilterValuesType, todoListId: string) {
        const todoList = todoLists.find(tl => tl.id === todoListId);
        if (todoList) {
            todoList.filter = newFilterValue
            setTodoLists([...todoLists])
        }

    }

    function changeTodoListTitle(newTitle: string, todoListId: string) {
        const todoList = todoLists.find(tl => tl.id === todoListId);
        if (todoList) {
            todoList.title = newTitle
            setTodoLists([...todoLists])
        }
    }

    function removeTodoList(todoListId: string) {
        setTodoLists(todoLists.filter(tl => tl.id !== todoListId))
        delete tasks[todoListId]
    }

    function addTodoList(title: string) {
        const newTodoListID = v1()
        const newTodoList: todoListType = {
            id: newTodoListID,
            title: title,
            filter: "all"
        }
        setTodoLists([...todoLists, newTodoList])
        setTasks({...tasks, [newTodoListID]: []})
    }

    //UI:

    // CRUD : Create, Read, Update, Delete


    const todoListComponents = todoLists.map((tl) => {
        let tasksForToDoList = tasks[tl.id]
        if (tl.filter === "active") {
            tasksForToDoList = tasksForToDoList.filter(t => t.isDone === false)
        }
        if (tl.filter === "completed") {
            tasksForToDoList = tasksForToDoList.filter(t => t.isDone === true)
        }
        return (
            <Grid item key={tl.id}>
                <Paper style={{padding: 20}} elevation={6}>
                    <Todolist
                        todoID={tl.id}
                        title={tl.title}
                        tasks={tasksForToDoList}
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

export default App;
