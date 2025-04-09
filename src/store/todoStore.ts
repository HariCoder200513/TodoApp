import { create } from 'zustand';

interface Todo {
  id: string;
  text: string;
  completed: boolean;
}

interface TodoState {
  todos: Todo[];
  addTodo: (text: string) => void;
  toggleTodo: (id: string) => void;
  deleteTodo: (id: string) => void;
}

// Load todos from localStorage or default to an empty array
const loadTodosFromLocalStorage = (): Todo[] => {
  const storedTodos = localStorage.getItem('todos');
  return storedTodos ? JSON.parse(storedTodos) : [];
};

const useTodoStore = create<TodoState>((set) => ({
  todos: loadTodosFromLocalStorage(), // Initialize with localStorage data
  addTodo: (text: string) =>
    set((state) => {
      const newTodos = [
        ...state.todos,
        { id: crypto.randomUUID(), text, completed: false },
      ];
      localStorage.setItem('todos', JSON.stringify(newTodos)); // Save to localStorage
      return { todos: newTodos };
    }),
  toggleTodo: (id: string) =>
    set((state) => {
      const newTodos = state.todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      );
      localStorage.setItem('todos', JSON.stringify(newTodos)); // Save to localStorage
      return { todos: newTodos };
    }),
  deleteTodo: (id: string) =>
    set((state) => {
      const newTodos = state.todos.filter((todo) => todo.id !== id);
      localStorage.setItem('todos', JSON.stringify(newTodos)); // Save to localStorage
      return { todos: newTodos };
    }),
}));

export default useTodoStore;
