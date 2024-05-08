import { v1 } from "uuid";
import { TasksStateType } from "../App";
import { todoListId1, todoListId2 } from "./todolists-reducer";

export type removeTaskActionType = {
  type: "REMOVE-TASK",
  taskId: string,
  todolistId: string,
}

export type addTaskActionType = {
  type: "ADD-TASK",
  newTaskTitle: string,
  todoListId: string,
}

export type changeTaskStatusActionType = {
  type: "CHANGE-TASK-STATUS",
  taskId: string,
  todoListId: string,
  featureStatus: boolean,
}

type AddTodolistActionType = {
  type: "ADD-TODOLIST",
  todoListId: string,
}

export type changeTaskTitleActionType = {
  type: "CHANGE-TASK-TITLE",
  taskId: string,
  todoListId: string,
  featureTitle: string,
}


export type removeTodoListActionType = {
  type: "REMOVE-TODO-LIST";
  todoListId: string;
}

type ActionUnionType = removeTaskActionType | addTaskActionType | changeTaskStatusActionType | changeTaskTitleActionType  | AddTodolistActionType | removeTodoListActionType;

const initialState: TasksStateType = {
    [todoListId1]: [
      { id: v1(), title: "CSS", isDone: true },
      { id: v1(), title: "React", isDone: true },
      { id: v1(), title: "Vue", isDone: false },
    ],
    [todoListId2]: [
      { id: v1(), title: "Book", isDone: true },
      { id: v1(), title: "CopyBook", isDone: true },
      { id: v1(), title: "Pen", isDone: false },
    ],
  }

export const tasksReducer = (state: TasksStateType = initialState, action: ActionUnionType): TasksStateType => {
  switch(action.type) {
    case "REMOVE-TASK": {
      const stateCopy = {...state};
      stateCopy[action.todolistId] = stateCopy[action.todolistId].filter(t => t.id !== action.taskId);
      return stateCopy;
    };

    case "ADD-TASK": {
      const stateCopy = {...state};
      const tasks = stateCopy[action.todoListId];
      const newTask = {id: v1(), title: action.newTaskTitle, isDone: false};
      const newTasks = [newTask, ...tasks];
      stateCopy[action.todoListId] = newTasks;
      return stateCopy;
    };

    case "CHANGE-TASK-STATUS": {
      const stateCopy = {...state};
      const tasks = stateCopy[action.todoListId];
      let task = tasks.find(t => t.id === action.taskId);
      if (task) {
        task.isDone = action.featureStatus;
      }
      return stateCopy;
    };

    case "CHANGE-TASK-TITLE": {
      debugger;
      const stateCopy = {...state};
      const tasks = stateCopy[action.todoListId];
      console.log(action.todoListId);
      let task = tasks.find(t => t.id === action.taskId);
      if (task) {
        task.title = action.featureTitle;
      }
      return stateCopy;
    };

    case "ADD-TODOLIST": {
      const stateCopy = {...state};
      stateCopy[action.todoListId] = [];

      return stateCopy;
    };

    case "REMOVE-TODO-LIST": {
      const stateCopy = {...state};
      delete stateCopy[action.todoListId];
      return stateCopy;
    };

    default:
      return state;
  };
};


//*------------------------<ACTION-CREATORS>-----------------------------------------//
export const removeTaskAC = (taskId: string, todolistId: string): removeTaskActionType => ({type: "REMOVE-TASK", taskId, todolistId});
export const addTaskAC = (newTaskTitle: string, todoListId: string): addTaskActionType => ({type: "ADD-TASK", newTaskTitle, todoListId});
export const changeTaskStatusAC = (taskId: string, todoListId: string, featureStatus: boolean): changeTaskStatusActionType => ({type: "CHANGE-TASK-STATUS", taskId, todoListId, featureStatus});
export const changeTaskTitleAC = (taskId: string, todoListId: string, featureTitle: string): changeTaskTitleActionType => ({type: "CHANGE-TASK-TITLE", taskId, todoListId, featureTitle});
export const removeTodoListAC = (todoListId: string): removeTodoListActionType => ({type: "REMOVE-TODO-LIST", todoListId});
export const addTodoListAC = (todoListId: string): AddTodolistActionType => ({type: "ADD-TODOLIST", todoListId});
//*------------------------</ACTION-CREATORS>-----------------------------------------//