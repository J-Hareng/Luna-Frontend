import { Component } from '@angular/core';
import { MainCacheService } from '../../../../serv/logic/main-cache.service';
import { UserUtilsService } from '../../../../serv/API/user-utils.service';
import { PopupServService } from '../../../../serv/logic/popup-serv.service';
import { AuthService } from '../../../../serv/API/auth.service';
import { distinctUntilChanged, filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import {MatMenuModule} from '@angular/material/menu';
import { MatIcon } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { SiteStatus } from '../../../../serv/logic/main-cache.service';
import { AreYouSurePupComponent } from '../../popups/are-you-sure-pup/are-you-sure-pup.component';
import { AreYouSureData , inviteToGroupData} from '../../popups/DialogData';
import { WinServService } from '../../../../serv/logic/win-serv.service';
import {MatDividerModule} from '@angular/material/divider';
import { InviteToGroupComponent } from '../../popups/invite-to-group/invite-to-group.component';

@Component({
  selector: 'app-main-header',
  standalone: true,
  imports: [MatProgressBarModule, MatMenuModule, MatIcon, MatButtonModule,MatDividerModule],
  templateUrl: './main-header.component.html',
  styleUrl: './main-header.component.scss'
})
export class MainHeaderComponent {
  constructor(public mc: MainCacheService,
    private apiUtils: UserUtilsService,
    private apiAuth: AuthService,
    private popupManager: PopupServService,
    private dialog: MatDialog,
    public Ws: WinServService
  ) {}
  st = SiteStatus

  private sub!: Subscription;  

  singOut() {
    this.apiAuth.RemoveSessionToken()
  }

  leaveGroup() {
    // this.UserIsKlickt = false;
    let conf: AreYouSureData =  {
      title: 'Do you really want to leave the group?',
      text: 'If you leaf you cant rejoin without a new invite key!',
      submitText: 'Leave',
      status: true

    } 
    const dialogRef = this.dialog.open(AreYouSurePupComponent, {data: conf})
    dialogRef.afterClosed().subscribe(
      res => {
        if (res){
            this.apiUtils
              .RemoveGroupID()
              .subscribe(
                (data) => {
                  if (data.error != "" && data.error != undefined){
                    console.log(data.error)
                    return
                  }
                  this.apiAuth.RemoveSessionToken();
                  this.apiAuth.ValidateSessionToken("Dashboard");
                },
                (err) => {
                  console.log(err);
                }
              );
        }
      }
    )
  }
  InviteToGroup() {
    // this.UserIsKlickt = false;
    // this.popupManager.AUserToBool = true;
    this.mc.isLoadingSmall = true;
    this.apiUtils.CreateGrupInviteKey(this.mc.getUserLink()).subscribe(
      (res) => {
        console.log(res)
        if (res.error != "" && res.error != undefined){
          this.mc.isLoadingSmall = false;
          return
        }

        let d: inviteToGroupData = { 
          Key: res.body
        }
        console.log(d)
        this.mc.isLoadingSmall = false;
        const dialogRef = this.dialog.open(InviteToGroupComponent, {data: d})
       
        dialogRef.afterClosed().subscribe((res) => {console.log(res)})
      }, 
      (error) =>{
        this.mc.isLoadingSmall = false
      }

    )
  }
}
