import { useEffect, useState } from "react";
import {
  createTask,
  deleteTask,
  getTasks,
  toggleTask,
  updateTask,
} from "../services/tasksApi";

const useTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        setLoading(true);

        const response = await getTasks();
        setTasks(response.data);
      } catch (error) {
        setError("Failed to load tasks");
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  const addTask = async (taskData) => {
    try {
      setError(null);
      const response = await createTask(taskData);

      setTasks((prevTasks) => [...prevTasks, response.data.data]);
      return response.data.data;
    } catch (error) {
      setError("Failed to create task");
      return null;
    }
  };

  const editTask = async (id, taskData) => {
    try {
      setError(null);
      const response = await updateTask(id, taskData);

      setTasks((prevTasks) =>
        prevTasks.map((task) => (task.id === id ? response.data : task)),
      );
    } catch (error) {
      setError("Failed to update task");
    }
  };

  const removeTask = async (id) => {
    try {
      setError(null);
      await deleteTask(id);

      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
    } catch (error) {
      setError("Failed to delete task");
    }
  };

  const toggleTaskStatus = async (id) => {
    try {
      setError(null);
      const response = await toggleTask(id);

      setTasks((prevTasks) =>
        prevTasks.map((task) => (task.id === id ? response.data : task)),
      );
    } catch (error) {
      setError("Failed to update task status");
    }
  };

  return {
    tasks,
    loading,
    error,
    addTask,
    editTask,
    removeTask,
    toggleTaskStatus,
  };
};

export default useTasks;
