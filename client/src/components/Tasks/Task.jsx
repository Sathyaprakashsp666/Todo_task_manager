import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getAllTasks,
  updateTask,
  deleteTask,
  createTask,
  toggleStatus,
} from "../../redux/actions/taskActions";
import TaskItem from "./TaskItem";
import axios from "axios";
import "react-datepicker/dist/react-datepicker.css";
import CreateTaskForm from "./CreateTaskForm";
import SearchInput from "./SearchInput";
import { useSnackbar } from "notistack";

const Task = () => {
  const [users, setUsers] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editedTaskId, setEditedTaskId] = useState(null);
  const [dueDate, setDueDate] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const token = useSelector((state) => state.auth.token);
  const id = useSelector((state) => state.auth.id);
  const username = useSelector((state) => state.auth.username);
  const tasks = useSelector((state) => state.task.tasks);
  const { enqueueSnackbar } = useSnackbar();
  // enqueueSnackbar("Registered successfully", {variant:"success"});
  // enqueueSnackbar("something went wrong!", {variant:"error"});

  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    assignedTo: "",
    dueDate: new Date(),
    completed: false,
    createdBy: id ? id : null,
  });
  const dispatch = useDispatch();
  const formRef = useRef(null);

  useEffect(() => {
    dispatch(getAllTasks(token));
  }, [dispatch, token]);

  async function fetchUsers() {
    try {
      const response = await axios.get("http://localhost:8888/api/auth/users", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchUsers();
  }, []);

  // Delete task
  const handleDelete = (task) => {
    // console.log(username);
    // console.log(task.createdBy.username);
    // console.log(task.assignedTo.username);
    if (
      username !== task.createdBy.username &&
      username !== task.assignedTo.username
    ) {
      enqueueSnackbar("Only admin or assignee can delete this", {variant:"warning"});
      return;
    }
    dispatch(deleteTask(task._id, token))
      .then(() => {
        enqueueSnackbar("Deleted", {variant:"success"});
        dispatch(getAllTasks(token));
      })
      .catch((error) => {
        enqueueSnackbar("something went wrong!", {variant:"error"});
        // console.log("Error deleting task:", error);
      });
  };

  // Create task

  const handleCreate = (e) => {
    // console.log(dueDate.toISOString());
    e.preventDefault();
    setNewTask({
      ...newTask,
      dueDate: dueDate && dueDate.toISOString(),
    });
    dispatch(createTask(newTask, token))
      .then(() => {
        setNewTask({
          title: "",
          description: "",
          assignedTo: "",
          dueDate: "",
          completed: false,
          createdBy: "",
        });
        enqueueSnackbar("New task created!", {variant:"success"});
        dispatch(getAllTasks(token));
      })
      .catch((error) => {
        // console.log("Error creating task:", error);
        enqueueSnackbar("something went wrong!", {variant:"error"});
      });
  };
  // Update task
  const handleUpdate = (e) => {
    e.preventDefault();
    setIsEditing(false);
    dispatch(updateTask(editedTaskId, newTask, token))
      .then(() => {
        setIsEditing(false);
        setEditedTaskId(null);
        setNewTask({
          id: "",
          title: "",
          description: "",
          assignedTo: "",
          dueDate: "",
        });
        enqueueSnackbar("Task updated", {variant:"success"});
        dispatch(getAllTasks(token));
      })
      .catch((error) => {
        enqueueSnackbar("something went wrong!", {variant:"error"});
        setIsEditing(false);
      });
  };

  // Toggle status
  const toggleStatusBtn = (task) => {
    if (
      username !== task.createdBy.username &&
      username !== task.assignedTo.username
    ) {
      enqueueSnackbar("Only admin or assignee can edit this", {variant:"warning"});
      return;
    }
    dispatch(toggleStatus(task._id, token))
      .then(() => {
        enqueueSnackbar("Status updated", {variant:"success"});
        dispatch(getAllTasks(token));
      })
      .catch((error) => {
        enqueueSnackbar("something went wrong!", {variant:"error"});
      });
  };

  // Edit Form
  const handleEdit = (task) => {
    console.log(task);
    console.log(task.assignedTo.username);
    if (
      username !== task.createdBy.username &&
      username !== task.assignedTo.username
    ) {
      enqueueSnackbar("Only admin or assignee can edit this", {variant:"warning"});
      return;
    }
    setIsEditing(true);
    setEditedTaskId(task._id);
    setNewTask({
      id: task._id,
      title: task.title,
      description: task.description,
      assignedTo: task.assignedTo.username,
      dueDate: task.dueDate,
      completed: task.completed,
      createdBy: id,
    });
    formRef.current.scrollIntoView({ behavior: "smooth" });
  };

  const handleEditBtn = () => {
    setIsEditing(false);
    setNewTask({
      id: "",
      title: "",
      description: "",
      assignedTo: "",
      dueDate: "",
    });
  };

  // Filter tasks that are not completed
  // const incompleteTasks = tasks.filter((task) => !task.completed);
  // const completedTasks = tasks.filter((task) => task.completed);
  const incompleteTasks = tasks.filter(
    (task) =>
      !task.completed &&
      (task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        task.createdBy.username
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        task.assignedTo.username
          .toLowerCase()
          .includes(searchQuery.toLowerCase()))
  );

  const completedTasks = tasks.filter(
    (task) =>
      task.completed &&
      (task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        task.createdBy.username
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        task.assignedTo.username
          .toLowerCase()
          .includes(searchQuery.toLowerCase()))
  );

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <>
      <div>
        <SearchInput
          searchQuery={searchQuery}
          handleSearch={handleSearch}
          className="search-input"
        />
      </div>
      <div className="task-parent-cont">
        <div>
          <h2>{isEditing ? "Update Task" : "Create Task"}</h2>

          <CreateTaskForm
            formRef={formRef}
            isEditing={isEditing}
            handleUpdate={handleUpdate}
            handleCreate={handleCreate}
            newTask={newTask}
            setNewTask={setNewTask}
            users={users}
            dueDate={dueDate}
            setDueDate={setDueDate}
            handleEditBtn={handleEditBtn}
          />
        </div>

        {/* //Task List */}

        <div>
          <h1>Pending Tasks</h1>
          <div className="task-cont">
            {incompleteTasks?.map((task) => (
              <TaskItem
                key={task.id}
                task={task}
                handleEdit={handleEdit}
                handleDelete={() => {
                  handleDelete(task);
                }}
                toggleStatus={() => {
                  toggleStatusBtn(task);
                }}
              />
            ))}
          </div>
          <div>
            <h1>Completed Tasks</h1>
            <div className="task-cont">
              {completedTasks?.map((task) => (
                <TaskItem
                  key={task.id}
                  task={task}
                  handleEdit={handleEdit}
                  handleDelete={() => {
                    handleDelete(task);
                  }}
                  toggleStatus={() => {
                    toggleStatusBtn(task);
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Task;
