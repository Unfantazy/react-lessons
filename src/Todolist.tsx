import React, {useState, KeyboardEvent, ChangeEvent} from 'react';
import {FilterValuesType, todoListType} from "./AppWithRedux";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button, IconButton, Checkbox} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export type PropsType = {
    todoID: string
    filter: FilterValuesType
    title: string
    tasks: Array<TaskType>
    removeTask: (taskID: string, todoListId: string) => void
    removeTodoList: (todoListId: string) => void
    changeFilter: (newFilterValue: FilterValuesType, todoListId: string) => void
    addTask: (title: string, todoListId: string) => void
    changeTaskStatus: (taskID: string, newIsDoneValue: boolean, todoListId: string) => void
    changeTaskTitle: (taskID: string, newTitle: string, todoListId: string) => void
    changeTodoListTitle: (newTitle: string, todoListId: string) => void
}

export function Todolist(props: PropsType) {

    let todo = useSelector<AppRootStateType, todoListType>(state => {
        return state.todolists.filter(todo => todo.id === props.todoID)[0]
    })

    let dispatch = useDispatch()

    const addTask = (title: string) => props.addTask(title, props.todoID)
    const removeTodoList = () => props.removeTodoList(props.todoID)
    const setAllFilter = () => props.changeFilter("all", props.todoID)
    const setActiveFilter = () => props.changeFilter("active", props.todoID)
    const setCompletedFilter = () => props.changeFilter("completed", props.todoID)
    const changeTodoListTitle = (title: string) => props.changeTodoListTitle(title, props.todoID)

    const tasks = props.tasks.map(t => {
        const removeTask = () => props.removeTask(t.id, props.todoID)
        const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) =>
            props.changeTaskStatus(t.id, e.currentTarget.checked, props.todoID)
        const changeTaskTitle = (newTitle: string) => {
            props.changeTaskTitle(t.id, newTitle, props.todoID)
        }
        return (
            <li className={t.isDone ? "isDone" : ""} key={t.id}>

                <Checkbox
                    color={"secondary"}
                    checked={t.isDone}
                    onChange={changeTaskStatus}
                />

                {/*<input*/}
                {/*    type="checkbox"*/}
                {/*    checked={t.isDone}*/}
                {/*    onChange={changeTaskStatus}*/}
                {/*/>*/}
                <EditableSpan title={t.title} changeTitle={changeTaskTitle}/>
                {/*<button className="deleteTask" onClick={removeTask}>X</button>*/}
                <IconButton onClick={removeTask}>
                    <Delete />
                </IconButton>
            </li>
        )
    })

    return <div>
        <h3>
            <EditableSpan title={props.title} changeTitle={changeTodoListTitle}/>
            {/*<button onClick={removeTodoList}>DELETE</button>*/}
            <IconButton onClick={removeTodoList}>
                <Delete />
            </IconButton>
        </h3>
        <AddItemForm
            addItem={addTask}
        />
        <ul style={{listStyle: "none", paddingLeft: '0'}}>
            {tasks}
        </ul>
        <div>
            <Button
                variant={"contained"}
                color={props.filter === "all" ? "secondary" : "primary"}
                size={"small"}
                onClick={setAllFilter}>All</Button>
            <Button
                variant={"contained"}
                color={props.filter === "active" ? "secondary" : "primary"}
                size={"small"}
                onClick={setActiveFilter}>Active</Button>
            <Button
                variant={"contained"}
                color={props.filter === "completed" ? "secondary" : "primary"}
                size={"small"}
                onClick={setCompletedFilter}>Completed
            </Button>
        </div>
    </div>
}
