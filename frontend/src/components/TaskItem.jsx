import { useState } from 'react'
import '../styles/TaskItem.css'

const TaskItem = ({title, description, date, priority, completed, direction = "next", onToggle, onEdit, onDelete}) => {
  const [isEditing, setIsEditing] = useState(false)
  const [form, setForm] = useState({ title, description, priority })

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSave = () => {
    onEdit(form)
    setIsEditing(false)
  }

  const handleCancel = () => {
    setForm({ title, description, priority })
    setIsEditing(false)
  }

  if (isEditing) {
    return (
      <div className="task-item-container">
        <input
          className="edit-input"
          name="title"
          value={form.title}
          onChange={handleChange}
        />
        <textarea
          className="edit-input"
          name="description"
          value={form.description}
          onChange={handleChange}
        />
        <select
          className="edit-input"
          name="priority"
          value={form.priority}
          onChange={handleChange}
        >
          <option value="low">low</option>
          <option value="medium">medium</option>
          <option value="high">high</option>
        </select>

        <div className="task-actions">
          <button className="save-btn" onClick={handleSave}>Save</button>
          <button className="cancel-btn" onClick={handleCancel}>Cancel</button>
        </div>
      </div>
    )
  }

  return (
    <div className={`task-item-container slide-${direction}`}>
      <div className="task-header">
        <h2 className='title'>{title}</h2>
        <h3 className={`priority priority-${priority}`}>{priority}</h3>
      </div>

      <p className='description'>{description}</p>

      <label className='status'>
        <input type="checkbox" checked={completed} onChange={onToggle} />
        {completed ? 'Done' : 'Pending'}
      </label>

      <div className="task-footer">
        <h4 className='created-date'>Created: {date}</h4>
        <div className="task-actions">
          <button className="action-btn" onClick={() => setIsEditing(true)} aria-label="Edit">✏️</button>
          <button className="action-btn" onClick={onDelete} aria-label="Delete">🗑️</button>
        </div>
      </div>
    </div>
  )
}

export default TaskItem
