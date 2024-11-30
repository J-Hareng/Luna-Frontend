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
import { MainCacheService } from "../../../../../serv/logic/main-cache.service";
import { MatIconModule } from "@angular/material/icon";
import { NewTeamResponse } from "../../DialogResponse";
import { MatInputModule } from "@angular/material/input";
import {
  FormControl,
  FormGroupDirective,
  NgForm,
  FormGroup,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from "@angular/forms";
import { EditTeamData } from "../../DialogData";

@Component({
  selector: "app-edit-team",
  standalone: true,
  imports: [
    MatDialogModule,
    MatIconModule,
    ReactiveFormsModule,
    FormsModule,
    MatInputModule,
  ],
  templateUrl: "./edit-team.component.html",
  styleUrl: "./edit-team.component.scss",
})
export class EditTeamComponent {
  constructor(public mc: MainCacheService) {}
  readonly dialogRef = inject(MatDialogRef<EditTeamComponent>);
  readonly data = inject<EditTeamData>(MAT_DIALOG_DATA);

  NameControll = new FormControl(this.data.name, [Validators.required]);
  DesControll = new FormControl(this.data.des);

  fg = new FormGroup({
    name: this.NameControll,
    des: this.DesControll,
  });

  onNoClick() {
    this.dialogRef.close("NO CLICK");
  }

  submit() {
    this.dialogRef.close(this.fg.value);
    console.log(this.fg.value);
  }
}
