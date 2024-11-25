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
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
@Component({
  selector: "app-popup-template",
  standalone: true,
  imports: [MatDialogModule, ReactiveFormsModule],
  templateUrl: "./popup-template.component.html",
  styleUrl: "./popup-template.component.scss",
})
export class PopupTemplateComponent {
  readonly dialogRef = inject(MatDialogRef<PopupTemplateComponent>);

  readonly data = inject<any>(MAT_DIALOG_DATA);

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
