export const initialStore = () => {
  return {
    authToken: sessionStorage.getItem("authToken") || null, // Stores authentication token
    user: null, // Holds user data after login
    message: null,
    todos: [
      {
        id: 1,
        title: "Make the bed",
        background: null,
      },
      {
        id: 2,
        title: "Do my homework",
        background: null,
      },
    ],
  };
};

// Function to set the authentication token in sessionStorage and store
export const setToken = (token, user) => {
  sessionStorage.setItem("authToken", token);
  return {
    type: "set_auth",
    payload: { token, user },
  };
};

export default function storeReducer(store, action = {}) {
  switch (action.type) {
    case "set_hello":
      return {
        ...store,
        message: action.payload,
      };

    case "set_auth":
      return {
        ...store,
        authToken: action.payload.token,
        user: action.payload.user, // Stores user details
      };

    case "logout":
      sessionStorage.removeItem("authToken");
      return {
        ...initialStore(), // Clears authentication on logout
      };

    case "add_task":
      const { id, color } = action.payload;
      return {
        ...store,
        todos: store.todos.map((todo) =>
          todo.id === id ? { ...todo, background: color } : todo
        ),
      };

    default:
      throw new Error("Unknown action.");
  }
}
