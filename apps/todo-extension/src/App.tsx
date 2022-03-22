import { useState } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import './App.css';
import { trpc, transformer } from './utils/trpc';
import ToDoList from '@todo/react/ToDoList';

const localhost = 'http://localhost:3000';

function App() {
  const [queryClient] = useState(() => new QueryClient());
  const [trpcClient] = useState(() =>
    trpc.createClient({
      url: `${localhost}/api/trpc`,

      async headers() {
        return {};
      },
      transformer,
    }),
  );

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <ToDoList />
      </QueryClientProvider>
    </trpc.Provider>
  );
}

export default App;
