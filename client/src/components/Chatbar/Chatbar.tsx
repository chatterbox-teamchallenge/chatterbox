import Search from "../Search/Search";

interface ChatbarProps {
  // CHANGE 'ANY' TO COMPANION OBJECT
  companion?: any;
}

export default function Chatbar({ companion }: ChatbarProps) {
  return (
    <div className="chatbar">
      <Search />
    </div>
  );
}
