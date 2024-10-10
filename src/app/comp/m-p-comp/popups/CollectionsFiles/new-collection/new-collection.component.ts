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
import {
  FormControl,
  FormGroupDirective,
  NgForm,
  FormGroup,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { EditCollectionData } from '../../DialogData';
@Component({
  selector: 'app-new-collection',
  standalone: true,
  imports: [MatDialogModule, MatIconModule, ReactiveFormsModule, FormsModule, MatInputModule],
  templateUrl: './new-collection.component.html',
  styleUrl: './new-collection.component.scss'
})
export class NewCollectionComponent {
  constructor(public mc: MainCacheService){}
  readonly dialogRef = inject(MatDialogRef<NewCollectionComponent>);


  
  NameControll = new FormControl('', [Validators.required]);


  fg = new FormGroup({
    name: this.NameControll,
  })
  
    onNoClick(){
      this.dialogRef.close()
    }
  
    Submit(){
      if(!this.fg.invalid){
        let res: NewCollectionResponse = {
          name: this.fg.value.name || "",  
        }
  
        this.dialogRef.close(res)
      }
    }


}
