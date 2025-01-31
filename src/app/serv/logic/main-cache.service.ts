import { Injectable } from "@angular/core";
import { AuthService } from "../API/auth.service";
import { UserUtilsService } from "../API/user-utils.service";
import { Router } from "@angular/router";
import { TeamServService } from "../API/c-serv/team-serv.service";
import { CollServService } from "../API/c-serv/coll-serv.service";

import { Subscription } from "rxjs";
import {
  TeamType,
  userType,
  TaskType,
  FileType,
  TaskMap,
  CollectionType,
  FileBlobType,
  AreYouSureConfig,
  LinkType,
  taskInfoType,
  otherUsers,
} from "../mod/Types";

import { BehaviorSubject, Observable, of } from "rxjs";
import { tap, timestamp } from "rxjs/operators";
import { map } from "rxjs/operators";
import { Conditional } from "@angular/compiler";
import { NotifierStreamService } from "../API/notifier-stream.service";

export enum SiteStatus {
  Main = "MAIN",
  Teams = "TEAMS",
  Collection = "COLLECTION",
}

@Injectable({
  providedIn: "root",
})
export class MainCacheService {
  constructor(
    private apiAuth: AuthService,
    private apiUser: UserUtilsService,
    private apiTeam: TeamServService,
    private apiColl: CollServService
  ) {}

  private IncrementCounter() {
    let curCounter = this.counter.getValue();
    this.counter.next(curCounter + 1);
  }
  private ResetCounter() {
    this.counter.next(0);
  }
  private ValidateIsLoading(): boolean {
    this.counter
      .pipe(
        tap((count) => {
          if (count >= 1) {
            this.isLoading = false;
            return false;
          } else {
            this.isLoading = true;
            return true;
          }
        })
      )
      .subscribe();
    return this.isLoading;
  }

  isLoading: boolean = false;
  isLoadingSmall: boolean = false;

  Teams!: TeamType[];
  user!: userType;
  userTeams: TeamType[] = [];
  groupColl!: CollectionType[];
  fileMapForColl = new Map<string, FileBlobType[]>();

  // SelectedTask!: TaskType;
  // selectedCollection!: CollectionType;
  // selectedTeam!: TeamType;

  Taskmap: Map<string, taskInfoType> = new Map<string, taskInfoType>();
  UserMap: Map<string, otherUsers> = new Map<string, otherUsers>();

  // SiteStatus: SiteStatus = SiteStatus.Main;
  SiteStatus: SiteStatus = SiteStatus.Main;

  counter = new BehaviorSubject<number>(0);

  reremder = new BehaviorSubject<boolean>(true);

  private UpdateTaskCache(tasks: TaskType[]): void {
    if (tasks != null || tasks != undefined) {
      tasks.forEach((task) => {
        let ui: boolean;
        let IsWorkedOn: boolean;

        if (task.inprogress == null || task.inprogress == undefined) {
          ui = false;
          IsWorkedOn = false;
        } else {
          ui = task.inprogress.some(
            (user: LinkType) => user._id === this.user._id
          );
          IsWorkedOn = task.inprogress.length > 0;
        }

        let tInf: taskInfoType = {
          task: task,
          UserIn: ui,
          IsWorkedOn: IsWorkedOn,
        };

        this.Taskmap.set(task._id, tInf);
      });
    }
  }

  SetUpdata() {
    this.ResetCounter();
    this.isLoading = true;
    this.apiAuth.ValidateSessionToken("Dashboard");
    this.apiUser.GetUserSetupData().subscribe(
      (res) => {
        if (res.error != null && res.error != undefined && res.error != "") {
          console.error("Faild");
          console.log(res.error);
          return;
        }
        if (res.status == "NoID") {
          this.user = res.body.user;
          this.isLoading = false;
          return;
        }

        let resBody = res.body;

        this.user = resBody.user;

        if (resBody.collections == null) {
          this.groupColl = [];
        } else {
          this.groupColl = resBody.collections;
        }

        this.updateTeamCache(resBody.teams);

        this.updateUsersCache(resBody.otherusers);

        this.UpdateTaskCache(resBody.tasks);

        this.isLoading = false;
      },
      (err) => {
        console.log("error");
        console.error(err);
      }
    );
  }

  // updateCollections(): Observable<number> {

  //   let sc = this.selectedCollection;
  //   return this.apiColl.GetAllColls(this.user.groupid).pipe(
  //     map((res) => {
  //       this.groupColl = res;
  //       this.selectedCollection = res.find((coll) => coll._id === sc._id) || sc;
  //       this.reremder.next(true);
  //       return 1;
  //     })
  //   );
  // }
  updateTeams() {
    this.isLoadingSmall = true;

    this.apiTeam.getAllteamsInGroup().subscribe((res) => {
      let teams = res.body;
      this.updateTeamCache(teams);
      this.isLoadingSmall = false;
    });
  }

  updateTasks(tasksL: LinkType[]): void {
    if (tasksL == null || tasksL.length == 0) {
      return;
    }
    this.isLoadingSmall = true;
    this.apiTeam.GetTasksArray(tasksL).subscribe(
      (res) => {
        if (res.status != "OK") {
          console.error(res.error);
          return;
        }
        this.UpdateTaskCache(res.body);
        this.isLoadingSmall = false;
        console.log(this.Taskmap.size);
      },
      (err) => {
        console.error(err);
        this.isLoadingSmall = false;
      }
    );
  }

  updateTeamCache(teams: TeamType[]): void {
    if (teams == null || teams.length == 0) {
      this.Teams = [];
      this.userTeams = [];
      return;
    }
    this.Teams = teams;

    this.userTeams = [];
    teams.map((Team) => {
      if (Team.users == null || Team.users == undefined) {
        Team.users = [];
        return;
      }
      if (Team.users.some((user) => user._id === this.user._id)) {
        this.userTeams.push(Team);
      }
    });
  }

  updateUsersCache(users: otherUsers[]): void {
    if (users == null || users.length == 0) {
      return;
    }

    users.map((user) => {
      if (user._id != this.user._id) {
        this.UserMap.set(user._id, user);
      }
    });
  }
  updateCollections(): void {
    this.isLoadingSmall = true;
    this.apiColl.GetAllColls(this.user.groupid).subscribe(
      (res) => {
        this.groupColl = res.body;
        this.updateTeams();
      },
      (err) => {
        console.error(err);
        this.isLoadingSmall = false;
      }
    );
  }
  getUser(): userType {
    return this.user;
  }

  getUserLink(): LinkType {
    return { _id: this.user._id, name: this.user.name };
  }

  getGrupIdName(): string {
    length = this.user.groupid.length;
    return this.user.groupid.slice(0, length - 6);
  }

  getTask(taskId: string): taskInfoType {
    return this.Taskmap.get(taskId) || ({} as taskInfoType);
  }

  // Task Updates
  // * Update:
  UpdateTask(t: TaskType) {
    let IsOnOit =
      t.inprogress != undefined &&
      t.inprogress.length > 0 &&
      t.inprogress.includes({ _id: this.user._id, name: this.user.name });
    let task: taskInfoType = {
      task: t,
      IsWorkedOn: t.inprogress != undefined && t.inprogress.length > 0,
      UserIn: IsOnOit,
    };
    this.Teams.forEach((team) => {
      if (team.tasks.some((task) => task._id === t._id)) {
        (team.tasks as LinkType[]).forEach((task) => {
          if (task._id === t._id) {
            task.name = t.name;
          }
        });
      }
    });

    this.Taskmap.set(t._id, task);
  }

  DeleteTask(taskId: string) {
    this.Taskmap.delete(taskId);

    this.Teams.forEach((team) => {
      team.tasks = team.tasks.filter((task) => task._id !== taskId);
    });
  }
}
