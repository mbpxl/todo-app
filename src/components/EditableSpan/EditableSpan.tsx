import { useState } from "react";
import { EditableSpanType } from "./EditableSpanType";

export const EditableSpan = (props: EditableSpanType) => {
  const [editMode, setEditMode] = useState<boolean>(false);
  const [title, setTitle] = useState<string>("");
  const activateEditMode = () => {
    setEditMode(true);
    setTitle(props.title);
  };

  const activateViewMode = () => {
    setEditMode(false);
  };

  const onTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget?.value);
    props.onChangeTitle(e.currentTarget?.value);
  };

  return editMode ? (
    <input
      type="text"
      value={title}
      onChange={onTitleChange}
      onBlur={activateViewMode}
      autoFocus={true}
    />
  ) : (
    <span onDoubleClick={activateEditMode}>{props.title}</span>
  );
};
