import { Renderer2, ElementRef } from '@angular/core';
import { MainCacheService } from '../../../../serv/logic/main-cache.service';
import { TeamServService } from '../../../../serv/API/c-serv/team-serv.service';
import { PopupServService } from '../../../../serv/logic/popup-serv.service';
import { ExitOnbackklickComponent } from '../../../extra/exit-onbackklick/exit-onbackklick.component';
import {ChangeDetectionStrategy, Component, inject, model, signal} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Clipboard } from '@angular/cdk/clipboard';

import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { inviteToGroupData } from '../DialogData';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-invite-to-group',
  standalone: true,
  imports: [MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatIconModule],
  templateUrl: './invite-to-group.component.html',
  styleUrl: './invite-to-group.component.scss'
})
export class InviteToGroupComponent {
  constructor(public mc: MainCacheService, private cp: Clipboard, private sn: MatSnackBar){}
  readonly dialogRef = inject(MatDialogRef<InviteToGroupComponent>);
  readonly data = inject<inviteToGroupData>(MAT_DIALOG_DATA);

  onNoClick(): void {
    this.dialogRef.close();
  }
  clicked(){
    this.sn.open('Copied Key to clipboard', 'close', {duration: 2000});
    this.cp.copy(this.data.Key);
  }
}
