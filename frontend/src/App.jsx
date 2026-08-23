import { useState } from "react";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import SearchBar from "./components/SearchBar";
import useTasks from "./hooks/useTasks";

function App() {
  const {
    tasks,
    loading,
    error,
    addTask,
    toggleTaskStatus,
    editTask,
    removeTask,
  } = useTasks();
  const [showForm, setShowForm] = useState(false);
  const [search, setSearch] = useState("");

  const query = search.trim().toLowerCase();
  const visibleTasks = query
    ? tasks.filter(
        (task) =>
          task.title.toLowerCase().includes(query) ||
          task.description.toLowerCase().includes(query),
      )
    : tasks;

  const handleAdd = async (taskData) => {
    const created = await addTask(taskData);
    if (created) setShowForm(false);
    return created;
  };

  return (
    <>
      {loading ? (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "100vh",
          }}
        >
          Loading...
        </div>
      ) : (
        <>
          <SearchBar value={search} onChange={setSearch} />
          <TaskList
            tasks={visibleTasks}
            onToggle={toggleTaskStatus}
            onEdit={editTask}
            onDelete={removeTask}
            onAddClick={() => setShowForm(true)}
          />
        </>
      )}

      {showForm && (
        <TaskForm
          onSubmit={handleAdd}
          onClose={() => setShowForm(false)}
          loading={loading}
          error={error}
        />
      )}
    </>
  );
}

export default App;
