import { Component, inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MainCacheService } from '../../../../../serv/logic/main-cache.service';
import { MatIconModule } from '@angular/material/icon';
import { NewCollectionResponse, NewTeamResponse } from '../../DialogResponse';
import { MatInputModule } from '@angular/material/input';
import { EditCollectionData } from '../../DialogData';
import { MatChipsModule } from '@angular/material/chips';
import { MatSelectModule } from '@angular/material/select';
import {MatExpansionModule} from '@angular/material/expansion';
import {
  FormControl,
  FormGroupDirective,
  NgForm,

  FormGroup,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { NgFor } from '@angular/common';
@Component({
  selector: 'app-add-tag',
  standalone: true,
  imports: [MatDialogModule, MatIconModule,MatChipsModule,MatSelectModule,NgFor,MatExpansionModule, ReactiveFormsModule, FormsModule, MatInputModule],
  templateUrl: './add-tag.component.html',
  styleUrl: './add-tag.component.scss'
})
export class AddTagComponent {
  constructor(public mc: MainCacheService, private dialog: MatDialog){}
  readonly dialogRef = inject(MatDialogRef<AddTagComponent>);




  NameControll = new FormControl('', [Validators.required]);
  fg = new FormGroup({
    name: this.NameControll,
  })


  Submit(){
    this.dialogRef.close(this.NameControll.value)
  }
  onNoClick(){
    this.dialogRef.close(0)
  }
}
