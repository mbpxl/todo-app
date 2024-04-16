import { useState } from "react";
import { AddItemFormTypes } from "./AddItemFormTypes";

export const AddItemForm = (props: AddItemFormTypes) => {
  const [newTaskTitle, setNewTaskTitle] = useState("");

  const [error, setError] = useState<boolean>(false);

  const onNewTaskChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTaskTitle(e.currentTarget?.value);
  };

  const submitNewTask = () => {
    if (newTaskTitle.trim() === "") {
      setError(true);
      return;
    }
    props.addItem(newTaskTitle.trim());
    setNewTaskTitle("");
    setError(false);
  };

  return (
    <div className="">
      <input
        className={error ? "error" : ""}
        type="text"
        placeholder={props.placeholderTitle}
        value={newTaskTitle}
        onChange={onNewTaskChange}
        onKeyPress={(e) => {
          if (e.charCode === 13) {
            submitNewTask();
          }
        }}
      />
      <button onClick={submitNewTask}>+</button>
      {error && <div className="error-message">Fuild is required</div>}
    </div>
  );
};
