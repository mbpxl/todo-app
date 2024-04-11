type PropsType = {
  title: string;
  tasks: Array<{ id: number; title: string; isDone: boolean }>;
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
            {t.title}
          </li>
        ))}
      </ul>
      <div className="">
        <button>All</button>
        <button>Active</button>
        <button>Completed</button>
      </div>
    </div>
  );
};
