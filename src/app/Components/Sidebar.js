"use client";

import {
  ChartColumn,
  Users,
  UserCog,
  Image,
  Palette,
  Gamepad,
  Calendar,
  MessageCircle,
  Award,
  CreditCard,
  DollarSign,
  Bell,
  HelpCircle,
  FileText,
  Earth,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const Sidebar = () => {
  const pathname = usePathname();

  const menuItems = [
    { id: 1, name: "Dashboard", icon: ChartColumn, path: "/dashboard" },
    // { id: 2, name: "Team Management", icon: Users, path: "/team-management" },
    { id: 3, name: "User Management", icon: UserCog, path: "/userManagement" },
    { id: 4, name: "Image Management", icon: Image, path: "/imageManagement" },
    { id: 5, name: "Art Generation", icon: Palette, path: "/artGeneration" },
    { id: 6, name: "Gameplays", icon: Gamepad, path: "/gameplays" },
    { id: 7, name: "Daily Match", icon: Calendar, path: "/dailyMatch" },
    { id: 8, name: "Community", icon: Earth, path: "/community" },
    // { id: 9, name: "Badges", icon: Award, path: "/badges" },
    // { id: 10, name: "Subscription", icon: CreditCard, path: "/subscription" },
    { id: 11, name: "Revenue", icon: DollarSign, path: "/revenue" },
    // { id: 12, name: "Notifications", icon: Bell, path: "/notifications" },
    // { id: 13, name: "User Support", icon: HelpCircle, path: "/user-support" },
    // { id: 14, name: "Reports", icon: FileText, path: "/reports" },
  ];

  return (
    <div className="h-[85vh] bg-white flex flex-col gap-2 2xl:p-2 px-2 py-4 my-2 overflow-y-auto flex-1">
      {menuItems.map((item) => {
        const IconComponent = item.icon;
        const isActive =
          pathname === item.path || pathname.startsWith(`${item.path}/`); // 👈 handles nested paths

        return (
          <Link
            key={item.id}
            href={item.path}
            className={`${
              isActive
                ? "bg-[#4E4C6A] text-white"
                : "hover:bg-[#4E4C6A]/10 text-[#66638B]"
            } flex flex-row items-center gap-3 rounded-lg p-2 cursor-pointer transition-colors`}
          >
            <IconComponent size={18} color={isActive ? "#fff" : "#66638B"} />
            <p
              className={`2xl:text-base text-sm font-normal ${
                isActive ? "text-white" : "text-[#66638B]"
              }`}
            >
              {item.name}
            </p>
          </Link>
        );
      })}
    </div>
  );
};

export default Sidebar;
