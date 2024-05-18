import { Component, type OnInit, inject, ViewChild } from "@angular/core";
import { Status, type Task } from "../task";
import {
  MatTableDataSource,
  MatTableModule,
  MatTextColumn,
} from "@angular/material/table";
import { MatButtonModule } from "@angular/material/button";
import { FormsModule } from "@angular/forms";
import { MatSort, MatSortModule } from "@angular/material/sort";
import { TaskService } from "../task.service";
import { RouterModule } from "@angular/router";

function sortData(task: Task, property: string): number | string {
  switch (property) {
    case "due":
      return task.due.getTime();
    case "assignee":
      return task.assignee.name;
    case "status":
      return displayStatus(task.status);
    default:
      //@ts-expect-error this should never be called
      return task[property];
  }
}

function displayStatus(status: Status): string {
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

@Component({
  selector: "app-tasks",
  standalone: true,
  imports: [
    MatTableModule,
    MatTextColumn,
    MatButtonModule,
    FormsModule,
    RouterModule,
    MatSortModule,
  ],
  templateUrl: "./tasks.component.html",
  styleUrl: "./tasks.component.scss",
})
export class TasksComponent implements OnInit {
  taskService: TaskService = inject(TaskService);
  tasks: MatTableDataSource<Task> = new MatTableDataSource<Task>([]);
  displayed: string[] = ["title", "assignee", "due", "status", "edit"];
  @ViewChild(MatSort, { static: true }) sort!: MatSort;

  ngOnInit(): void {
    this.getTasks();
    this.tasks.sort = this.sort;
    this.tasks.sortingDataAccessor = sortData;
  }

  getTasks(): void {
    this.taskService
      .getTasks()
      .subscribe((tasks) => (this.tasks = new MatTableDataSource(tasks)));
  }

  displayStatus(status: Status): string {
    return displayStatus(status);
  }
}
