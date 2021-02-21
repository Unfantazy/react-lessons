import React, {useState, KeyboardEvent, ChangeEvent} from 'react';
import {FilterValuesType} from "./App";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskID: string) => void
    changeFilter: (newFilterValue: FilterValuesType) => void
    addTask: (title: string) => void
}

export function Todolist(props: PropsType) {

    const [title, setTitle] = useState<string>("")

    const addTask = () => {
        props.addTask(title)
        setTitle("")
    }
    const onKeyPressAddTask = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            addTask()
        }
    }
    const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    const setAllFilter = () => props.changeFilter("all")
    const setActiveFilter = () => props.changeFilter("active")
    const setCompletedFilter = () => props.changeFilter("completed")

    const tasks = props.tasks.map(t => {
        const removeTask = () => props.removeTask(t.id)
        return (
            <li>
                <input type="checkbox" checked={t.isDone}/>
                <span>{t.title}</span>
                <button className="deleteTask" onClick={removeTask}>X</button>
            </li>
        )
    })

    return <div>
        <h3>{props.title}</h3>
        <div>
            <input
                value={title}
                onChange={changeTitle}
                onKeyPress={onKeyPressAddTask}
            />
            <button
                onClick={addTask}
            >+
            </button>
        </div>
        <ul>
            {tasks}
        </ul>
        <div>
            <button onClick={setAllFilter}>All</button>
            <button onClick={setActiveFilter}>Active</button>
            <button onClick={setCompletedFilter}>Completed</button>
        </div>
    </div>
}
