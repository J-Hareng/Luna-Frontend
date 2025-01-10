import { Component, OnInit } from "@angular/core";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatSelectModule } from "@angular/material/select";
import {
  LunaChipsComponent,
  LunaChipsObject,
  LunaChipsObjectCreator,
} from "../luna-chips/luna-chips.component";
import { LunaInputComponent } from "../luna-input/luna-input.component";
import { TaskType } from "../../serv/mod/Types";
import { Input } from "@angular/core";
import { FormControl } from "@angular/forms";
@Component({
  selector: "app-luna-file-upload-and-location-selector",
  standalone: true,
  imports: [MatFormFieldModule, MatSelectModule, LunaInputComponent],
  templateUrl: "./luna-file-upload-and-location-selector.component.html",
  styleUrl: "./luna-file-upload-and-location-selector.component.scss",
})
export class LunaFileUploadAndLocationSelectorComponent implements OnInit {
  constructor() {}
  @Input() Task: TaskType = {} as TaskType;

  FutFileNameFromControl = new FormControl("");
  CollectionFromControl = new FormControl("");
  WithFutureFile = false;

  ngOnInit(): void {
    if (this.Task.coll == undefined || this.Task.coll == "") {
      this.WithFutureFile = false;
    } else {
      this.WithFutureFile = true;
    }
  }
}
