import { trpc } from './trpc';

export default function ToDoList() {
  const todosQuery = trpc.useQuery(['todos.getAllTodos']);

  return (
    <div className="home">
      {todosQuery.data ? (
        <>
          <h1>To-Do&apos;s</h1>
          <ul className="todo-wrapper">
            {todosQuery.data &&
              todosQuery.data.map((todo, index) => (
                <li className="todo" key={`todo-${index}`}>
                  {todo.name}
                </li>
              ))}
          </ul>
        </>
      ) : (
        <span>{todosQuery.status}</span>
      )}

      <style jsx={true}>{`
        .home {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }
        .todo-wrapper {
          border: 1px solid gray;
          padding: 1em 3em;
          border-radius: 1em;
        }
        .todo {
          font-size: 24px;
        }
      `}</style>
    </div>
  );
}
