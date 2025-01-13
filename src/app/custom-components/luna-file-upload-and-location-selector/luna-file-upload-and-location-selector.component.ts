import { Component, OnInit } from "@angular/core";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatSelectModule } from "@angular/material/select";
import {
  LunaChipsComponent,
  LunaChipsObject,
  LunaChipsObjectCreator,
} from "../luna-chips/luna-chips.component";
import { LunaInputComponent } from "../luna-input/luna-input.component";
import { CollectionType, TaskType } from "../../serv/mod/Types";
import { Input } from "@angular/core";
import { FormControl, ReactiveFormsModule } from "@angular/forms";
import {
  LunaChipsObjectGetSelectedChipList,
  LunaFromChipsComponent,
} from "../luna-from-chips/luna-from-chips.component";
import { MainCacheService } from "../../serv/logic/main-cache.service";
import { CommonModule } from "@angular/common";
@Component({
  selector: "app-luna-file-upload-and-location-selector",
  standalone: true,
  imports: [
    CommonModule,
    LunaFromChipsComponent,
    MatFormFieldModule,
    MatSelectModule,
    LunaInputComponent,
    ReactiveFormsModule,
  ],
  templateUrl: "./luna-file-upload-and-location-selector.component.html",
  styleUrl: "./luna-file-upload-and-location-selector.component.scss",
})
export class LunaFileUploadAndLocationSelectorComponent implements OnInit {
  constructor(public mc: MainCacheService) {
    this.CollectionFromControl.valueChanges.subscribe(() => {
      this.UpdateTags();

      this.updateReturnForm();
    });
    this.TagsFromControl.valueChanges.subscribe(() => {
      this.updateReturnForm();
    });
    this.FutFileNameFromControl.valueChanges.subscribe(() => {
      this.updateReturnForm();
    });
  }

  @Input() Task: TaskType = {} as TaskType;
  @Input() FromControl: FormControl = new FormControl<LunaUploadObject>(
    {} as LunaUploadObject
  );
  // oldTags: string[] = this.Task.tags || [];

  FutFileNameFromControl = new FormControl("");
  CollectionFromControl = new FormControl(this.Task.coll || "");
  TagsFromControl = new FormControl<LunaChipsObject[]>([]);

  AvailableTags = LunaChipsObjectCreator([]);
  WithFutureFile = false;

  file: File | null = null;

  ngOnInit(): void {
    console.log(this.CollectionFromControl.value);
    console.log(this.Task);
    console.log(this.mc.groupColl);
    if (this.Task.coll == undefined || this.Task.coll == "") {
      this.WithFutureFile = false;
    } else {
      this.CollectionFromControl.setValue(this.Task.coll);
      this.WithFutureFile = true;
      this.UpdateTags();
    }
    this.updateReturnForm();
  }

  UpdateTags() {
    console.log("update Tags");
    console.log(this.CollectionFromControl.value);
    this.AvailableTags = LunaChipsObjectCreator(
      this.mc.groupColl.find((x) => x._id === this.CollectionFromControl.value)
        ?.tags || []
    );
    if (this.CollectionFromControl.value == this.Task.coll) {
      console.log(this.AvailableTags);

      let obj = LunaChipsObjectGetSelectedChipList(
        this.AvailableTags,
        this.Task.tags || []
      );

      console.log(obj);
      this.TagsFromControl.setValue(obj);
    } else {
      this.TagsFromControl.setValue([]);
    }
  }

  onFileChange(event: any) {
    this.file = event.target.files[0];
    let retobj = this.FromControl.value;
    retobj.file = this.file;
    this.FromControl.setValue(retobj);
  }
  getTextForFileSelect() {
    if (this.file) {
      const length = this.file.name.length;
      const str =
        this.file.name.substring(0, 15) +
        "..." +
        this.file.name.substring(length - 4, length);
      return str;
    }
    return "Select File";
  }

  updateReturnForm() {
    let obj: LunaUploadObject = this.FromControl.value;

    obj.collection = this.CollectionFromControl.value as string;
    obj.tags = this.TagsFromControl.value?.map((x) => x.name) || [];
    obj.name = this.FutFileNameFromControl.value || "";

    this.FromControl.setValue(obj);
  }
}

export interface LunaUploadObject {
  collection: string;
  tags: string[];
  file: File;
  name: string;
}
