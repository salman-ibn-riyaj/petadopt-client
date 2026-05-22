"use client";

import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

const AdoptForm = ({ pet }) => {
  console.log(pet);
  const [message, setMessage] = useState("");
  const [pickupDate, setPickupDate] = useState("");
  const router = useRouter();

  const [toast, setToast] = useState({ show: false, text: "", type: "" });

  const { data: session } = authClient.useSession();
  const user = session?.user;

  useEffect(() => {
    if (toast.show) {
      const timer = setTimeout(() => {
        setToast({ show: false, text: "", type: "" });
      }, 3000); 
      return () => clearTimeout(timer);
    }
  }, [toast.show]);

  const handleAdopt = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const adoptRequestData = Object.fromEntries(formData.entries());

    const finalData = {
      petId: pet._id,
      ...adoptRequestData,
      status: "Pending",
      requestDate: new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      }),
    };

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/adopt-request`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(finalData),
      });

      const data = await res.json();

      if (res.ok) {
        setToast({
          show: true,
          text: "Added successfully!",
          type: "success",
        });
        

        setTimeout(() => {
          router.replace(`/all-pets/${pet._id}?success=true`); 
        }, 1500);

      } else {
        setToast({
          show: true,
          text: data.message || "You have already submitted a request!",
          type: "error",
        });
      }

    } catch (err) {
      console.error(err);
      setToast({
        show: true,
        text: "Failed to connect to server.",
        type: "error",
      });
    }
  };

  return (
    <div className="bg-gray-50 dark:bg-[#161b22] border border-gray-200 dark:border-[#30363d] rounded-2xl p-5 sm:p-6 h-fit relative">
      {toast.show && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 animate-in fade-in slide-in-from-top-4 duration-200">
          {toast.type === "success" ? (
            <div className="bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 flex items-center gap-2 px-5 py-3 rounded-xl shadow-lg text-sm font-semibold border border-zinc-800 dark:border-zinc-200">
              <span className="text-emerald-500"></span> 
              <span>{toast.text}</span>
            </div>
          ) : (
            <div className="bg-rose-600 text-white flex items-center gap-2 px-5 py-3 rounded-xl shadow-lg text-sm font-semibold border border-rose-700">
              <span>{toast.text}</span>
            </div>
          )}
        </div>
      )}

      <div className="flex items-center gap-2 mb-1">
        <h3 className="text-base font-semibold text-gray-900 dark:text-white">
          Request to Adopt {pet.name}
        </h3>
      </div>
      <p className="text-xs text-gray-400 dark:text-gray-500 mb-5">
        Fill out this form and the owner will review your request.
      </p>

      <form onSubmit={handleAdopt} className="flex flex-col gap-4">
        <div>
          <label className="text-xs text-gray-500 dark:text-gray-400 mb-1 block">
            Pet Name
          </label>
          <input
            type="text"
            name="petName"
            value={pet.name}
            readOnly
            className="w-full bg-white border border-gray-200 dark:border-[#30363d] rounded-xl px-4 py-2.5 text-sm text-slate-600 dark:text-gray-300 cursor-not-allowed focus:outline-none"
          />
        </div>

        <div>
          <label className="text-xs text-gray-500 dark:text-gray-400 mb-1 block">
            Your Name
          </label>
          <input
            type="text"
            name="userName"
            value={user?.name || ""}
            readOnly
            className="w-full bg-white border border-gray-200 dark:border-[#30363d] rounded-xl px-4 py-2.5 text-sm text-slate-600 dark:text-gray-300 cursor-not-allowed focus:outline-none"
          />
        </div>

        <div>
          <label className="text-xs text-gray-500 dark:text-gray-400 mb-1 block">
            Your Email
          </label>
          <input
            type="email"
            name="userEmail"
            value={user?.email || ""}
            readOnly
            className="w-full bg-white border border-gray-200 dark:border-[#30363d] rounded-xl px-4 py-2.5 text-sm text-slate-600 dark:text-gray-300 cursor-not-allowed focus:outline-none"
          />
        </div>

        <div>
          <label className="text-xs text-gray-500 dark:text-gray-400 mb-1 block">
            Preferred Pickup Date
          </label>
          <input
            type="date"
            name="pickupDate"
            value={pickupDate}
            onChange={(e) => setPickupDate(e.target.value)}
            required
            className="w-full bg-white border border-gray-200 dark:border-[#30363d] rounded-xl px-4 py-2.5 text-sm text-slate-700 dark:text-gray-200 focus:outline-none focus:border-pink-500 dark:focus:border-pink-400 transition-colors"
          />
        </div>

        <div>
          <label className="text-xs text-gray-500 dark:text-gray-400 mb-1 block">
            Message to Owner
          </label>
          
          <textarea
            name="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={4}
            placeholder={`Tell the owner why you'd be a great match for ${pet.name}...`}
            required
            className="w-full bg-white border border-gray-200 dark:border-[#30363d] rounded-xl px-4 py-2.5 text-sm text-slate-700 dark:text-gray-200 placeholder:text-gray-400 dark:placeholder:text-gray-600 focus:outline-none focus:border-pink-500 dark:focus:border-pink-400 transition-colors resize-none"
          />
        </div>

        <button
          type="submit"
          className="w-full py-3 rounded-xl text-sm font-bold text-white bg-linear-to-r from-rose-500 via-pink-500 to-orange-400 hover:opacity-90 active:scale-[0.98] transition-all shadow-md shadow-pink-100 dark:shadow-none"
        >
          Adopt {pet.name} 
        </button>
      </form>
    </div>
  );
};

export default AdoptForm;