export enum Status {
  NotStarted,
  InProgress,
  InReview,
  Approved,
}

export interface Task {
  name: string;
  due: Date;
  status: Status;
}

export const TASKS: Task[] = [
  { name: 'Task 1', due: new Date('2024-05-14'), status: Status.InProgress },
  { name: 'Task 2', due: new Date('2024-05-15'), status: Status.NotStarted },
  { name: 'Task 3', due: new Date('2024-05-16'), status: Status.NotStarted },
];
