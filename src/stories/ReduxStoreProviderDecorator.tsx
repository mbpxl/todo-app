import { Provider } from "react-redux";
import { combineReducers, createStore } from "redux";
import { tasksReducer } from "../data/tasks-reducer";
import { todoListReducer } from "../data/todolists-reducer";
import { v1 } from "uuid";

const rootReducer = combineReducers({
  tasksReducer,
  todoListReducer,
});

const initialGlobalState = {
  todoListReducer: [
    { id: "todoListId1", title: "What to learn", filter: "All" },
    { id: "todoListId2", title: "Movies", filter: "All" },
  ],

  tasksReducer: {
    ["todoListId1"]: [
      { id: v1(), title: "HTML&CSS", isDone: true },
      { id: v1(), title: "JS", isDone: false },
    ],
    ["todoListId2"]: [
      { id: v1(), title: "IT", isDone: true },
      { id: v1(), title: "Astral", isDone: true },
    ],
  },
};

// @ts-ignore
export const storyBookStore = createStore(rootReducer, initialGlobalState);

export const ReduxStoreProviderDecorator = (storyFn: any) => {
  return <Provider store={storyBookStore}>{storyFn()}</Provider>;
};
