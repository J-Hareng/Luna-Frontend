import { CollectionType } from "../../../serv/mod/Types";

export interface NewTeamResponse {
  name: string;
  des: string;
}
export interface NewTaskResponse {
  name: string;
  des: string;
  collection: string;
  tags: string[];
}

export interface NewCollectionResponse {
  name: string;
}

export interface UploadFileResponse {
  collection: CollectionType;
  name: string;
  tags: string[];
  file: File;
}
export interface EditTaskResponse {
  name: string;
  des: string;
  tags: string[];
  collection: string;
}
