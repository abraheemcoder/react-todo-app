import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import TodoItem from "./components/TodoItem";

const App = () => {
  const [input, setInput] = useState("");
  const [todos, setTodos] = useState([]);
  const [editingTodoId, setEditingTodoId] = useState(null);

  // Add / Update Todo Handler
  const addTodoHandler = () => {
    const trimmedInput = input.trim();

    // Validate input
    if (!trimmedInput) {
      return toast.error("Please enter your Task");
    }

    // Check duplicate todo
    const existingTodo = todos.some(
      (todo) =>
        todo.id !== editingTodoId &&
        todo.title.toLowerCase() === trimmedInput.toLowerCase(),
    );

    if (existingTodo) {
      return toast.error("This item is already in the list");
    }

    // Update existing todo
    if (editingTodoId !== null) {
      setTodos((prevTodos) =>
        prevTodos.map((todo) =>
          todo.id === editingTodoId ? { ...todo, title: trimmedInput } : todo,
        ),
      );

      setEditingTodoId(null);
      setInput("");

      return toast.success("Item Updated");
    }

    // Create new todo
    const newTodo = {
      id: Date.now(),
      title: trimmedInput,
      completed: false,
    };

    setTodos((prevTodos) => [...prevTodos, newTodo]);
    setInput("");

    toast.success("Item added");
  };

  // Edit todo Handler
  const editTodoHandler = (id) => {
    const todoToEdit = todos.find((todo) => todo.id === id);

    if (!todoToEdit) {
      return;
    }

    setEditingTodoId(todoToEdit.id);
    setInput(todoToEdit.title);
  };

  // Delete todo Handler
  const deleteTodoHandler = (id) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));

    if (editingTodoId === id) {
      setEditingTodoId(null);
      setInput("");
    }

    toast.success("item deleted");
  };

  // Toggle Todo completion
  const toggleTodoHandler = (id) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      ),
    );
  };

  // Handle Enter key
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      addTodoHandler();
    }
  };

  return (
    <>
      {/* toast component */}
      <ToastContainer />

      {/* Main */}
      <main className="bg-[#0f172a] h-screen flex justify-center items-center">
        {/* Todo container */}
        <div className="bg-[#1e293b] w-112.5 shadow-md rounded-2xl p-4 items-center">
          {/* Title section*/}
          <section className="flex justify-center">
            {/* Title */}
            <h1 className="text-white font-bold text-3xl mb-3">
              Todo Application
            </h1>
          </section>
          {/* Input section */}
          <section className="w-full flex justify-between gap-1.5">
            {/* Input */}
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="text-white text-[17px] w-full border-none outline-blue-500 bg-[#0f172a] py-1.25 pl-3 rounded-[5px]"
              type="text"
              placeholder="Add your task"
              aria-label="Todo task"
            />
            {/* Add btn */}
            <button
              type="button"
              onClick={addTodoHandler}
              className="text-white bg-blue-700 py-1.25 px-3 rounded-[5px] font-bold cursor-pointer"
            >
              {editingTodoId !== null ? "Update" : "Add"}
            </button>
          </section>
          {/* To-dos section */}
          <section>
            {todos.length > 0 ? (
              todos.map((todo) => (
                <TodoItem
                  key={todo.id}
                  todo={todo}
                  editTodoHandler={editTodoHandler}
                  deleteTodoHandler={deleteTodoHandler}
                  toggleTodoHandler={toggleTodoHandler}
                />
              ))
            ) : (
              <p className="text-white text-center">No Todos</p>
            )}
          </section>
        </div>
      </main>
    </>
  );
};

export default App;