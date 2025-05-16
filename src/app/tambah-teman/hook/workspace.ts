import api from "@/lib/api";
import {
  AddCollaboratorPayload,
  AddCollaboratorResponse,
  Collaborator,
  RemoveCollaboratorPayload,
  RemoveCollaboratorResponse,
  WorkspaceCollaboratorsResponse,
} from "@/types/tambah-teman/collaborator";

// workspace.ts
export const addToWorkspace = async (
  payload: AddCollaboratorPayload,
): Promise<AddCollaboratorResponse> => {
  const response = await api.post("/workspace/add", {
    is_verified: payload.is_verified,
    workspaceid: payload.workspaceid,
    email: payload.email,
    permission: payload.permission || "EDIT", // default to EDIT if not provided
  });
  return response.data;
};

export const getWorkspaceCollaborators = async (
  workspaceId: string,
): Promise<Collaborator[]> => {
  const response = await api.get<WorkspaceCollaboratorsResponse>(
    `/workspace/collaborators/${workspaceId}`,
  );
  return response.data.data;
};

export const removeFromWorkspace = async (
  payload: RemoveCollaboratorPayload,
): Promise<RemoveCollaboratorResponse> => {
  const response = await api.delete(`/workspace/remove`, {
    data: payload, // changed from params to data for DELETE request
  });
  return response.data;
};
