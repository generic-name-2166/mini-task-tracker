import { Component, type OnInit, inject } from "@angular/core";
import { TaskService } from "../task.service";
import { ActivatedRoute, Router } from "@angular/router";
import { Location } from "@angular/common";
import { Observable } from "rxjs";
import type { Task } from "../task";

@Component({
  selector: "app-edit-task",
  standalone: true,
  imports: [],
  templateUrl: "./edit-task.component.html",
  styleUrl: "./edit-task.component.scss",
})
export class EditTaskComponent implements OnInit {
  route: ActivatedRoute = inject(ActivatedRoute);
  taskService: TaskService = inject(TaskService);
  location: Location = inject(Location);
  router: Router = inject(Router);
  task!: Task;

  goBack(): void {
    this.location.back();
  }

  getTask(): void {
    const id: number = parseInt(this.route.snapshot.paramMap.get("id")!);
    const maybeTask: Observable<Task> | null = this.taskService.getTaskById(id);
    if (!maybeTask) {
      // Display error or go back to dashboard
      this.router.navigate(["/404"]);
      return;
    }
    maybeTask.subscribe((task) => (this.task = task));
  }

  ngOnInit(): void {
    this.getTask();
  }
}
