import { useState, useEffect } from "react";
import axios from "axios";
import TaskForm from "./Components/TaskForm";
import TaskTable from "./Components/TaskTable";
import SearchBar from "./Components/SearchBar";
import EditModal from "./Components/EditModel";

import StatusFilter from "./Components/StatusFilter";
import SortSelect from "./Components/SortSelect";
import useDebounce from "./Components/useDebounce";

function App() {
  const [taskData, setTaskData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [statusFilter, setStatusFilter] = useState("All");
  const [sortBy, setSortBy] = useState("date");
  const debouncedSearch = useDebounce(searchTerm, 500);

  const [formData, setFormData] = useState({
    title: "",
    date: "",
    status: "Pending",
  });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.id]: e.target.value });

  const fetchData = async () => {
    const res = await axios.get(
      "https://694e7bb0b5bc648a93c08122.mockapi.io/api/data/task"
    );
    setTaskData(res.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const addTask = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.date) return;

    await axios.post(
      "https://694e7bb0b5bc648a93c08122.mockapi.io/api/data/task",
      formData
    );
    setFormData({ title: "", date: "", status: "Pending" });
    fetchData();
  };

  const handleDelete = async (id) => {
    if (confirm("Are you sure?")) {
      await axios.delete(
        `https://694e7bb0b5bc648a93c08122.mockapi.io/api/data/task/${id}`
      );
      fetchData();
    }
  };

  const handleChangeStatus = async (task) => {
    await axios.put(
      `https://694e7bb0b5bc648a93c08122.mockapi.io/api/data/task/${task.id}`,
      { ...task, status: task.status === "Pending" ? "Completed" : "Pending" }
    );
    fetchData();
  };

 

  const filteredTasks = taskData
    .filter((task) =>
      task.title.toLowerCase().includes(debouncedSearch.toLowerCase())
    )
    .filter((task) =>
      statusFilter === "All" ? true : task.status === statusFilter
    )
    .sort((a, b) => {
      if (sortBy === "date") {
        return new Date(a.date) - new Date(b.date);
      }
      if (sortBy === "title") {
        return a.title.localeCompare(b.title);
      }
      return 0;
    });

  return (
    <>
      <div className="h-screen bg-slate-400 flex justify-center">
        <div className="w-[80%] bg-slate-100 mt-20 rounded-t-2xl">
          <h1 className="text-center font text-4xl font-semibold mt-20">
            <span className="text-blue-600">Mini</span> Task Tracker
          </h1>

          <TaskForm
            formData={formData}
            handleChange={handleChange}
            addTask={addTask}
          />

          <div className="flex justify-between items-center mt-20 mx-20 gap-4">
            <h1 className="text-2xl font-semibold">Task list</h1>

            <div className="flex gap-4">
              <SearchBar
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
              />
              <StatusFilter value={statusFilter} onChange={setStatusFilter} />
              <SortSelect value={sortBy} onChange={setSortBy} />
            </div>
          </div>

          <hr className="mt-10" />

          <TaskTable
            tasks={filteredTasks}
            onDelete={handleDelete}
            onEdit={(task) => {
              setSelectedTask(task);
              setIsEditOpen(true);
            }}
            onToggle={handleChangeStatus}
          />
        </div>
      </div>

      {isEditOpen && (
        <EditModal
          task={selectedTask}
          onClose={() => setIsEditOpen(false)}
          onUpdate={async (updatedTask) => {
            await axios.put(
              `https://694e7bb0b5bc648a93c08122.mockapi.io/api/data/task/${updatedTask.id}`,
              updatedTask
            );
            fetchData();
            setIsEditOpen(false);
          }}
        />
      )}
    </>
  );
}

export default App;
