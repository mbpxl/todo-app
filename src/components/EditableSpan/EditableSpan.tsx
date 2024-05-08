import { useState } from "react";
import { EditableSpanType } from "./EditableSpanType";
import React from "react";

export const EditableSpan = React.memo((props: EditableSpanType) => {
  const [editMode, setEditMode] = useState<boolean>(false);
  const [title, setTitle] = useState<string>("");
  const activateEditMode = () => {
    setEditMode(true);
    setTitle(props.title);
  };

  const activateViewMode = () => {
    setEditMode(false);
  };

  const onChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget?.value);
    props.onChangeTitle(e.currentTarget?.value);
  };

  return editMode ? (
    <input
      type="text"
      value={title}
      onChange={onChangeTitle}
      onBlur={activateViewMode}
      autoFocus={true}
    />
  ) : (
    <span onDoubleClick={activateEditMode}>{props.title}</span>
  );
});
