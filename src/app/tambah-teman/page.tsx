"use client";
import { useState } from "react";
import { Input } from "./components/input";
import { Button } from "./components/button";
import { Search } from "lucide-react";
import Navbar from "@/layouts/Navbar";
import { ConfirmationModal } from "./Modal/page";
import { FriendCard } from "./Card/page";

interface Friend {
  id: string;
  name: string;
  username: string;
}

export default function WorkshopFriendsPage() {
  const [username, setUsername] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [friends, setFriends] = useState<Friend[]>([
    { id: "1", name: "Sadam Ali Rafsanjani", username: "sadamiris" },
    { id: "2", name: "Sadam Ali Rafsanjani", username: "sadamiris" },
    { id: "3", name: "John Doe", username: "johndoe" },
    { id: "4", name: "Jane Smith", username: "janesmith" },
    { id: "5", name: "Bob Johnson", username: "bobjohnson" },
    { id: "6", name: "Alice Williams", username: "alicew" },
  ]);

  const [showConfirmation, setShowConfirmation] = useState(false);
  const [friendToAdd, setFriendToAdd] = useState("");
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [friendToDelete, setFriendToDelete] = useState<string | null>(null);

  const handleAddFriend = () => {
    if (username.trim() === "") return;
    setFriendToAdd(username);
    setShowConfirmation(true);
  };

  const confirmAddFriend = () => {
    const newFriend: Friend = {
      id: Date.now().toString(),
      name: friendToAdd,
      username: friendToAdd.toLowerCase(),
    };
    setFriends([...friends, newFriend]);
    setUsername("");
    setShowConfirmation(false);
    setFriendToAdd("");
  };

  const handleDeleteConfirmation = (id: string) => {
    setFriendToDelete(id);
    setShowDeleteConfirmation(true);
  };

  const confirmDeleteFriend = () => {
    if (friendToDelete) {
      setFriends(friends.filter((friend) => friend.id !== friendToDelete));
    }
    setShowDeleteConfirmation(false);
    setFriendToDelete(null);
  };

  const filteredFriends = friends.filter(
    (friend) =>
      friend.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      friend.username.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div className="container mx-auto px-4 sm:px-6 py-5">
        <h1 className="text-xl sm:text-2xl font-bold mb-6">
          Invite Teman Ke Workshop
        </h1>

        {/* Larger blue section */}
        <div className="mb-8 bg-slate-900 rounded-lg p-6 sm:p-8 shadow-lg flex flex-col sm:flex-row justify-between items-center relative overflow-hidden min-h-[250px]">
          <div className="flex-1 max-w-2xl z-10 mb-4 sm:mb-0">
            <h2 className="text-3xl sm:text-5xl font-semibold mb-6 text-white">
              Masukan Username Temanmu!
            </h2>
            <div className="flex gap-4 w-full flex-col sm:flex-row">
              <Input
                className="bg-white text-black placeholder-gray-500 h-12 sm:h-10 w-full sm:w-1/2 text-base"
                placeholder="Masukan Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <Button
                onClick={handleAddFriend}
                className="bg-white text-black h-12 sm:h-10 hover:bg-gray-100 w-full sm:w-auto text-base px-6"
              >
                Tambahkan
              </Button>
            </div>
            <p className="text-base text-gray-300 mt-4">
              Pastikan akun temanmu terdaftar!
            </p>
          </div>

          <div className="hidden md:block absolute right-0 h-full">
            <img
              src="images/TambahTeman/gambar.png"
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
            Menampilkan {filteredFriends.length} dari {friends.length} teman
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 px-2 sm:px-0">
            {filteredFriends.map((friend) => (
              <FriendCard
                key={friend.id}
                friend={friend}
                onDelete={handleDeleteConfirmation}
              />
            ))}
          </div>
        </div>

        {/* Modals */}
        <ConfirmationModal
          isOpen={showConfirmation}
          title="Menambah Teman"
          message={
            <>
              Kamu akan menambahkan <strong>{friendToAdd}</strong>, apa kamu
              yakin?
            </>
          }
          confirmText="Ya, Tambah"
          cancelText="Batal"
          onConfirm={confirmAddFriend}
          onCancel={() => {
            setShowConfirmation(false);
            setFriendToAdd("");
          }}
        />

        <ConfirmationModal
          isOpen={showDeleteConfirmation}
          title="Keluarkan Temanmu"
          message={
            <>
              Kamu mengeluarkan{" "}
              <strong>
                {friends.find((f) => f.id === friendToDelete)?.username || ""}
              </strong>{" "}
              dari workspace ini, apa kamu yakin?
            </>
          }
          confirmText="Ya, Yakin"
          cancelText="Batal"
          onConfirm={confirmDeleteFriend}
          onCancel={() => {
            setShowDeleteConfirmation(false);
            setFriendToDelete(null);
          }}
          variant="destructive"
        />
      </div>
    </div>
  );
}
