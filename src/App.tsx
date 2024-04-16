import React, { useState } from "react";
import "./assets/style.scss";
import { TaskType, Todolist } from "./components/Todolist/Todolist";
import { v1 } from "uuid";
import { AddItemForm } from "./components/AddItemForm/AddItemForm";

export type FilterValuesTypes = "All" | "Completed" | "Active";
export type TodoListTypes = {
  id: string;
  title: string;
  filter: FilterValuesTypes;
};

type TasksStateType = {
  [key: string]: Array<TaskType>;
};

const App = () => {
  const todoListId1 = v1();
  const todoListId2 = v1();

  let [todolists, setTodolists] = useState<Array<TodoListTypes>>([
    {
      id: todoListId1,
      title: "What to learn",
      filter: "All",
    },
    { id: todoListId2, title: "What to buy", filter: "All" },
  ]);

  const [tasksObj, setTasks] = useState<TasksStateType>({
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
  });

  const removeTask = (id: string, todolistId: string) => {
    let tasks = tasksObj[todolistId];
    tasksObj[todolistId] = tasks.filter((t) => t.id !== id);
    setTasks({ ...tasksObj });
  };

  const changeFilter = (value: FilterValuesTypes, todolistId: string) => {
    let todolist = todolists.find((t) => t.id === todolistId);
    if (todolist) {
      todolist.filter = value;
    }
    setTodolists([...todolists]);
  };

  const changeIsDoneStatus = (
    taskId: string,
    isDone: boolean,
    todolistId: string
  ) => {
    //достаём нужный массив по *todolistId*
    let tasks = tasksObj[todolistId];
    //найдём нужную таску
    let taskToChangeStatus = tasks.find((t) => t.id === taskId);
    //изменим таску если она нашлась
    if (taskToChangeStatus) {
      taskToChangeStatus.isDone = isDone;
      setTasks({ ...tasksObj });
    }
  };

  const changeTaskTitle = (
    taskId: string,
    newTitle: string,
    todolistId: string
  ) => {
    let tasks = tasksObj[todolistId];
    let taskToChangeStatus = tasks.find((t) => t.id === taskId);
    if (taskToChangeStatus) {
      taskToChangeStatus.title = newTitle;
      setTasks({ ...tasksObj });
    }
  };

  const addTask = (newTitle: string, todolistId: string) => {
    debugger;
    let task = { id: v1(), title: newTitle, isDone: false };
    let tasks = tasksObj[todolistId];
    let newTasks = [task, ...tasks];
    tasksObj[todolistId] = newTasks;
    setTasks({ ...tasksObj });
  };

  const removeTodoList = (todolistId: string) => {
    setTodolists(todolists.filter((t) => t.id !== todolistId));
    delete tasksObj[todolistId];
    setTasks({ ...tasksObj });
  };

  const addTodoList = (title: string) => {
    let todoList: TodoListTypes = {
      id: v1(),
      filter: "All",
      title: title,
    };
    setTodolists([todoList, ...todolists]);
    setTasks({ ...tasksObj, [todoList.id]: [] });
  };

  const changeTodolistTitle = (todoListId: string, newTitle: string) => {
    const currentTodolist = todolists.find((tl) => tl.id === todoListId);
    if (currentTodolist) {
      currentTodolist.title = newTitle;
      setTodolists([...todolists]);
    }
  };

  return (
    <div className="">
      <AddItemForm addItem={addTodoList} placeholderTitle={"New todolist"} />
      <div className="todolist">
        {todolists.map((t) => {
          let tasksForTodoList = tasksObj[t.id];
          if (t.filter === "Completed") {
            tasksForTodoList = tasksForTodoList.filter((t) => t.isDone);
          } else if (t.filter === "Active") {
            tasksForTodoList = tasksForTodoList.filter((t) => !t.isDone);
          }
          return (
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
          );
        })}
      </div>
    </div>
  );
};

export default App;
