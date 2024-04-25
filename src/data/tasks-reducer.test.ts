import { v1 } from "uuid"
import { TasksStateType } from "../App"
import { addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, removeTodoListAC, tasksReducer } from "./tasks-reducer";
import { addTodoListAC } from "./todolists-reducer";

test("correct task should be deleted from correct array", () => {
  const startState: TasksStateType = {
    "todoListId1": [
      { id: "1", title: "CSS", isDone: true },
      { id: "2", title: "React", isDone: true },
      { id: "3", title: "Vue", isDone: false },
    ],
    "todoListId2": [
      { id: "1", title: "Book", isDone: true },
      { id: "2", title: "CopyBook", isDone: true },
      { id: "3", title: "Pen", isDone: false },
    ],
  };
  const action = removeTaskAC("2", "todoListId2")
  const endState = tasksReducer(startState, action);

  expect(endState["todoListId1"].length).toBe(3);
  expect(endState["todoListId2"].length).toBe(2);
});

test("correct task should be added to correct array", () => {
  const startState: TasksStateType = {
    "todoListId1": [
      { id: v1(), title: "CSS", isDone: true },
      { id: v1(), title: "React", isDone: true },
      { id: v1(), title: "Vue", isDone: false },
    ],
    "todoListId2": [
      { id: v1(), title: "Book", isDone: true },
      { id: v1(), title: "CopyBook", isDone: true },
      { id: v1(), title: "Pen", isDone: false },
    ],
  };

  const action = addTaskAC("new", "todoListId2")
  const endState = tasksReducer(startState, action);

  expect(endState["todoListId1"].length).toBe(3);
  expect(endState["todoListId2"].length).toBe(4);
  expect(endState["todoListId2"][0].id).toBeTruthy();
  expect(endState["todoListId2"][0].title).toBe("new");
  expect(endState["todoListId2"][0].isDone).toBe(false);
});

test("correct task should be change status in correct array", () => {
  const startState: TasksStateType = {
    "todoListId1": [
      { id: "1", title: "CSS", isDone: true },
      { id: "2", title: "React", isDone: true },
      { id: "3", title: "Vue", isDone: false },
    ],
    "todoListId2": [
      { id: "1", title: "Book", isDone: true },
      { id: "2", title: "CopyBook", isDone: true },
      { id: "3", title: "Pen", isDone: false },
    ],
  };

  const action = changeTaskStatusAC("2", "todoListId2", false);
  const endState = tasksReducer(startState, action);

  expect(endState["todoListId1"][1].isDone).toBeTruthy();
  expect(endState["todoListId2"][1].isDone).toBe(false);
});

test("correct task title should be changed in correct array", () => {
  const startState: TasksStateType = {
    "todoListId1": [
      { id: "1", title: "CSS", isDone: true },
      { id: "2", title: "React", isDone: true },
      { id: "3", title: "Vue", isDone: false },
    ],
    "todoListId2": [
      { id: "1", title: "Book", isDone: true },
      { id: "2", title: "CopyBook", isDone: true },
      { id: "3", title: "Pen", isDone: false },
    ],
  };

  const action = changeTaskTitleAC("2", "todoListId2", "bim-bom-bom");
  const endState = tasksReducer(startState, action);

  expect(endState["todoListId1"][1].title).toBeTruthy();
  expect(endState["todoListId2"][1].title).toBe("bim-bom-bom");
});

test("new array should be added when new todolist is added", () => {
  const startState: TasksStateType = {
    "todoListId1": [
      { id: "1", title: "CSS", isDone: true },
      { id: "2", title: "React", isDone: true },
      { id: "3", title: "Vue", isDone: false },
    ],
    "todoListId2": [
      { id: "1", title: "Book", isDone: true },
      { id: "2", title: "CopyBook", isDone: true },
      { id: "3", title: "Pen", isDone: false },
    ],
  };

  const action = addTodoListAC("no-matter");
  const endState = tasksReducer(startState, action);

  const keys = Object.keys(endState);
  const newKey = keys.find(k => k !== "todoListId1" && k !== "todoListId2");

  if(!newKey) {
    throw new Error("new key should be added");
  }

  expect(keys.length).toBe(3);
  expect(endState[newKey]).toEqual([]);
});

test("property with todoListId should be deleted", () => {
  const startState: TasksStateType = {
    "todoListId1": [
      { id: "1", title: "CSS", isDone: true },
      { id: "2", title: "React", isDone: true },
      { id: "3", title: "Vue", isDone: false },
    ],
    "todoListId2": [
      { id: "1", title: "Book", isDone: true },
      { id: "2", title: "CopyBook", isDone: true },
      { id: "3", title: "Pen", isDone: false },
    ],
  };

  const action = removeTodoListAC("todoListId2")
  const endState = tasksReducer(startState, action);

  const keys = Object.keys(endState);

  expect(keys.length).toBe(1);
  expect(endState["todoListId2"]).not.toBeDefined();
})