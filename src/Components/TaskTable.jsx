import React from 'react'

import TaskRow from "./TaskRow";

const TaskTable = ({ tasks, onDelete, onEdit, onToggle }) => {
  return (
    <table className="w-full text-left">
      <thead className="bg-gray-200">
        <tr>
          <th className="p-2">S.NO</th>
          <th className="p-2">Task Name</th>
          <th className="p-2 w-60">Task Status</th>
          <th className="p-2 w-60">Due Date</th>
          <th className="p-2 w-80">Action</th>
        </tr>
      </thead>

      <tbody>
        {tasks.length > 0 ? (
          tasks.map((task, index) => (
            <TaskRow
              key={task.id}
              task={task}
              index={index}
              onDelete={onDelete}
              onEdit={onEdit}
              onToggle={onToggle}
            />
          ))
        ) : (
          <tr>
            <td colSpan={5} className="text-center py-6 font-semibold">
              No tasks available
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default TaskTable;
