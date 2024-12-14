import {
  LunaChipsComponent,
  LunaChipsObject,
  LunaChipsObjectCreator,
} from "../../../../../custom-components/luna-chips/luna-chips.component";
import { Component, inject } from "@angular/core";
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from "@angular/material/dialog";
import { NgIf } from "@angular/common";
import { MainCacheService } from "../../../../../serv/logic/main-cache.service";
import { MatIconModule } from "@angular/material/icon";
import { EditTaskResponse, NewTaskResponse } from "../../DialogResponse";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import {
  FormControl,
  FormGroupDirective,
  NgForm,
  FormGroup,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from "@angular/forms";
import { EditTaskData } from "../../DialogData";
import { NgFor } from "@angular/common";
import { combineLatest } from "rxjs";
import { LunaInputComponent } from "../../../../../custom-components/luna-input/luna-input.component";
import { LunaTextareaComponent } from "../../../../../custom-components/luna-textarea/luna-textarea.component";
import { LunaSlideToggleComponent } from "../../../../../custom-components/luna-slide-toggle/luna-slide-toggle.component";
import { CollectionType } from "../../../../../serv/mod/Types";
@Component({
  selector: "app-edit-task",
  standalone: true,
  imports: [
    MatDialogModule,
    MatIconModule,
    ReactiveFormsModule,
    FormsModule,
    NgFor,
    NgIf,
    MatInputModule,
    MatSelectModule,
    LunaChipsComponent,
    LunaInputComponent,
    LunaTextareaComponent,
    LunaSlideToggleComponent,
  ],
  templateUrl: "./edit-task.component.html",
  styleUrl: "./edit-task.component.scss",
})
export class EditTaskComponent {
  constructor(public mc: MainCacheService) {
    this.Collection.valueChanges.subscribe((value) => {
      this.updateValues(value as number);
    });

    this.tags.valueChanges.subscribe((value) => {
      if (value) {
        this.newSelectedTags = this.oldtags;
        this.CollectonIndex = this.CollectionIndexBuffer;
      }
    });
  }
  readonly dialogRef = inject(MatDialogRef<EditTaskComponent>);

  readonly data = inject<EditTaskData>(MAT_DIALOG_DATA);

  onLunaTextChange(event: string) {
    console.log(event);
  }
  onNameChange(event: string) {
    console.log(event);
  }
  onLunaChipsChange(event: LunaChipsObject[]) {
    this.newSelectedTags = event.map((e) => e.name);
  }
  lunaChips: LunaChipsObject[] = LunaChipsObjectCreator(
    this.data.collection?.tags ?? []
  );
  lunaPreselectedChips: LunaChipsObject[] = LunaChipsObjectCreator(
    this.data.tags
  );

  newSelectedTags: string[] = [];

  oldtags = this.data.tags;

  tagsFromTeam = this.data.collection.tags;

  CollectonIndex = this.mc.groupColl.findIndex(
    (c) => c._id == this.data.collection._id
  );
  CollectionIndexBuffer = this.CollectonIndex;

  NameControll = new FormControl(this.data.name, [Validators.required]);
  DesControll = new FormControl(this.data.des);
  Collection = new FormControl(this.CollectonIndex);
  tags = new FormControl(this.data.tags);
  withFile = new FormControl(
    this.data.collection._id != null && this.data.collection._id != undefined
  );

  fg = new FormGroup({
    name: this.NameControll,
    des: this.DesControll,
    collection: this.Collection,
    tags: this.tags,
  });

  updateValues(collectionIndexChange: number) {
    if (collectionIndexChange == this.mc.groupColl.length + 10) {
      this.CollectonIndex = collectionIndexChange;
      this.tagsFromTeam = this.mc.groupColl[collectionIndexChange].tags;

      this.lunaChips = LunaChipsObjectCreator(this.tagsFromTeam ?? []);

      this.lunaPreselectedChips = LunaChipsObjectCreator(
        this.CollectionIndexBuffer != collectionIndexChange ? [] : this.oldtags
      );

      return;
    }

    this.CollectonIndex = collectionIndexChange;
    this.tagsFromTeam = this.mc.groupColl[collectionIndexChange].tags;

    this.lunaChips = LunaChipsObjectCreator(this.tagsFromTeam ?? []);

    this.lunaPreselectedChips = LunaChipsObjectCreator(
      this.CollectionIndexBuffer != collectionIndexChange ? [] : this.oldtags
    );

    console.log(this.tags.value);
  }

  onNoClick() {
    this.dialogRef.close("NO CLICK");
  }
  NotReadyToSubmit(): boolean {
    if (this.NameControll.invalid) {
      return true;
    }
    if (
      this.DesControll.value == this.data.des &&
      this.NameControll.value == this.data.name &&
      this.CollectonIndex == this.CollectionIndexBuffer &&
      this.newSelectedTags == this.oldtags
    ) {
      return true;
    }

    return false;
  }

  Submit() {
    console.log(this.fg.value);
    if (this.NotReadyToSubmit()) {
      return;
    }

    const resTask: EditTaskResponse = {
      name: this.NameControll.value || this.data.name,
      des: this.DesControll.value || this.data.des || "",
      tags: this.withFile.value ? this.newSelectedTags : [],
      collection: this.withFile.value
        ? this.mc.groupColl[this.CollectonIndex]._id
        : "",
    };

    this.dialogRef.close(resTask);
  }
}
