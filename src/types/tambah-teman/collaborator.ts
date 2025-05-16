// collaborator.ts
export interface Collaborator {
  userid: string; // changed from id to userid
  name: string;
  username: string;
  email: string; // Add email field
  permission?: "EDIT" | "VIEW"; // changed from role to permission
  is_verified?: boolean; // added new field
}

export interface AddCollaboratorPayload {
  workspaceid: string;
  // username: string;
  email: string; // Add email field
  // name: string; // Add name field
  permission: "EDIT" | "VIEW";
  is_verified: boolean; // added new field
}

export interface RemoveCollaboratorPayload {
  workspaceid: string;
  email: string; // changed from userId to email
}

export interface WorkspaceCollaboratorsResponse {
  success: boolean;
  data: Collaborator[];
  message?: string;
}

export interface AddCollaboratorResponse {
  success: boolean;
  message: string;
  data: {
    userid: string;
    workspaceid: string;
    is_verified: boolean;
    permission: "EDIT" | "VIEW";
  };
}

export interface RemoveCollaboratorResponse {
  success: boolean;
  message?: string;
}
