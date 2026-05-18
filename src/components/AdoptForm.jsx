"use client";

// import { useSession } from "@/lib/auth-client";
// import { useState } from "react";

const AdoptForm = ({ pet }) => {
//   const { data: session } = useSession();
//   const user = session?.user;
//   const [message, setMessage] = useState("");
//   const [pickupDate, setPickupDate] = useState("");

  const handleAdopt = async (e) => {
    e.preventDefault();
    // POST /requests logic here
  };

  return (
    <div className="bg-gray-50 dark:bg-[#161b22] border border-gray-200 dark:border-[#30363d] rounded-2xl p-5 sm:p-6 h-fit">
      <div className="flex items-center gap-2 mb-1">
        <span className="text-pink-500">🤍</span>
        <h3 className="text-base font-semibold text-gray-900 dark:text-white">
          Request to Adopt {pet.name}
        </h3>
      </div>
      <p className="text-xs text-gray-400 dark:text-gray-500 mb-5">
        Fill out this form and the owner will review your request.
      </p>

      <form onSubmit={handleAdopt} className="flex flex-col gap-4">

        <div>
          <label className="text-xs text-gray-500 dark:text-gray-400 mb-1 block">Pet Name</label>
          <input
            type="text"
            value={pet.name}
            readOnly
            className="w-full bg-white border border-gray-200 dark:border-[#30363d] rounded-xl px-4 py-2.5 text-sm text-slate-600 dark:text-gray-300 cursor-not-allowed focus:outline-none"
          />
        </div>

        <div>
          <label className="text-xs text-gray-500 dark:text-gray-400 mb-1 block">Your Name</label>
          <input
            type="text"
            // value={user?.name || ""}
            readOnly
            className="w-full bg-white border border-gray-200 dark:border-[#30363d] rounded-xl px-4 py-2.5 text-sm text-slate-600 dark:text-gray-300 cursor-not-allowed focus:outline-none"
          />
        </div>

        <div>
          <label className="text-xs text-gray-500 dark:text-gray-400 mb-1 block">Your Email</label>
          <input
            type="email"
            // value={user?.email || ""}
            readOnly
            className="w-full bg-white border border-gray-200 dark:border-[#30363d] rounded-xl px-4 py-2.5 text-sm text-slate-600 dark:text-gray-300 cursor-not-allowed focus:outline-none"
          />
        </div>

        <div>
          <label className="text-xs text-gray-500 dark:text-gray-400 mb-1 block">Preferred Pickup Date</label>
          <input
            type="date"
            // value={pickupDate}
            onChange={(e) => setPickupDate(e.target.value)}
            required
            className="w-full bg-white border border-gray-200 dark:border-[#30363d] rounded-xl px-4 py-2.5 text-sm text-slate-700 dark:text-gray-200 focus:outline-none focus:border-pink-500 dark:focus:border-pink-400 transition-colors"
          />
        </div>

        <div>
          <label className="text-xs text-gray-500 dark:text-gray-400 mb-1 block">Message to Owner</label>
          <textarea
            // value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={4}
            placeholder={`Tell the owner why you'd be a great match for ${pet.name}...`}
            required
            className="w-full bg-white border border-gray-200 dark:border-[#30363d] rounded-xl px-4 py-2.5 text-sm text-slate-700 dark:text-gray-200 placeholder:text-gray-400 dark:placeholder:text-gray-600 focus:outline-none focus:border-pink-500 dark:focus:border-pink-400 transition-colors resize-none"
          />
        </div>

        <button
          type="submit"
          className="w-full py-3 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-rose-500 via-pink-500 to-orange-400 hover:opacity-90 active:scale-[0.98] transition-all shadow-md shadow-pink-100 dark:shadow-none"
        >
          Adopt {pet.name} 🐾
        </button>
      </form>
    </div>
  );
};

export default AdoptForm;