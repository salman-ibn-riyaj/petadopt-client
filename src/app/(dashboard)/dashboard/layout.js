"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation"; 
import { authClient } from "@/lib/auth-client"; 
import { Button } from "@heroui/react";
import { ToastProvider } from "@heroui/toast";
import { useState } from "react";
import {
  MdOutlineContentPaste,
  MdOutlinePlaylistAdd,
  MdOutlineFormatListBulleted,
  MdLogout,
  MdMenu,
  MdClose,
} from "react-icons/md";

const DashboardLayout = ({ children }) => {
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    {
      name: "My Requests",
      path: "/dashboard/my-requests",
      icon: <MdOutlineContentPaste className="text-xl" />,
    },
    {
      name: "Add Pet",
      path: "/dashboard/add-pet",
      icon: <MdOutlinePlaylistAdd className="text-xl" />,
    },
    {
      name: "My Listings",
      path: "/dashboard/my-listings",
      icon: <MdOutlineFormatListBulleted className="text-xl" />,
    },
  ];

 
  const handleLogout = async () => {
    try {
      await authClient.signOut({
        fetchOptions: {
          onSuccess: () => {
            
            router.replace("/login"); 
          },
        },
      });
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0d1117] text-gray-900 dark:text-gray-100 transition-colors">
      <header className="h-16 fixed top-0 inset-x-0 bg-white dark:bg-[#161b22] border-b border-gray-200 dark:border-[#30363d] flex items-center justify-between px-4 sm:px-6 z-30">
        <div className="flex items-center gap-3">
          <Button
            isIconOnly
            variant="light"
            className="md:hidden text-gray-600 dark:text-gray-400"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? (
              <MdClose className="text-2xl" />
            ) : (
              <MdMenu className="text-2xl" />
            )}
          </Button>
          <h2 className="font-bold text-[#3B7597] dark:text-[#6FD1D7]">
            Navbar
          </h2>
        </div>
      </header>

      <div className="flex pt-16 min-h-screen">
        {isOpen && (
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-xs z-10 md:hidden"
            onClick={() => setIsOpen(false)}
          />
        )}

        <aside
          className={`w-64 fixed inset-y-0 left-0 pt-16 bg-white dark:bg-[#161b22] border-r border-gray-200 dark:border-[#30363d] flex flex-col justify-between p-4 z-20 transition-transform duration-300 transform 
          ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
        >
          <div>
            <div className="text-[11px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider px-2 mb-3 mt-2">
              Menu
            </div>

            <nav className="flex flex-col gap-1.5">
              {menuItems.map((item) => {
                const isActive = pathname === item.path;

                return (
                  <Link
                    key={item.path}
                    href={item.path}
                    className="w-full"
                    onClick={() => setIsOpen(false)}
                  >
                    <Button
                      className={`w-full justify-start gap-3 h-11 px-4 font-medium rounded-xl transition-all ${
                        isActive
                          ? "bg-[#3B7597] text-white shadow-sm shadow-[#3B7597]/20 dark:bg-[#6FD1D7] dark:text-gray-950"
                          : "bg-transparent text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-zinc-800"
                      }`}
                    >
                      {item.icon}
                      {item.name}
                    </Button>
                  </Link>
                );
              })}
            </nav>
          </div>

         
          <div className="border-t border-gray-100 dark:border-zinc-800 pt-4">
            <Button
              className="w-full justify-start gap-3 h-11 px-4 font-medium bg-transparent text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/30 rounded-xl transition-all"
              onClick={handleLogout}
            >
              <MdLogout className="text-xl" />
              Logout
            </Button>
          </div>
        </aside>

        <main className="flex-1 w-full pl-0 md:pl-64 transition-all duration-300">
          <div className="p-4 sm:p-6 md:p-8 max-w-7xl mx-auto">
            <ToastProvider position="top-center" />
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;