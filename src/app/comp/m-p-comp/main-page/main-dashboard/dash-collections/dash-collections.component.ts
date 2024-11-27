import { Component } from "@angular/core";
import { NgFor } from "@angular/common";
import { MainCacheService } from "../../../../../serv/logic/main-cache.service";
import { NgTemplateOutlet } from "@angular/common";
import {
  AreYouSureConfig,
  CollectionType,
  FileType,
} from "../../../../../serv/mod/Types";
import { NgClass } from "@angular/common";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatSelectModule } from "@angular/material/select";
import { MatDividerModule } from "@angular/material/divider";
import { MatMenuModule } from "@angular/material/menu";
import { MatIconModule } from "@angular/material/icon";
import { MatChipsModule } from "@angular/material/chips";
import { FileManagerService } from "../../../../../serv/API/c-serv/file-manager.service";
import { FileBlob } from "../../../../../serv/mod/ReqMods";
import { NgIf } from "@angular/common";
import { NewCollectionComponent } from "../../../popups/CollectionsFiles/new-collection/new-collection.component";
import { MatDialog } from "@angular/material/dialog";
import { Dialog } from "@angular/cdk/dialog";
import { CollServService } from "../../../../../serv/API/c-serv/coll-serv.service";
import { EditCollectionComponent } from "../../../popups/CollectionsFiles/edit-collection/edit-collection.component";
import {
  AreYouSureData,
  EditCollectionData,
  PreviewFileData,
} from "../../../popups/DialogData";
import {
  LunaDropDownMenuComponent,
  LunaDropDownObjectCreator,
  LunaDropDownObject,
} from "../../../../../custom-components/luna-drop-down-menu/luna-drop-down-menu.component";
import { UploadFileComponent } from "../../../popups/CollectionsFiles/upload-file/upload-file.component";
import {
  LunaChipsComponent,
  LunaChipsObject,
  LunaChipsObjectCreator,
} from "../../../../../custom-components/luna-chips/luna-chips.component";
import { FilePreviewComponent } from "../../../popups/CollectionsFiles/file-preview/file-preview.component";
import { AreYouSurePupComponent } from "../../../popups/are-you-sure-pup/are-you-sure-pup.component";
import { error } from "console";
import { computeMsgId } from "@angular/compiler";
@Component({
  selector: "app-dash-collections",
  standalone: true,
  imports: [
    NgFor,
    NgTemplateOutlet,
    NgClass,
    MatFormFieldModule,
    MatSelectModule,
    LunaDropDownMenuComponent,
    NgIf,
    MatDividerModule,
    MatMenuModule,
    MatIconModule,
    MatChipsModule,
    LunaChipsComponent,
  ],
  templateUrl: "./dash-collections.component.html",
  styleUrl: "./dash-collections.component.scss",
})
export class DashCollectionsComponent {
  constructor(
    private dialog: MatDialog,
    public mc: MainCacheService,
    private fm: FileManagerService,
    private APIcoll: CollServService
  ) {
    this.UpdateMap();

    this.mc.groupColl.forEach((element, index) => {
      this.dropDownObjectArray.push(
        LunaDropDownObjectCreator(index, element.name)
      );
    });
    this.selectedDropDownObject =
      this.dropDownObjectArray[0] ||
      LunaDropDownObjectCreator(0, "Select Value");
    //TODO: Remove this after finishing dev
    this.EditCollection(this.mc.groupColl[0]);
  }

  dropDownObjectArray: LunaDropDownObject[] = [];
  selectedDropDownObject: LunaDropDownObject = LunaDropDownObjectCreator(
    0,
    "Select Value"
  );

  handelSelection(event: LunaDropDownObject) {
    this.selectedDropDownObject = event;
    this.jumpToIndex(event.index);
  }

  handelChipsSelection(event: LunaChipsObject[]) {
    this.TagfilterList = event.map((element) => element.name);
  }

  createChipsObjectArray(): LunaChipsObject[] {
    return LunaChipsObjectCreator(this.getCollAt(0).tags || []);
  }

  collections = this.mc.groupColl;

  selectedCollection: CollectionType = this.mc.groupColl[0];

  FileMap = new Map<string, any>();

  len = this.mc.groupColl.length || 0;

  quickSelectIndex: number = 0;

  MainIndex: number = 0;

  TagfilterList = this.GetFilter();

  GetFilter(): string[] {
    return this.mc.groupColl.length > this.MainIndex
      ? this.mc.groupColl[this.MainIndex].tags || []
      : [];
  }
  GetFiles(): FileType[] {
    console.log(this.mc.groupColl);
    if (this.mc.groupColl.length == 0) {
      return [];
    }
    return this.mc.groupColl[this.MainIndex].files || [];
  }
  getBlobForFile(path: string): any {
    let data = this.FileMap.get(path);
    if (data === undefined) {
      return "assets/Luna_icon.svg";
    }
    return data;
  }

  getFileMimeType(path: string): string {
    const extension = path.split(".").pop();
    switch (extension) {
      case "jpg":
      case "jpeg":
        return "image/jpeg";
      case "png":
        return "image/png";
      case "gif":
        return "image/gif";
      case "webp":
        return "image/webp";
      case "svg":
        return "image/svg+xml";
      case "pdf":
        return "application/pdf";
      case "txt":
        return "text/plain";
      case "html":
        return "text/html";
      case "js":
        return "application/javascript";
      case "json":
        return "application/json";
      case "css":
        return "text/css";
      case "mp4":
        return "video/mp4";
      case "mp3":
        return "audio/mpeg";
      // Add more cases as needed
      default:
        return "application/octet-stream"; // Default MIME type
    }
  }

  CheckFilter(File: FileType): boolean {
    if (File.tags.length == 0) {
      return true;
    }
    return File.tags.some((item) => this.TagfilterList.includes(item));
  }

  UpdateMap() {
    for (let file of this.GetFiles()) {
      this.fm.GetFile(file).subscribe(
        (data) => {
          let blob = new Blob([data], { type: "application/octet-stream" });
          let url = window.URL.createObjectURL(blob);

          this.FileMap.set(file.path, url);
        },
        (error) => {
          console.error(error);
        }
      );
    }
  }

  FilterToNone() {
    this.TagfilterList = [];
  }
  FilterToAll() {
    this.TagfilterList = this.mc.groupColl[this.MainIndex].tags || [];
  }

  incrementIndex() {
    this.MainIndex += 1;
    if (this.MainIndex >= this.len) {
      this.MainIndex = 0;
    }
    this.UpdateMap();
    this.TagfilterList = this.mc.groupColl[this.MainIndex].tags || [];
  }

  decrementIndex() {
    this.MainIndex -= 1;
    if (this.MainIndex < 0) {
      this.MainIndex = this.len;
    }
    this.UpdateMap();
    this.TagfilterList = this.mc.groupColl[this.MainIndex].tags || [];
  }

  get range(): number[] {
    return Array.from({ length: this.len }, (_, index) => index);
  }

  jumpToIndex(index: number) {
    this.MainIndex = index;
    this.TagfilterList = this.mc.groupColl[this.MainIndex].tags || [];
    this.UpdateMap();
  }

  IsExtatsonValid(path: string) {
    let ext = path.split(".").pop();
    if (ext == "jpg" || ext == "png" || ext == "jpeg" || ext == "gif") {
      return true;
    }
    return false;
  }
  getExtention(path: string): string {
    let ext = path.split(".").pop();
    return ext || "You should not see this";
  }

  getCollAt(vec: number): CollectionType {
    let a = this.MainIndex + vec;

    if (a < 0) {
      a = this.len + a;
    } else if (a >= this.len) {
      a = a - this.len;
    }
    return this.mc.groupColl[a];
  }
  calculateListDistance(targetIndex: number): number {
    // Forward distance: Move from mainIndex to targetIndex directly
    let forwardDistance = targetIndex - this.MainIndex;
    if (forwardDistance < 0) {
      forwardDistance += this.len; // Adjust if wrapping around the array
    }

    // Backward distance: Move from mainIndex to targetIndex in the opposite direction
    let backwardDistance = this.MainIndex - targetIndex;
    if (backwardDistance < 0) {
      backwardDistance += this.len; // Adjust if wrapping around the array
    }

    // Determine the shortest path and direction
    // If forward distance is shorter or equal, use it; otherwise, use backward distance (as negative)
    if (forwardDistance <= backwardDistance) {
      return forwardDistance; // Moving forward
    } else {
      return -backwardDistance; // Moving backward, indicated by negative value
    }
  }

  filterIsKlicked(tag: string) {
    if (this.TagfilterList.includes(tag)) {
      this.TagfilterList = this.TagfilterList.filter((value) => value != tag);
    } else {
      this.TagfilterList.push(tag);
    }
  }

  cardAtIndexIsClicked(i: number) {
    let a = this.calculateListDistance(i);
    if (a == 0) {
    } else if (a < 0) {
      this.decrementIndex();
    } else {
      this.incrementIndex();
    }
  }

  getCollClass(i: number): string {
    let a = this.calculateListDistance(i);

    switch (a) {
      case -2:
        return "card farLeft";
      case -1:
        return "card left";
      case 0:
        return "card";
      case 1:
        return "card right";
      case 2:
        return "card farRight";
      default:
        if (i - this.MainIndex < 0) {
          return " farLeft";
        } else {
          return " farRight";
        }
    }
  }
  AddCollection() {
    const dialogRef = this.dialog.open(NewCollectionComponent);
    dialogRef.afterClosed().subscribe((result) => {
      if (result != undefined)
        this.APIcoll.AddCollection(result.name, this.mc.user.groupid).subscribe(
          (data) => {
            this.mc.updateCollections();
          }
        );
    });
  }
  EditCollection(coll: CollectionType) {
    console.log(coll);
    const data: EditCollectionData = { collection: coll };
    const dialogRef = this.dialog.open(EditCollectionComponent, { data: data });
    dialogRef.afterClosed().subscribe((result) => {
      if (result == 1) {
        this.mc.updateCollections();
      }
    });
  }

  UpenUploadFileDialog(coll: CollectionType) {
    const data = { collection: coll };
    console.log("test");
    const dialogRef = this.dialog.open(UploadFileComponent, { data: data });

    dialogRef.afterClosed().subscribe((result) => {
      if (result == 0 || result == undefined || result == null) {
        console.log("The dialog was closed");
        return;
      } else {
        console.log("The dialog was closed");
        this.mc.isLoadingSmall = true;
        this.fm
          .uploadFile(result.name, result.file, result.tags, result.collection)
          .subscribe(
            (data) => {
              console.log("File uploaded");
              this.mc.updateCollections();
              this.mc.isLoadingSmall = false;
            },

            (error) => {
              console.error("Error uploading file");
              console.log(error.error);
              this.mc.isLoadingSmall = false;
            }
          );
      }
    });
  }

  OpenFilePreview(file: FileType) {
    const data: PreviewFileData = {
      file: this.getBlobForFile(file.path),

      fileInfo: file,
    };
    const dialogRef = this.dialog.open(FilePreviewComponent, { data });
  }
  EditFile(file: FileType) {
    const data: PreviewFileData = {
      file: this.getBlobForFile(file.path),
      fileInfo: file,
    };
    alert(
      "Edit file inst implemented yet but here is the file in preview Mode :3"
    );
    const dialogRef = this.dialog.open(FilePreviewComponent, { data });
  }
  DeleteFile(file: FileType) {
    const data: AreYouSureData = {
      title: "Delete File",
      text:
        "Are you sure you want to delete the file" +
        file.name +
        "?" +
        " This action cannot be undone",
      submitText: "Delete",
      status: true,
    };

    const dialogRef = this.dialog.open(AreYouSurePupComponent, { data });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.mc.isLoadingSmall = true;
        this.APIcoll.RemoveFile(
          this.collections[this.MainIndex]._id,
          file
        ).subscribe(
          (data) => {
            this.mc.updateCollections();
            this.mc.isLoadingSmall = false;
          },
          (error) => {
            console.error("Error deleting file");
            console.log(error.error);
            this.mc.isLoadingSmall = false;
          }
        );
      }
    });
  }
  DownloadFile(file: FileType) {
    this.fm.downloadFile(file);
  }
}
