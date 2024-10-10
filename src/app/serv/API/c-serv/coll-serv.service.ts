import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  userType,
  TeamType,
  LinkType,
  TaskType,
  CollectionType,
  FileType,
} from "../../mod/Types";
import { HttpClient } from '@angular/common/http';
import { API_BASE_URL } from '../../../const';
import { AuthService } from '../auth.service';
import { LunaResponse } from '../../mod/ReqMods';
@Injectable({
  providedIn: 'root'
})
export class CollServService {
  
  constructor(private http: HttpClient, private apiAuth:AuthService) {}

  
  AddCollection(name: string, gruID: string): Observable<LunaResponse<string>> {
    let body = {
      name: name,
      groupid: gruID,
    };
    return this.http.post<LunaResponse<string>>(API_BASE_URL + '/api/AddCollection', body, {
      withCredentials: true,
      headers: this.apiAuth.GetHeaders()
    });
  }


  RemoveCollection(collID: string): Observable<any> {
    let body = {
      collID: collID,
    };
    return this.http.post(API_BASE_URL + '/api/RemoveCollection', body, {
      withCredentials: true,
    });
  }

  GetAllColls(GrupID: string): Observable<LunaResponse<CollectionType[]>> {
    let body = {
      groupid: GrupID,
    };
    return this.http.post<LunaResponse<CollectionType[]>>(
      API_BASE_URL + '/api/GetCollections',
      body,
      {
        withCredentials: true,
        headers: this.apiAuth.GetHeaders()
      }
    );
  }

  AddTagToColl(collID: string, tag: string): Observable<any> {
    let body = {
      tag: tag,
      collID: collID,
    };
    return this.http.post(API_BASE_URL + '/api/AddTagToCollection', body, {
      withCredentials: true,
    });
  }

  RemoveFile(collID: string, file: FileType): Observable<any> {
    let body = {
      collID: collID,
      file: file,
    };
    return this.http.post(API_BASE_URL + '/api/RemoveFile', body, {
      withCredentials: true,
    });
  }

  GetFile(file: FileType): Observable<any> {
    const body = {
      file: file,
      /* your request body here */
    };
    return this.http.post(API_BASE_URL + '/api/GetFile', body, {
      responseType: 'blob',
      withCredentials: true,
    });
  }

}
