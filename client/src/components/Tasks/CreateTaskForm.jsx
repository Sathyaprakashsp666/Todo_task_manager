import React from "react";
import DatePicker from "react-datepicker";

const CreateTaskForm = ({
  formRef,
  isEditing,
  handleUpdate,
  handleCreate,
  newTask,
  setNewTask,
  users,
  dueDate,
  setDueDate,
  handleEditBtn,
}) => {
  return (
    <form ref={formRef} onSubmit={isEditing ? handleUpdate : handleCreate}>
      <div>
        <label>Title:</label>
        <input
          type="text"
          value={newTask.title}
          onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
          required
        />
      </div>
      <div>
        <label>Description:</label>
        <textarea
          value={newTask.description}
          onChange={(e) =>
            setNewTask({ ...newTask, description: e.target.value })
          }
          required
        ></textarea>
      </div>
      <div>
        <label>Assigned To:</label>
        <select
          value={newTask.assignedTo}
          onChange={(e) =>
            setNewTask({ ...newTask, assignedTo: e.target.value })
          }
          required
        >
          <option value="">Select User</option>
          {users?.map((user) => (
            <option key={user._id} value={user._id}>
              {user.username}
            </option>
          ))}
        </select>
        <div>
          <label>Due Date:</label>
          <DatePicker
            selected={dueDate}
            onChange={(date) => setDueDate(date)}
            placeholderText="Select a due date"
          />
        </div>
      </div>
      <button type="submit">{isEditing ? "Update Task" : "Create Task"}</button>
      {isEditing && (
        <button type="submit" onClick={handleEditBtn}>
          Cancel
        </button>
      )}
    </form>
  );
};

export default CreateTaskForm;
