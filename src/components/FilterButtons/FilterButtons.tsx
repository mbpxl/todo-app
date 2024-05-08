import { Button } from "@mui/material";
import { FilterButtonsTypes } from "./FilterButtonsTypes";

export const FilterButtons = (props: FilterButtonsTypes) => {
  return (
    <div className="">
      <Button
        variant={props.filter === "All" ? "contained" : "text"}
        onClick={() => {
          props.changeFilter(props.id, "All");
        }}
      >
        All
      </Button>
      <Button
        variant={props.filter === "Active" ? "contained" : "text"}
        onClick={() => {
          props.changeFilter(props.id, "Active");
        }}
      >
        Active
      </Button>
      <Button
        color={"secondary"}
        variant={props.filter === "Completed" ? "contained" : "text"}
        onClick={() => {
          props.changeFilter(props.id, "Completed");
        }}
      >
        Completed
      </Button>
    </div>
  );
};
