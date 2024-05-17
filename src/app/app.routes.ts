import { Routes } from "@angular/router";
import { TasksComponent } from "./tasks/tasks.component";
import { EditTaskComponent } from "./edit-task/edit-task.component";
import { NewTaskComponent } from "./new-task/new-task.component";
import { NotFoundComponent } from "./not-found/not-found.component";

export const routes: Routes = [
  { path: "", redirectTo: "tasks", pathMatch: "full" },
  { path: "tasks", component: TasksComponent },
  { path: "new", component: NewTaskComponent },
  { path: "edit/:id", component: EditTaskComponent },
  { path: "404", component: NotFoundComponent },
  { path: "**", redirectTo: "404", pathMatch: "full" },
];
