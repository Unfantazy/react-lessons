import React, {ChangeEvent, useCallback} from 'react';
import {FilterValuesType} from "./AppWithRedux";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button, IconButton, Checkbox} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import {Task} from "./Task";


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

export const Todolist = React.memo((props: PropsType) => {
    // let todo = useSelector<AppRootStateType, todoListType>(state => {
    //     return state.todolists.filter(todo => todo.id === props.todoID)[0]
    // })
    //
    // let dispatch = useDispatch()

    const addTask = useCallback((title: string) => props.addTask(title, props.todoID), [props])
    const removeTodoList = useCallback(() => props.removeTodoList(props.todoID), [props])
    const setAllFilter = useCallback(() => props.changeFilter("all", props.todoID), [props])
    const setActiveFilter = useCallback(() => props.changeFilter("active", props.todoID), [props])
    const setCompletedFilter = useCallback(() => props.changeFilter("completed", props.todoID), [props])
    const changeTodoListTitle = useCallback((title: string) => props.changeTodoListTitle(title, props.todoID), [props])

    let tasksForToDoList = props.tasks
    if (props.filter === "active") {
        tasksForToDoList = tasksForToDoList.filter(t => t.isDone === false)
    }
    if (props.filter === "completed") {
        tasksForToDoList = tasksForToDoList.filter(t => t.isDone === true)
    }


    const tasks = tasksForToDoList.map(t => {
        const removeTask = (taskId: string) => props.removeTask(taskId, props.todoID)
        const changeTaskStatus = (taskId: string) =>
            props.changeTaskStatus(taskId, props.todoID)
        const changeTaskTitle = (newTitle: string) => {
            props.changeTaskTitle(taskId, newTitle, props.todoID)
        }
        return <Task
            key={t.id}
            task={t}
            removeTask={removeTask}
            changeTaskStatus={changeTaskStatus}
            changeTaskTitle={changeTaskTitle}
        />
        //   return  <li className={t.isDone ? "isDone" : ""} key={t.id}>
        //
        //        <Checkbox
        //            color={"secondary"}
        //            checked={t.isDone}
        //            onChange={changeTaskStatus}
        //        />
        //
        //        <EditableSpan title={t.title} changeTitle={changeTaskTitle}/>
        //        <IconButton onClick={removeTask}>
        //            <Delete/>
        //        </IconButton>
        //    </li>
    })

    return <div>
        <h3>
            <EditableSpan title={props.title} changeTitle={changeTodoListTitle}/>
            {/*<button onClick={removeTodoList}>DELETE</button>*/}
            <IconButton onClick={removeTodoList}>
                <Delete/>
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
})
