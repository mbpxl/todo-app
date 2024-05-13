import React, { useCallback } from "react";
import "./assets/style.scss";
import { TaskType, Todolist } from "./components/Todolist/Todolist";
import { AddItemForm } from "./components/AddItemForm/AddItemForm";
import {
  AppBar,
  Button,
  Container,
  Grid,
  IconButton,
  Paper,
  Toolbar,
} from "@mui/material";
import { Menu } from "@mui/icons-material";
import { addTodoListAC } from "./data/todolists-reducer";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { AppRootState } from "./data/store";

export type FilterValuesTypes = "All" | "Completed" | "Active";
export type TodoListTypes = {
  id: string;
  title: string;
  filter: FilterValuesTypes;
};

export type TasksStateType = {
  [key: string]: Array<TaskType>;
};

const App = React.memo(() => {
  //! =====================================REDUX TOOLS=====================================
  const dispatch = useDispatch();

  const todoLists = useSelector<AppRootState, Array<TodoListTypes>>(
    (state) => state.todoListReducer
  );

  const tasks = useSelector<AppRootState, TasksStateType>(
    (state) => state.tasksReducer
  );
  //! =====================================REDUX TOOLS=====================================

  //* callback to AddItem component
  const addTodoList = useCallback(
    (title: string) => {
      const action = addTodoListAC(title);
      dispatch(action);
    },
    [dispatch]
  );

  return (
    <div className="container">
      <AppBar position="static" className="burger">
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu">
            <Menu />
          </IconButton>
          <h4>News</h4>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
      <Container fixed>
        <Grid container style={{ marginBottom: "30px" }}>
          <AddItemForm
            addItem={addTodoList}
            placeholderTitle={"New todolist"}
          />
        </Grid>

        <Grid container spacing={5}>
          {todoLists.map((t) => {
            let tasksForTodoList = tasks[t.id];
            if (t.filter === "Completed") {
              tasksForTodoList = tasksForTodoList.filter((t) => t.isDone);
            } else if (t.filter === "Active") {
              tasksForTodoList = tasksForTodoList.filter((t) => !t.isDone);
            }
            return (
              <Grid item>
                <Paper style={{ padding: "10px" }}>
                  <Todolist
                    key={t.id}
                    todoListId={t.id}
                    title={t.title}
                    tasks={tasksForTodoList}
                    filter={t.filter}
                  />
                </Paper>
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </div>
  );
});

export default App;
