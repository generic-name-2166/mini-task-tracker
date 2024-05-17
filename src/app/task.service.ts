import { Injectable } from "@angular/core";
import { TASKS, type Task } from "./task";
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
    const task: Task | undefined = TASKS.find(task => task.id === id);
    return task ? of(task) : null;
  }
}
