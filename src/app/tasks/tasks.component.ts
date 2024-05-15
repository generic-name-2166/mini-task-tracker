import { Component } from "@angular/core";
import { type Task, TASKS } from "../task";
import { LowerCasePipe } from "@angular/common";
import { FormsModule } from "@angular/forms";

@Component({
  selector: "app-tasks",
  standalone: true,
  imports: [LowerCasePipe, FormsModule],
  templateUrl: "./tasks.component.html",
  styleUrl: "./tasks.component.scss",
})
export class TasksComponent {
  readonly tasks: Task[];
  selected: number | null;

  constructor() {
    this.tasks = TASKS;
    this.selected = null;
  }

  onSelect(index: number | null): void {
    this.selected = index;
  }
}
