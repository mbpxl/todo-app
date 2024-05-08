import { v1 } from "uuid";
import { FilterValuesTypes, TodoListTypes } from "../App";

type RemoveTodoListActionType = {
  type: "REMOVE-TODOLIST",
  todolistId: string,
}

export type AddTodolistActionType = {
  type: "ADD-TODOLIST",
  title: string,
  todoListId: string,
}

type ChangeTodolistTitleActionType = {
  type: "CHANGE-TODOLIST-TITLE",
  id: string,
  title: string,
}

export type ChangeTodolistFilterActionType = {
  type: "CHANGE-TODOLIST-FILTER",
  todolistId: string | number,
  filter: FilterValuesTypes,
}

type ActionUnionType = RemoveTodoListActionType | AddTodolistActionType | ChangeTodolistTitleActionType |  ChangeTodolistFilterActionType;

export let todoListId1 = v1();
export let todoListId2 = v1();

const initialState: Array<TodoListTypes> = [
];

export const todoListReducer = (state: Array<TodoListTypes> = initialState, action: ActionUnionType): Array<TodoListTypes> => {
  switch(action.type) {
    case "REMOVE-TODOLIST": {
      return state.filter(t => t.id !== action.todolistId);
    }

    case "ADD-TODOLIST": {
      return [...state, {id: action.todoListId, title: action.title, filter: 'All'}];
    }

    case "CHANGE-TODOLIST-TITLE": {
      const todoList = state.find(tl => tl.id === action.id);
      if (todoList) {
        todoList.title = action.title;
      }
      return [...state];
    }

    case "CHANGE-TODOLIST-FILTER": {
      const todoList = state.find(tl => tl.id === action.todolistId);
      if (todoList) {
        todoList.filter = action.filter;
      }
      return [...state];
    }
    default:
      return state;
  }
}



//*------------------------<ACTION-CREATORS>-----------------------------------------//
export const removeTodoListsAC = (todolistId: string): RemoveTodoListActionType => ({type: "REMOVE-TODOLIST", todolistId});
export const addTodoListAC = (title: string): AddTodolistActionType => ({type: "ADD-TODOLIST", title, todoListId: v1()});
export const changeTodoListAC = (todolistId: string, title: string): ChangeTodolistTitleActionType => ({type: "CHANGE-TODOLIST-TITLE", title, id: todolistId});
export const changeTodoListFilterAC = (todolistId: string, filter: FilterValuesTypes): ChangeTodolistFilterActionType => ({type: "CHANGE-TODOLIST-FILTER", todolistId, filter});
//*------------------------</ACTION-CREATORS>-----------------------------------------//