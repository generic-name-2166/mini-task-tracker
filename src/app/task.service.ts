import { Injectable } from '@angular/core';
import { TASKS, type Task } from './task';
import { type Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  getTasks(): Observable<Task[]> {
    const tasks = of(TASKS);
    return tasks;
  }

  constructor() { }
}
