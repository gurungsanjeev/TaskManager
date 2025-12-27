import { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [formData, setFormData] = useState({
    title: "",
    date: "",
    status: "Pending",
  });

  const [taskData, setTaskData] = useState([]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  // Adding task to the mock api
  const addTask = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.date) {
      return;
    }

    const response = await axios.post(
      "https://694e7bb0b5bc648a93c08122.mockapi.io/api/data/task",
      formData
    );
    console.log(response);
    if (response.data) {
      alert("Task Added successfully");
      setFormData({
        title: "",
        date: "",
        status: "Pending",
      });
    }
    fetchData();
  };

  /// fetching the data from mock api

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://694e7bb0b5bc648a93c08122.mockapi.io/api/data/task"
      );
      setTaskData(response.data);
    } catch (error) {
      alert("Error in fetching data from the mockAPI");
      console.log("Error in fetching the data");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // # Handle Delete

  const handleDelete = async (id) => {
    try {
    const isConfrimed =  confirm("Are you sure you want to delete this task?");
      if (isConfrimed) {
        const response = await axios.delete(
          `https://694e7bb0b5bc648a93c08122.mockapi.io/api/data/task/${id}`
        );
        alert("Task Deleted Successfully");
        fetchData();
      }
    } catch (error) {}
  };



  //# Handle change status
  const handleChangeStatus =async(task)=>{
    try{

      const newStatus = task.status === "Pending"?"Completed":"Pending"
      const response = await axios.put(`https://694e7bb0b5bc648a93c08122.mockapi.io/api/data/task/${task.id}`,{
        ...task, status:newStatus
      })
      fetchData();
    }
    catch(error){
      console.log("error in changing the status", error);
      alert("Failed to change the task status")
    }
  }


  // # Edit function




  const handleEdit=async(task)=>{
    try{
const response = await axios.put(``)
    }catch(error){
      console.log("error in handling the edit")
    }
  }



  return (
    <>
      <div className="h-screen bg-slate-400 flex  justify-center ">
        <div className=" mx-10 w-[80%]">
          <h1 className="text-center text-2xl font-semibold mt-20">
            Mini Task Tracker
          </h1>
          <div className="taskForm mt-10 flex gap-3 justify-center  ">
            <input
              type="text"
              id="title"
              name="taskform"
              value={formData.title}
              placeholder="Enter the task"
              onChange={handleChange}
              className="bg-white w-md rounded-lg px-5"
            />
            <input
              type="date"
              id="date"
              className="bg-orange-500 px-4 text-white rounded-lg"
              value={formData.date}
              onChange={handleChange}
            />
            <button
              onClick={addTask}
              className="bg-green-600 text-white px-5 py-2 rounded-xl"
            >
              Add Task
            </button>
          </div>
          <div className="Added Task list mt-10  h-screen">
            <div className="flex justify-between mt-20 mx-20">
              <h1 className="text-2xl font-semibold">Task list</h1>
              <div className="Search task flex gap-3 items-center">
                <h4>Search Task</h4>
                <input
                  type="search"
                  className="bg-white px-5 py-0.5 rounded-md"
                />
              </div>
            </div>
            <hr className="mt-10" />
            <div className="mt-10 ">
              <table className="w-full   text-left">
                <thead className="bg-gray-200">
                  <tr>
                    <th className="p-2 ">S.NO</th>
                    <th className="p-2 ">Task Name</th>
                    <th className="p-2 w-60">Task Status</th>
                    <th className="p-2 w-60">Due Date</th>
                    <th className="p-2 w-xs bg-green-400 ">Action</th>
                  </tr>
                </thead>

                <tbody>
                  {taskData.length > 0 ? (
                    taskData.map((task, index) => (
                      <tr key={task.id} className="bg-white">
                        <td className="p-2 ">{index + 1}</td>
                        <td className="p-2 ">{task.title}</td>
                        <td className="p-2 ">{task.status}</td>
                        <td className="p-2 ">{task.date}</td>
                        <td className="p-2 flex gap-3">
                          <button onClick={()=>handleChangeStatus(task)} className="bg-green-500 text-white px-3 py-1 rounded">
                            Toggle Status
                          </button>
                          <button onClick={()=> handleEdit(task)} className="bg-blue-500 text-white px-3 py-1 rounded">
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(task.id)}
                            className="bg-red-500 text-white px-3 py-1 rounded"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <>
                      <div className="No any task">
                        <h1 className="text-lg mt-20 font-semibold absolute">
                          No any task
                        </h1>
                      </div>
                    </>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
