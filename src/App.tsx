import React from "react";
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
import {
  changeTodoListAC,
  changeTodoListFilterAC,
  removeTodoListsAC,
  addTodoListAC,
} from "./data/todolists-reducer";
import {
  addTaskAC,
  changeTaskStatusAC,
  changeTaskTitleAC,
  removeTaskAC,
  removeTodoListAC,
} from "./data/tasks-reducer";
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

const App = () => {
  const dispatch = useDispatch();

  const todoLists = useSelector<AppRootState, Array<TodoListTypes>>(
    (state) => state.todoListReducer
  );

  const tasks = useSelector<AppRootState, TasksStateType>(
    (state) => state.tasksReducer
  );

  console.log(tasks);

  const removeTask = (id: string, todolistId: string) => {
    dispatch(removeTaskAC(id, todolistId));
  };

  const changeFilter = (todolistId: string, value: FilterValuesTypes) => {
    dispatch(changeTodoListFilterAC(todolistId, value));
  };

  const changeIsDoneStatus = (
    taskId: string,
    todolistId: string,
    isDone: boolean
  ) => {
    dispatch(changeTaskStatusAC(taskId, todolistId, isDone));
  };

  const changeTaskTitle = (
    taskId: string,
    todolistId: string,
    newTitle: string
  ) => {
    dispatch(changeTaskTitleAC(taskId, todolistId, newTitle));
  };

  const addTask = (newTitle: string, todolistId: string) => {
    dispatch(addTaskAC(newTitle, todolistId));
  };

  const removeTodoList = (todolistId: string) => {
    dispatch(removeTodoListAC(todolistId));
    dispatch(removeTodoListsAC(todolistId));
  };

  const addTodoList = (title: string) => {
    const action = addTodoListAC(title);
    dispatch(action);
  };

  const changeTodolistTitle = (todoListId: string, newTitle: string) => {
    dispatch(changeTodoListAC(todoListId, newTitle));
  };

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
                    id={t.id}
                    title={t.title}
                    tasks={tasksForTodoList}
                    removeTask={removeTask}
                    changeFilter={changeFilter}
                    addTask={addTask}
                    changeIsDoneStatus={changeIsDoneStatus}
                    filter={t.filter}
                    removeTodoList={removeTodoList}
                    changeTaskTitle={changeTaskTitle}
                    changeTodolistTitle={changeTodolistTitle}
                  />
                </Paper>
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </div>
  );
};

export default App;
