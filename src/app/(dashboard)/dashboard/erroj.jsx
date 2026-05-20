"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle, Home, RefreshCw } from "lucide-react";

export default function Error({ error, reset }) {
  useEffect(() => {
   
    console.error("Project Error Caught:", error);
  }, [error]);

  return (
    <section className="min-h-[85vh] flex items-center justify-center px-6 bg-white dark:bg-slate-950 transition-colors duration-500">
      <div className="max-w-md w-full text-center space-y-8 p-8 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800 shadow-xl md:shadow-2xl">
        
     
        <div className="relative flex justify-center">
    
          <div className="absolute w-32 h-32 bg-[#56B6C6]/10 dark:bg-[#56B6C6]/5 blur-2xl rounded-full top-0"></div>
          
       
          <div className="relative bg-white dark:bg-slate-800 p-6 rounded-full shadow-md border border-slate-100 dark:border-slate-700">
            <span className="text-6xl md:text-7xl block animate-bounce select-none">
              🐶💤
            </span>
            <div className="absolute -bottom-1 -right-1 bg-red-500 text-white p-1.5 rounded-full animate-pulse">
              <AlertTriangle className="w-5 h-5" />
            </div>
          </div>
        </div>

       
        <div className="space-y-3">
          <h2 className="text-2xl md:text-3xl font-extrabold text-slate-800 dark:text-white">
            Oops! You are unauthorized to see the page!! Please Log in first </h2>
          <p className="text-sm md:text-base text-gray-600 dark:text-gray-400 max-w-sm mx-auto leading-relaxed">
            Something went wrong while fetching the pet details. Don't worry, we are looking into it! 🐾
          </p>
        </div>

   
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
         
          <button
            onClick={() => reset()}
            className="w-full sm:w-auto flex items-center justify-center gap-2 bg-[#56B6C6] hover:bg-[#49a1b0] text-white font-semibold px-6 py-3 rounded-xl transition-all duration-300 shadow-sm hover:shadow-md active:scale-95 cursor-pointer"
          >
            <RefreshCw className="w-4 h-4 animate-spin-slow" />
            Try Again
          </button>

        
          <Link
            href="/login"
            className="w-full sm:w-auto flex items-center justify-center gap-2 bg-slate-200 hover:bg-slate-300 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-semibold px-6 py-3 rounded-xl transition-all duration-300 active:scale-95"
          >
            <Home className="w-4 h-4" />
            To get access Login first
          </Link>
        </div>

      </div>
    </section>
  );
}