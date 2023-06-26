import React from "react";
import "./Task.css";
import { useSelector } from "react-redux";

const TaskItem = ({ task, handleEdit, handleDelete, toggleStatus }) => {
  const {
    id,
    title,
    description,
    assignedTo,
    completed,
    createdBy,
    dueDate,
  } = task;

  const username = useSelector((state) => state.auth.username);

  return (
    <div
      className={`task-item-cont ${
        username === createdBy.username || username === assignedTo.username
          ? "gray-bg"
          : ""
      }`}
    >
      <h5>Title: {title}</h5>
      <p>
        <b>Description:</b> {description}
      </p>
      <p>
        <b>Created :</b> {createdBy.username}
      </p>
      <p>
        <b>Assigned To:</b> {assignedTo.username}
      </p>
      <p>
        <b>Due Date:</b> {dueDate}
      </p>
      <p>
        <b>Status</b>:{" "}
        {completed ? (
          <button> Completed</button>
        ) : (
          <button onClick={toggleStatus}>Mark as completed</button>
        )}
      </p>
      <div className="task-btn-cont">
        <button onClick={() => handleEdit(task)}>Edit</button>
        <button onClick={() => handleDelete(id)}>Delete</button>
      </div>
    </div>
  );
};

export default TaskItem;
