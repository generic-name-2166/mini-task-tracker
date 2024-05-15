import { Component } from '@angular/core';

enum Status {
  NotStarted,
  InProgress,
  InReview,
  Approved,
}

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.scss'
})
export class TasksComponent {
  readonly name: string;
  readonly due: Date;
  readonly status: Status;

  constructor(due: Date) {
    this.name = "TODO";
    this.due = due;
    this.status = Status.NotStarted;
  }
}
