import { v1 } from "uuid";
import { TodoListTypes } from "../App";

type RemoveTodoListActionType = {
  type: "REMOVE-TODOLIST",
  id: string | number,
}

type AddTodolistActionType = {
  type: "ADD-TODOLIST",
  title: string,
}

type ChangeTodolistTitleActionType = {
  type: "CHANGE-TODOLIST-TITLE",
  id: string | number,
  title: string,
}

type ChangeTodolistFilterActionType = {
  type: "CHANGE-TODOLIST-FILTER",
  id: string | number,
  filter: "All" | "Completed" | "Active",
}

type ActionUnionType = RemoveTodoListActionType | AddTodolistActionType | ChangeTodolistTitleActionType | ChangeTodolistFilterActionType;

export const todoListReducer = (state: Array<TodoListTypes>, action: ActionUnionType): Array<TodoListTypes> => {
  switch(action.type) {
    case "REMOVE-TODOLIST": {
      return state.filter(tl => tl.id !== action.id);
    }

    case "ADD-TODOLIST": {
      return [...state, {id: v1(), title: action.title, filter: 'All'}];
    }

    case "CHANGE-TODOLIST-TITLE": {
      const todoList = state.find(tl => tl.id === action.id);
      if (todoList) {
        todoList.title = action.title;
      }
      return [...state];
    }

    case "CHANGE-TODOLIST-FILTER": {
      const todoList = state.find(tl => tl.id === action.id);
      if (todoList) {
        todoList.filter = action.filter;
      }
      return [...state];
    }
    default:
      throw new Error("I don't understand this action type");
  }
}