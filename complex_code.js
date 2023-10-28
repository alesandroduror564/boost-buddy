// filename: complex_code.js

/**
 * This code demonstrates a complex and sophisticated implementation of a task management system.
 * It includes features such as task creation, assignment, tracking progress, and generating reports.
 **/

// Declare global variables and constants
const tasks = [];
let userId = 1;
let taskId = 1;

// Define classes
class User {
  constructor(name, role) {
    this.id = userId++;
    this.name = name;
    this.role = role;
  }
}

class Task {
  constructor(name, description) {
    this.id = taskId++;
    this.name = name;
    this.description = description;
    this.assignedTo = null;
    this.status = 'To Do';
  }

  assign(user) {
    this.assignedTo = user;
  }

  updateStatus(status) {
    this.status = status;
  }
}

// Define functions for task management
function createUser(name, role) {
  const user = new User(name, role);
  return user;
}

function createTask(name, description) {
  const task = new Task(name, description);
  tasks.push(task);
  return task;
}

function assignTask(task, user) {
  task.assign(user);
}

function updateTaskStatus(task, status) {
  task.updateStatus(status);
}

function getTasksByUser(user) {
  return tasks.filter((task) => task.assignedTo === user);
}

function getTasksByStatus(status) {
  return tasks.filter((task) => task.status === status);
}

// Example usage of the task management system

// Create users
const john = createUser('John Doe', 'Developer');
const emily = createUser('Emily Smith', 'Designer');
const mike = createUser('Mike Johnson', 'Project Manager');

// Create tasks
const task1 = createTask('Implement login feature', 'Add login functionality to the website');
const task2 = createTask('Design homepage', 'Create an appealing design for the website homepage');
const task3 = createTask('Refactor code', 'Improve the code structure and remove duplicate code');

// Assign tasks
assignTask(task1, john);
assignTask(task2, emily);
assignTask(task3, john);

// Update task status
updateTaskStatus(task1, 'In Progress');
updateTaskStatus(task2, 'Completed');
updateTaskStatus(task3, 'In Progress');

// Generate reports
const johnsTasks = getTasksByUser(john);
console.log("John's tasks: ", johnsTasks);

const inProgressTasks = getTasksByStatus('In Progress');
console.log("Tasks in progress: ", inProgressTasks);

const completedTasks = getTasksByStatus('Completed');
console.log("Completed tasks: ", completedTasks);

// ... more complex code here

// End of the complex_code.js file