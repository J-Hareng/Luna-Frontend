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

@Component({
  selector: "app-submit-task",
  standalone: true,
  imports: [
    MatDialogModule,
    ReactiveFormsModule,
    LunaInputComponent,
    MatSelectModule,
    LunaChipsComponent,
    CommonModule,
    LunaSlideToggleComponent,
  ],
  templateUrl: "./submit-task.component.html",
  styleUrl: "./submit-task.component.scss",
})
export class SubmitTaskComponent implements OnInit, AfterViewInit {
  constructor(public mc: MainCacheService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.fromColl.setValue(this.data.task.coll);

    if (this.data.task.coll == "") {
      console.log("No Coll");
      console.log(this.data.task);
      this.formWithFile.setValue(false);
    } else {
      this.formWithFile.setValue(true);
    }

    let preTags = LunaChipsObjectCreator(this.data.task.tags || []);

    this.preSelectedTags = preTags;
    this.originalTags = preTags;

    this.AvailableTags = LunaChipsObjectCreator(
      this.mc.groupColl.find((x) => x._id === this.data.task.coll)?.tags || []
    );

    this.fromColl.valueChanges.subscribe((value) => {
      console.log(value);
      if (value == this.data.task.coll) {
        console.log("isSame");
        this.preSelectedTags = this.originalTags;
      } else {
        this.preSelectedTags = [];
      }
      this.AvailableTags = LunaChipsObjectCreator(
        this.mc.groupColl.find((x) => x._id === value)?.tags || []
      );
    });
  }

  onTagsChange(event: LunaChipsObject[]) {
    console.log(this.fromColl.value);
    console.log(event);
  }
  ngAfterViewInit(): void {
    this.cdr.detectChanges();
  }

  readonly dialogRef = inject(MatDialogRef<SubmitTaskComponent>);

  readonly data = inject<SubmitTaskData>(MAT_DIALOG_DATA);

  originalTags: LunaChipsObject[] = [];

  preSelectedTags: LunaChipsObject[] = [];

  AvailableTags: LunaChipsObject[] = [];

  file: File | null = null;

  onFileChange(event: any) {
    this.file = event.target.files[0];
  }

  fromColl = new FormControl(this.data.task.coll, [Validators.required]);
  fromName = new FormControl("", [Validators.required]);
  fromTags = new FormControl(this.AvailableTags, [Validators.required]);
  formWithFile = new FormControl(true);

  fg = new FormGroup({
    name: this.fromName,
  });

  Submit() {
    this.dialogRef.close(1);
  }

  onNoClick() {
    this.dialogRef.close(0);
  }
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
}
