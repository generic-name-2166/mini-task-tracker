import { Injectable } from "@angular/core";
import { ASSIGNEES, type IAssignee } from "./task";

@Injectable({
  providedIn: "root",
})
export class AssigneeService {
  assignees: IAssignee[] = ASSIGNEES;

  getAssigneeById(id: number): IAssignee | undefined {
    return this.assignees.find((assignee) => assignee.id === id);
  }

  getCurrent(): IAssignee {
    return this.assignees[0];
  }

  getAssignees(): IAssignee[] {
    return this.assignees;
  }
}
