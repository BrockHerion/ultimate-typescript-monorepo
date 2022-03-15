import { createRouter } from '../createRouter';

export const todosRouter = createRouter().query('getAllTodos', {
  resolve() {
    return [
      { id: 1, name: 'Clean litter boxes', completed: true },
      { id: 2, name: 'Play Elden Ring', completed: false },
      { id: 3, name: 'Survive', completed: false },
    ];
  },
});
