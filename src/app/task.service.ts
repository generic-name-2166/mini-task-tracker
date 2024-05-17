import { Injectable } from "@angular/core";
import { TASKS, type Task, Priority, Status } from "./task";
import { type Observable, of } from "rxjs";

const TASKS_KEY: string = "tasks";

@Injectable({
  providedIn: "root",
})
export class TaskService {
  tasks: Task[] = this.load() ?? TASKS;

  getTasks(): Observable<Task[]> {
    return of(this.tasks);
  }

  getTaskById(id: number): Observable<Task> | null {
    const task: Task | undefined = TASKS.find((task) => task.id === id);
    return task ? of(task) : null;
  }

  getNewId(): number {
    return TASKS.length;
  }

  save(): void {
    if (typeof localStorage === "undefined") {
      return;
    }
    try {
      localStorage.setItem(TASKS_KEY, JSON.stringify(this.tasks));
    } catch (e) {
      console.error(e);
    }
  }

  load(): Task[] | null {
    if (typeof localStorage === "undefined") {
      return null;
    }
    const maybeTasks: string | null = localStorage.getItem(TASKS_KEY);
    return maybeTasks ? JSON.parse(maybeTasks) : maybeTasks;
  }

  addTask(title: string, name: string, due: Date, priority: Priority): void {
    const task: Task = {
      id: this.getNewId(),
      title,
      name,
      due,
      priority,
      status: Status.NotStarted,
      assignees: [],
    } satisfies Task;
    this.tasks = [...this.tasks, task];
    this.save();
  }
}
