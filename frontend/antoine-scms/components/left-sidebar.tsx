"use client";

import { User, Image, Trello } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
const menuItems = [
  { id: "tableau", icon: Trello, label: "Tableau de bord", href: "/admin" },
  {
    id: "Artistes",
    icon: User,
    label: "Artistes",
    href: "/admin/artiste",
  },
  { id: "oeuvre", icon: Image, label: "Oeuvre", href: "/admin/oeuvre" },
];

export default function Sidebar() {
  const MenuItem = ({
    item,
  }: {
    item: {
      id: string;
      icon?: React.ComponentType<{ size: number }>;
      label: string;
      href: string;
      color?: string;
    };
  }) => {
    const Icon = item.icon;

    return (
      <Link
        href={item.href}
        className="flex items-center gap-3 cursor-pointer transition-colors"
      >
        {Icon && <Icon size={20} />}
        {item.label}
      </Link>
    );
  };

  return (
    <aside className="w-1/3 lg:w-72 p-6 flex-col gap-8 border-r border-gray-800 h-screen sticky top-0 overflow-y-auto hidden md:flex">
      <div className="flex justify-between items-center">
        <Link href="/" className="text-4xl font-black tracking-wider">
          Antoine's CMS
        </Link>
      </div>

      <nav className="space-y-8">
        <div>
          <h2 className="text-xs uppercase text-gray-400 font-medium mb-4">
            Menu
          </h2>
          <ul className="space-y-3">
            {menuItems.map((item) => (
              <li key={item.id}>
                <MenuItem item={item} />
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </aside>
  );
}
