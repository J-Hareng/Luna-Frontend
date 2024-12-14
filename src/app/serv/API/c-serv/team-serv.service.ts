import { Injectable } from "@angular/core";
import { API_BASE_URL } from "../../../const";
import { Router } from "@angular/router";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, of } from "rxjs";
import { catchError } from "rxjs/operators";
import { userType, TeamType, LinkType, TaskType } from "../../mod/Types";
import { LunaResponse } from "../../mod/ReqMods";
import { AuthService } from "../auth.service";
@Injectable({
  providedIn: "root",
})
export class TeamServService {
  constructor(private http: HttpClient, private apiAuth: AuthService) {}

  getAllteamsInGroup(): Observable<LunaResponse<TeamType[]>> {
    return this.http.get<LunaResponse<TeamType[]>>(
      API_BASE_URL + "/api/getTeams",
      {
        withCredentials: true,
        headers: this.apiAuth.GetHeaders(),
      }
    );
  }

  GetUserTeams(): Observable<any> {
    return this.http
      .get<TeamType[]>(API_BASE_URL + "/api/getUserTeams", {
        withCredentials: true,
      })
      .pipe(
        catchError((error) => {
          console.error("Error", error);
          return of({
            _id: "Error",
            name: "",
            email: "",
            password: "",
            avalability: "",
            groupid: "",
          });
        })
      );
  }

  EditTeam(t: TeamType): Observable<LunaResponse<string>> {
    const body = {
      team: t,
    };

    return this.http.post<LunaResponse<string>>(
      API_BASE_URL + "/api/editTeam",
      body,
      {
        withCredentials: true,
        headers: this.apiAuth.GetHeaders(),
      }
    );
  }

  AddTeam(
    name: string,
    des: string,
    user: userType
  ): Observable<LunaResponse<string>> {
    const body = {
      name: name,
      des: des,
      user: {
        _id: user._id,
        name: user.name,
      },
      groupid: user.groupid,
    };
    return this.http.post<LunaResponse<string>>(
      API_BASE_URL + "/api/addTeam",
      body,
      {
        withCredentials: true,
        headers: this.apiAuth.GetHeaders(),
      }
    );
  }

  AddTask(
    name: string,
    des: string,
    team: TeamType,
    gruID: string,
    collID: string,
    Tags: string[]
  ): Observable<LunaResponse<string>> {
    const body = {
      name: name,
      des: des,
      team: {
        _id: team._id,
        name: team.name,
      },
      groupid: gruID,
      collID: collID,
      tags: Tags,
    };

    return this.http.post<LunaResponse<string>>(
      API_BASE_URL + "/api/AddTask",
      body,
      {
        withCredentials: true,
        headers: this.apiAuth.GetHeaders(),
      }
    );
  }

  RemoveTask(task: LinkType, id: string): Observable<any> {
    const body = {
      tasks: task,
      teamid: id,
    };
    return this.http.post(API_BASE_URL + "/api/RemoveTask", body, {
      withCredentials: true,
    });
  }

  EditTask(task: TaskType): Observable<LunaResponse<string>> {
    const body = task;
    return this.http.post<LunaResponse<string>>(
      API_BASE_URL + "/api/EditTask",
      body,
      {
        withCredentials: true,
        headers: this.apiAuth.GetHeaders(),
      }
    );
  }

  RemoveTeam(team: TeamType): Observable<LunaResponse<string>> {
    const body = {
      team: {
        _id: team._id,
        name: team.name,
      },
    };

    return this.http.post<LunaResponse<string>>(
      API_BASE_URL + "/api/RemoveTeam",
      body,
      {
        withCredentials: true,
        headers: this.apiAuth.GetHeaders(),
      }
    );
  }

  RemoveUserFromTeam(
    user: LinkType,
    team: LinkType
  ): Observable<LunaResponse<string>> {
    const body = {
      user: user,
      team: team,
    };
    return this.http.post<LunaResponse<string>>(
      API_BASE_URL + "/api/RemoveUserFromTeam",
      body,
      {
        withCredentials: true,
        headers: this.apiAuth.GetHeaders(),
      }
    );
  }

  AddUserToTeam(
    user: LinkType,
    team: LinkType
  ): Observable<LunaResponse<string>> {
    const body = {
      user: user,
      team: team,
    };
    return this.http.post<LunaResponse<string>>(
      API_BASE_URL + "/api/AddUserToTeam",
      body,
      {
        withCredentials: true,
        headers: this.apiAuth.GetHeaders(),
      }
    );
  }

  ApplyForTask(
    task: LinkType,
    user: LinkType
  ): Observable<LunaResponse<string>> {
    const body = {
      task: task,
      user: user,
    };
    return this.http.post<LunaResponse<string>>(
      API_BASE_URL + "/api/ApplyForTask",
      body,
      {
        withCredentials: true,
        headers: this.apiAuth.GetHeaders(),
      }
    );
  }

  RevokeTaskApplication(task: LinkType): Observable<LunaResponse<string>> {
    const body = {
      task: task,
    };
    return this.http.post<LunaResponse<string>>(
      API_BASE_URL + "/api/RevokeTaskApplication",
      body,
      {
        withCredentials: true,
        headers: this.apiAuth.GetHeaders(),
      }
    );
  }

  GetTasksArray(tasks: LinkType[]): Observable<LunaResponse<TaskType[]>> {
    const body = {
      tasks: tasks,
    };
    console.log(body);
    return this.http.post<LunaResponse<TaskType[]>>(
      API_BASE_URL + "/api/GetTaskArray",
      body,
      {
        withCredentials: true,
        headers: this.apiAuth.GetHeaders(),
      }
    );
  }
}
