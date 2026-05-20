"use client";

import { signOut } from "@/lib/auth-client";
import { ArrowRightFromSquare } from "@gravity-ui/icons";
import { Avatar, Dropdown } from "@heroui/react";
import { ArrowDown } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const DropdownCompo = ({ user }) => {
  
  const [isOpen, setIsOpen] = useState(false);

 
  if (!user) return null;

  const handleLogout = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    
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
    <Dropdown isOpen={isOpen} onOpenChange={setIsOpen}>
      <Dropdown.Trigger className="rounded-full flex cursor-pointer select-none">
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
      </Dropdown.Trigger>

      <Dropdown.Popover>
        <div className="px-3 pt-3 pb-1 border-b border-gray-100 dark:border-zinc-800 mb-1">
          <div className="flex flex-col gap-0.5">
            <p className="text-sm font-semibold text-gray-900 dark:text-white">{user?.name}</p>
            <p className="text-xs text-gray-400 dark:text-gray-500">{user?.email}</p>
          </div>
        </div>

        <Dropdown.Menu className="p-1">
          
    
          <Dropdown.Item 
            id="dashboard" 
            textValue="Dashboard"
            className="bg-transparent hover:bg-transparent p-0 data-[hover=true]:bg-transparent" 
            onClick={() => setIsOpen(false)}
          >
            <Link 
              href="/dashboard" 
              className="inline-block px-3 py-1.5 text-sm rounded-lg text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors w-full"
            >
              Dashboard
            </Link>
          </Dropdown.Item>

        
          <Dropdown.Item 
            id="logout" 
            textValue="Logout"
            className="bg-transparent hover:bg-transparent p-0 data-[hover=true]:bg-transparent"
          >
            <div 
              onClick={handleLogout}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors cursor-pointer text-sm font-medium w-full"
            >
              <span>Logout</span>
              <ArrowRightFromSquare className="size-3.5" />
            </div>
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown.Popover>
    </Dropdown>
  );
};

export default DropdownCompo;