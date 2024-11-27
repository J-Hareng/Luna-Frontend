import { Component, inject } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
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
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { PreviewFileData } from "../../DialogData";
@Component({
  selector: "app-file-preview",
  standalone: true,
  imports: [MatDialogModule, ReactiveFormsModule],
  templateUrl: "./file-preview.component.html",
  styleUrl: "./file-preview.component.scss",
})
export class FilePreviewComponent {
  readonly dialogRef = inject(MatDialogRef<FilePreviewComponent>);

  readonly data = inject<PreviewFileData>(MAT_DIALOG_DATA);

  fromName = new FormControl("", [Validators.required]);
  fg = new FormGroup({
    name: this.fromName,
  });

  Submit() {
    this.dialogRef.close(1);
  }

  onNoClick() {
    this.dialogRef.close(0);
  }
}
