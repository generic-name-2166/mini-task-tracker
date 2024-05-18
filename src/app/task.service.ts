import { Injectable, inject } from "@angular/core";
import { TASKS, type Task, Priority, Status } from "./task";
import { type Observable, of } from "rxjs";
import { AssigneeService } from "./assignee.service";

const TASKS_KEY: string = "tasks";

interface LoadedTask extends Omit<Task, "due"> {
  due: string;
}

@Injectable({
  providedIn: "root",
})
export class TaskService {
  tasks: Task[] = this.load() ?? TASKS;
  assigneeService: AssigneeService = inject(AssigneeService);

  getTasks(): Observable<Task[]> {
    return of(this.tasks);
  }

  getTaskById(id: number): Observable<Task> | null {
    const task: Task | undefined = this.tasks.find((task) => task.id === id);
    return task ? of(task) : null;
  }

  getNewId(): number {
    return this.tasks.length;
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
    if (!maybeTasks) {
      return null;
    }
    const tasks: Task[] = JSON.parse(maybeTasks).map(
      (task: LoadedTask): Task => {
        return {
          ...task,
          due: new Date(task.due),
        } satisfies Task;
      },
    );
    return tasks;
  }

  addTask(title: string, name: string, due: Date, priority: Priority): void {
    const task: Task = {
      id: this.getNewId(),
      title,
      name,
      due,
      priority,
      status: Status.NotStarted,
      assignee: this.assigneeService.getCurrent(),
    } satisfies Task;
    this.tasks = [...this.tasks, task];
    this.save();
  }

  editTask(newTask: Task): void {
    this.tasks = this.tasks.map((task) =>
      task.id === newTask.id ? newTask : task,
    );
    this.save();
  }
}
