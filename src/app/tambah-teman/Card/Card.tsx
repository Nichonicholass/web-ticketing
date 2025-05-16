import { FriendCard } from "./components/frienCard";

type CardProps = {
  id: string;
  name: string;
  username: string;
  onDelete: () => void;
};

export default function Card({ id, name, username, onDelete }: CardProps) {
  return (
    <FriendCard name={name} id={id} username={username} onDelete={onDelete} />
  );
}
