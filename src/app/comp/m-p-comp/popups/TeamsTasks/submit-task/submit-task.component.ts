import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  inject,
  OnInit,
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
import {
  LunaChipsComponent,
  LunaChipsObject,
  LunaChipsObjectCreator,
} from "../../../../../custom-components/luna-chips/luna-chips.component";
import { LunaInputComponent } from "../../../../../custom-components/luna-input/luna-input.component";
import { SubmitTaskData } from "../../DialogData";
import { CommonModule } from "@angular/common";
import { MatSelectModule } from "@angular/material/select";

import { MainCacheService } from "../../../../../serv/logic/main-cache.service";
import { preserveWhitespacesDefault } from "@angular/compiler";
import { LunaSlideToggleComponent } from "../../../../../custom-components/luna-slide-toggle/luna-slide-toggle.component";
import { LunaFileUploadAndLocationSelectorComponent } from "../../../../../custom-components/luna-file-upload-and-location-selector/luna-file-upload-and-location-selector.component";
import { LunaUploadObject } from "../../../../../serv/mod/Types";
@Component({
  selector: "app-submit-task",
  standalone: true,
  imports: [
    MatDialogModule,
    ReactiveFormsModule,
    MatSelectModule,
    CommonModule,
    LunaSlideToggleComponent,
    LunaFileUploadAndLocationSelectorComponent,
  ],
  templateUrl: "./submit-task.component.html",
  styleUrl: "./submit-task.component.scss",
})
export class SubmitTaskComponent implements OnInit, AfterViewInit {
  readonly dialogRef = inject(MatDialogRef<SubmitTaskComponent>);

  readonly data = inject<SubmitTaskData>(MAT_DIALOG_DATA);
  constructor(public mc: MainCacheService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    if (this.data.task.coll == "") {
      this.formWithFile.setValue(false);
    } else {
      this.formWithFile.setValue(true);
    }
  }

  ngAfterViewInit(): void {
    this.cdr.detectChanges();
  }

  formWithFile = new FormControl(true);

  fromUpload = new FormControl<LunaUploadObject>({} as LunaUploadObject);

  isValid(): boolean {
    if (!this.formWithFile.value) {
      return true;
    } else if (
      this.fromUpload.value != undefined &&
      this.fromUpload.value?.collection != "" &&
      this.fromUpload.value?.file != undefined &&
      this.fromUpload.value?.name != ""
    ) {
      return true;
    }
    return false;
  }

  Submit() {
    if (this.isValid()) {
      if (!this.formWithFile.value) {
        let retObj = this.fromUpload.value as LunaUploadObject;
        retObj.name = "";
        this.dialogRef.close(retObj);
        return;
      } else {
        this.dialogRef.close(this.fromUpload.value);
        return;
      }
    }
    this.dialogRef.close(0);
  }

  onNoClick() {
    this.dialogRef.close(0);
  }
}
