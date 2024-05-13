import { v1 } from "uuid";
import { addTodoListAC, todoListReducer } from "./todolists-reducer";
import { FilterValuesTypes, TodoListTypes } from "../App";

test("correct todolist must be removed", () => {
  let todoListId1 = v1();
  let todoListId2 = v1();


  const startState: Array<TodoListTypes> = [
    {id: todoListId1, title: "What to learn", filter: "All"},
    {id: todoListId2, title: "What to buy", filter: "All"}
  ]

  const endState = todoListReducer(startState, { type: "REMOVE-TODOLIST", todolistId: todoListId1 });

  expect(endState.length).toBe(1);
  expect(endState[0].id).toBe(todoListId2);
});

test("add new todolist", () => {
  let todoListId1 = v1();
  let todoListId2 = v1();

  const startState: Array<TodoListTypes> = [
    {id: todoListId1, title: "What to learn", filter: "All"},
    {id: todoListId2, title: "What to buy", filter: "All"}
  ];
  let action = addTodoListAC("New todolist")
  const endState = todoListReducer(startState, action);
  
  expect(endState.length).toBe(3);
  expect(endState[2].title).toBe("New todolist");
  expect(endState[2].filter).toBe("All");
});

test("rename todolist title", () => {
  let todoListId1 = v1();
  let todoListId2 = v1();
  let newTodoListTitle = "New todolist";

  const startState: Array<TodoListTypes> = [
    {id: todoListId1, title: "What to learn", filter: "All"},
    {id: todoListId2, title: "What to buy", filter: "All"}
  ];

  const endState = todoListReducer(startState, {type: "CHANGE-TODOLIST-TITLE", id: todoListId2, title: newTodoListTitle});

  expect(endState[0].title).toBe("What to learn");
  expect(endState[1].title).toBe(newTodoListTitle);
});

test("change filter of todolist", () => {
  let todoListId1 = v1();
  let todoListId2 = v1();

  let newFilter: FilterValuesTypes = "Completed";

  const startState: Array<TodoListTypes> = [
    {id: todoListId1, title: "What to learn", filter: "All"},
    {id: todoListId2, title: "What to buy", filter: "All"}
  ];

  const endState = todoListReducer(startState, {type: "CHANGE-TODOLIST-FILTER", todolistId: todoListId2, filter: newFilter});

  expect(endState[0].filter).toBe("All");
  expect(endState[1].filter).toBe(newFilter);
});