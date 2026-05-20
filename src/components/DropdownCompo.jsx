"use client";

import { signOut } from "@/lib/auth-client";
import { ArrowRightFromSquare } from "@gravity-ui/icons";
import { Avatar } from "@heroui/react"; // শুধু অ্যাভাটার হিরোইউআই থেকে থাকবে
import { ArrowDown } from "lucide-react";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";

const DropdownCompo = ({ user }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  if (!user) return null;


  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    setIsOpen(false);
    try {
      await signOut({
        fetchOptions: {
          onSuccess: () => {
            window.location.href = "/login";
          },
        },
      });
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
  
      <div 
        onClick={() => setIsOpen(!isOpen)}
        className="rounded-full flex items-center cursor-pointer select-none"
      >
        <div className="flex items-center gap-1">
          <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
            {user?.name}
          </span>
          <ArrowDown className="size-4 text-gray-500" />
        </div>
        <Avatar className="ml-2">
          <Avatar.Image
            alt={user?.name}
            src={user?.image}
            referrerPolicy="no-referrer"
          />
          <Avatar.Fallback delayMs={600}>
            {user?.name?.charAt(0) || "U"}
          </Avatar.Fallback>
        </Avatar>
      </div>

      
      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 rounded-xl border border-gray-100 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-lg z-[9999] focus:outline-none overflow-hidden">

          <div className="px-3 pt-3 pb-1 border-b border-gray-100 dark:border-zinc-800 mb-1">
            <div className="flex flex-col gap-0.5">
              <p className="text-sm font-semibold text-gray-900 dark:text-white">{user?.name}</p>
              <p className="text-xs text-gray-400 dark:text-gray-500">{user?.email}</p>
            </div>
          </div>

  
          <div className="p-1 flex flex-col gap-0.5">

            <Link 
              href="/dashboard" 
              onClick={() => setIsOpen(false)}
              className="inline-block px-3 py-1.5 text-sm rounded-lg text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors w-full"
            >
              Dashboard
            </Link>

      
            <div 
              onClick={handleLogout}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors cursor-pointer text-sm font-medium w-full"
            >
              <span>Logout</span>
              <ArrowRightFromSquare className="size-3.5" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DropdownCompo;