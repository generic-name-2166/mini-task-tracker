import { Component, type OnInit, inject } from "@angular/core";
import { TaskService } from "../task.service";
import { ActivatedRoute, Router } from "@angular/router";
import { Location } from "@angular/common";
import { Observable } from "rxjs";
import { FormsModule } from "@angular/forms";
import { MatInputModule } from "@angular/material/input";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatFormFieldModule } from "@angular/material/form-field";
import {
  PRIORITIES,
  type IPriority,
  type Task,
  type IStatus,
  STATUS,
  Priority,
  Status,
} from "../task";
import { MatButtonModule } from "@angular/material/button";
import { MatSelectModule } from "@angular/material/select";
import moment, { type Moment } from "moment";

interface NewTask extends Omit<Task, "due"> {
  due?: Moment;
}

function toNew(task: Task): NewTask {
  return {
    ...task,
    due: moment(task.due),
  } satisfies NewTask;
}

@Component({
  selector: "app-edit-task",
  standalone: true,
  imports: [
    FormsModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
  ],
  templateUrl: "./edit-task.component.html",
  styleUrl: "./edit-task.component.scss",
})
export class EditTaskComponent implements OnInit {
  statusValues: IStatus[] = STATUS;
  priorities: IPriority[] = PRIORITIES;
  route: ActivatedRoute = inject(ActivatedRoute);
  taskService: TaskService = inject(TaskService);
  location: Location = inject(Location);
  router: Router = inject(Router);
  task: NewTask = {
    id: NaN,
    title: "",
    name: "",
    status: Status.NotStarted,
    priority: Priority.High,
    assignee: { name: "" },
  };

  goBack(): void {
    this.location.back();
  }

  getTask(): void {
    const id: number = parseInt(this.route.snapshot.paramMap.get("id")!);
    const maybeTask: Observable<Task> | null = this.taskService.getTaskById(id);
    if (maybeTask === null) {
      // TODO
      this.goBack();
      return;
    }
    maybeTask.subscribe((task) => (this.task = toNew(task))).unsubscribe();
  }

  ngOnInit(): void {
    this.getTask();
  }

  submit(): void {
    this.taskService.editTask({
      ...this.task,
      due: this.task.due!.toDate(),
    } satisfies Task);
    this.goBack();
  }
}
