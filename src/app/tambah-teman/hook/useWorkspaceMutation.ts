import { useMutation, useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

import {
  addToWorkspace,
  getWorkspaceCollaborators,
  removeFromWorkspace,
} from "../hook/workspace";
import {
  AddCollaboratorPayload,
  Collaborator,
  RemoveCollaboratorPayload,
} from "@/types/tambah-teman/collaborator";

export const useAddToWorkspace = () => {
  const router = useRouter();
  return useMutation({
    mutationFn: (payload: AddCollaboratorPayload) => addToWorkspace(payload),
    onSuccess: () => {
      toast.success("Teman berhasil ditambahkan ke workspace");
      router.refresh();
    },
    // onError: (error) => {
    //   toast.error(
    //     error.response?.data?.message || "Gagal menambahkan teman ke workspace"
    //   );
    // },
  });
};

export const useRemoveFromWorkspace = () => {
  const router = useRouter();
  return useMutation({
    mutationFn: (payload: RemoveCollaboratorPayload) =>
      removeFromWorkspace(payload),
    onSuccess: () => {
      toast.success("Teman berhasil dihapus dari workspace");
      router.refresh();
    },
    // onError: (error: any) => {
    //   toast.error(
    //     error.response?.data?.message || "Gagal menghapus teman dari workspace"
    //   );
    // },
  });
};

export const useWorkspaceCollaborators = (workspaceId: string) => {
  return useQuery<Collaborator[]>({
    queryKey: ["workspace-collaborators", workspaceId],
    queryFn: () => getWorkspaceCollaborators(workspaceId),
    enabled: !!workspaceId,
  });
};
