import { Component } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { MainCacheService } from '../../../../serv/logic/main-cache.service';
import { LinkType, otherUsers, TeamType } from '../../../../serv/mod/Types';
import { MatExpansionModule } from '@angular/material/expansion';
import { NgClass } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDivider } from '@angular/material/divider';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule} from '@angular/forms';
import { consumerMarkDirty } from '@angular/core/primitives/signals';
import { TeamServService } from '../../../../serv/API/c-serv/team-serv.service';
import { ok } from 'assert';

@Component({
  selector: 'app-main-teams',
  standalone: true,
  imports: [NgFor, NgIf, MatExpansionModule,NgClass,MatIconModule,MatDivider,MatFormFieldModule,MatInputModule, FormsModule],
  templateUrl: './main-teams.component.html',
  styleUrl: './main-teams.component.scss'
})
export class MainTeamsComponent {
constructor(public mc: MainCacheService, private apiTeam: TeamServService){}

selectedTeamIndex: number = 0
ShowInfo: boolean = false

IsTeamSelected(i: number): string{
  if (i == this.selectedTeamIndex){
  return "selected"
  }
  return ""

}
getClassIfUserIsWorking(UserLink: LinkType): string{
  let u = this.getOtherUser(UserLink)
  if(u.tasks == undefined || u.tasks.length == 0){
    return ""
  }
  return "IsWorking"
}

setSelectedIndex(i: number){
  this.selectedTeamIndex = i;
}

ShowInfoClass(): string{
  if (this.ShowInfo){
    return "Show"
  }
  return ""
}

isCurrentUserInTeam(team: TeamType): boolean {
  return team.users.some(user => user._id === this.mc.user._id);
}


getSelectedTeam(): TeamType{
  return this.mc.Teams[this.selectedTeamIndex]
}


getOtherUser(user: LinkType): otherUsers{
  return this.mc.UserMap.get(user._id) || {} as otherUsers
}

getTeamId(TeamType: TeamType): LinkType{
  return {_id: TeamType._id, name: TeamType.name}
}

JoinTeamClick(Team: LinkType){
  this.apiTeam.AddUserToTeam(this.mc.getUserLink(), Team).subscribe(
    (data) => {
      if (data.status == "OK"){
        this.mc.updateTeams()
      }

    }
  )

}
LeaveTeamClick(Team: LinkType) {
  this.apiTeam.RemoveUserFromTeam(this.mc.getUserLink(), Team).subscribe(
    (data) => {
      if (data.status == "OK"){
        this.mc.updateTeams()
      }
    }
  )
}


}
