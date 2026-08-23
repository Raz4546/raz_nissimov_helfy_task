import { useState } from "react";
import "../styles/TaskForm.css";

const initialForm = {
  title: "",
  description: "",
  priority: "medium",
};

const TaskForm = ({ onSubmit, onClose, loading = false, error = null }) => {
  const [formData, setFormData] = useState(initialForm);
  const [formError, setFormError] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const title = formData.title.trim();
    const description = formData.description.trim();

    if (!title || !description || !formData.priority) {
      setFormError("Please fill title, description and priority.");
      return;
    }

    setFormError("");
    const createdTask = await onSubmit({
      title,
      description,
      priority: formData.priority,
    });

    if (createdTask) {
      setFormData(initialForm);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <form
        className="task-form"
        onSubmit={handleSubmit}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          className="modal-close"
          onClick={onClose}
          aria-label="Close"
        >
          ✕
        </button>
        <h2 className="task-form-title">Add New Task</h2>

      <label className="task-form-label" htmlFor="title">
        Title
      </label>
      <input
        id="title"
        name="title"
        className="task-form-input"
        value={formData.title}
        onChange={handleChange}
        placeholder="Task title"
        maxLength={80}
      />

      <label className="task-form-label" htmlFor="description">
        Description
      </label>
      <textarea
        id="description"
        name="description"
        className="task-form-textarea"
        value={formData.description}
        onChange={handleChange}
        placeholder="What should be done?"
        rows={4}
        maxLength={400}
      />

      <label className="task-form-label" htmlFor="priority">
        Priority
      </label>
      <select
        id="priority"
        name="priority"
        className="task-form-select"
        value={formData.priority}
        onChange={handleChange}
      >
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>

      {(formError || error) && (
        <p className="task-form-error">{formError || error}</p>
      )}

        <button className="task-form-button" type="submit" disabled={loading}>
          {loading ? "Saving..." : "Add Task"}
        </button>
      </form>
    </div>
  );
};

export default TaskForm;