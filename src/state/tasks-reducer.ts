import {taskStateType} from "../AppWithRedux";
import {v1} from "uuid";
import {TaskType} from "../Todolist";
import {addTodoListActionType, removeTodoListActionType} from "./todolists-reducer";

type RemoveTaskActionType = {
    type: "REMOVE-TASK"
    taskID: string
    todolistId: string
}

type AddTaskActionType = {
    type: "ADD-TASK",
    title: string,
    todolistId: string
}

type ChangeTaskStatusActionType = {
    type: "CHANGE-TASK-STATUS",
    taskID: string,
    newIsDoneValue: boolean,
    todoListId: string
}
type ChangeTaskTitleActionType = {
    type: "CHANGE-TASK-TITLE",
    taskID: string,
    title: string
    todoListId: string
}

export type ActionType =
    RemoveTaskActionType
    | AddTaskActionType
    | ChangeTaskStatusActionType
    | ChangeTaskTitleActionType
    | addTodoListActionType
    | removeTodoListActionType
    | removeTodoListActionType



let initialState: taskStateType = {}

export const tasksReducer = (state= initialState, action: ActionType) => {
    switch (action.type) {

        case "REMOVE-TASK": {
            let copyState = {...state}
            copyState[action.todolistId] = copyState[action.todolistId].filter(task => task.id !== action.taskID)
            return copyState
        }

        case "ADD-TASK": {
            let newTask: TaskType = {
                id: v1(),
                title: action.title,
                isDone: false
            }
            return {...state, [action.todolistId]: [newTask, ...state[action.todolistId]]}
        }

        case "CHANGE-TASK-STATUS": {
            const todoListTasks = state[action.todoListId]
            const task = todoListTasks.find(t => t.id === action.taskID)
            if (task) {
                task.isDone = action.newIsDoneValue
            }
            return {...state}
        }

        case "CHANGE-TASK-TITLE": {
            const todoListTasks = state[action.todoListId]
            const task = todoListTasks.find(t => t.id === action.taskID)
            if (task) {
                task.title = action.title
            }
            return {...state}
        }

        case "ADD-TODOLIST": {
            let todolistId = action.todolistId
            return {...state, [todolistId]: []}
        }

        case "REMOVE-TODOLIST": {
            let copyState = {...state}
            delete copyState[action.id]
            return copyState
        }

        default:
            return state
    }
}




export const removeTaskAC = (taskID: string, todolistId: string): RemoveTaskActionType => {
    return {type: "REMOVE-TASK", taskID, todolistId}
}

export const addTaskAC = (title: string, todolistId: string): AddTaskActionType => {
    return {type: "ADD-TASK", title, todolistId}
}

export const changeTaskStatusAC = (taskID: string, newIsDoneValue: boolean, todoListId: string): ChangeTaskStatusActionType => {
    return {type: "CHANGE-TASK-STATUS", taskID, newIsDoneValue, todoListId}
}

export const changeTaskTitleAC = (taskID: string, title: string, todoListId: string): ChangeTaskTitleActionType => {
    return {type: "CHANGE-TASK-TITLE", taskID, title, todoListId}
}
















