import { useState } from "react";
import { AddItemFormTypes } from "./AddItemFormTypes";
import { Button, TextField } from "@mui/material";

export const AddItemForm = (props: AddItemFormTypes) => {
  const [newTaskTitle, setNewTaskTitle] = useState<string>("");

  const [error, setError] = useState<string | null>(null);

  const onNewTaskChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTaskTitle(e.currentTarget?.value);
  };

  const submitNewTask = () => {
    if (newTaskTitle.trim() !== "") {
      props.addItem(newTaskTitle);
      setNewTaskTitle("");
    } else {
      setError("Title is required!");
    }
  };

  return (
    <div className="">
      <TextField
        error={!!error}
        helperText={error}
        id="standard-basic"
        label={props.placeholderTitle}
        variant="standard"
        defaultValue={newTaskTitle}
        onChange={onNewTaskChange}
      />
      <Button variant="contained" onClick={submitNewTask}>
        +
      </Button>
    </div>
  );
};
