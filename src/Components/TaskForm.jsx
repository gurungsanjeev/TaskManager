import React from 'react'

const TaskForm = ({ formData, handleChange, addTask }) => {


const date = new Date().toISOString().split("T")[0]

console.log(date);

  return (
    <div className="taskForm mt-10 flex gap-3 justify-center">
      <input
        type="text"
        id="title"
        value={formData.title}
        placeholder="Enter the task"
        onChange={handleChange}
        className="bg-slate-300  w-md rounded-lg px-5"
      />

      <input
        type="date"
        min={date}
        id="date"
        value={formData.date}
        onChange={handleChange}
        className="bg-blue-500 px-4 text-white rounded-lg"
      />

      <button
        onClick={addTask}
        className="bg-green-600 hover:bg-green-800 text-white px-5 py-2 rounded-xl"
      >
        Add Task
      </button>
    </div>
  );
};

export default TaskForm;


