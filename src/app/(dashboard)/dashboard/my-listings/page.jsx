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

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedPetId, setSelectedPetId] = useState(null);

  const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);
  const [activeRequest, setActiveRequest] = useState(null);
  const [requestLoading, setRequestLoading] = useState(false);

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

  const fetchListings = async () => {
    const { data: tokenData } = await authClient.token();
    const token = tokenData?.token;

    if (user?.email) {
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/my-listings?email=${user.email}`, {
        headers: {
          authorization: `Bearer ${token}`
        }
      })
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

  useEffect(() => {
    fetchListings();
  }, [user?.email]);

  const handleDeleteClick = (id) => {
    setSelectedPetId(id);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!selectedPetId) return;
    try {
      const { data: tokenData } = await authClient.token();
      const token = tokenData?.token;

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/add-pet/${selectedPetId}`,
        {
          method: "DELETE",
          headers: {
            authorization: `Bearer ${token}`
          }
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
      setIsDeleteModalOpen(false);
      setSelectedPetId(null);
    }
  };

  const handleApproveButtonClick = async (pet) => {
    setSelectedPetId(pet._id);
    setIsRequestModalOpen(true);
    setRequestLoading(true);
    setActiveRequest(null);

    try {
      const { data: tokenData } = await authClient.token();
      const token = tokenData?.token;

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/pet-request-details/${pet._id}`, {
        headers: {
          authorization: `Bearer ${token}`
        }
      });
      const data = await res.json();

      if (res.ok) {
        setActiveRequest({ ...data, petName: pet.name });
      } else {
        setToast({
          show: true,
          text: data.message || "No specific request found for this pet.",
          type: "error",
        });
        setIsRequestModalOpen(false);
      }
    } catch (err) {
      console.error(err);
      setToast({ show: true, text: "Failed to load request details.", type: "error" });
      setIsRequestModalOpen(false);
    } finally {
      setRequestLoading(false);
    }
  };

  const handleRequestAction = async (statusAction) => {
    if (!selectedPetId) return;
    setActionLoading((prev) => ({ ...prev, [selectedPetId]: true }));
    
    try {
      const { data: tokenData } = await authClient.token();
      const token = tokenData?.token;

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/my-requests/${selectedPetId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ status: statusAction }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setToast({
          show: true,
          text: `Request has been ${statusAction} successfully! 🎉`,
          type: "success",
        });

        setListings(
          listings.map((pet) =>
            pet._id === selectedPetId ? { ...pet, status: statusAction === "approved" ? "adopted" : "Available" } : pet
          )
        );
      } else {
        setToast({
          show: true,
          text: data.message || "Failed to update action.",
          type: "error",
        });
      }
    } catch (err) {
      console.error(err);
      setToast({ show: true, text: "Server error occurred.", type: "error" });
    } finally {
      setActionLoading((prev) => ({ ...prev, [selectedPetId]: false }));
      setIsRequestModalOpen(false);
      setSelectedPetId(null);
      setActiveRequest(null);
    }
  };

  // --- DYNAMIC STATE LOGIC PIPELINE INJECTION ---
  const totalListings = listings.length;
  const adoptedListings = listings.filter((pet) => pet.status?.toLowerCase() === "adopted").length;
  const availableListings = totalListings - adoptedListings;

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-pink-500"></div>
      </div>
    );
  }

  return (
    <ScrollMotion>
      <div className="max-w-6xl mx-auto pb-10 px-2 sm:px-4 relative space-y-6">
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

        {/* Header Element */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-2">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              My Listed Pets
            </h1>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
              Manage the pets you have listed for adoption.
            </p>
          </div>
          <button
            onClick={() => router.push("/dashboard/add-pet")}
            className="w-full sm:w-auto px-4 py-2 bg-pink-500 text-white text-xs font-bold rounded-xl hover:bg-pink-600 transition-colors shadow-xs"
          >
            + Add New Pet
          </button>
        </div>

        {/* --- DYNAMIC ADDITION: CUSTOM & PREMIUM CONTRAST-BALANCED COUNTER CARD PANELS --- */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white dark:bg-[#161b22] border border-gray-200 dark:border-[#30363d] rounded-2xl p-5 flex items-center justify-between shadow-xs">
            <div className="space-y-1">
              <p className="text-xs font-medium text-gray-400 dark:text-gray-500 uppercase tracking-wider">Total Listings</p>
              <p className="text-2xl font-extrabold text-gray-900 dark:text-white font-mono">{totalListings}</p>
            </div>
            <div className="w-10 h-10 rounded-xl bg-pink-50 dark:bg-pink-500/10 flex items-center justify-center text-base">📊</div>
          </div>

          <div className="bg-white dark:bg-[#161b22] border border-gray-200 dark:border-[#30363d] rounded-2xl p-5 flex items-center justify-between shadow-xs">
            <div className="space-y-1">
              <p className="text-xs font-medium text-gray-400 dark:text-gray-500 uppercase tracking-wider">Available Status</p>
              <p className="text-2xl font-extrabold text-emerald-500 dark:text-emerald-400 font-mono">{availableListings}</p>
            </div>
            <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-500/10 flex items-center justify-center text-base">🐾</div>
          </div>

          <div className="bg-white dark:bg-[#161b22] border border-gray-200 dark:border-[#30363d] rounded-2xl p-5 flex items-center justify-between shadow-xs">
            <div className="space-y-1">
              <p className="text-xs font-medium text-gray-400 dark:text-gray-500 uppercase tracking-wider">Adopted Home</p>
              <p className="text-2xl font-extrabold text-amber-500 dark:text-amber-400 font-mono">{adoptedListings}</p>
            </div>
            <div className="w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-500/10 flex items-center justify-center text-base">🎉</div>
          </div>
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
                    src={pet.image || "https://images.unsplash.com/photo-1543466835-00a7907e9de1"}
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
                        <strong className={pet.vaccinationStatus === "Yes" ? "text-emerald-500" : "text-amber-500"}>
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
                      onClick={() => router.push(`/dashboard/my-listings/edit/${pet._id}`)}
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
                    onClick={() => handleApproveButtonClick(pet)}
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
                      : "✓ Check Adoption Requests"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {isDeleteModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
            <div className="bg-white dark:bg-[#161b22] border border-gray-200 dark:border-[#30363d] rounded-2xl w-full max-w-sm p-6 shadow-xl animate-in zoom-in-95 duration-200">
              <div className="text-center">
                <span className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-rose-100 dark:bg-rose-500/10 text-rose-600 mb-4 text-xl">⚠️</span>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">Are you sure?</h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 px-2">
                  Do you really want to delete this pet listing? This action cannot be undone.
                </p>
              </div>
              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => setIsDeleteModalOpen(false)}
                  className="flex-1 py-2.5 border border-gray-200 dark:border-[#30363d] rounded-xl text-xs font-semibold text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-zinc-800 transition-colors"
                >
                  No, Cancel
                </button>
                <button
                  onClick={handleConfirmDelete}
                  className="flex-1 py-2.5 bg-rose-600 text-white rounded-xl text-xs font-bold hover:bg-rose-700 transition-colors shadow-sm"
                >
                  Yes, Delete
                </button>
              </div>
            </div>
          </div>
        )}

        {isRequestModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
            <div className="bg-white dark:bg-[#161b22] border border-gray-200 dark:border-[#30363d] rounded-2xl w-full max-w-md p-6 shadow-xl animate-in zoom-in-95 duration-200">
              
              <div className="flex justify-between items-center border-b border-gray-100 dark:border-[#30363d] pb-3 mb-4">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                  Adoption Request Details
                </h3>
                <button 
                  onClick={() => { setIsRequestModalOpen(false); setActiveRequest(null); }}
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 text-sm font-bold"
                >
                  ✕
                </button>
              </div>

              {requestLoading ? (
                <div className="flex flex-col justify-center items-center py-10 gap-2">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-emerald-500"></div>
                  <p className="text-xs text-gray-400">Loading request data...</p>
                </div>
              ) : activeRequest ? (
                <div>
                  <div className="mb-4">
                    <label className="text-[11px] uppercase tracking-wider font-bold text-gray-400 block">Pet Title</label>
                    <p className="text-sm font-semibold text-gray-900 dark:text-white mt-0.5">
                      {activeRequest.petName || "Adopt Request Target"}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-4 bg-gray-50 dark:bg-zinc-800/40 p-3 rounded-xl border border-gray-100 dark:border-[#30363d]/40">
                    <div>
                      <label className="text-[11px] uppercase tracking-wider font-bold text-gray-400 block">Requested By</label>
                      <p className="text-xs font-medium text-gray-800 dark:text-gray-200 mt-0.5 truncate">
                        {activeRequest.userName || activeRequest.name || "N/A"}
                      </p>
                    </div>
                    <div>
                      <label className="text-[11px] uppercase tracking-wider font-bold text-gray-400 block">Email Address</label>
                      <p className="text-xs font-medium text-gray-800 dark:text-gray-200 mt-0.5 truncate" title={activeRequest.userEmail}>
                        {activeRequest.userEmail || "N/A"}
                      </p>
                    </div>
                  </div>

                  <div className="mb-4">
                    <label className="text-[11px] uppercase tracking-wider font-bold text-gray-400 block">Proposed Pickup Date</label>
                    <div className="flex items-center gap-2 mt-1 text-xs text-gray-700 dark:text-gray-300 font-semibold bg-pink-500/5 border border-pink-500/20 px-3 py-2 rounded-xl w-fit">
                      <span>📅</span>
                      <span>{activeRequest.pickupDate || "Not Specified"}</span>
                    </div>
                  </div>

                  <div className="mb-6">
                    <label className="text-[11px] uppercase tracking-wider font-bold text-gray-400 block mb-1">Current Status</label>
                    <span className={`text-[11px] font-bold uppercase px-3 py-1 rounded-full tracking-wide ${
                      activeRequest.status === "approved" ? "bg-emerald-500/20 text-emerald-500" :
                      activeRequest.status === "rejected" ? "bg-rose-500/20 text-rose-500" : "bg-amber-500/20 text-amber-500"
                    }`}>
                      {activeRequest.status || "Pending"}
                    </span>
                  </div>

                  {activeRequest.status !== "approved" && activeRequest.status !== "rejected" ? (
                    <div className="flex gap-3 border-t border-gray-100 dark:border-[#30363d] pt-4">
                      <button
                        onClick={() => handleRequestAction("rejected")}
                        className="flex-1 py-2.5 border border-rose-200 dark:border-rose-900/30 text-rose-600 rounded-xl text-xs font-bold hover:bg-rose-50 dark:hover:bg-rose-500/5 transition-colors"
                      >
                        Reject Request
                      </button>
                      <button
                        onClick={() => handleRequestAction("approved")}
                        className="flex-1 py-2.5 bg-emerald-500 text-white rounded-xl text-xs font-bold hover:bg-emerald-600 transition-colors shadow-sm"
                      >
                        Approve Request
                      </button>
                    </div>
                  ) : (
                    <div className="border-t border-gray-100 dark:border-[#30363d] pt-3 text-center">
                      <p className="text-xs text-gray-400 italic">
                        This request has already been processed. Action controls are frozen.
                      </p>
                    </div>
                  )}

                </div>
              ) : (
                <p className="text-xs text-center text-rose-500 py-4">
                  Failed to resolve metadata. Please try again.
                </p>
              )}
            </div>
          </div>
        )}

      </div>
    </ScrollMotion>
  );
};

export default MyListingsPage;