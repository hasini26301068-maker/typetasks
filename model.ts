// 1. Literal union type for allowed task statuses
type TaskStatus = "todo" | "in-progress" | "done";

// 2. Task interface defining the exact shape of a task
interface Task {
  id: number;
  title: string;
  status: TaskStatus;
}

let nextId = 1;

// 3. Add a new task (always starts as "todo")
function addTask(tasks: Task[], title: string): Task[] {
  const newTask: Task = {
    id: nextId++,
    title,
    status: "todo",
  };
  return [...tasks, newTask];
}

// 4. Mark a task as "done" by its id
function completeTask(tasks: Task[], id: number): Task[] {
  return tasks.map((task) =>
    task.id === id ? { ...task, status: "done" } : task
  );
}

// 5. Filter tasks by a specific valid TaskStatus
function filterByStatus(tasks: Task[], status: TaskStatus): Task[] {
  return tasks.filter((task) => task.status === status);
}

// 6. Extra custom operations (Originality requirement)

// Moves a task forward one stage: todo -> in-progress -> done
function advanceTask(tasks: Task[], id: number): Task[] {
  return tasks.map((task) => {
    if (task.id !== id) return task;
    const nextStatus: TaskStatus =
      task.status === "todo" ? "in-progress" : "done";
    return { ...task, status: nextStatus };
  });
}

// Removes a task by id
function deleteTask(tasks: Task[], id: number): Task[] {
  return tasks.filter((task) => task.id !== id);
}

// Counts how many tasks match a given status
function countByStatus(tasks: Task[], status: TaskStatus): number {
  return tasks.filter((task) => task.status === status).length;
}