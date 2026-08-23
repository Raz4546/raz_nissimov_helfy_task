import { useEffect, useState } from "react";
import TaskItem from "./TaskItem";
import "../styles/TaskList.css";

const TaskList = ({ tasks, onToggle, onEdit, onDelete, onAddClick }) => {
  const [index, setIndex] = useState(0);
  const [filter, setFilter] = useState("all");
  const [direction, setDirection] = useState("next");

  const filteredTasks = tasks.filter((task) => {
    if (filter === "completed") return task.completed;
    if (filter === "pending") return !task.completed;
    return true;
  });

  useEffect(() => {
    if (index >= filteredTasks.length) {
      setIndex(0);
    }
  }, [filteredTasks.length, index]);

  const handlePrev = () => {
    setDirection("prev");
    setIndex(prev => (prev - 1 + filteredTasks.length) % filteredTasks.length);
  };

  const handleNext = () => {
    setDirection("next");
    setIndex(prev => (prev + 1) % filteredTasks.length);
  };

  const handleIndicatorClick = (idx) => {
    setDirection(idx > index ? "next" : "prev");
    setIndex(idx);
  };

  return (
    <div className="lst-container">
      <div className="lst-toolbar">
        <button className="add-task-btn" onClick={onAddClick}>
          Add New Task
        </button>

        <select
          className="filter-select"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="all">All</option>
          <option value="pending">Pending</option>
          <option value="completed">Completed</option>
        </select>
      </div>

      {filteredTasks.length > 0 ? (
        <>
          <button className="arrow prev-arrow" onClick={handlePrev}>
            ‹
          </button>

          <TaskItem
            key={`task-${filteredTasks[index].id ?? index}`}
            direction={direction}
            title={filteredTasks[index].title}
            description={filteredTasks[index].description}
            date={new Date(filteredTasks[index].createdAt).toLocaleDateString("en-IL")}
            priority={filteredTasks[index].priority}
            completed={filteredTasks[index].completed}
            onToggle={() => onToggle(filteredTasks[index].id)}
            onEdit={(data) => onEdit(filteredTasks[index].id, data)}
            onDelete={() => onDelete(filteredTasks[index].id)}
          />

          <button className="arrow next-arrow" onClick={handleNext}>
            ›
          </button>

          <span className="indicators">
            {filteredTasks.map((_, idx) => (
              <button
                key={idx}
                onClick={() => handleIndicatorClick(idx)}
                className="indicator"
                aria-current={idx === index}
              />
            ))}
          </span>
        </>
      ) : (
        <h1>No Tasks</h1>
      )}
    </div>
  );
};

export default TaskList;