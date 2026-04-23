import React, { useState } from "react";
import './Card.css';

export default function Dashboard() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [todos, setTodos] = useState([]);

  const addTodo = () => {
    if (!title || !description) return;
    setTodos([...todos, { id: Date.now(), title, description }]);
    setTitle("");
    setDescription("");
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <div style={center}>
      <div className="card-container" style={card}>
        <div style={headerStyle}>
          <h3>My Tasks</h3>
          <div />
        </div>

        <div style={inputContainer}>
          <input
            placeholder="Task title..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={inputStyle}
          />

          <textarea
            placeholder="Task description..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            style={{ ...inputStyle, minHeight: '80px', resize: 'none' }}
          />

          <button onClick={addTodo} style={addButtonStyle}>+ Add Task</button>
        </div>

        <ul style={todoListStyle}>
          {todos.map((todo) => (
            <li key={todo.id} style={todoItemStyle}>
              <div style={todoContentStyle}>
                <strong style={titleStyle}>{todo.title}</strong>
                <p style={descriptionStyle}>{todo.description}</p>
              </div>
              <button onClick={() => deleteTodo(todo.id)} style={deleteButtonStyle}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

const card = {
  width: "100%",
  maxWidth: "100%",
  maxHeight: "92vh",
  overflowY: "auto",
  padding: 0,
  display: "flex",
  flexDirection: "column",
  gap: 0,
  borderRadius: 0,
  boxShadow: "none",
  backgroundColor: "transparent",
  fontFamily: "inherit",
  zIndex: 1,
};
const center = {
  position: "fixed",
  inset: 0,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: "20px",
};

const headerStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  borderBottom: "1px solid rgba(229, 9, 20, 0.2)",
  paddingBottom: 16,
  paddingTop: 16,
  paddingLeft: 20,
  paddingRight: 20,
  marginBottom: 0,
  color: "#ffffff",
  background: "var(--bg-secondary)",
};

const inputContainer = {
  display: "flex",
  flexDirection: "column",
  gap: 14,
  padding: "16px 20px 24px 20px",
};

const inputStyle = {
  padding: "14px 16px",
  fontSize: "15px",
  border: "1px solid rgba(229, 9, 20, 0.3)",
  borderRadius: "10px",
  fontFamily: "inherit",
  transition: "all 0.2s ease",
  outline: "none",
  color: "#ffffff",
  backgroundColor: "rgba(255, 255, 255, 0.05)",
};

const addButtonStyle = {
  padding: "12px 18px",
  fontSize: "15px",
  fontWeight: "600",
  background: "linear-gradient(90deg, #e50914, #ff1a2b)",
  borderRadius: 10,
  color: 'white',
  border: 'none',
  cursor: 'pointer',
  transition: 'all 0.3s ease',
};

const deleteButtonStyle = {
  padding: "8px 16px",
  fontSize: "13px",
  fontWeight: "600",
  background: "linear-gradient(90deg, #e50914, #ff1a2b)",
  color: "white",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
  transition: "all 0.3s ease",
};

const todoListStyle = {
  listStyle: "none",
  padding: "0 20px 24px 20px",
  margin: 0,
  display: "flex",
  flexDirection: "column",
  gap: 0,
};

const todoItemStyle = {
  padding: "12px 14px",
  backgroundColor: "rgba(229, 9, 20, 0.05)",
  borderRadius: 0,
  display: "flex",
  justifyContent: "space-between",
  alignItems: "flex-start",
  gap: 10,
  borderLeft: "none",
  borderBottom: "1px solid rgba(229, 9, 20, 0.1)",
  color: "#ffffff",
  transition: "background 150ms ease",
};

const todoContentStyle = {
  textAlign: "left",
  flex: 1,
};

const titleStyle = {
  margin: "0 0 5px 0",
};

const descriptionStyle = {
  margin: 0,
  color: "#b3b3b3",
};
