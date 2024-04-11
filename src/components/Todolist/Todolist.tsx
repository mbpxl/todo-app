import { FilterValuesTypes } from "../../App";

type PropsType = {
  title: string;
  tasks: Array<{ id: number; title: string; isDone: boolean }>;
  removeTask: (id: number) => void;
  changeFilter: (value: FilterValuesTypes) => void;
};

export const Todolist = (props: PropsType) => {
  return (
    <div className="">
      <h3>{props.title}</h3>
      <div className="">
        <input type="text" />
        <button>+</button>
      </div>
      <ul>
        {props.tasks.map((t) => (
          <li>
            <input type="checkbox" checked={t.isDone} />
            <span>{t.title}</span>
            <button
              onClick={() => {
                props.removeTask(t.id);
              }}
            >
              X
            </button>
          </li>
        ))}
      </ul>
      <div className="">
        <button
          onClick={() => {
            props.changeFilter("All");
          }}
        >
          All
        </button>
        <button
          onClick={() => {
            props.changeFilter("Active");
          }}
        >
          Active
        </button>
        <button
          onClick={() => {
            props.changeFilter("Completed");
          }}
        >
          Completed
        </button>
      </div>
    </div>
  );
};
