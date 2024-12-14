import { Interface } from "readline";
import * as models from "./Types";

export interface LunaResponse<T> {
  status: string;
  body: T;
  error: string;
}
export interface FileBlob {
  Head: models.FileType;
  body: string;
  url?: string;
}

export interface ValidateSessionResponse {
  Valid: boolean;
}
export interface GetUserViaTokenResponse {
  _id: string;
  name: string;
  email: string;
  password: string;
  avalability: string;
  groupid: string;
}

// * For VALID USER API CALLS
export interface FullUpdateResponse {
  user: models.userType;
  collections: models.CollectionType[];
  teams: models.TeamType[];
  otherusers: models.otherUsers[];
  tasks: models.TaskType[];
}

export interface RequestSessionTokenResponse {
  token: string;
}
export interface UpdatedTasksResponse {
  tasks: models.LinkType[];
}
