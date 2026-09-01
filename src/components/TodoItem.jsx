import React from "react";

const TodoItem = ({ todo, editTodoHandler, deleteTodoHandler, toggleTodoHandler }) => {
  const todoId = `todo-${todo.id}`;

  return (
    <div className="flex w-full mt-3 justify-between items-center text-white  bg-[#0f172a] py-1.25 pl-3 rounded-[5px]">
      {/* Todo */}
      <div className="flex gap-2">
        <input
          type="checkbox"
          id={todoId}
          checked={todo.completed}
          onChange={() => toggleTodoHandler(todo.id)}
        />
        <label
          htmlFor={todoId}
          className={`text-[18px] wrap-break-words ${
            todo.completed ? "line-through opacity-50" : ""
          }`}
        >
          {todo.title}
        </label>
      </div>

      {/* Actions */}
      <div className="flex shrink-0 ml-2">
        <button
          type="button"
          onClick={() => editTodoHandler(todo.id)}
          className="text-white bg-green-600 py-1.25 px-3 rounded-[5px] font-bold cursor-pointer"
        >
          Edit
        </button>

        <button
          type="button"
          onClick={() => deleteTodoHandler(todo.id)}
          className="text-white bg-red-600 py-1.25 px-3 mx-1.5 rounded-[5px] font-bold cursor-pointer"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default TodoItem;