import { Component, inject } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { TaskService } from "../task.service";
import { Priority, type Task } from "../task";
import { Router } from "@angular/router";
import { MatInputModule } from "@angular/material/input";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatSelectModule } from "@angular/material/select";
import { type Moment } from "moment";

interface IPriority {
  name: string;
  value: Priority;
}

interface NewTask extends Omit<Partial<Task>, "due"> {
  due?: Moment;
}

@Component({
  selector: "app-new-task",
  standalone: true,
  imports: [
    FormsModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
  ],
  templateUrl: "./new-task.component.html",
  styleUrl: "./new-task.component.scss",
})
export class NewTaskComponent {
  priorities: IPriority[] = [
    { name: "High", value: Priority.High },
    { name: "Medium", value: Priority.Medium },
    { name: "Low", value: Priority.Low },
  ];
  taskService: TaskService = inject(TaskService);
  router: Router = inject(Router);
  model: NewTask = {};

  submit() {
    this.taskService.addTask(
      this.model.title ?? "",
      this.model.name ?? "",
      this.model.due ? this.model.due.toDate() : new Date(),
      this.model.priority ?? Priority.High,
    );
    this.router.navigate(["/tasks"]);
  }
}
