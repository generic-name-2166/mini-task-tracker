import { Component, type OnInit, inject } from "@angular/core";
import { Status, type Task } from "../task";
import { MatTableModule, MatTextColumn } from "@angular/material/table";
import { FormsModule } from "@angular/forms";
import { TaskService } from "../task.service";
import { RouterModule } from "@angular/router";

@Component({
  selector: "app-tasks",
  standalone: true,
  imports: [MatTableModule, MatTextColumn, FormsModule, RouterModule],
  templateUrl: "./tasks.component.html",
  styleUrl: "./tasks.component.scss",
})
export class TasksComponent implements OnInit {
  taskService: TaskService = inject(TaskService);
  tasks: Task[] = [];
  displayed: string[] = ["title", "assignee", "due", "status"];

  ngOnInit(): void {
    this.getTasks();
  }

  getTasks(): void {
    this.taskService.getTasks().subscribe((tasks) => (this.tasks = tasks));
  }

  displayStatus(status: Status): string {
    switch (status) {
      case Status.NotStarted:
        return "Not started";
      case Status.InProgress:
        return "In progress";
      case Status.InReview:
        return "In review";
      case Status.Approved:
        return "Approved";
    }
  }
}
