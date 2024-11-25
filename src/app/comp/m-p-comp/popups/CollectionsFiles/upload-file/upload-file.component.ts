import {
  Component,
  inject,
  ChangeDetectorRef,
  AfterViewInit,
} from "@angular/core";
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
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";

import { AddTagToCollectionData } from "../../DialogData";
import { LunaDropDownObject } from "../../../../../custom-components/luna-drop-down-menu/luna-drop-down-menu.component";
import { LunaMultiDropDownMenuComponent } from "../../../../../custom-components/luna-multi-drop-down-menu/luna-multi-drop-down-menu.component";
import { LunaDropDownObjectCreator } from "../../../../../custom-components/luna-drop-down-menu/luna-drop-down-menu.component";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatChipsModule } from "@angular/material/chips";
import { NgFor } from "@angular/common";
import {
  LunaChipsComponent,
  LunaChipsObject,
  LunaChipsObjectCreator,
} from "../../../../../custom-components/luna-chips/luna-chips.component";
import { ViewChild } from "@angular/core";
import { ElementRef } from "@angular/core";
@Component({
  selector: "app-upload-file",
  standalone: true,
  imports: [
    MatDialogModule,
    ReactiveFormsModule,
    // LunaMultiDropDownMenuComponent,
    MatExpansionModule,
    MatChipsModule,
    NgFor,
    LunaChipsComponent,
  ],
  templateUrl: "./upload-file.component.html",
  styleUrl: "./upload-file.component.scss",
})
export class UploadFileComponent {
  constructor(private cdr: ChangeDetectorRef) {}
  readonly dialogRef = inject(MatDialogRef<UploadFileComponent>);

  readonly data = inject<AddTagToCollectionData>(MAT_DIALOG_DATA);

  filenamefrom = new FormControl("", [Validators.required]);

  fg = new FormGroup({
    name: this.filenamefrom,
  });

  selectedtags: LunaDropDownObject[] = [];

  file: File | null = null;

  onFileChange(event: any) {
    this.file = event.target.files[0];

    console.log(this.file?.name);
  }

  ValidForUpload() {
    console.log(this.fg.valid);
    console.log(this.file != null);
    return this.fg.valid && this.file != null;
  }

  onTagChange(event: LunaDropDownObject[]) {
    this.selectedtags = event;
    console.log("Selected Tags");
    console.log(this.selectedtags);
  }

  createTagList(): LunaDropDownObject[] {
    return LunaChipsObjectCreator(this.data.collection?.tags || []);
  }
  // TagIsKlicked(tag: LunaDropDownObject) {
  //   if (this.selectedtags.includes(tag)) {
  //     this.selectedtags = this.selectedtags.filter(
  //       (element) => element !== tag
  //     );
  //   } else {
  //     this.selectedtags.push(tag);
  //   }
  // }

  getTextForFileSelect() {
    if (this.file) {
      return this.file.name;
    }
    return "Select File";
  }

  Submit() {
    this.dialogRef.close(1);
  }

  onNoClick() {
    this.dialogRef.close(0);
  }
}
