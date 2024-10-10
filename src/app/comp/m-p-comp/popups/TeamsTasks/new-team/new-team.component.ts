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
import { NewTeamResponse } from '../../DialogResponse';
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

@Component({
  selector: 'app-new-team',
  standalone: true,
  imports: [MatDialogModule, MatIconModule, ReactiveFormsModule, FormsModule, MatInputModule],
  templateUrl: './new-team.component.html',
  styleUrl: './new-team.component.scss'
})
export class NewTeamComponent {
  constructor(public mc: MainCacheService){}
  readonly dialogRef = inject(MatDialogRef<NewTeamComponent>);

  NameControll = new FormControl('', [Validators.required]);
  DesControll = new FormControl('');

  fg = new FormGroup({
    name: this.NameControll,
    des: this.DesControll
  })

  onNoClick(){
    this.dialogRef.close()
  }

  Submit(){
 
    if(!this.fg.invalid){
      let res: NewTeamResponse = {
        name: this.fg.value.name || "",
        des: this.fg.value.des || ""    
      }

      this.dialogRef.close(res)
    }
  }

}
