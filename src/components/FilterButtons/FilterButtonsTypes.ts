import { FilterValuesTypes } from "../../App";

export type FilterButtonsTypes = {
  filter: FilterValuesTypes;
  id: string;
  changeFilter: (todolistId: string, value: FilterValuesTypes) => void;
}