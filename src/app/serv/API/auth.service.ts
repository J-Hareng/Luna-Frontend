import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { API_BASE_URL } from "../../const";
import { catchError } from "rxjs/operators";
import { of } from "rxjs";
import { userType } from "../mod/Types";
import { LSServService } from "../logic/lsserv.service";

import { HttpResponse } from "@angular/common/http";
import {
  LunaResponse,
  RequestSessionTokenResponse,
  ValidateSessionResponse,
} from "../mod/ReqMods";
import { Router } from "@angular/router";
import { Token } from "@angular/compiler";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  constructor(
    private http: HttpClient,
    private router: Router,
    private Ls: LSServService
  ) {}
  getToken(): string {
    return `Bearer ${this.Ls.GetToken()}`;
  }

  GetHeaders(): HttpHeaders {
    return new HttpHeaders().set(
      "Authorization",
      `Bearer ${this.Ls.GetToken()}`
    );
  }
  GetUserSalt(email: string): Observable<LunaResponse<string>> {
    let data = { email: email };
    return this.http.post<LunaResponse<string>>(
      API_BASE_URL + "/getSalt",
      data
    );
  }

  GetUserViaToken(): Observable<userType> {
    return this.http
      .get<userType>(API_BASE_URL + "/api/getUserViaToken", {
        withCredentials: true,
        headers: this.GetHeaders(),
      })
      .pipe(
        catchError((error) => {
          console.error("Error getting user via token");
          return of({
            _id: "Error",
            ...error,
          });
        })
      );
  }

  ValidateSessionToken(From: string) {
    this.http
      .get<ValidateSessionResponse>(API_BASE_URL + "/validateSessionToken", {
        withCredentials: true,
        headers: this.GetHeaders(),
      })
      .subscribe(
        (response) => {
          if (response.Valid === true) {
            if (From == "Login") {
              this.router.navigate(["/Dashboard"]);
            }
          } else {
            this.router.navigate(["/"]);
          }
        },
        (error) => {
          this.router.navigate(["/"]);
        }
      );
  }
  RequestEmailKey(email: string) {
    const data = { email: email };
    const headers = new HttpHeaders();

    this.http
      .post(API_BASE_URL + "/reqEmailKey", data, { headers })
      .subscribe((error) => {
        console.error("Error requesting email key");
      });
  }

  RequestSessionToken(
    email: string,
    passwd: string
  ): Observable<HttpResponse<LunaResponse<RequestSessionTokenResponse>>> {
    const data = { email: email, password: passwd };
    const headers = new HttpHeaders();
    return this.http.post<LunaResponse<RequestSessionTokenResponse>>(
      API_BASE_URL + "/reqSessionToken",
      data,
      {
        headers,
        observe: "response",
      }
    );
  }

  RemoveSessionToken() {
    this.Ls.DelToken();
    this.ValidateSessionToken("");
  }
}
