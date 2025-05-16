// import { Card, CardHeader, CardTitle, CardContent } from "../components/card";
// import { Button } from "../components/button";
// import { X } from "lucide-react";

// interface FriendCardProps {
//   friend: {
//     userid: string;
//     name: string;
//     username: string;
//     email?: string;
//     permission?: "EDIT" | "VIEW";
//     is_verified?: boolean;
//   };
//   onDelete: (email: string) => void;
// }

// export function FriendCard({ friend, onDelete }: FriendCardProps) {
//   return (
//     <div className="border rounded-lg p-4">
//       <div className="flex justify-between items-start">
//         <div>
//           <h3 className="font-medium">{friend.name}</h3>
//           <p className="text-sm text-gray-500">@{friend.username}</p>
//           <p className="text-sm text-gray-500">{friend.email}</p>
//           <p className="text-sm mt-1">
//             Hak akses: {friend.permission === "EDIT" ? "Edit" : "View"}
//           </p>
//         </div>
//         <button
//           onClick={() => friend.email && onDelete(friend.email)}
//           className="text-red-500 hover:text-red-700 text-sm"
//         >
//           Hapus
//         </button>
//       </div>
//     </div>
//   );
// }
