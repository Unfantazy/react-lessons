import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {v1} from 'uuid';


export type FilterValuesType = "all" | "active" | "completed"

function App() {
    //BLL: business logic layer
    const [tasks, setTasks] = useState<Array<TaskType>>([
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
        ]
    )

    function removeTask(taskID: string) {
        const filteredTasks = tasks.filter(t => t.id !== taskID) // true => вернется
        setTasks(filteredTasks)
        console.log(tasks)
    }

    function addTask(title: string) {
        const newTask: TaskType = {
            id: v1(),
            title: title,
            isDone: false
        }
        setTasks([newTask, ...tasks])
    }

    const [filter, setFilter] = useState<FilterValuesType>("all")

    function changeFilter(newFilterValue: FilterValuesType) {
        setFilter(newFilterValue)
    }

    let tasksForToDoList = tasks
    if (filter === "active") {
        tasksForToDoList = tasks.filter(t => t.isDone === false)
    }
    if (filter === "completed") {
        tasksForToDoList = tasks.filter(t => t.isDone === true)
    }

    //UI:

    // CRUD : Create, Read, Update, Delete


    return (
        <div className="App">
            <Todolist
                title="What to learn"
                tasks={tasksForToDoList}
                removeTask={removeTask}
                changeFilter={changeFilter}
                addTask={addTask}
            />
        </div>
    );
}

export default App;
