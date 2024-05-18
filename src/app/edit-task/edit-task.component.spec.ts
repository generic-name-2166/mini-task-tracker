import { ComponentFixture, TestBed } from "@angular/core/testing";

import { EditTaskComponent } from "./edit-task.component";
import { provideMomentDateAdapter } from "@angular/material-moment-adapter";
import {
  ActivatedRoute,
  convertToParamMap,
  provideRouter,
} from "@angular/router";
import { routes } from "../app.routes";
import { Observable, of } from "rxjs";
import { provideAnimationsAsync } from "@angular/platform-browser/animations/async";

const mockActivatedRoute = jasmine.createSpyObj(
  { paramMap: new Observable() },
  { params: { id: 1 }, paramMap: of(convertToParamMap({ id: 1 })) },
);

describe("EditTaskComponent", () => {
  let component: EditTaskComponent;
  let fixture: ComponentFixture<EditTaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditTaskComponent],
      providers: [
        provideMomentDateAdapter(),
        provideRouter(routes),
        {
          provide: ActivatedRoute,
          useValue: mockActivatedRoute,
        },
        provideAnimationsAsync(),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(EditTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
