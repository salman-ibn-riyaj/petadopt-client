import Link from "next/link";
import Image from "next/image";
import AdoptForm from "@/components/AdoptForm";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

const PetDetailPage = async ({ params, searchParams }) => {
  const { id } = await params;
  
 
  const resolvedSearchParams = await searchParams;
  const isRequestSubmitted = resolvedSearchParams?.success === "true";

  const { token } = await auth.api.getToken({
    headers: await headers()
  });
  console.log(token);

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/all-pets/${id}`, {
    headers: {
      authorization: `Bearer ${token}` || ''
    }
  });
  const pet = await res.json();

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

  const isAdopted = pet.status === "adopted" || pet.adopted === true;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0d1117] text-gray-900 dark:text-gray-100 px-4 py-6 sm:px-6 md:px-10 lg:px-20">
      <Link
        href="/all-pets"
        className="inline-flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 hover:text-pink-500 dark:hover:text-pink-400 transition-colors mb-6"
      >
        ← Back to All Pets
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10">
    
        <div>
          <div className="relative w-full h-56 sm:h-72 md:h-80 rounded-2xl overflow-hidden mb-5">
            <Image
              src={pet?.image}
              alt={pet?.name}
              fill
              className="object-cover"
              sizes="(max-w: 768px) 100vw, 50vw"
              priority
            />
        
            <span className={`absolute top-3 right-3 text-white text-xs font-medium px-3 py-1 rounded-full z-10 ${
              isAdopted ? "bg-zinc-500" : "bg-teal-500"
            }`}>
              {isAdopted ? "Adopted" : "Available"}
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
                    className="text-xs px-3 py-1 rounded-full bg-pink-100 dark:bg-pink-900/30 text-pink-700 dark:text-pink-300 border border-pink-300 dark:border-pink-800"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <div className="sm:text-right shrink-0">
              <p className="text-xs text-gray-500 dark:text-gray-500">
                Adoption Fee
              </p>
              <p className="text-2xl font-bold text-pink-600 dark:text-pink-500">
                ${pet.adoptionFee}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 mb-6">
            {infoFields.map(({ icon, label, value }) => (
              <div
                key={label}
                className="bg-white dark:bg-[#161b22] border border-gray-300 dark:border-[#30363d] rounded-xl px-3 py-3 sm:px-4 shadow-sm"
              >
                <p className="text-xs text-pink-700 dark:text-pink-400 mb-1 font-bold antialiased">
                  {icon} {label}
                </p>
                <p className="text-sm font-extrabold text-black dark:text-white break-words antialiased">
                  {value}
                </p>
              </div>
            ))}
          </div>

          <div>
            <h2 className="text-base font-semibold text-gray-900 dark:text-gray-500 mb-2">
              About
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
              {pet.about}
            </p>
          </div>
        </div>

       
        {isAdopted ? (
          <div className="bg-white dark:bg-[#161b22] border border-gray-200 dark:border-[#30363d] rounded-2xl p-6 sm:p-8 flex flex-col items-center justify-center text-center h-fit shadow-xs border-t-4 border-t-zinc-400 dark:border-t-zinc-600 animate-in fade-in duration-300">
            <div className="w-16 h-16 rounded-full bg-zinc-100 dark:bg-zinc-800/50 flex items-center justify-center text-2xl mb-4 shadow-inner">
              🎉
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
              Already Adopted!
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 max-w-sm leading-relaxed">
              {pet.name} has successfully found a loving home. The adoption form is closed for this listing. Thank you for your interest!
            </p>
            <div className="mt-6 w-full pt-5 border-t border-gray-100 dark:border-[#30363d]/60 flex flex-col gap-2">
              <Link 
                href="/all-pets"
                className="w-full py-2.5 bg-gray-100 dark:bg-zinc-800 hover:bg-gray-200 dark:hover:bg-zinc-700 text-gray-700 dark:text-gray-200 text-xs font-bold rounded-xl transition-colors text-center"
              >
                Explore Other Pets
              </Link>
            </div>
          </div>
        ) : isRequestSubmitted ? (
         
          <div className="bg-white dark:bg-[#161b22] border border-emerald-100 dark:border-emerald-500/20 rounded-3xl p-6 sm:p-10 flex flex-col items-center text-center h-fit shadow-md border-b-8 border-b-emerald-500 animate-in zoom-in-95 duration-300 relative overflow-hidden group">
           
            <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-teal-500 via-emerald-500 to-emerald-400"></div>
            
        
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-500/10 dark:to-teal-500/5 flex items-center justify-center mb-6 shadow-xs border border-emerald-200/50 dark:border-emerald-500/20 transform group-hover:rotate-6 transition-transform duration-300">
              <span className="text-3xl drop-shadow-sm animate-bounce">✉️</span>
            </div>

         
            <h3 className="text-xl sm:text-2xl font-black text-gray-900 dark:text-white tracking-tight">
              Application Dispatched!
            </h3>
            
            <p className="text-xs text-emerald-600 dark:text-emerald-400 font-bold tracking-wider uppercase mt-1 px-2.5 py-0.5 bg-emerald-50 dark:bg-emerald-500/10 rounded-md">
              Awaiting Host Review
            </p>

            <p className="text-sm text-gray-500 dark:text-gray-400 max-w-sm leading-relaxed mt-4">
              Your adoption portfolio for <strong className="text-gray-800 dark:text-gray-200">{pet.name}</strong> has been successfully archived. The profile caretaker will process your details via secure pipeline.
            </p>

           
            <div className="w-full border-t border-dashed border-gray-200 dark:border-[#30363d] my-6"></div>

       
            <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Link 
                href="/dashboard/my-requests"
                className="w-full py-3 bg-zinc-900 text-white dark:bg-white dark:text-zinc-950 hover:bg-zinc-800 dark:hover:bg-zinc-100 text-xs font-extrabold rounded-xl transition-all shadow-xs text-center flex items-center justify-center gap-1.5"
              >
                📊 View My Requests
              </Link>
              <Link 
                href="/all-pets"
                className="w-full py-3 bg-gray-100 dark:bg-zinc-800 hover:bg-gray-200 dark:hover:bg-zinc-700 text-gray-700 dark:text-gray-200 text-xs font-bold rounded-xl transition-colors text-center flex items-center justify-center"
              >
                Browse Catalog
              </Link>
            </div>
          </div>
        ) : (
          <AdoptForm pet={pet} />
        )}
      </div>
    </div>
  );
};

export default PetDetailPage;