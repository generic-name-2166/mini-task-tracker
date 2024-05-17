import { Component } from "@angular/core";
import { RouterModule, RouterOutlet } from "@angular/router";
import { TasksComponent } from "./tasks/tasks.component";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [TasksComponent, RouterOutlet, RouterModule],
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.scss",
})
export class AppComponent {
  title = "mini-task-tracker";
}
