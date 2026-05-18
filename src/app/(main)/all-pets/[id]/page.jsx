import Link from "next/link";
import Image from "next/image";
import AdoptForm from "@/components/AdoptForm";


const PetDetailPage = async ({ params }) => {
  const { id } = await params;
  const res = await fetch(`http://localhost:5001/all-pets/${id}`);
  const pet = await res.json();
  console.log(pet);

  const infoFields = [
    { icon: "🐾", label: "Species", value: pet.species },
    { icon: "🧬", label: "Breed", value: pet.breed },
    { icon: "🎂", label: "Age", value: pet.age },
    { icon: "⚧", label: "Gender", value: pet.gender },
    { icon: "📍", label: "Location", value: pet.location },
    { icon: "💵", label: "Adoption Fee", value: `$${pet.adoptionFee}` },
    { icon: "🏥", label: "Health Status", value: pet.healthStatus },
    { icon: "💉", label: "Vaccinated", value: pet.vaccinated ? "Yes" : "No" },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-[#0d1117] text-gray-900 dark:text-gray-100 px-4 py-6 sm:px-6 md:px-10 lg:px-20">

      <Link
        href="/all-pets"
        className="inline-flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 hover:text-pink-500 dark:hover:text-pink-400 transition-colors mb-6"
      >
        ← Back to All Pets
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10">

        {/* LEFT — Pet Info */}
        <div>
          <div className="relative w-full h-56 sm:h-72 md:h-80 rounded-2xl overflow-hidden mb-5">
            {/* <Image
              src={pet.image}
              alt={pet.name}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            /> */}
            <span className="absolute top-3 right-3 bg-teal-500 text-white text-xs font-medium px-3 py-1 rounded-full z-10">
              Available
            </span>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
                {pet.name}
              </h1>
              <div className="flex flex-wrap gap-2 mt-2">
                {[pet.species, pet.breed, pet.gender].map((tag, index) => (
                  <span
                    key={index}
                    className="text-xs px-3 py-1 rounded-full bg-pink-100 dark:bg-pink-900/30 text-pink-600 dark:text-pink-300 border border-pink-200 dark:border-pink-800"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <div className="sm:text-right shrink-0">
              <p className="text-xs text-gray-400 dark:text-gray-500">Adoption Fee</p>
              <p className="text-2xl font-bold text-pink-500">${pet.adoptionFee}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 mb-6">
            {infoFields.map(({ icon, label, value }) => (
              <div
                key={label}
                className="bg-gray-50 dark:bg-[#161b22] border border-gray-200 dark:border-[#30363d] rounded-xl px-3 py-3 sm:px-4"
              >
                <p className="text-xs text-pink-500 dark:text-pink-400 mb-1">
                  {icon} {label}
                </p>
                <p className="text-sm font-semibold text-gray-800 dark:text-gray-100 break-words">
                  {value}
                </p>
              </div>
            ))}
          </div>

          <div>
            <h2 className="text-base font-semibold text-gray-900 dark:text-gray-100 mb-2">
              About {pet.about}
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
              {pet.about}
            </p>
          </div>
        </div>

        {/* RIGHT — Adopt Form */}
        <AdoptForm pet={pet} />

      </div>
    </div>
  );
};

export default PetDetailPage;