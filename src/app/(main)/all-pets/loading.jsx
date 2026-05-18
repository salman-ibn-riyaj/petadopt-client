export default function Loading() {
  
  const skeletonCards = Array.from({ length: 6 });

  return (
    <section className="py-16 md:py-24 px-6 bg-white dark:bg-slate-950 transition-colors duration-500 animate-pulse">
      <div className="container mx-auto max-w-6xl">
        
        {/* 1. Header Loading Skeleton */}
        <div className="text-center mb-16 flex flex-col items-center">
          <div className="h-9 md:h-12 bg-slate-200 dark:bg-slate-800 w-48 md:w-64 rounded-xl mb-4"></div>
          <div className="h-4 bg-slate-200 dark:bg-slate-800 w-full max-w-md rounded-lg mb-2"></div>
          <div className="w-20 h-1.5 bg-slate-300 dark:bg-slate-700 mt-6 rounded-full"></div>
        </div>

        {/* 2. Search & Filter Bar Loading Skeleton */}
        <div className="my-6 md:my-12 container mx-auto bg-slate-100 dark:bg-slate-900 p-4 sm:p-6 md:p-8 rounded-xl w-[95%] lg:w-full border border-transparent dark:border-slate-800">
          <div className="h-6 bg-slate-200 dark:bg-slate-800 w-32 rounded-md mb-6"></div>
          
          <div className="flex flex-col md:flex-row items-stretch md:items-center gap-4 md:gap-5">
            {/* Search Input Skeleton */}
            <div className="flex-1 h-12 bg-slate-200 dark:bg-slate-800 rounded-xl"></div>
            
            <div className="flex flex-row items-end gap-3 md:gap-5">
              {/* Filter Dropdown Skeleton */}
              <div className="w-full sm:w-[256px] h-12 bg-slate-200 dark:bg-slate-800 rounded-xl"></div>
              {/* Sorting Dropdown Skeleton */}
              <div className="w-full sm:w-50 h-12 bg-slate-200 dark:bg-slate-800 rounded-xl"></div>
            </div>
          </div>
        </div>

        {/* 3. Pet Cards Grid Loading Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {skeletonCards.map((_, index) => (
            <div 
              key={index} 
              className="bg-white dark:bg-slate-900 rounded-2xl overflow-hidden border border-slate-100 dark:border-slate-800 shadow-md"
            >
              {/* Pet Image Skeleton */}
              <div className="w-full h-56 bg-slate-200 dark:bg-slate-800 relative">
              
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-8 h-8 border-4 border-[#56B6C6] border-t-transparent rounded-full animate-spin"></div>
                </div>
              </div>

              {/* Pet Info Content Skeleton */}
              <div className="p-6 space-y-4">
                <div className="flex justify-between items-center">
                  {/* Name Skeleton */}
                  <div className="h-6 bg-slate-200 dark:bg-slate-800 w-1/2 rounded-md"></div>
                  {/* Age/Species Badge Skeleton */}
                  <div className="h-5 bg-slate-200 dark:bg-slate-800 w-16 rounded-full"></div>
                </div>

                {/* Short Description Lines */}
                <div className="space-y-2">
                  <div className="h-4 bg-slate-200 dark:bg-slate-800 w-full rounded"></div>
                  <div className="h-4 bg-slate-200 dark:bg-slate-800 w-5/6 rounded"></div>
                </div>

                {/* Divider Line */}
                <div className="border-t border-slate-100 dark:border-slate-800 pt-4 flex justify-between items-center">
                  {/* Price/Fee Skeleton */}
                  <div className="h-5 bg-slate-200 dark:bg-slate-800 w-20 rounded-md"></div>
                  {/* Button Skeleton */}
                  <div className="h-9 bg-slate-200 dark:bg-slate-800 w-24 rounded-lg"></div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}