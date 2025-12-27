import React from 'react'

const SortSelect = ({ value, onChange }) => {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="px-3 py-1 rounded bg-slate-300"
    >
      <option value="date">Sort by Date</option>
      <option value="title">Sort by Title</option>
    </select>
  );
};

export default SortSelect;