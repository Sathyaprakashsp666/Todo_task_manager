# Todo_task_manager

#### Frontend : https://task-manager-app-06.netlify.app/


## Introduction
This is a web application for managing todo lists and work assignments within an organization. The application allows users to create, view, update, and delete tasks. Users can assign tasks to specific individuals , set due dates, and track the progress of each task

## Features
List out the key features of your application.

- Create, retrieve, update, and delete tasks through a RESTful API.
- Implemented authentication and authorization mechanisms to secure access to API endpoints.
- Task statistics, such as completed tasks, pending tasks


## Installation
Detailed instructions on how to install, configure, and get the project running.

```bash
git clone https://github.com/your-username/todo-manager.git
cd server
npm install
npm start
cd client
npm install
npm start
```

## Usage
To use the Todo Manager web application, follow the steps below:

1. Register an account:

- Click on the "Register" link on the login page.
- Provide your username, email, and password.
- Click on the "Register" button to create your account.
- 
2 Log in to your account:

- Enter your username and password on the login page.
- Click on the "Login" button to log in.
- 
3 View and manage tasks:

- After logging in, you will be redirected to the Tasks page.
- The Tasks page displays a list of all tasks within the organization.
- Each task shows its details, such as title, description, assigned user or team, due date, and status.
- You can perform the following actions on tasks:
- Update Task: If the task is assigned to you, you can update its details by clicking on the "Edit" button next to the task. This allows you to modify the title, description, assigned user or team, due date, and status of the task.
- Delete Task: If the task is assigned to you, you can delete it by clicking on the "Delete" button next to the task. Confirm the deletion when prompted.
- Mark Task as Complete: If the task is assigned to you, you can mark it as complete by clicking on the "Mark Complete" button next to the task. This will update the status of the task to indicate its completion.
Log out from your account:

- To log out from your account, click on the "Logout" button in the navigation bar.
Please note that you can only perform update and delete actions on tasks that are assigned to you. You cannot modify or delete tasks assigned to other users or teams.




## API Endpoints

- POST /api/auth/login
- POST  /api/auth/register
- GET   /api/auth/users
- GET /api/tasks - retrieve all task
- POST /api/tasks/ - create a new task
- PUT /api/tasks/:id - update a task
- PATCH /api/tasks/toggle-status/:id - toggle status
- POST /api/tasks/:id - delete task


## Technology Stack

- CSS/HTML
- React JS
- Node.js
- Express.js
- MongoDB
- Json web token
