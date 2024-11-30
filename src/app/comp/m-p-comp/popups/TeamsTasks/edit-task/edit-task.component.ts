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
import { NewTaskResponse } from "../../DialogResponse";
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
  ],
  templateUrl: "./edit-task.component.html",
  styleUrl: "./edit-task.component.scss",
})
export class EditTaskComponent {
  constructor(public mc: MainCacheService) {
    this.Collection.valueChanges.subscribe((value) => {
      this.updateValues(value as number);
    });
  }
  readonly dialogRef = inject(MatDialogRef<EditTaskComponent>);

  readonly data = inject<EditTaskData>(MAT_DIALOG_DATA);

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

  fg = new FormGroup({
    name: this.NameControll,
    des: this.DesControll,
    collection: this.Collection,
    tags: this.tags,
  });

  updateValues(collectionIndexChange: number) {
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
    return true;
  }

  Submit() {
    console.log(this.fg.value);
    this.dialogRef.close(this.fg.value);
  }
}
