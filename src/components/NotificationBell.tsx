import { Bell } from "lucide-react";

interface NotificationBellProps {
  count: number;
}

export default function NotificationBell({ count }: NotificationBellProps) {
  return (
    <div className="relative cursor-pointer">
      <Bell size={26} />
      {count > 0 && (
        <span className="absolute -top-1 -right-2 bg-red-600 text-white text-xs px-2 py-0.5 rounded-full">
          {count}
        </span>
      )}
    </div>
  );
}
