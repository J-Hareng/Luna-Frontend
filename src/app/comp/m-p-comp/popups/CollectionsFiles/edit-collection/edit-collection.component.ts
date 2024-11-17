import { Component, inject } from "@angular/core";
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialog,
  MatDialogRef,
} from "@angular/material/dialog";
import { MainCacheService } from "../../../../../serv/logic/main-cache.service";
import { MatIconModule } from "@angular/material/icon";
// import { NewCollectionResponse } from "../../DialogResponse";
import { MatInputModule } from "@angular/material/input";
import { AddTagToCollectionData, EditCollectionData } from "../../DialogData";
import { MatChipsModule } from "@angular/material/chips";
import { MatSelectModule } from "@angular/material/select";
import { MatExpansionModule } from "@angular/material/expansion";
import {
  FormControl,
  FormGroup,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from "@angular/forms";
import { NgFor } from "@angular/common";
import { CollServService } from "../../../../../serv/API/c-serv/coll-serv.service";
import { AddTagComponent } from "../add-tag/add-tag.component";
@Component({
  selector: "app-edit-collection",
  standalone: true,
  imports: [
    MatDialogModule,
    MatIconModule,
    MatChipsModule,
    MatSelectModule,
    NgFor,
    MatExpansionModule,
    ReactiveFormsModule,
    FormsModule,
    MatInputModule,
  ],
  templateUrl: "./edit-collection.component.html",
  styleUrl: "./edit-collection.component.scss",
})
export class EditCollectionComponent {
  constructor(
    public mc: MainCacheService,
    private dialog: MatDialog,
    private apicoll: CollServService
  ) {}
  readonly dialogRef = inject(MatDialogRef<EditCollectionComponent>);

  readonly data = inject<EditCollectionData>(MAT_DIALOG_DATA);
  
  tagbtn = 0;
  tagInput = "";
  
  selectedTag = "";
  
  NameControll = new FormControl(this.data.collection.name, [
    Validators.required,
  ]);
  TagsControll = new FormControl("", [Validators.required]);
  
  
  fg = new FormGroup({
    name: this.NameControll,
  });

  Submit() {
    this.dialogRef.close();
  }

  onNoClick() {
    this.dialogRef.close();
  }

  addTagClick() {
    const data: AddTagToCollectionData = { collection: this.data.collection };
    const dialogRef = this.dialog.open(AddTagComponent, { data });
    dialogRef.afterClosed().subscribe((result) => {
      console.log(result);
    });

    // const dialogRef = this.dialog.open(AddTagComponent);
    // dialogRef.afterClosed().subscribe((result) => {
    //   if (result != 0) {
    //     this.apicoll.AddTagToColl(this.data.collection._id, result).subscribe((res) => {
    //     }
    //   }
    // });
  }
  isdisabled(): boolean {
  if (this.TagsControll.invalid && this.tagbtn === 0) {
    return true;
    } else if (this.tagbtn === 1 && this.TagsControll.value === this.selectedTag) {
    return true
    } else {
    return false;
    }
  
  }
  
  getTagBtnText(): string{
    if (this.tagbtn == 0) {
      return "Add Tag";
    } else {
      return "Edit Tag";
    }
  }
}
