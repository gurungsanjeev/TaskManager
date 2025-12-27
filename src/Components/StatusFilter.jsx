import React from 'react'

const StatusFilter = ({ value, onChange }) => {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="px-3 py-1 rounded bg-slate-300"
    >
      <option value="All">All</option>
      <option value="Pending">Pending</option>
      <option value="Completed">Completed</option>
    </select>
  );
};


export default StatusFilter