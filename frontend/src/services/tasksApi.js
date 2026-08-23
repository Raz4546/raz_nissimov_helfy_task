import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_BE_URL ?? "http://localhost:4000/api/tasks/",
});

export const getTasks = () => api.get("");
export const createTask = (task) => api.post("/", task);
export const updateTask = (id, task) => api.put(`/${id}`, task);
export const deleteTask = (id) => api.delete(`/${id}`);
export const toggleTask = (id) => api.patch(`/${id}/toggle`);
