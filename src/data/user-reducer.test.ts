import { userReducer } from "./user-reducer";

//? testing age incrtement
test("user reducer should increment only age", () => {
  const startState = { age: 20, childrenCount: 2, name: "Dimych" };

  const endState = userReducer(startState, { type: "INCREMENT-AGE" });

  expect(endState.age).toBe(21);
  expect(endState.childrenCount).toBe(2);
});

//? testing children count increment
test("user reducer should increment only childrenCount", () => {
  const startState = { age: 20, childrenCount: 2, name: "Dymich" };

  const endState = userReducer(startState, {
    type: "INCREMENT-CHILDREN-COUNT",
  });

  expect(endState.childrenCount).toBe(3);
  expect(endState.age).toBe(20);
});

//? testing change name
test("user reducer should change user's name", () => {
  const startState = { age: 20, childrenCount: 2, name: "Dymich" };
  const newName = "Oleg";

  const endState = userReducer(startState, {
    type: "CHANGE-NAME",
    newName: newName,
  });

  expect(endState.name).toBe(newName);
});
