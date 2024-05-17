import { Injectable } from "@angular/core";
import { TASKS, type Task, Priority, Status } from "./task";
import { type Observable, of } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class TaskService {
  getTasks(): Observable<Task[]> {
    const tasks = of(TASKS);
    return tasks;
  }

  getTaskById(id: number): Observable<Task> | null {
    const task: Task | undefined = TASKS.find((task) => task.id === id);
    return task ? of(task) : null;
  }

  getNewId(): number {
    return TASKS.length;
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
    console.log(task);
    // TODO
  }
}
