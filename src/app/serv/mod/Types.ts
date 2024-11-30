import { SafeResourceUrl } from "@angular/platform-browser";
import { Subscription } from "rxjs";

// types
export type userType = {
  _id: string;
  name: string;
  email: string;
  password: string;
  avalability: string;
  groupid: string;
  tasks: LinkType[];
  post: LinkType[];
};
export type otherUsers = {
  _id: string;
  name: string;
  email: string;
  avalability: string;
  groupid: string;
  tasks: LinkType[];
  post: LinkType[];
};
export type LinkType = {
  _id: string;
  name: string;
};
export type TaskMap = Record<string, TaskType>;
// ID          primitive.ObjectID `json:"_id" bson:"_id"`
// NAME        string             `json:"name" bson:"name"`
// DESCRIPTION string             `json:"des" bson:"des"`
// INPROGRESS  []UserLink         `json:"inprog,omitempty" bosn:"inprog,omitempty"`
// TEAM        TeamLink

// COLLECTION primitive.ObjectID `json:"coll" bson:"coll"`
// GROUPID    string             `json:"groupid,omitempty" bson:"groupid,omitempty"`

export type TeamType = {
  _id: string;
  name: string;
  des: string;
  users: LinkType[];
  tasks: LinkType[];
  post: LinkType[];
};
export type TaskType = {
  _id: string;
  name: string;
  des: string;
  inprogress: LinkType[];
  team: LinkType;
  groupid: string;
  coll: string;
  tags: string[] | undefined | null;
};

export type taskInfoType = {
  task: TaskType;
  UserIn: boolean;
  IsWorkedOn: boolean;
};

export type CollectionType = {
  _id: string;
  name: string;
  files: FileType[];
  tags: string[] | undefined | null;
  groupid: string;
};

export type FileType = {
  name: string;
  path: string;
  tags: string[];
  uploadedBy: LinkType;
};

export type FileBlobType = {
  blob: Blob;
  url: SafeResourceUrl;
  file: FileType;
  name: string;
};

export type AreYouSureConfig = {
  title: string;
  text: string;
  submitText: string;
  sub: Subscription;
};

//Enums
