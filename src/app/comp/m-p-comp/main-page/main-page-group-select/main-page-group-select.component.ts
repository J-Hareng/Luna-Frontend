import { Component } from '@angular/core';
import {
  FormControl,
  FormGroupDirective,
  NgForm,
  FormGroup,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatError } from '@angular/material/form-field';
import { MatDividerModule } from '@angular/material/divider';
import { MainCacheService } from '../../../../serv/logic/main-cache.service';
import { UserUtilsService } from '../../../../serv/API/user-utils.service';

@Component({
  selector: 'app-main-page-group-select',
  standalone: true,
  imports: [MatFormFieldModule, FormsModule, ReactiveFormsModule ,MatInputModule,MatError,MatDividerModule],
  templateUrl: './main-page-group-select.component.html',
  styleUrl: './main-page-group-select.component.scss'
})
export class MainPageGroupSelectComponent {
  constructor(public mc: MainCacheService, private apiUtils: UserUtilsService) {}


  CreateFormControl = new FormControl('', [Validators.required]);
  JoinFromControl = new FormControl('', [Validators.required])
  
  CreateGroupForm = new FormGroup({
    name: this.CreateFormControl
  });
  JoinGroupForm = new FormGroup({
    key: this.JoinFromControl
  });


  addGroupID() {
    let str = this.CreateFormControl.value || "";
    if (str.length == 0){
      return
    }

    this.apiUtils.CreateGroupID(
      this.mc.user._id,
      this.mc.user.name,
      str
    ).subscribe((data) => {
      this.mc.SetUpdata();
    });
  }

  joinGroupID() {
    let key = this.JoinFromControl.value || "";
    if (key.length == 0){
      return
    }
    this.apiUtils.JoinGrupViaInviteKey(key).subscribe((data) => {
      this.mc.SetUpdata();
    });
  }
}
