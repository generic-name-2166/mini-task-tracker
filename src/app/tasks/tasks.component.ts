import { Component, type OnInit, inject, ViewChild } from "@angular/core";
import { type IStatus, STATUS, Status, type Task } from "../task";
import {
  MatTableDataSource,
  MatTableModule,
  MatTextColumn,
} from "@angular/material/table";
import { MatButtonModule } from "@angular/material/button";
import { MatInputModule } from "@angular/material/input";
import { FormsModule } from "@angular/forms";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatSelectModule } from "@angular/material/select";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatSort, MatSortModule } from "@angular/material/sort";
import { TaskService } from "../task.service";
import { RouterModule } from "@angular/router";
import { Moment } from "moment";

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

function filterData(task: Task, filter: string): boolean {
  switch (filter) {
    case "NS":
      return task.status === Status.NotStarted;
    case "IP":
      return task.status === Status.InProgress;
    case "IR":
      return task.status === Status.InReview;
    case "AP":
      return task.status === Status.Approved;
  }
  if (filter.startsWith("Assignee ")) {
    const f: string = filter.slice(9).toLowerCase();
    const assignee: string = task.assignee.name.toLowerCase();
    const result: boolean = assignee.includes(f);
    return result;
  } else if (filter.startsWith("Date ")) {
    const f: string = filter.slice(5);
    const date: string = task.due.toLocaleDateString("en-GB");
    const result: boolean = f === date;
    return result;
  }
  return true;
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
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatDatepickerModule,
  ],
  templateUrl: "./tasks.component.html",
  styleUrl: "./tasks.component.scss",
})
export class TasksComponent implements OnInit {
  taskService: TaskService = inject(TaskService);
  tasks: MatTableDataSource<Task> = new MatTableDataSource<Task>([]);
  displayed: string[] = ["title", "assignee", "due", "status", "edit"];
  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  filterAssignee?: string;
  filterDate?: Moment;
  filterStatus?: Status;
  statusValues: IStatus[] = STATUS;

  ngOnInit(): void {
    this.getTasks();
  }

  getTasks(): void {
    this.taskService
      .getTasks()
      .subscribe((tasks) => {
        this.tasks = new MatTableDataSource(tasks);
        this.tasks.sort = this.sort;
        this.tasks.sortingDataAccessor = sortData;
        this.tasks.filterPredicate = filterData;
      });
  }

  displayStatus(status: Status): string {
    return displayStatus(status);
  }

  applyFitler(): void {
    if (this.filterStatus !== undefined) {
      switch (this.filterStatus) {
        case Status.NotStarted:
          this.tasks.filter = "NS";
          return;
        case Status.InProgress:
          this.tasks.filter = "IP";
          return;
        case Status.InReview:
          this.tasks.filter = "IR";
          return;
        case Status.Approved:
          this.tasks.filter = "AP";
          return;
      }
    } else if (this.filterAssignee) {
      this.tasks.filter = "Assignee " + this.filterAssignee;
      return;
    } else if (this.filterDate) {
      this.tasks.filter = "Date " + this.filterDate.toDate().toLocaleDateString("en-GB");
      return;
    }
    this.tasks.filter = "";
  }

  resetFilter(): void {
    this.filterAssignee = undefined;
    this.filterDate = undefined;
    this.filterStatus = undefined;
    this.applyFitler();
  }
}
