import { Button } from "@mui/material";
import { FilterButtonsTypes } from "./FilterButtonsTypes";
import React, { useCallback } from "react";
import { FilterValuesTypes } from "../../App";
import { changeTodoListFilterAC } from "../../data/todolists-reducer";
import { useDispatch } from "react-redux";

export const FilterButtons = React.memo((props: FilterButtonsTypes) => {
  //! =====================================REDUX TOOLS=====================================
  const dispatch = useDispatch();
  //! =====================================REDUX TOOLS=====================================

  //* callback for change filter position in current component
  const changeFilter = useCallback(
    (todolistId: string, value: FilterValuesTypes) => {
      dispatch(changeTodoListFilterAC(todolistId, value));
    },
    [dispatch]
  );

  return (
    <div className="">
      <Button
        variant={props.filter === "All" ? "contained" : "text"}
        onClick={() => {
          changeFilter(props.id, "All");
        }}
      >
        All
      </Button>
      <Button
        variant={props.filter === "Active" ? "contained" : "text"}
        onClick={() => {
          changeFilter(props.id, "Active");
        }}
      >
        Active
      </Button>
      <Button
        color={"secondary"}
        variant={props.filter === "Completed" ? "contained" : "text"}
        onClick={() => {
          changeFilter(props.id, "Completed");
        }}
      >
        Completed
      </Button>
    </div>
  );
});
