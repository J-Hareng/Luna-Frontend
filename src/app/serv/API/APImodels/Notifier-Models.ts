// Operations
export const DeleteOperation = "DELETE";
export const UpdateOperation = "UPDATE";
export const AddOperation = "ADD";
export const SyncOperation = "SYNC";
export const KeepAliveOperation = "KeepAlive";

// Types
export const TaskObject = "Task";
export const TeamObject = "Team";
export const UserObject = "User";
export const FileObject = "FILE";
export const IdObjectID = "ID";

export const NONE = "NONE";
export const BROADCAST = "BROADCAST";

// NotifierBody interface
export interface NotifierBody {
  operation: string;
  type: string;
  data: any; // Use a more specific type if possible
}
