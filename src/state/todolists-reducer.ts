import {FilterValuesType, todoListType} from "../AppWithRedux";
import {v1} from "uuid";
import {act} from "react-dom/test-utils";

export type removeTodoListActionType = {
    type: "REMOVE-TODOLIST"
    id: string
}

export type addTodoListActionType = {
    type: "ADD-TODOLIST"
    title: string
    todolistId: string
}

type changeTodoListTitleActionType = {
    type: "CHANGE-TODOLIST-TITLE"
    title: string,
    id: string
}

type changeTodoListFilterActionType = {
    type: "CHANGE-TODOLIST-FILTER"
    id: string
    filter: FilterValuesType
}

export type ActionType =
    removeTodoListActionType
    | addTodoListActionType
    | changeTodoListTitleActionType
    | changeTodoListFilterActionType


let initialState:Array<todoListType> = []

export const todoListsReducer = (todoLists = initialState, action: ActionType) => {
    switch (action.type) {

        case "REMOVE-TODOLIST":
            return todoLists.filter(tl => tl.id !== action.id)

        case "ADD-TODOLIST":
            const newTodoList: todoListType = {
                id: action.todolistId,
                title: action.title,
                filter: "all"
            }
            return [...todoLists, newTodoList]

        case "CHANGE-TODOLIST-TITLE":
            const todoList = todoLists.find(tl => tl.id === action.id);
            if (todoList) {
                todoList.title = action.title
                return [...todoLists]
            }
            return todoLists

        case "CHANGE-TODOLIST-FILTER": {
            const todoList = todoLists.find(tl => tl.id === action.id);
            if (todoList) {
                todoList.filter = action.filter
                return [...todoLists]
            }
            return todoLists
        }

        default:
            return todoLists
    }
}

export const removeTodoListAC = (id: string): removeTodoListActionType => {
    return {type: "REMOVE-TODOLIST", id}
}

export const addTodoListAC = (title: string): addTodoListActionType => {
    return {type: "ADD-TODOLIST", title, todolistId: v1()}
}

export const changeTodoListTitleAC = (id: string, title: string): changeTodoListTitleActionType => {
    return {type: "CHANGE-TODOLIST-TITLE", title, id}
}

export const changeTodoListFilterAC = (id: string, filter: FilterValuesType): changeTodoListFilterActionType => {
    return {type: "CHANGE-TODOLIST-FILTER", id, filter}
}














