import { Injectable } from "@angular/core";
// import { DashboardService } from '../../logic/dashboard.service';
import { API_BASE_URL } from "../../../const";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { FileType, CollectionType } from "../../mod/Types";
import { MainCacheService } from "../../logic/main-cache.service";
import { AuthService } from "../auth.service";
import { LunaResponse } from "../../mod/ReqMods";
import { FileBlob } from "../../mod/ReqMods";

@Injectable({
  providedIn: "root",
})
export class FileManagerService {
  constructor(
    private mc: MainCacheService,
    private http: HttpClient,
    private apiAuth: AuthService
  ) {}

  uploadFile(
    name: string,
    file: File,
    tags: string[],
    coll: CollectionType
  ): Observable<any> {
    // for tag in tags {
    let tagFormat = tags.join("§");
    const formData = new FormData();
    formData.append("file", file, file.name);
    formData.append("name", name);
    formData.append("userId", this.mc.user._id);
    formData.append("tags", tagFormat);
    formData.append("username", this.mc.user.name);
    formData.append("coll", coll?._id);

    return this.http.post(API_BASE_URL + "/api/UploadFile", formData, {
      withCredentials: true,
      headers: this.apiAuth.GetHeaders(),
    });
  }

  GetFile(file: FileType): Observable<any> {
    return this.http.post(
      API_BASE_URL + "/api/GetFile",
      { file: file },
      {
        withCredentials: true,
        headers: this.apiAuth.GetHeaders(),
        responseType: "blob",
      }
    );
  }

  GetMultipleFiles(files: FileType[]): Observable<LunaResponse<FileBlob[]>> {
    return this.http.post<LunaResponse<FileBlob[]>>(
      API_BASE_URL + "/api/GetFiles",
      { files: files },
      {
        withCredentials: true,
        headers: this.apiAuth.GetHeaders(),
      }
    );
  }
  // downloadFile(file: FileType) {
  //   const headers = new HttpHeaders({
  //     'Content-Type': 'application/json',
  //     responseType: 'blob',
  //   });
  //   let fileExtension: string = file.path.split('.').pop() || 'txt';

  //   this.http
  //     .post(
  //       API_BASE_URL + '/api/DownloadFile',
  //       { file: file },
  //       {
  //         withCredentials: true,
  //         headers: headers,
  //         responseType: 'blob', // Add this line to specify the response type
  //       }
  //     )
  //     .subscribe((data: Blob) => {
  //       saveAs(data, file.name + '.' + fileExtension); // Remove the '+' operator and the extra comma
  //     });
  // }
}
