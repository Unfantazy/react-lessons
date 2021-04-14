import React, {ChangeEvent} from 'react'
import {Checkbox, IconButton} from "@material-ui/core";
import {EditableSpan} from "./EditableSpan";
import {Delete} from "@material-ui/icons";
import {TaskType} from "./Todolist";

export type TaskPropsType = {
    task: TaskType
    removeTask: (taskID: string) => void
    changeTaskStatus: (taskID: string, newIsDoneValue: boolean) => void
    changeTaskTitle: (taskID: string, newTitle: string) => void
}

export const Task = React.memo((props: TaskPropsType) => {

    // const removeTask = () => props.removeTask(props.task.id, props.todoID)
    // const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) =>
    //     props.changeTaskStatus(props.task.id, e.currentTarget.checked, props.todoID)
    // const changeTaskTitle = (newTitle: string) => {
    //     props.changeTaskTitle(props.task.id, newTitle, props.todoID)
    // }
    //

    const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => {
        props.changeTaskStatus(props.task.id, e.currentTarget.checked)
    }

    const changeTaskTitle = (newTitle: string) => {
        props.changeTaskTitle(props.task.id, newTitle)
    }

    const removeTask = () => {
        props.removeTask(props.task.id)
    }

    return <>
        <li className={props.task.isDone ? "isDone" : ""} key={props.task.id}>
            <Checkbox
                color={"secondary"}
                checked={props.task.isDone}
                onChange={changeTaskStatus}
            />

            <EditableSpan title={props.task.title} changeTitle={changeTaskTitle}/>
            <IconButton onClick={removeTask}>
                <Delete/>
            </IconButton>

        </li>
    </>
})

