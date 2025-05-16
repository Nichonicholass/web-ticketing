"use client";
import { useEffect, useState } from "react";
import { Input } from "./components/input";
import { Button } from "./components/button";
import { Search } from "lucide-react";
import Navbar from "@/layouts/Navbar";
import { ConfirmationModal } from "./Modal/Modal";
import { FriendCard } from "./Card/Card";
import {
  useAddToWorkspace,
  useRemoveFromWorkspace,
  useWorkspaceCollaborators,
} from "./hook/useWorkspaceMutation";
import toast from "react-hot-toast";

export default function WorkshopFriendsPage() {
  const [email, setEmail] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [permission, setPermission] = useState<"EDIT" | "VIEW">("EDIT");
  const [workspaceid, setWorkspaceId] = useState<string>("");

  useEffect(() => {
    const id = localStorage.getItem("selectedWorkspaceId");
    if (id) setWorkspaceId(id);
  }, []);

  const { data: collaborators = [], refetch } =
    useWorkspaceCollaborators(workspaceid);

  const [showConfirmation, setShowConfirmation] = useState(false);
  const [friendToAdd, setFriendToAdd] = useState({ email: "" });
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [friendToDelete, setFriendToDelete] = useState<string | null>(null);

  const { mutate: addCollaborator, isPending: isAdding } = useAddToWorkspace();
  const { mutate: removeCollaborator, isPending: isRemoving } =
    useRemoveFromWorkspace();

  const handleAddFriend = () => {
    if (!email.trim()) {
      toast.error("Email wajib diisi");
      return;
    }
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      toast.error("Email tidak valid");
      return;
    }
    if (!workspaceid) {
      toast.error("Workspace tidak ditemukan");
      return;
    }

    setFriendToAdd({ email });
    setShowConfirmation(true);
  };

  const confirmAddFriend = () => {
    if (!workspaceid) {
      toast.error("Workspace tidak ditemukan");
      return;
    }

    addCollaborator(
      {
        workspaceid,
        email: friendToAdd.email,
        permission,
        is_verified: true,
      },
      {
        onSuccess: () => {
          refetch();
          setEmail("");
          setPermission("EDIT");
          setShowConfirmation(false);
          setFriendToAdd({ email: "" });
        },
      },
    );
  };

  const handleDeleteConfirmation = (email: string) => {
    setFriendToDelete(email);
    setShowDeleteConfirmation(true);
  };

  const confirmDeleteFriend = () => {
    if (friendToDelete && workspaceid) {
      removeCollaborator(
        { workspaceid, email: friendToDelete },
        {
          onSuccess: () => {
            refetch();
            setShowDeleteConfirmation(false);
            setFriendToDelete(null);
          },
        },
      );
    }
  };

  const filteredCollaborators = collaborators.filter(
    (c) =>
      c.username?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.email?.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div className="container mx-auto px-4 sm:px-6 py-5">
        <h1 className="text-xl sm:text-2xl font-bold mb-6">
          Invite Teman Ke Workshop
        </h1>

        <div className="mb-8 bg-slate-900 rounded-lg p-6 sm:p-8 shadow-lg flex flex-col sm:flex-row justify-between items-center relative overflow-hidden min-h-[250px]">
          <div className="flex-1 max-w-2xl z-10 mb-4 sm:mb-0">
            <h2 className="text-3xl sm:text-5xl font-semibold mb-6 text-white">
              Tambahkan Temanmu!
            </h2>
            <div className="flex flex-col gap-4 w-full">
              <div className="flex gap-4 flex-col sm:flex-row">
                <Input
                  id="email"
                  className="bg-white text-black placeholder-gray-500 h-12 sm:h-10 w-full text-base"
                  placeholder="Email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="flex gap-4 flex-col sm:flex-row">
                <select
                  value={permission}
                  onChange={(e) =>
                    setPermission(e.target.value as "EDIT" | "VIEW")
                  }
                  className="bg-white text-black h-12 sm:h-10 rounded-md border border-gray-300 px-3"
                >
                  <option value="EDIT">Edit Permission</option>
                  <option value="VIEW">View Permission</option>
                </select>
                <Button
                  onClick={handleAddFriend}
                  className="bg-white text-black h-12 sm:h-10 hover:bg-gray-100 w-full sm:w-auto text-base px-6"
                  disabled={isAdding}
                >
                  {isAdding ? "Memproses..." : "Tambahkan"}
                </Button>
              </div>
              <p className="text-base text-gray-300">
                Pastikan email temanmu valid!
              </p>
            </div>
          </div>

          <div className="hidden md:block absolute right-0 h-full">
            <img
              src="images/tambah-teman/gambar.png"
              alt="Workshop Illustration"
              className="h-full object-cover rounded-r-lg scale-115 rotate-310"
              style={{ width: "350px" }}
            />
          </div>
        </div>

        <div className="border-t pt-6 mx-2 sm:mx-0">
          <h2 className="text-lg sm:text-xl font-semibold mb-4">
            Semua Teman!
          </h2>

          <div className="relative mb-6 w-full max-w-sm">
            <Input
              placeholder="Cari Teman"
              className="pl-3 pr-8 h-10 sm:h-8 text-sm border-black"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-black" />
          </div>

          <p className="text-sm text-muted-foreground mb-4">
            Menampilkan {filteredCollaborators.length} dari{" "}
            {collaborators.length} teman
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 px-2 sm:px-0">
            {filteredCollaborators.map((friend) => (
              <FriendCard
                key={friend.userid}
                friend={{
                  ...friend,
                  is_verified: true,
                }}
                onDelete={() =>
                  friend.email && handleDeleteConfirmation(friend.email)
                }
              />
            ))}
          </div>
        </div>

        <ConfirmationModal
          isOpen={showConfirmation}
          title="Menambah Teman"
          message={
            <>
              Kamu akan menambahkan:
              <ul className="list-disc pl-5 mt-2">
                <li>
                  <strong>Email:</strong> {friendToAdd.email}
                </li>
                <li>
                  <strong>Permission:</strong>{" "}
                  {permission === "EDIT" ? "Edit" : "View"}
                </li>
              </ul>
              Apa kamu yakin?
            </>
          }
          confirmText={isAdding ? "Memproses..." : "Ya, Tambah"}
          cancelText="Batal"
          onConfirm={confirmAddFriend}
          onCancel={() => {
            setShowConfirmation(false);
            setFriendToAdd({ email: "" });
          }}
          disabled={isAdding}
        />

        <ConfirmationModal
          isOpen={showDeleteConfirmation}
          title="Keluarkan Temanmu"
          message={
            <>
              Kamu mengeluarkan{" "}
              <strong>
                {collaborators.find((c) => c.email === friendToDelete)
                  ?.username || ""}
              </strong>{" "}
              dari workspace ini, apa kamu yakin?
            </>
          }
          confirmText={isRemoving ? "Memproses..." : "Ya, Yakin"}
          cancelText="Batal"
          onConfirm={confirmDeleteFriend}
          onCancel={() => {
            setShowDeleteConfirmation(false);
            setFriendToDelete(null);
          }}
          variant="destructive"
          disabled={isRemoving}
        />
      </div>
    </div>
  );
}
