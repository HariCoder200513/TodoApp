import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, Circle, Trash2, LogOut } from 'lucide-react';
import toast from 'react-hot-toast';
import useAuthStore from '../store/authStore';
import useTodoStore from '../store/todoStore';

function TodoApp() {
  const [newTodo, setNewTodo] = useState('');
  const { todos, addTodo, toggleTodo, deleteTodo } = useTodoStore();
  const { logout, user } = useAuthStore();
  const navigate = useNavigate();

  const handleAddTodo = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTodo.trim()) {
      addTodo(newTodo.trim());
      setNewTodo('');
      toast.success('Task added successfully!');
    }
  };

  const handleToggle = (id: string) => {
    toggleTodo(id);
    toast.success('Task status updated!');
  };

  const handleDelete = (id: string) => {
    deleteTodo(id);
    toast.success('Task deleted successfully!');
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
    toast.success('Logged out successfully!');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="px-6 py-4 bg-indigo-600 flex justify-between items-center">
            <h1 className="text-2xl font-bold text-white">My Tasks</h1>
            <div className="flex items-center space-x-4">
              <span className="text-white">{user}</span>
              <button
                onClick={handleLogout}
                className="text-white hover:text-indigo-200 transition-colors"
              >
                <LogOut className="h-5 w-5" />
              </button>
            </div>
          </div>
          
          <div className="p-6">
            <form onSubmit={handleAddTodo} className="flex gap-4 mb-6">
              <input
                type="text"
                value={newTodo}
                onChange={(e) => setNewTodo(e.target.value)}
                placeholder="Add a new task..."
                className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                Add Task
              </button>
            </form>

            <div className="space-y-4">
              {todos.map((todo) => (
                <div
                  key={todo.id}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                >
                  <div className="flex items-center space-x-3">
                    <button onClick={() => handleToggle(todo.id)}>
                      {todo.completed ? (
                        <CheckCircle className="h-5 w-5 text-green-500" />
                      ) : (
                        <Circle className="h-5 w-5 text-gray-400" />
                      )}
                    </button>
                    <span
                      className={`${
                        todo.completed ? 'line-through text-gray-400' : 'text-gray-700'
                      }`}
                    >
                      {todo.text}
                    </span>
                  </div>
                  <button
                    onClick={() => handleDelete(todo.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
              ))}
              {todos.length === 0 && (
                <p className="text-center text-gray-500">No tasks yet. Add one above!</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TodoApp;