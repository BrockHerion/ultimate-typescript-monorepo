import type { NextPage } from 'next';
import { trpc } from '../utils/trpc';

const Home: NextPage = () => {
  const todosQuery = trpc.useQuery(['todos.getAllTodos']);

  return (
    <div className="home">
      {todosQuery.data ? (
        <>
          <h1>To-Do's</h1>
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
        <span>Loading...</span>
      )}

      <style jsx>{`
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
};

export default Home;
