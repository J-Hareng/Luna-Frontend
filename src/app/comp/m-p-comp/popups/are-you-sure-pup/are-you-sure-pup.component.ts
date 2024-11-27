import { Renderer2, ElementRef } from "@angular/core";
import { MainCacheService } from "../../../../serv/logic/main-cache.service";
import { TeamServService } from "../../../../serv/API/c-serv/team-serv.service";
import { PopupServService } from "../../../../serv/logic/popup-serv.service";
import { ExitOnbackklickComponent } from "../../../extra/exit-onbackklick/exit-onbackklick.component";
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  model,
  signal,
} from "@angular/core";
import { FormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { AreYouSureData } from "../DialogData";

@Component({
  selector: "app-are-you-sure-pup",
  standalone: true,
  imports: [
    ExitOnbackklickComponent,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
  ],
  templateUrl: "./are-you-sure-pup.component.html",
  styleUrl: "./are-you-sure-pup.component.scss",
})
export class AreYouSurePupComponent {
  readonly dialogRef = inject(MatDialogRef<AreYouSurePupComponent>);
  readonly data = inject<AreYouSureData>(MAT_DIALOG_DATA);
  constructor() {
    console.log(this.data);
  }
  submit() {
    this.dialogRef.close(true);
  }

  onNoClick(): void {
    this.dialogRef.close(false);
  }
}
