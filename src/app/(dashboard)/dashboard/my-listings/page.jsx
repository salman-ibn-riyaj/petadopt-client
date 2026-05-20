"use client";

import { authClient } from "@/lib/auth-client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import ScrollMotion from "@/components/ScrollMotion";

const MyListingsPage = () => {
  const router = useRouter();
  const { data: session } = authClient.useSession();
  const user = session?.user;

  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPetId, setSelectedPetId] = useState(null);
  const [toast, setToast] = useState({ show: false, text: "", type: "" });
  const [actionLoading, setActionLoading] = useState({});

  useEffect(() => {
    if (toast.show) {
      const timer = setTimeout(() => {
        setToast({ show: false, text: "", type: "" });
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [toast.show]);

  useEffect(() => {
    const fetchListings = () => {
      if (user?.email) {
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/my-listings?email=${user.email}`)
          .then((res) => res.json())
          .then((data) => {
            setListings(data);
            setLoading(false);
          })
          .catch((err) => {
            console.error(err);
            setLoading(false);
          });
      }
    };

    fetchListings();
  }, [user?.email]);

  const handleDeleteClick = (id) => {
    setSelectedPetId(id);
    setIsModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!selectedPetId) return;

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/add-pet/${selectedPetId}`,
        {
          method: "DELETE",
        },
      );
      const data = await res.json();

      if (res.ok && data.success) {
        setToast({
          show: true,
          text: "Listing deleted successfully! 🗑️",
          type: "success",
        });

        setListings(listings.filter((pet) => pet._id !== selectedPetId));
      } else {
        setToast({
          show: true,
          text: data.message || "Failed to delete.",
          type: "error",
        });
      }
    } catch (err) {
      console.error(err);
      setToast({ show: true, text: "Server error occurred.", type: "error" });
    } finally {
      setIsModalOpen(false);
      setSelectedPetId(null);
    }
  };


  const handleApproveClick = async (petId) => {
    setActionLoading((prev) => ({ ...prev, [petId]: true }));
    try {
 
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/my-requests/${petId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: "approved" }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setToast({
          show: true,
          text: "Pet adoption approved successfully! 🎉",
          type: "success",
        });

    
        setListings(
          listings.map((pet) =>
            pet._id === petId ? { ...pet, status: "adopted" } : pet
          )
        );
      } else {
        setToast({
          show: true,
          text: data.message || "Failed to approve request.",
          type: "error",
        });
      }
    } catch (err) {
      console.error(err);
      setToast({ show: true, text: "Server error occurred.", type: "error" });
    } finally {
      setActionLoading((prev) => ({ ...prev, [petId]: false }));
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-pink-500"></div>
      </div>
    );
  }

  return (
    <ScrollMotion>
      <div className="max-w-6xl mx-auto pb-10 px-2 sm:px-4 relative">
        {toast.show && (
          <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 animate-in fade-in slide-in-from-top-4 duration-200">
            {toast.type === "success" ? (
              <div className="bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 flex items-center gap-2 px-5 py-3 rounded-xl shadow-lg text-sm font-semibold border border-zinc-800 dark:border-zinc-200">
                <span>{toast.text}</span>
              </div>
            ) : (
              <div className="bg-rose-600 text-white flex items-center gap-2 px-5 py-3 rounded-xl shadow-lg text-sm font-semibold border border-rose-700">
                <span>{toast.text}</span>
              </div>
            )}
          </div>
        )}

        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              My Listed Pets
            </h1>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
              Manage the pets you have listed for adoption ({listings.length})
            </p>
          </div>
          <button
            onClick={() => router.push("/dashboard/add-pet")}
            className="w-full sm:w-auto px-4 py-2 bg-pink-500 text-white text-xs font-bold rounded-xl hover:bg-pink-600 transition-colors shadow-xs"
          >
            + Add New Pet
          </button>
        </div>

        {listings.length === 0 ? (
          <div className="bg-white dark:bg-[#161b22] border border-gray-200 dark:border-[#30363d] rounded-xl p-10 text-center">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              You haven't listed any pets yet.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {listings.map((pet) => (
              <div
                key={pet._id}
                className="bg-white dark:bg-[#161b22] border border-gray-200 dark:border-[#30363d] rounded-2xl overflow-hidden shadow-xs hover:shadow-md transition-all duration-200 flex flex-col justify-between group"
              >
                <div className="relative h-48 w-full bg-gray-100 dark:bg-zinc-800 overflow-hidden">
                  <Image
                    src={
                      pet.image ||
                      "https://images.unsplash.com/photo-1543466835-00a7907e9de1"
                    }
                    alt={pet.name}
                    fill
                    sizes="(max-w-768px) 100vw, (max-w-1200px) 50vw, 33vw"
                    className="object-cover group-hover:scale-[1.02] transition-transform duration-300"
                  />
                  <span className={`absolute top-3 right-3 text-[10px] font-bold uppercase px-2.5 py-1 rounded-full tracking-wider z-10 text-white ${
                    pet.status === "adopted" ? "bg-zinc-500/90" : "bg-emerald-500/90"
                  }`}>
                    {pet.status || "Available"}
                  </span>
                  <span className="absolute bottom-3 left-3 text-xs font-bold bg-black/70 backdrop-blur-xs text-white px-2.5 py-1 rounded-lg z-10">
                    {pet.adoptionFee === 0 ? "Free" : `$${pet.adoptionFee}`}
                  </span>
                </div>

                <div className="p-4 flex-1">
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                      {pet.name}
                    </h3>
                    <span className="text-[11px] font-medium text-gray-400 dark:text-gray-500">
                      {pet.listedDate}
                    </span>
                  </div>

                  <p className="text-xs text-pink-500 font-semibold mb-3">
                    {pet.species} •{" "}
                    <span className="text-gray-500 dark:text-gray-400 font-normal">
                      {pet.breed}
                    </span>
                  </p>

                  <div className="grid grid-cols-2 gap-y-2 gap-x-4 border-t border-gray-100 dark:border-[#30363d] pt-3 text-xs text-gray-600 dark:text-gray-300">
                    <div className="flex items-center gap-1.5">
                      <span className="text-gray-400">⏳</span>
                      <span>{pet.age} Yrs</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-gray-400">⚧</span>
                      <span>{pet.gender}</span>
                    </div>
                    <div className="flex items-center gap-1.5 col-span-2">
                      <span className="text-gray-400">📍</span>
                      <span className="truncate">{pet.location}</span>
                    </div>
                    <div className="flex items-center gap-1.5 col-span-2 text-[11px]">
                      <span className="text-gray-400">🛡️</span>
                      <span>
                        Vaccinated:{" "}
                        <strong
                          className={
                            pet.vaccinationStatus === "Yes"
                              ? "text-emerald-500"
                              : "text-amber-500"
                          }
                        >
                          {pet.vaccinationStatus}
                        </strong>
                      </span>
                    </div>
                  </div>
                </div>

       
                <div className="p-4 pt-0 flex flex-col gap-2 border-t border-gray-50 dark:border-[#30363d]/50 mt-2">
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      onClick={() => router.push(`/all-pets/${pet._id}`)}
                      className="py-2 bg-gray-50 dark:bg-zinc-800 text-gray-700 dark:text-gray-200 text-xs font-semibold rounded-xl hover:bg-gray-100 dark:hover:bg-zinc-700 transition-colors"
                    >
                      View
                    </button>
                    <button
                      onClick={() =>
                        router.push(`/dashboard/my-listings/edit/${pet._id}`)
                      }
                      className="py-2 bg-gray-50 dark:bg-zinc-800 text-pink-500 text-xs font-semibold rounded-xl hover:bg-pink-50 dark:hover:bg-pink-500/10 transition-colors"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteClick(pet._id)}
                      className="py-2 bg-rose-500/10 text-rose-600 dark:text-rose-400 text-xs font-semibold rounded-xl hover:bg-rose-600 hover:text-white dark:hover:bg-rose-600 dark:hover:text-white transition-all"
                    >
                      Delete
                    </button>
                  </div>

       
                  <button
                    disabled={pet.status === "adopted" || actionLoading[pet._id]}
                    onClick={() => handleApproveClick(pet._id)}
                    className={`w-full py-2.5 text-xs font-bold rounded-xl transition-all shadow-xs ${
                      pet.status === "adopted"
                        ? "bg-gray-100 dark:bg-zinc-800 text-gray-400 dark:text-zinc-500 cursor-not-allowed"
                        : "bg-emerald-500 text-white hover:bg-emerald-600"
                    }`}
                  >
                    {actionLoading[pet._id]
                      ? "Processing..."
                      : pet.status === "adopted"
                      ? "Already Adopted"
                      : "✓ Approve Adoption"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
            <div className="bg-white dark:bg-[#161b22] border border-gray-200 dark:border-[#30363d] rounded-2xl w-full max-w-sm p-6 shadow-xl animate-in zoom-in-95 duration-200">
              <div className="text-center">
                <span className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-rose-100 dark:bg-rose-500/10 text-rose-600 mb-4 text-xl">
                  ⚠️
                </span>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                  Are you sure?
                </h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 px-2">
                  Do you really want to delete this pet listing? This action
                  cannot be undone.
                </p>
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 py-2.5 border border-gray-200 dark:border-[#30363d] rounded-xl text-xs font-semibold text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-zinc-800 transition-colors"
                >
                  No, Cancel
                </button>
                <button
                  onClick={handleConfirmDelete}
                  className="flex-1 py-2.5 bg-rose-600 text-white rounded-xl text-xs font-bold hover:bg-rose-700 transition-colors shadow-sm shadow-rose-100 dark:shadow-none"
                >
                  Yes, Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </ScrollMotion>
  );
};

export default MyListingsPage;