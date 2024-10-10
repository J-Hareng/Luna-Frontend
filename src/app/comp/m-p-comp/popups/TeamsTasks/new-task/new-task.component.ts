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
import { NgIf } from '@angular/common';
import { MainCacheService } from '../../../../../serv/logic/main-cache.service';
import { MatIconModule } from '@angular/material/icon';
import { NewTaskResponse } from '../../DialogResponse';
import { MatInputModule } from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {
  FormControl,
  FormGroupDirective,
  NgForm,
  FormGroup,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { NewTaskData } from '../../DialogData';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-new-task',
  standalone: true,
  imports: [MatDialogModule, MatIconModule, ReactiveFormsModule, FormsModule,NgFor, NgIf, MatInputModule,MatSelectModule],
  templateUrl: './new-task.component.html',
  styleUrl: './new-task.component.scss'
})
export class NewTaskComponent {
  readonly dialogRef = inject(MatDialogRef<NewTaskComponent>);
  readonly data = inject<NewTaskData>(MAT_DIALOG_DATA);

  constructor(public mc: MainCacheService) {
  }
  
  NameControll = new FormControl('', [Validators.required]);
  DesControll = new FormControl('');

  Collection = new FormControl(null);
  tags = new FormControl([""]);

  fg = new FormGroup({
    name: this.NameControll,
    des: this.DesControll,

    collection: this.Collection,
    tags: this.tags,
  })

  onNoClick(){
    this.dialogRef.close()
  }

  Submit(){
    
    if(!this.fg.invalid){

      let tagsres: string[] = this.fg.value.tags || [];

      let res: NewTaskResponse =  {

        name: this.fg.value.name || "",
        des: this.fg.value.des || "",
        collection: this.Collection.value != null ? this.mc.groupColl[this.fg.value.collection || 0]._id || "" : "", 
        tags: tagsres

      }
      console.log(res)

      this.dialogRef.close(res)
    }
  }
}
