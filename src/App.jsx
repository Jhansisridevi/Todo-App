import React, { useReducer, useState } from "react";
import { FaPenSquare, FaTrashAlt } from "react-icons/fa";

const initialState = [
  {
    userId: 1,
    id: 1,
    title: "delectus aut autem",
    completed: false,
  },
  {
    userId: 1,
    id: 2,
    title: "quis ut nam facilis et officia qui",
    completed: false,
  },
  {
    userId: 1,
    id: 3,
    title: "fugiat veniam minus",
    completed: false,
  },
  {
    userId: 1,
    id: 4,
    title: "et porro tempora",
    completed: true,
  },
  {
    userId: 1,
    id: 5,
    title: "laboriosam mollitia et enim quasi adipisci quia provident illum",
    completed: false,
  },
  {
    userId: 1,
    id: 6,
    title: "qui ullam ratione quibusdam voluptatem quia omnis",
    completed: false,
  },
  {
    userId: 1,
    id: 7,
    title: "illo expedita consequatur quia in",
    completed: false,
  },
  {
    userId: 1,
    id: 8,
    title: "quo adipisci enim quam ut ab",
    completed: true,
  },
  {
    userId: 1,
    id: 9,
    title: "molestiae perspiciatis ipsa",
    completed: false,
  },
  {
    userId: 1,
    id: 10,
    title: "illo est ratione doloremque quia maiores aut",
    completed: true,
  },
  {
    userId: 1,
    id: 11,
    title: "vero rerum temporibus dolor",
    completed: true,
  },
  {
    userId: 1,
    id: 12,
    title: "ipsa repellendus fugit nisi",
    completed: true,
  },
  {
    userId: 1,
    id: 13,
    title: "et doloremque nulla",
    completed: false,
  },
  {
    userId: 1,
    id: 14,
    title: "repellendus sunt dolores architecto voluptatum",
    completed: true,
  },
  {
    userId: 1,
    id: 15,
    title: "ab voluptatum amet voluptas",
    completed: true,
  },
  {
    userId: 1,
    id: 16,
    title: "accusamus eos facilis sint et aut voluptatem",
    completed: true,
  },
  {
    userId: 1,
    id: 17,
    title: "quo laboriosam deleniti aut qui",
    completed: true,
  },
  {
    userId: 1,
    id: 18,
    title: "dolorum est consequatur ea mollitia in culpa",
    completed: false,
  },
  {
    userId: 1,
    id: 19,
    title: "molestiae ipsa aut voluptatibus pariatur dolor nihil",
    completed: true,
  },
  {
    userId: 1,
    id: 20,
    title: "ullam nobis libero sapiente ad optio sint",
    completed: true,
  },
];
//Later - adding editingindex to inital state
const todoReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TODO":
      return [
        {
          userId: 1,
          id: Date.now(),
          title: action.payload,
          completed: false,
        },
        ...state,
      ];
    case "EDIT_TODO":
      return state.map((todo) =>
        todo.id === action.payload.id
          ? { ...todo, title: action.payload.title }
          : todo
      );
    case "TOGGLE_COMPLETE":
      return state.map((todo) =>
        todo.id === action.payload
          ? { ...todo, completed: !todo.completed }
          : todo
      );
    case "DELETE_TODO":
      return state.filter((todo) => todo.id !== action.payload);
    default:
      return state;
  }
};

const App = () => {
  const [todos, dispatch] = useReducer(todoReducer, initialState);
  const [newTodo, setNewTodo] = useState("");
  const [editTodo, setEditTodo] = useState("");
  const [editingIndex, setEditingIndex] = useState(null); //setting initial index in state
  //Adding a new todo
  const addTodo = () => {
    if (newTodo.trim() !== "") {
      dispatch({ type: "ADD_TODO", payload: newTodo });
      setNewTodo("");
    }
  };
  //Toggling the completed todo
  const toggleComplete = (id) => {
    dispatch({ type: "TOGGLE_COMPLETE", payload: id });
  };
  //Deleting a todo
  const deleteTodo = (id) => {
    dispatch({ type: "DELETE_TODO", payload: id });
  };
  //Edit existing todo
  const editExisting = (id, title) => {
    setEditingIndex(id);
    setEditTodo(title);
  };
  //Save the modified todo
  const saveEdited = (id) => {
    dispatch({ type: "EDIT_TODO", payload: { id, title: editTodo } });
    setEditingIndex(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-200 to-purple-500 flex items-center justify-center">
      <div className="bg-gray-50 p-8 rounded text-center shadow-2xl ring-2 ring-gray-300 backdrop-filter backdrop-blur-lg w-full max-w-2xl">
        <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent font-mono">
          {" "}
          Todo List{" "}
        </h1>
        {/* Input box and button to add new todo */}
        <div className="flex mb-4 font-mono">
          <input
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            className="border rounded-l px-4 py-2 w-full"
            placeholder="New Todo"
          />
          <button
            onClick={addTodo}
            className="bg-purple-700 text-white px-4 py-2 rounded-r-md" //right radius
          >
            Add Todo
          </button>
        </div>
        {/* Display existing todo  */}
        <div>
          {todos.map((todo) => (
            <div key={todo.id} className="flex items-center mb-2">
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleComplete(todo.id)}
                className="mr-2"
              />
              {editingIndex === todo.id ? (
                <>
                  <input
                    type="text"
                    value={editTodo}
                    onChange={(e) => setEditTodo(e.target.value)}
                    className="border rounded-l px-4 py-2"
                  />
                  <button
                    onClick={() => saveEdited(todo.id)}
                    className="bg-green-500 text-white px-4 py-2 rounded-r-md"
                  >
                    Save
                  </button>
                </>
              ) : (
                <>
                  <span className={todo.completed ? "line-through" : ""}>
                    {todo.title}
                  </span>
                  <button
                    onClick={() => editExisting(todo.id, todo.title)}
                    className="ml-auto bg-yellow-500 text-white px-4 py-2 rounded"
                  >
                    Edit
                  </button>
                  {/* <FontAwesomeIcon icon="fa-solid fa-pen-to-square" /> */}
                  {/* <FaPenSquare role="button" onClick={() => editExisting(todo.id, todo.title)}
                    className="ml-auto"
                  /> */}
               <button
                    onClick={() => deleteTodo(todo.id)}
                    className={`ml-2 px-4 py-2 rounded ${
                      todo.completed ? "bg-gray-300 text-gray-500 cursor-not-allowed" : "bg-red-500 text-white"
                    }`}
                    disabled={todo.completed} //to restrict delete on completed todo
                  >
                    Delete
                  </button>
                  {/* <FaTrashAlt role="button" onClick={() => deleteTodo(todo.id)}
                    disabled={todo.completed} /> */}
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;

// Save or Edit and Delete
