import { FilterValuesTypes } from "../../App";

export type FilterButtonsTypes = {
  filter: FilterValuesTypes;
  id: string;
  changeFilter: (filterValue: FilterValuesTypes, id: string) => void;
}