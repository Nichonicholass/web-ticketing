import { Card, CardHeader, CardTitle, CardContent } from "../components/card";
import { Button } from "../components/button";
import { X } from "lucide-react";

interface FriendCardProps {
  friend: {
    id: string;
    name: string;
    username: string;
  };
  onDelete: (id: string) => void;
}

export function FriendCard({ friend, onDelete }: FriendCardProps) {
  return (
    <Card key={friend.id} className="relative">
      <Button
        variant="ghost"
        size="icon"
        className="absolute top-2 right-2 h-6 w-6 rounded-full hover:bg-red-100"
        onClick={() => onDelete(friend.id)}
      >
        <X className="h-4 w-4 text-gray-500 hover:text-red-600" />
      </Button>
      <CardHeader>
        <CardTitle className="text-base sm:text-lg">{friend.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground text-sm sm:text-base">
          @{friend.username}
        </p>
      </CardContent>
    </Card>
  );
}
