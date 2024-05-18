export enum Status {
  NotStarted,
  InProgress,
  InReview,
  Approved,
}

export interface IStatus {
  name: string;
  value: Status;
}

export const STATUS: IStatus[] = [
  { name: "Not started", value: Status.NotStarted },
  { name: "In progress", value: Status.InProgress },
  { name: "In review", value: Status.InReview },
  { name: "Approved", value: Status.Approved },
];

export enum Priority {
  High,
  Medium,
  Low,
}

export interface IPriority {
  name: string;
  value: Priority;
}

export const PRIORITIES: IPriority[] = [
  { name: "High", value: Priority.High },
  { name: "Medium", value: Priority.Medium },
  { name: "Low", value: Priority.Low },
];

export interface IAssignee {
  id: number;
  name: string;
}

export const ASSIGNEES: IAssignee[] = [
  { name: "me", id: 0 },
  { name: "you", id: 1 },
  { name: "them", id: 2 },
  { name: "TODO", id: 3 },
];

export interface Task {
  id: number;
  title: string;
  name: string;
  due: Date;
  priority: Priority;
  status: Status;
  assignee: IAssignee;
}

function getTask(
  id: number,
  title: string,
  name: string,
  due: Date,
  priority: Priority,
  status: Status,
  assignee: IAssignee,
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
    { name: "me", id: 0 },
  ),
  getTask(
    1,
    "Task 2",
    "Task two",
    new Date("2024-05-15"),
    Priority.High,
    Status.NotStarted,
    { name: "you", id: 1 },
  ),
  getTask(
    2,
    "Task 3",
    "Task three",
    new Date("2024-05-16"),
    Priority.Medium,
    Status.NotStarted,
    { name: "them", id: 2 },
  ),
];
