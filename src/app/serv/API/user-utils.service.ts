import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { API_BASE_URL } from "../../const";
import { LinkType } from "../mod/Types";
import { catchError } from "rxjs/operators";

import { of } from "rxjs";
import { userType } from "../mod/Types";
import { time } from "console";
import { AuthService } from "./auth.service";
import { FullUpdateResponse, LunaResponse } from "../mod/ReqMods";
import * as CryptoJS from "crypto-js";

@Injectable({
  providedIn: "root",
})
export class UserUtilsService {
  constructor(private http: HttpClient, private apiAuth: AuthService) {}

  GetUserSetupData(): Observable<LunaResponse<FullUpdateResponse>> {
    return this.http.get<LunaResponse<FullUpdateResponse>>(
      API_BASE_URL + "/api/getAllUserData",
      { withCredentials: true, headers: this.apiAuth.GetHeaders() }
    );
  }

  AddUser(
    name: string,
    email: string,
    passwd: string,
    key: string
  ): Observable<any> {
    let salt = CryptoJS.lib.WordArray.random(8).toString();

    let hashedPassword = CryptoJS.SHA256(passwd + salt).toString();

    const data = {
      name: name,
      email: email,
      salt: salt,
      hashPassword: hashedPassword,
      key: key,
    };
    const headers = new HttpHeaders();
    return this.http.post(API_BASE_URL + "/addUser", data, { headers });
  }

  CreateGroupID(
    userID: string,
    UserName: string,
    NewGroup: string
  ): Observable<any> {
    let data = {
      user: {
        _id: userID,
        name: UserName,
      },
      groupidname: NewGroup,
    };

    return this.http.post(API_BASE_URL + "/api/setGupID", data, {
      withCredentials: true,
      headers: this.apiAuth.GetHeaders(),
    });
  }

  RemoveGroupID(): Observable<LunaResponse<string>> {
    return this.http.get<LunaResponse<string>>(
      API_BASE_URL + "/api/removeGrupID",
      {
        withCredentials: true,
        headers: this.apiAuth.GetHeaders(),
      }
    );
  }

  CreateGrupInviteKey(user: LinkType): Observable<LunaResponse<string>> {
    return this.http.post<LunaResponse<string>>(
      API_BASE_URL + "/api/addGruopKey",
      { user: user },
      {
        withCredentials: true,
        headers: this.apiAuth.GetHeaders(),
      }
    );
  }
  JoinGrupViaInviteKey(key: string): Observable<LunaResponse<string>> {
    return this.http.post<LunaResponse<string>>(
      API_BASE_URL + "/api/joinGroupViaKey",
      { key: key },
      {
        withCredentials: true,
        headers: this.apiAuth.GetHeaders(),
      }
    );
  }
}
