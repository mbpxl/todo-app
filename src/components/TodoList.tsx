type PropsType = {
  heading: Array<string>,
  tasks: Array<TaskType>, // === TaskType[]
  removeTask: Function,
  changeFilter: Function,
}

type TaskType = {
  id: number,
  title: string,
  isDone: boolean,
}

function TodoList(props: PropsType) {
  return (
    <div className="">
        <h3>{props.heading[0]}</h3>
        <div className="">
          <input type="text"/>
          <button type="submit" className="button">+</button>
        </div>
        <ul>
          {
            props.tasks.map(t => 
              <li><input type="checkbox" checked={t.isDone}/>
                <span>{t.title}</span>
                <button type="submit" className="button" onClick={() => {props.removeTask(t.id)}}>x</button>
              </li>
            )
          }
        </ul>
        <div>
          <button onClick={ () => { props.changeFilter("all") }}>All</button>
          <button onClick={ () => { props.changeFilter("active") }}>Active</button>
          <button onClick={ () => { props.changeFilter("completed") }}>Completed</button>
        </div>
    </div>
  )
}

export default TodoList;