import React from 'react'

const TaskRow = ({ task, index, onDelete, onEdit, onToggle }) => {
  return (
    <tr className="bg-white hover:bg-slate-100">
      <td className="p-2">{index + 1}</td>
      <td className="p-2">{task.title}</td>
      <td className="p-2">{task.status}</td>
      <td className="p-2">{task.date}</td>
      <td className="p-2 flex gap-3">
        <button
          onClick={() => onToggle(task)}
          className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded"
        >
          Toggle Status
        </button>

        <button
          onClick={() => onEdit(task)}
          className="bg-blue-500 hover:bg-blue-700 text-white px-3 py-1 rounded"
        >
          Edit
        </button>

        <button
          onClick={() => onDelete(task.id)}
          className="bg-red-500 hover:bg-red-700 text-white px-3 py-1 rounded"
        >
          Delete
        </button>
      </td>
    </tr>
  );
};

export default TaskRow;


