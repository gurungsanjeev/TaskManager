import { useState, useEffect } from "react";

const EditModal = ({ task, onClose, onUpdate }) => {
  const [editData, setEditData] = useState({
    title: "",
    date: "",
  });

  useEffect(() => {
    if (task) {
      setEditData({
        title: task.title,
        date: task.date,
      });
    }
  }, [task]);

  const handleChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    onUpdate({ ...task, ...editData });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-md rounded-xl shadow-lg p-6">

        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Edit Task</h2>
          <button onClick={onClose} className="text-xl">✕</button>
        </div>

        <div className="space-y-4">
          <input
            name="title"
            value={editData.title}
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-2"
            placeholder="Task title"
          />

          <input
            type="date"
            name="date"
            value={editData.date}
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-2"
          />

          <div className="flex justify-end gap-3 pt-4">
            <button
              onClick={onClose}
              className="px-4 py-2 border rounded-lg"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              className="px-4 py-2 bg-green-600 text-white rounded-lg"
            >
              Save Changes
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default EditModal;
