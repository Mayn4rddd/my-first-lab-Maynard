import { useState } from "react";
import "./App.css";

/* ---------- Component ---------- */
function StudentCard({ student, onToggle }) {
  return (
    <div className="card">
      <h3>{student.name}</h3>
      <p>Status: {student.present ? "Present" : "Absent"}</p>

      {/* Handling Events */}
      <button onClick={() => onToggle(student.id)}>
        Toggle Status
      </button>
    </div>
  );
}

export default function App() {
  /* ---------- State ---------- */
  const [students, setStudents] = useState([
    { id: 1, name: "Alex", present: true },
    { id: 2, name: "Maria", present: false },
    { id: 3, name: "John", present: true },
  ]);

  /* ---------- Event Handler ---------- */
  const toggleStatus = (id) => {
    setStudents(
      students.map((student) =>
        student.id === id
          ? { ...student, present: !student.present }
          : student
      )
    );
  };

  return (
    <div className="container">
      <h1>📋 Student Status App</h1>

      {/* ---------- Lists & Keys ---------- */}
      {students.map((student) => (
        <StudentCard
          key={student.id}
          student={student}
          onToggle={toggleStatus}
        />
      ))}

      {/* ---------- Conditional Rendering ---------- */}
      {students.every((s) => s.present) && (
        <p className="message">✅ All students are present!</p>
      )}
    </div>
  );
}
