import { Component } from "@angular/core";
import { RouterModule, RouterOutlet } from "@angular/router";
import { TasksComponent } from "./tasks/tasks.component";
import { MatTabsModule } from "@angular/material/tabs";

interface Link {
  path: string;
  name: string;
}

@Component({
  selector: "app-root",
  standalone: true,
  imports: [TasksComponent, MatTabsModule, RouterOutlet, RouterModule],
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.scss",
})
export class AppComponent {
  title = "Mini task tracker";
  links: Link[] = [
    { path: "/tasks", name: "Tasks" },
    { path: "/new", name: "New task" },
  ];
}
