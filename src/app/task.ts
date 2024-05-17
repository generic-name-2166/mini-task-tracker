export enum Status {
  NotStarted,
  InProgress,
  InReview,
  Approved,
}

export enum Priority {
  High,
  Medium,
  Low,
}

interface Assignee {
  name: string;
}

export interface Task {
  id: number;
  title: string;
  name: string;
  due: Date;
  priority: Priority;
  status: Status;
  assignee: Assignee;
}

function getTask(
  id: number,
  title: string,
  name: string,
  due: Date,
  priority: Priority,
  status: Status,
  assignee: Assignee,
): Task {
  return {
    id,
    title,
    name,
    due,
    priority,
    status,
    assignee,
  } satisfies Task;
}

export const TASKS: Task[] = [
  getTask(
    0,
    "Task 1",
    "Task one",
    new Date("2024-05-14"),
    Priority.Low,
    Status.InProgress,
    { name: "me" },
  ),
  getTask(
    1,
    "Task 2",
    "Task two",
    new Date("2024-05-15"),
    Priority.High,
    Status.NotStarted,
    { name: "you" },
  ),
  getTask(
    2,
    "Task 3",
    "Task three",
    new Date("2024-05-16"),
    Priority.Medium,
    Status.NotStarted,
    { name: "them" },
  ),
];
