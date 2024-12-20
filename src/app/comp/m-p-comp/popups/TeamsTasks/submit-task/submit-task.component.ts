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
import { LunaChipsComponent } from "../../../../../custom-components/luna-chips/luna-chips.component";
import { LunaInputComponent } from "../../../../../custom-components/luna-input/luna-input.component";
import { SubmitTaskData } from "../../DialogData";
@Component({
  selector: "app-submit-task",
  standalone: true,
  imports: [MatDialogModule, ReactiveFormsModule],
  templateUrl: "./submit-task.component.html",
  styleUrl: "./submit-task.component.scss",
})
export class SubmitTaskComponent {
  readonly dialogRef = inject(MatDialogRef<SubmitTaskComponent>);

  readonly data = inject<SubmitTaskData>(MAT_DIALOG_DATA);

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
