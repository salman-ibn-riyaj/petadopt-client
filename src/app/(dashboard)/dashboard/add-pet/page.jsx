"use client";

import ScrollMotion from "@/components/ScrollMotion";
import { authClient } from "@/lib/auth-client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

const AddPetPage = () => {
  const router = useRouter();
  const { data: session } = authClient.useSession();
  const user = session?.user;

  const [toast, setToast] = useState({ show: false, text: "", type: "" });

  useEffect(() => {
    if (toast.show) {
      const timer = setTimeout(() => {
        setToast({ show: false, text: "", type: "" });
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [toast.show]);

  const handleAddPet = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const petData = Object.fromEntries(formData.entries());

    const finalPetData = {
      name: petData.petName,
      species: petData.species,
      breed: petData.breed || "N/A",
      age: petData.age || "Unknown",
      gender: petData.gender,
      vaccinationStatus: petData.vaccinationStatus,
      image: petData.petImage,
      healthStatus: petData.healthStatus,
      location: petData.location,
      adoptionFee: Number(petData.adoptionFee) || 0,
      description: petData.description,
      ownerEmail: user?.email || "unknown",
      ownerName: user?.name || "Anonymous",
      status: "Available",
      requestCount: 0,
      listedDate: new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      }),
    };

    const { data: tokenData } = await authClient.token();
    console.log(tokenData, "tokenData");

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/add-pet`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${tokenData.token}` || "",
        },
        body: JSON.stringify(finalPetData),
      });

      const data = await res.json();

      if (res.ok) {
        setToast({
          show: true,
          text: "Pet listed successfully!",
          type: "success",
        });
        e.target.reset();

        setTimeout(() => {
          router.replace("/dashboard/my-listings");
        }, 1500);
      } else {
        setToast({
          show: true,
          text: data.message || "Failed to add pet.",
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
    <ScrollMotion>
      <div className="max-w-3xl mx-auto relative pb-10">
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

        <div className="mb-6">
          <h1 className="text-2xl font-bold text-purple-500">
            Add a Pet Listing
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Fill out this form to add a new pet for adoption.
          </p>
        </div>

        <form
          onSubmit={handleAddPet}
          className="bg-[#fdfcf7] border border-slate-200 rounded-xl p-5 sm:p-6 flex flex-col gap-4"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-slate-600 mb-1 block">
                Pet Name *
              </label>
              <input
                required
                type="text"
                name="petName"
                placeholder="e.g. Buddy"
                className="w-full bg-[#f5f5f0] border border-slate-300 rounded-xl px-4 py-2.5 text-sm text-slate-800 focus:outline-none focus:border-purple-500 placeholder:text-slate-400"
              />
            </div>
            <div>
              <label className="text-xs text-slate-600 mb-1 block">
                Species *
              </label>
              <select
                required
                name="species"
                className="w-full bg-[#f5f5f0] border border-slate-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-purple-500 text-slate-800"
              >
                <option value="" className="bg-[#fdfcf7] text-slate-800">
                  Select species
                </option>
                <option value="Dog" className="bg-[#fdfcf7] text-slate-800">
                  Dog
                </option>
                <option value="Cat" className="bg-[#fdfcf7] text-slate-800">
                  Cat
                </option>
                <option value="Bird" className="bg-[#fdfcf7] text-slate-800">
                  Bird
                </option>
                <option value="Rabbit" className="bg-[#fdfcf7] text-slate-800">
                  Rabbit
                </option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-slate-600 mb-1 block">Breed</label>
              <input
                type="text"
                name="breed"
                placeholder="e.g. Labrador"
                className="w-full bg-[#f5f5f0] border border-slate-300 rounded-xl px-4 py-2.5 text-sm text-slate-800 focus:outline-none focus:border-purple-500 placeholder:text-slate-400"
              />
            </div>
            <div>
              <label className="text-xs text-slate-600 mb-1 block">
                Age (years)
              </label>
              <input
                type="number"
                step="0.1"
                name="age"
                placeholder="e.g. 2"
                className="w-full bg-[#f5f5f0] border border-slate-300 rounded-xl px-4 py-2.5 text-sm text-slate-800 focus:outline-none focus:border-purple-500 placeholder:text-slate-400"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-slate-600 mb-1 block">
                Gender
              </label>
              <select
                name="gender"
                className="w-full bg-[#f5f5f0] border border-slate-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-purple-500 text-slate-800"
              >
                <option value="Unknown" className="bg-[#fdfcf7] text-slate-800">
                  Select gender
                </option>
                <option value="Male" className="bg-[#fdfcf7] text-slate-800">
                  Male
                </option>
                <option value="Female" className="bg-[#fdfcf7] text-slate-800">
                  Female
                </option>
              </select>
            </div>
            <div>
              <label className="text-xs text-slate-600 mb-1 block">
                Vaccination Status
              </label>
              <select
                name="vaccinationStatus"
                className="w-full bg-[#f5f5f0] border border-slate-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-purple-500 text-slate-800"
              >
                <option value="No" className="bg-[#fdfcf7] text-slate-800">
                  No
                </option>
                <option value="Yes" className="bg-[#fdfcf7] text-slate-800">
                  Yes
                </option>
              </select>
            </div>
          </div>

          <div>
            <label className="text-xs text-slate-600 mb-1 block">
              Pet Image URL *
            </label>
            <input
              required
              type="url"
              name="petImage"
              placeholder="https://i.ibb.co/..."
              className="w-full bg-[#f5f5f0] border border-slate-300 rounded-xl px-4 py-2.5 text-sm text-slate-800 focus:outline-none focus:border-purple-500 placeholder:text-slate-400"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-slate-600 mb-1 block">
                Health Status *
              </label>
              <select
                required
                name="healthStatus"
                className="w-full bg-[#f5f5f0] border border-slate-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-purple-500 text-slate-800"
              >
                <option value="" className="bg-[#fdfcf7] text-slate-800">
                  Select health status
                </option>
                <option value="Good" className="bg-[#fdfcf7] text-slate-800">
                  Good
                </option>
                <option
                  value="Excellent"
                  className="bg-[#fdfcf7] text-slate-800"
                >
                  Excellent
                </option>
                <option
                  value="Needs Medical Attention"
                  className="bg-[#fdfcf7] text-slate-800"
                >
                  Needs Medical Attention
                </option>
              </select>
            </div>
            <div>
              <label className="text-xs text-slate-600 mb-1 block">
                Location *
              </label>
              <input
                required
                type="text"
                name="location"
                placeholder="e.g. Dhaka, BD"
                className="w-full bg-[#f5f5f0] border border-slate-300 rounded-xl px-4 py-2.5 text-sm text-slate-800 focus:outline-none focus:border-purple-500 placeholder:text-slate-400"
              />
            </div>
          </div>

          <div>
            <label className="text-xs text-slate-600 mb-1 block">
              Adoption Fee ($)
            </label>
            <input
              type="number"
              name="adoptionFee"
              defaultValue={0}
              min={0}
              className="w-full bg-[#f5f5f0] border border-slate-300 rounded-xl px-4 py-2.5 text-sm text-slate-800 focus:outline-none focus:border-purple-500"
            />
          </div>

          <div>
            <label className="text-xs text-slate-600 mb-1 block">
              Owner Email
            </label>
            <input
              type="email"
              value={user?.email || ""}
              readOnly
              className="w-full bg-slate-200 border border-slate-300 rounded-xl px-4 py-2.5 text-sm text-slate-500 cursor-not-allowed focus:outline-none"
            />
          </div>

          <div>
            <label className="text-xs text-slate-600 mb-1 block">
              Description *
            </label>
            <textarea
              required
              name="description"
              rows={4}
              placeholder="Tell us something about the pet..."
              className="w-full bg-[#f5f5f0] border border-slate-300 rounded-xl px-4 py-2.5 text-sm text-slate-800 focus:outline-none focus:border-purple-500 placeholder:text-slate-400 resize-none"
            />
          </div>

          <button
            type="submit"
            className="w-full mt-2 py-3 rounded-xl text-sm font-bold text-white bg-linear-to-r from-purple-600 to-indigo-500 hover:from-purple-700 hover:to-indigo-600 active:scale-[0.98] transition-all shadow-md"
          >
            Add Pet Listing
          </button>
        </form>
      </div>
    </ScrollMotion>
  );
};

export default AddPetPage;
