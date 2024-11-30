import { Component } from "@angular/core";
import { MainCacheService } from "../../../../../serv/logic/main-cache.service";
import { CommonModule } from "@angular/common";
import { NgFor } from "@angular/common";
import { MatAccordion, MatExpansionModule } from "@angular/material/expansion";
import { MatDividerModule } from "@angular/material/divider";
import { MatIcon } from "@angular/material/icon";
import { MatMenuModule } from "@angular/material/menu";
import { MatButtonToggleModule } from "@angular/material/button-toggle";
import {
  CollectionType,
  LinkType,
  TaskType,
  TeamType,
} from "../../../../../serv/mod/Types";
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from "@angular/forms";
import { TeamServService } from "../../../../../serv/API/c-serv/team-serv.service";
import { MatDialog } from "@angular/material/dialog";
import {
  AreYouSureData,
  EditTaskData,
  EditTeamData,
  NewTaskData,
} from "../../../popups/DialogData";
import { AreYouSurePupComponent } from "../../../popups/are-you-sure-pup/are-you-sure-pup.component";
import { NewTeamComponent } from "../../../popups/TeamsTasks/new-team/new-team.component";
import { EditTeamComponent } from "../../../popups/TeamsTasks/edit-team/edit-team.component";
import { NewTaskComponent } from "../../../popups/TeamsTasks/new-task/new-task.component";
import { EditTaskComponent } from "../../../popups/TeamsTasks/edit-task/edit-task.component";
@Component({
  selector: "app-dash-teams",
  standalone: true,
  imports: [
    CommonModule,
    MatDividerModule,
    NgFor,
    MatButtonToggleModule,
    FormsModule,
    ReactiveFormsModule,
    MatAccordion,
    MatExpansionModule,
    MatIcon,
    MatMenuModule,
    MatButtonToggleModule,
  ],
  templateUrl: "./dash-teams.component.html",
  styleUrl: "./dash-teams.component.scss",
})
export class DashTeamsComponent {
  formGroup = new FormGroup({});
  constructor(
    private dialog: MatDialog,
    public mc: MainCacheService,
    private apiTeam: TeamServService
  ) {}

  //* Display Func
  CreateNewFormControll(t: TeamType): string {
    this.formGroup.addControl(t._id, new FormControl(""));
    return t._id;
  }
  getTeamFormValue(t: TeamType): string {
    let a = this.formGroup.get(t._id)?.value || "";
    return a;
  }
  getBackGroundColor(taskL: LinkType): string {
    let n = "TaskFree";
    let a = "TaskInProgByUser";
    let b = "TaskInProg";

    let taskInfo = this.mc.Taskmap.get(taskL._id);
    if (taskInfo == undefined) {
      return n;
    } else if (taskInfo.IsWorkedOn) {
      if (taskInfo.UserIn) {
        return a;
      }
      return b;
    }
    return n;
  }
  IsUserInIt(taskL: LinkType): boolean {
    let taskInfo = this.mc.Taskmap.get(taskL._id);
    if (taskInfo == undefined) {
      return false;
    }
    return taskInfo.UserIn;
  }
  WhoIsWorkingOnIt(taskL: LinkType): LinkType[] {
    let taskInfo = this.mc.Taskmap.get(taskL._id);
    if (taskInfo == undefined || taskInfo.IsWorkedOn == false) {
      return [];
    }
    return taskInfo.task.inprogress;
  }
  HowManyAreWorkingOnIt(taskL: LinkType): string {
    let taskInfo = this.mc.Taskmap.get(taskL._id);

    if (taskInfo == undefined || taskInfo.IsWorkedOn == false) {
      return " ";
    }

    return taskInfo.task.inprogress.length.toString() + " + ";
  }
  getTask(taskL: LinkType): TaskType {
    let task = this.mc.Taskmap.get(taskL._id);
    if (task == undefined) {
      let emptyTask: TaskType = {
        _id: "0",
        name: "Error",
        des: "Error",
        groupid: "0",
        team: { _id: "0", name: "Error" },
        coll: "0",
        tags: [],
        inprogress: [],
      };
      return emptyTask;
    }
    return task.task;
  }

  //* Action Func
  // * teams
  createNewTeam() {
    const dialogRef = this.dialog.open(NewTeamComponent);
    dialogRef.afterClosed().subscribe((dres) => {
      if (dres == undefined) {
        return;
      }

      this.apiTeam
        .AddTeam(dres.name, dres.des, this.mc.user)
        .subscribe((res) => {
          if (res.status == "OK") {
            this.mc.updateTeams();
          }
        });
    });
  }
  editTeam(team: TeamType) {
    let d: EditTeamData = { name: team.name, des: team.des };
    const dialogRef = this.dialog.open(EditTeamComponent, { data: d });

    dialogRef.afterClosed().subscribe((dres) => {
      console.log(dres);
      if (dres == "NO CLICK") {
        return;
      }

      team.name = dres.name;
      team.des = dres.des;

      this.apiTeam.EditTeam(team).subscribe((res) => {
        if (res.status == "OK") {
          this.mc.updateTeams();
        }
      });
    });
  }
  deleteTeam(team: TeamType) {
    let d: AreYouSureData = {
      title: "Are You Sure You Want To delete " + team.name + "?",
      text: "If this Team is Deleted there is no going back",
      submitText: "Delete",
      status: false,
    };
    const dialogRef = this.dialog.open(AreYouSurePupComponent, { data: d });
    dialogRef.afterClosed().subscribe((dres) => {
      if (dres) {
        this.apiTeam.RemoveTeam(team).subscribe((res) => {
          if (res.status == "OK") {
            this.mc.updateTeams();
          }
        });
      }
    });
  }

  // * tasks
  addNewTask(team: TeamType) {
    let d: NewTaskData = { TeamName: team.name };

    const dialogRef = this.dialog.open(NewTaskComponent, { data: d });

    dialogRef.afterClosed().subscribe((dres) => {
      if (dres == undefined) {
        return;
      }

      this.apiTeam
        .AddTask(
          dres.name,
          dres.des,
          team,
          this.mc.user.groupid,
          dres.collection,
          dres.tags
        )
        .subscribe((res) => {
          if (res.status == "OK") {
            this.mc.updateTeams();
          }
        });
    });
  }
  editTask(task: TaskType) {
    let d: EditTaskData = {
      name: task.name,
      des: task.des,
      tags: task.tags || [],
      collection:
        this.mc.groupColl.find((coll) => coll._id == task.coll) ||
        ({} as CollectionType),
    };
    const dialogRef = this.dialog.open(EditTaskComponent, { data: d });

    dialogRef.afterClosed().subscribe((dres) => {
      if (dres == "NO CLICK") {
        return;
      }

      task.name = dres.name;
      task.des = dres.des;
      task.coll = dres.collection;
      task.tags = dres.tags;

      console.log(task);
    });
  }

  OnUnApplyClick(task: LinkType, team: TeamType) {
    this.apiTeam.RevokeTaskApplication(task).subscribe(
      (res) => {
        if (res.status != "OK") {
          console.log(res.error);
          return;
        } else {
          console.log(res);
          this.mc.updateTasks(team.tasks);
        }
      },
      (err) => {
        console.log(err);
      }
    );
  }

  OnApplyClick(task: LinkType, team: TeamType) {
    this.apiTeam.ApplyForTask(task, this.mc.getUserLink()).subscribe(
      (res) => {
        if (res.status != "OK") {
          console.log(res.error);
          return;
        } else {
          console.log(res);
          this.mc.updateTasks(team.tasks);
        }
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
