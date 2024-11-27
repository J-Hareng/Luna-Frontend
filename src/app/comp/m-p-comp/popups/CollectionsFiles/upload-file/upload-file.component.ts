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
import { UploadFileResponse } from "../../DialogResponse";
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
  }

  ValidForUpload() {
    return this.fg.valid && this.file != null;
  }

  onTagChange(event: LunaDropDownObject[]) {
    this.selectedtags = event;
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
      const length = this.file.name.length;
      const str =
        this.file.name.substring(0, 15) +
        "..." +
        this.file.name.substring(length - 4, length);
      return str;
    }
    return "Select File";
  }

  onSubmit(event: Event) {
    event.preventDefault(); // Prevent default form submission
    this.Submit();
  }

  Submit() {
    const ResponseData: UploadFileResponse = {
      collection: this.data.collection,
      name: this.fg.value.name! || "Client Error",
      tags: this.selectedtags.map((element) => element.name),
      file: this.file!,
    };

    this.dialogRef.close(ResponseData);
  }

  onNoClick() {
    this.dialogRef.close(0);
  }
}
