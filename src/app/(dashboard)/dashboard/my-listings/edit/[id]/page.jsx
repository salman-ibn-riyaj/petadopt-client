"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { authClient } from "@/lib/auth-client";

const EditPetPage = () => {
  const router = useRouter();
  const { id } = useParams();

  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState({ show: false, text: "", type: "" });

  const [petData, setPetData] = useState({
    petName: "",
    species: "",
    breed: "",
    age: "",
    gender: "Unknown",
    vaccinationStatus: "No",
    petImage: "",
    healthStatus: "",
    location: "",
    adoptionFee: 0,
    description: "",
  });

  useEffect(() => {
    if (toast.show) {
      const timer = setTimeout(() => {
        setToast({ show: false, text: "", type: "" });
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [toast.show]);

  useEffect(() => {
    if (id) {
      fetch(`http://localhost:5001/all-pets/${id}`)
        .then((res) => res.json())
        .then((data) => {
          if (data) {
            setPetData({
              petName: data.name || "",
              species: data.species || "",
              breed: data.breed || "",
              age: data.age || "",
              gender: data.gender || "Unknown",
              vaccinationStatus: data.vaccinationStatus || "No",
              petImage: data.image || "",
              healthStatus: data.healthStatus || "",
              location: data.location || "",
              adoptionFee: data.adoptionFee || 0,
              description: data.description || "",
            });
          }
          setLoading(false);
        })
        .catch((err) => {
          console.error("Error fetching pet data:", err);
          setLoading(false);
        });
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPetData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdatePet = async (e) => {
    e.preventDefault();

    const updatedPetData = {
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
    };

    const { data: tokenData } = await authClient.token();
    console.log(tokenData, "tokenData");

    try {
      const res = await fetch(`http://localhost:5001/add-pet/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${tokenData.token}`,
        },
        body: JSON.stringify(updatedPetData),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setToast({
          show: true,
          text: "Pet updated successfully!",
          type: "success",
        });

        setTimeout(() => {
          router.replace("/dashboard/my-listings");
        }, 1500);
      } else {
        setToast({
          show: true,
          text: data.message || "Failed to update pet info.",
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

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-pink-500"></div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto relative pb-10 px-2 sm:px-4">
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

      <div className="mb-6">
      
        <h1 className="text-2xl font-bold text-purple-500">
          Edit Pet Listing
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          Update the fields below to modify your pet's information.
        </p>
      </div>

      <form
        onSubmit={handleUpdatePet}
        
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
              value={petData.petName}
              onChange={handleChange}
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
              value={petData.species}
              onChange={handleChange}
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
            <label className="text-xs text-slate-600 mb-1 block">
              Breed
            </label>
            <input
              type="text"
              name="breed"
              value={petData.breed}
              onChange={handleChange}
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
              value={petData.age}
              onChange={handleChange}
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
              value={petData.gender}
              onChange={handleChange}
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
              value={petData.vaccinationStatus}
              onChange={handleChange}
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
            value={petData.petImage}
            onChange={handleChange}
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
              value={petData.healthStatus}
              onChange={handleChange}
              className="w-full bg-[#f5f5f0] border border-slate-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-purple-500 text-slate-800"
            >
              <option value="" className="bg-[#fdfcf7] text-slate-800">
                Select health status
              </option>
              <option value="Good" className="bg-[#fdfcf7] text-slate-800">
                Good
              </option>
              <option value="Excellent" className="bg-[#fdfcf7] text-slate-800">
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
              value={petData.location}
              onChange={handleChange}
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
            value={petData.adoptionFee}
            onChange={handleChange}
            min={0}
            className="w-full bg-[#f5f5f0] border border-slate-300 rounded-xl px-4 py-2.5 text-sm text-slate-800 focus:outline-none focus:border-purple-500"
          />
        </div>

        <div>
          <label className="text-xs text-slate-600 mb-1 block">
            Description *
          </label>
          <textarea
            required
            name="description"
            value={petData.description}
            onChange={handleChange}
            rows={4}
            placeholder="Tell us something about the pet..."
            className="w-full bg-[#f5f5f0] border border-slate-300 rounded-xl px-4 py-2.5 text-sm text-slate-800 focus:outline-none focus:border-purple-500 placeholder:text-slate-400 resize-none"
          />
        </div>

        <div className="flex gap-3 justify-end mt-2">
       
          <button
            type="button"
            onClick={() => router.back()}
            className="px-5 py-2.5 border border-slate-300 rounded-xl text-sm font-semibold text-slate-700 hover:bg-slate-100 transition-colors bg-white"
          >
            Cancel
          </button>
       
          <button
            type="submit"
            className="px-6 py-2.5 rounded-xl text-sm font-bold text-white bg-linear-to-r from-purple-600 to-indigo-500 hover:from-purple-700 hover:to-indigo-600 active:scale-[0.98] transition-all shadow-md"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditPetPage;