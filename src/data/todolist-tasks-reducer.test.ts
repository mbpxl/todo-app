import { TasksStateType, TodoListTypes } from "../App";
import { tasksReducer } from "./tasks-reducer";
import { addTodoListAC, todoListReducer } from "./todolists-reducer";

test("id's should be equals", () => {
  const startTaskState: TasksStateType = {};
  const startTodoListState: Array<TodoListTypes> = [];

  const action = addTodoListAC("new todolist");
  const endTasksState = tasksReducer(startTaskState, action);
  const endTodoListState = todoListReducer(startTodoListState, action);

  const keys = Object.keys(endTasksState);
  const idFromTasks = keys[0];
  const idFromTodoLists = endTodoListState[0].id;
  
  expect(idFromTasks).toBe(action.todoListId);
  expect(idFromTodoLists).toBe(action.todoListId);
});