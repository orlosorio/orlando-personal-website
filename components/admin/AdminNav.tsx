"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/submissions", label: "Submissions" },
  { href: "/admin/questions", label: "Questions" },
  { href: "/admin/sessions", label: "Sessions" },
];

export default function AdminNav() {
  const pathname = usePathname();

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    window.location.href = "/admin/login";
  }

  return (
    <nav className="border-b border-gray-200 bg-white px-6 py-3">
      <div className="flex items-center gap-6">
        <span className="text-sm font-bold text-gray-800">Status AI Admin</span>
        <div className="flex gap-1">
          {links.map((link) => {
            const active =
              link.href === "/admin"
                ? pathname === "/admin"
                : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-md px-3 py-1.5 text-sm transition ${
                  active
                    ? "bg-[#365cff] text-white"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </div>
        <button
          onClick={handleLogout}
          className="ml-auto text-sm text-gray-500 hover:text-red-600 transition"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}
