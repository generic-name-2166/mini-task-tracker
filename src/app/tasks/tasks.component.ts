import { Component, type OnInit, inject } from "@angular/core";
import type { Task } from "../task";
import { LowerCasePipe } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { TaskService } from "../task.service";

@Component({
  selector: "app-tasks",
  standalone: true,
  imports: [LowerCasePipe, FormsModule],
  templateUrl: "./tasks.component.html",
  styleUrl: "./tasks.component.scss",
})
export class TasksComponent implements OnInit {
  taskService: TaskService = inject(TaskService);
  tasks: Task[] = [];
  selected: number | null = null;

  ngOnInit(): void {
    this.getTasks();
  }

  getTasks(): void {
    this.taskService
      .getTasks()
      .subscribe(tasks => this.tasks = tasks);
  }

  onSelect(index: number | null): void {
    this.selected = index;
  }
}
