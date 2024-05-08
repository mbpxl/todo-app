import { combineReducers, createStore } from "redux";
import { tasksReducer } from "./tasks-reducer";
import { todoListReducer } from "./todolists-reducer";

const rootReducer = combineReducers({
  todoListReducer,
  tasksReducer,
});
export type AppRootState = ReturnType<typeof rootReducer>;

export const store = createStore(rootReducer);
// @ts-ignore
window.store = store;