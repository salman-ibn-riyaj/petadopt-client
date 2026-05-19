// "use client";

// import { useEffect, useState } from "react";
// import { authClient } from "@/lib/auth-client";
// import { Button, Spinner, toast } from "@heroui/react";
// import { MdOutlineRemoveRedEye, MdOutlineCancel } from "react-icons/md";
// import Link from "next/link";
// import ScrollMotion from "@/components/ScrollMotion";

// export default function MyRequestsPage() {
//   const { data: session, isPending: sessionLoading } = authClient.useSession();
//   const user = session?.user;

//   const [requests, setRequests] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     if (!user?.email) return;

//     fetch(`${process.env.NEXT_PUBLIC_API_URL}/my-requests?email=${user.email}`)
//       .then((res) => res.json())
//       .then((data) => {
//         setRequests(data);
//         setLoading(false);
//       })
//       .catch((err) => {
//         console.error("Error fetching requests:", err);
//         setLoading(false);
//       });
//   }, [user?.email]);

//   // const handleCancel = async (id) => {
//   //   const proceed = window.confirm(
//   //     "Are you sure you want to cancel this adoption request?",
//   //   );
//   //   if (!proceed) return;

//   //   const { data: tokenData } = await authClient.token();
//   //   console.log(tokenData, "tokenData");

//   //   try {
//   //     const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/my-requests/${id}`, {
//   //       method: "DELETE",
//   //       headers: {
//   //         authorization: `Bearer ${tokenData.token}`,
//   //       },
//   //     });
//   //     const data = await response.json();

//   //     if (data.success) {
//   //       toast(data.message);

//   //       const remainingRequests = requests.filter((req) => req._id !== id);
//   //       setRequests(remainingRequests);
//   //     } else {
//   //       toast("Failed to delete the request.");
//   //     }
//   //   } catch (error) {
//   //     console.error("Error deleting request:", error);
//   //   }
//   // };

// const handleCancel = async (id) => {
//     toast((t) => (
//       <div className="flex flex-col gap-3 font-mono text-left w-full">
//         {/* প্রধান প্রশ্ন */}
//         <p className="text-sm font-semibold text-white">
//           Sure you want to cancel?
//         </p>

//         {/* এখানে নো এবং ইয়েস বাটন দুটি সাজানো আছে */}
//         <div className="flex justify-end gap-2">
//           {/* ১. No বাটন: ডাটা ডিলিট হবে না, শুধু টোস্ট বন্ধ হবে */}
//           <Button
//             size="sm"
//             variant="flat"
//             className="text-xs text-gray-300 bg-gray-800 hover:bg-gray-700 rounded-lg px-3"
//             onClick={() => toast.dismiss(t.id)}
//           >
//             No
//           </Button>

//           {/* ২. Yes বাটন: এটাতে ক্লিক করলেই ব্যাকএন্ডে ডিলিট রিকোয়েস্ট যাবে */}
//           <Button
//             size="sm"
//             className="text-xs bg-rose-500 hover:bg-rose-600 text-white font-bold rounded-lg px-3"
//             onClick={async () => {
//               toast.dismiss(t.id); // ক্লিক করার সাথে সাথে টোস্টটি বন্ধ হবে

//               try {
//                 const { data: tokenData } = await authClient.token();
//                 const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/my-requests/${id}`, {
//                   method: "DELETE",
//                   headers: { authorization: `Bearer ${tokenData.token}` },
//                 });
//                 const data = await response.json();

//                 if (data.success) {
//                   toast(data.message || "Cancelled successfully!");
//                   setRequests((prev) => prev.filter((req) => req._id !== id));
//                 } else {
//                   toast("Failed to delete the request.");
//                 }
//               } catch (error) {
//                 console.error("Error deleting request:", error);
//               }
//             }}
//           >
//             Yes, Cancel
//           </Button>
//         </div>
//       </div>
//     ), {
//       duration: 4000, // ৪ সেকেন্ড স্ক্রিনে থাকবে সিদ্ধান্ত নেওয়ার জন্য
//       style: {
//         background: '#111622',
//         color: '#fff',
//         border: '1px solid #1f2937',
//         borderRadius: '12px',
//         padding: '12px'
//       }
//     });
//   };

//   const totalRequests = requests.length;
//   const pendingRequests = requests.filter((r) => r.status === "Pending").length;
//   const approvedRequests = requests.filter(
//     (r) => r.status === "Approved",
//   ).length;
//   const rejectedRequests = requests.filter(
//     (r) => r.status === "Rejected",
//   ).length;

//   if (sessionLoading || loading) {
//     return (
//       <div className="min-h-[60vh] flex items-center justify-center">
//         <Spinner size="lg" color="danger" label="Loading your requests..." />
//       </div>
//     );
//   }

//   return (
//     <ScrollMotion>
//       <div className="space-y-8">
//         <div>
//           <h1 className="text-3xl font-bold tracking-tight font-mono">
//             My <span className="text-rose-400">Adoption</span> Requests
//           </h1>
//           <p className="text-sm text-gray-400 mt-1 font-mono tracking-wide">
//             Track the status of all your adoption requests here.
//           </p>
//         </div>

//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
//           {/* Total Card */}
//           <div className="bg-[#111622] border border-gray-800 rounded-2xl p-6 text-center space-y-2">
//             <div className="text-3xl font-bold text-white">{totalRequests}</div>
//             <div className="text-xs text-gray-400 uppercase tracking-wider font-mono">
//               Total
//             </div>
//           </div>

//           {/* Pending Card */}
//           <div className="bg-[#111622] border border-gray-800 rounded-2xl p-6 text-center space-y-2">
//             <div className="text-3xl font-bold text-amber-500">
//               {pendingRequests}
//             </div>
//             <div className="text-xs text-gray-400 uppercase tracking-wider font-mono">
//               Pending
//             </div>
//           </div>

//           {/* Approved Card */}
//           <div className="bg-[#111622] border border-gray-800 rounded-2xl p-6 text-center space-y-2">
//             <div className="text-3xl font-bold text-emerald-500">
//               {approvedRequests}
//             </div>
//             <div className="text-xs text-gray-400 uppercase tracking-wider font-mono">
//               Approved
//             </div>
//           </div>

//           {/* Rejected Card */}
//           <div className="bg-[#111622] border border-gray-800 rounded-2xl p-6 text-center space-y-2">
//             <div className="text-3xl font-bold text-rose-500">
//               {rejectedRequests}
//             </div>
//             <div className="text-xs text-gray-400 uppercase tracking-wider font-mono">
//               Rejected
//             </div>
//           </div>
//         </div>

//         <div className="bg-[#111622] border border-gray-800 rounded-2xl overflow-hidden">
//           <div className="overflow-x-auto">
//             <table className="w-full text-left border-collapse">
//               <thead>
//                 <tr className="border-b border-gray-800 text-xs font-bold uppercase tracking-wider text-gray-400 font-mono">
//                   <th className="p-4 sm:p-5">Pet Name</th>
//                   <th className="p-4 sm:p-5">Request Date</th>
//                   <th className="p-4 sm:p-5">Pickup Date</th>
//                   <th className="p-4 sm:p-5">Status</th>
//                   <th className="p-4 sm:p-5 text-right">Actions</th>
//                 </tr>
//               </thead>
//               <tbody className="divide-y divide-gray-800/60 text-sm font-mono text-gray-300">
//                 {requests.length === 0 ? (
//                   <tr>
//                     <td colSpan="5" className="text-center py-12 text-gray-500">
//                       No adoption requests found.
//                     </td>
//                   </tr>
//                 ) : (
//                   requests.map((request) => (
//                     <tr
//                       key={request._id}
//                       className="hover:bg-gray-800/20 transition-colors"
//                     >
//                       <td className="p-4 sm:p-5 font-bold text-white">
//                         {request.petName}
//                       </td>
//                       <td className="p-4 sm:p-5 text-gray-400">
//                         {request.requestDate}
//                       </td>
//                       <td className="p-4 sm:p-5 text-gray-400">
//                         {request.pickupDate}
//                       </td>
//                       <td className="p-4 sm:p-5">
//                         <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-amber-500/10 text-amber-500 border border-amber-500/20">
//                           ⏱️ {request.status}
//                         </span>
//                       </td>
//                       <td className="p-4 sm:p-5 text-right space-x-2">
//                         {/* View Button */}
//                         <Link href={`/all-pets/${request.petId}`}>
//                           <Button
//                             size="sm"
//                             variant="bordered"
//                             startContent={
//                               <MdOutlineRemoveRedEye className="text-base" />
//                             }
//                             className="text-gray-300 border-gray-700 hover:bg-gray-800 rounded-xl"
//                           >
//                             View
//                           </Button>
//                         </Link>
//                         {/* Cancel Button */}
//                         <Button
//                           size="sm"
//                           variant="bordered"
//                           startContent={
//                             <MdOutlineCancel className="text-base" />
//                           }
//                           className="text-rose-500 border-rose-500/20 hover:bg-rose-500/10 rounded-xl"
//                           onClick={() => handleCancel(request._id)}
//                         >
//                           Cancel
//                         </Button>
//                       </td>
//                     </tr>
//                   ))
//                 )}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       </div>
//     </ScrollMotion>
//   );
// }

// "use client";

// import { useEffect, useState } from "react";
// import { authClient } from "@/lib/auth-client";
// import { Button, Spinner, toast } from "@heroui/react";
// import { MdOutlineRemoveRedEye, MdOutlineCancel } from "react-icons/md";
// import Link from "next/link";
// import ScrollMotion from "@/components/ScrollMotion";

// export default function MyRequestsPage() {
//   const { data: session, isPending: sessionLoading } = authClient.useSession();
//   const user = session?.user;

//   const [requests, setRequests] = useState([]);
//   const [loading, setLoading] = useState(true);
  
//   // 💡 কাস্টম মোডাল কন্ট্রোল করার জন্য প্লেইন রিঅ্যাক্ট স্টেট
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [selectedRequestId, setSelectedRequestId] = useState(null);

//   useEffect(() => {
//     if (!user?.email) return;

//     fetch(`${process.env.NEXT_PUBLIC_API_URL}/my-requests?email=${user.email}`)
//       .then((res) => res.json())
//       .then((data) => {
//         setRequests(data);
//         setLoading(false);
//       })
//       .catch((err) => {
//         console.error("Error fetching requests:", err);
//         setLoading(false);
//       });
//   }, [user?.email]);

//   // Cancel বাটনে ক্লিক করলে মোডাল ট্রিগার হবে
//   const handleCancelClick = (id) => {
//     setSelectedRequestId(id);
//     setIsModalOpen(true);
//   };

//   // Yes চাপলে ডিলিট করার মূল লজিক
//   const executeDelete = async () => {
//     if (!selectedRequestId) return;

//     try {
//       const { data: tokenData } = await authClient.token();

//       const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/my-requests/${selectedRequestId}`, {
//         method: "DELETE",
//         headers: {
//           authorization: `Bearer ${tokenData.token}`,
//         },
//       });
//       const data = await response.json();

//       if (data.success) {
//         toast(data.message || "Request cancelled successfully!");
//         setRequests((prev) => prev.filter((req) => req._id !== selectedRequestId));
//       } else {
//         toast("Failed to delete the request.");
//       }
//     } catch (error) {
//       console.error("Error deleting request:", error);
//     } finally {
//       setSelectedRequestId(null);
//       setIsModalOpen(false); // মোডাল বন্ধ হবে
//     }
//   };

//   const totalRequests = requests.length;
//   const pendingRequests = requests.filter((r) => r.status === "Pending").length;
//   const approvedRequests = requests.filter((r) => r.status === "Approved").length;
//   const rejectedRequests = requests.filter((r) => r.status === "Rejected").length;

//   if (sessionLoading || loading) {
//     return (
//       <div className="min-h-[60vh] flex items-center justify-center">
//         <Spinner size="lg" color="danger" label="Loading your requests..." />
//       </div>
//     );
//   }

//   return (
//     <ScrollMotion>
//       <div className="space-y-8">
//         <div>
//           <h1 className="text-3xl font-bold tracking-tight font-mono">
//             My <span className="text-rose-400">Adoption</span> Requests
//           </h1>
//           <p className="text-sm text-gray-400 mt-1 font-mono tracking-wide">
//             Track the status of all your adoption requests here.
//           </p>
//         </div>

//         {/* 🛠️ কার্ড গ্রিড: রেসপনসিভনেস একদম পারফেক্ট করা হয়েছে (sm, md, lg সব ডিভাইসের জন্য) */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4">
//           {/* Total Card */}
//           <div className="bg-[#111622] border border-gray-800 rounded-2xl p-6 text-center space-y-2">
//             <div className="text-3xl font-bold text-white">{totalRequests}</div>
//             <div className="text-xs text-gray-400 uppercase tracking-wider font-mono">Total</div>
//           </div>

//           {/* Pending Card */}
//           <div className="bg-[#111622] border border-gray-800 rounded-2xl p-6 text-center space-y-2">
//             <div className="text-3xl font-bold text-amber-500">{pendingRequests}</div>
//             <div className="text-xs text-gray-400 uppercase tracking-wider font-mono">Pending</div>
//           </div>

//           {/* Approved Card */}
//           <div className="bg-[#111622] border border-gray-800 rounded-2xl p-6 text-center space-y-2">
//             <div className="text-3xl font-bold text-emerald-500">{approvedRequests}</div>
//             <div className="text-xs text-gray-400 uppercase tracking-wider font-mono">Approved</div>
//           </div>

//           {/* Rejected Card */}
//           <div className="bg-[#111622] border border-gray-800 rounded-2xl p-6 text-center space-y-2">
//             <div className="text-3xl font-bold text-rose-500">{rejectedRequests}</div>
//             <div className="text-xs text-gray-400 uppercase tracking-wider font-mono">Rejected</div>
//           </div>
//         </div>

//         {/* টেবিল সেকশন */}
//         <div className="bg-[#111622] border border-gray-800 rounded-2xl overflow-hidden">
//           <div className="overflow-x-auto">
//             <table className="w-full text-left border-collapse">
//               <thead>
//                 <tr className="border-b border-gray-800 text-xs font-bold uppercase tracking-wider text-gray-400 font-mono">
//                   <th className="p-4 sm:p-5">Pet Name</th>
//                   <th className="p-4 sm:p-5">Request Date</th>
//                   <th className="p-4 sm:p-5">Pickup Date</th>
//                   <th className="p-4 sm:p-5">Status</th>
//                   <th className="p-4 sm:p-5 text-right">Actions</th>
//                 </tr>
//               </thead>
//               <tbody className="divide-y divide-gray-800/60 text-sm font-mono text-gray-300">
//                 {requests.length === 0 ? (
//                   <tr>
//                     <td colSpan="5" className="text-center py-12 text-gray-500">No adoption requests found.</td>
//                   </tr>
//                 ) : (
//                   requests.map((request) => (
//                     <tr key={request._id} className="hover:bg-gray-800/20 transition-colors">
//                       <td className="p-4 sm:p-5 font-bold text-white">{request.petName}</td>
//                       <td className="p-4 sm:p-5 text-gray-400">{request.requestDate}</td>
//                       <td className="p-4 sm:p-5 text-gray-400">{request.pickupDate}</td>
//                       <td className="p-4 sm:p-5">
//                         <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-amber-500/10 text-amber-500 border border-amber-500/20">
//                           ⏱️ {request.status}
//                         </span>
//                       </td>
//                       <td className="p-4 sm:p-5 text-right space-x-2 whitespace-nowrap">
//                         <Link href={`/all-pets/${request.petId}`}>
//                           <Button size="sm" variant="bordered" startContent={<MdOutlineRemoveRedEye className="text-base" />} className="text-gray-300 border-gray-700 hover:bg-gray-800 rounded-xl">
//                             View
//                           </Button>
//                         </Link>
//                         <Button
//                           size="sm"
//                           variant="bordered"
//                           startContent={<MdOutlineCancel className="text-base" />}
//                           className="text-rose-500 border-rose-500/20 hover:bg-rose-500/10 rounded-xl"
//                           onClick={() => handleCancelClick(request._id)}
//                         >
//                           Cancel
//                         </Button>
//                       </td>
//                     </tr>
//                   ))
//                 )}
//               </tbody>
//             </table>
//           </div>
//         </div>

//         {/* 💡 ১০০% কাস্টম পিওর টেইলউইন্ড মোডাল - এটি স্ক্রিনের একদম মাঝখানে ভেসে থাকবে এবং বাটন কাজ করবে */}
//         {isModalOpen && (
//           <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
//             {/* ব্যাকগ্রাউন্ড ব্লার এবং ব্ল্যাক ওভারলে */}
//             <div 
//               className="absolute inset-0 bg-black/60 backdrop-blur-sm"
//               onClick={() => setIsModalOpen(false)}
//             />
            
//             {/* কন্টেন্ট বক্স */}
//             <div className="relative w-full max-w-md bg-[#111622] border border-gray-800 rounded-2xl p-6 shadow-2xl space-y-4 font-mono z-10 animate-in fade-in zoom-in-95 duration-200">
//               <h2 className="text-xl font-bold text-white">Confirm Cancellation</h2>
//               <p className="text-gray-300 text-sm leading-relaxed">
//                 Are you sure you want to cancel this adoption request? This action cannot be undone.
//               </p>
//               <div className="flex justify-end gap-3 pt-2">
//                 <Button 
//                   variant="flat" 
//                   className="bg-gray-800 text-gray-300 rounded-xl px-4" 
//                   onClick={() => setIsModalOpen(false)}
//                 >
//                   No, Keep it
//                 </Button>
//                 <Button 
//                   className="bg-rose-500 hover:bg-rose-600 text-white font-bold rounded-xl px-4" 
//                   onClick={executeDelete}
//                 >
//                   Yes, Cancel
//                 </Button>
//               </div>
//             </div>
//           </div>
//         )}

//       </div>
//     </ScrollMotion>
//   );
// }

"use client";

import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import { Button, Spinner, toast } from "@heroui/react";
import { MdOutlineRemoveRedEye, MdOutlineCancel } from "react-icons/md";
import Link from "next/link";
import ScrollMotion from "@/components/ScrollMotion";

export default function MyRequestsPage() {
  const { data: session, isPending: sessionLoading } = authClient.useSession();
  const user = session?.user;

  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // কাস্টম মোডাল এবং ইনস্ট্যান্ট ফিডব্যাক (UX) এর জন্য স্টেটসমূহ
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRequestId, setSelectedRequestId] = useState(null);
  const [isCancelLoading, setIsCancelLoading] = useState(false);

  useEffect(() => {
    if (!user?.email) return;

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/my-requests?email=${user.email}`)
      .then((res) => res.json())
      .then((data) => {
        setRequests(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching requests:", err);
        setLoading(false);
      });
  }, [user?.email]);

  // Cancel বাটনে ক্লিক করলে মোডাল ওপেন হবে
  const handleCancelClick = (id) => {
    setSelectedRequestId(id);
    setIsModalOpen(true);
  };

  // "Yes, Cancel" চাপলে এই ব্যাকএন্ড এপিআই রিকোয়েস্টটি রান হবে
  const executeDelete = async () => {
    if (!selectedRequestId) return;
    setIsCancelLoading(true); // বাটন সাথে সাথে লোডিং মুডে চলে যাবে

    try {
      const { data: tokenData } = await authClient.token();

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/my-requests/${selectedRequestId}`, {
        method: "DELETE",
        headers: {
          authorization: `Bearer ${tokenData.token}`,
        },
      });
      const data = await response.json();

      if (data.success) {
        toast(data.message || "Request cancelled successfully!");
        setRequests((prev) => prev.filter((req) => req._id !== selectedRequestId));
        setIsModalOpen(false); // ডিলিট সফল হলে মোডাল বন্ধ হবে
      } else {
        toast("Failed to delete the request.");
      }
    } catch (error) {
      console.error("Error deleting request:", error);
      toast("Something went wrong!");
    } finally {
      setSelectedRequestId(null);
      setIsCancelLoading(false); // প্রসেস শেষ হলে লোডিং বন্ধ হবে
    }
  };

  const totalRequests = requests.length;
  const pendingRequests = requests.filter((r) => r.status === "Pending").length;
  const approvedRequests = requests.filter((r) => r.status === "Approved").length;
  const rejectedRequests = requests.filter((r) => r.status === "Rejected").length;

  if (sessionLoading || loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <Spinner size="lg" color="danger" label="Loading your requests..." />
      </div>
    );
  }

  return (
    <ScrollMotion>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight font-mono">
            My <span className="text-rose-400">Adoption</span> Requests
          </h1>
          <p className="text-sm text-gray-400 mt-1 font-mono tracking-wide">
            Track the status of all your adoption requests here.
          </p>
        </div>

        {/* কার্ড গ্রিড (মোবাইল, ট্যাবলেট ও ডেক্সটপ রেসপনসিভ) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-[#111622] border border-gray-800 rounded-2xl p-6 text-center space-y-2">
            <div className="text-3xl font-bold text-white">{totalRequests}</div>
            <div className="text-xs text-gray-400 uppercase tracking-wider font-mono">Total</div>
          </div>

          <div className="bg-[#111622] border border-gray-800 rounded-2xl p-6 text-center space-y-2">
            <div className="text-3xl font-bold text-amber-500">{pendingRequests}</div>
            <div className="text-xs text-gray-400 uppercase tracking-wider font-mono">Pending</div>
          </div>

          <div className="bg-[#111622] border border-gray-800 rounded-2xl p-6 text-center space-y-2">
            <div className="text-3xl font-bold text-emerald-500">{approvedRequests}</div>
            <div className="text-xs text-gray-400 uppercase tracking-wider font-mono">Approved</div>
          </div>

          <div className="bg-[#111622] border border-gray-800 rounded-2xl p-6 text-center space-y-2">
            <div className="text-3xl font-bold text-rose-500">{rejectedRequests}</div>
            <div className="text-xs text-gray-400 uppercase tracking-wider font-mono">Rejected</div>
          </div>
        </div>

        {/* টেবিল সেকশন */}
        <div className="bg-[#111622] border border-gray-800 rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-800 text-xs font-bold uppercase tracking-wider text-gray-400 font-mono">
                  <th className="p-4 sm:p-5">Pet Name</th>
                  <th className="p-4 sm:p-5">Request Date</th>
                  <th className="p-4 sm:p-5">Pickup Date</th>
                  <th className="p-4 sm:p-5">Status</th>
                  <th className="p-4 sm:p-5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800/60 text-sm font-mono text-gray-300">
                {requests.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="text-center py-12 text-gray-500">No adoption requests found.</td>
                  </tr>
                ) : (
                  requests.map((request) => (
                    <tr key={request._id} className="hover:bg-gray-800/20 transition-colors">
                      <td className="p-4 sm:p-5 font-bold text-white">{request.petName}</td>
                      <td className="p-4 sm:p-5 text-gray-400">{request.requestDate}</td>
                      <td className="p-4 sm:p-5 text-gray-400">{request.pickupDate}</td>
                      <td className="p-4 sm:p-5">
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-amber-500/10 text-amber-500 border border-amber-500/20">
                          ⏱️ {request.status}
                        </span>
                      </td>
                      <td className="p-4 sm:p-5 text-right space-x-2 whitespace-nowrap">
                        <Link href={`/all-pets/${request.petId}`}>
                          <Button size="sm" variant="bordered" startContent={<MdOutlineRemoveRedEye className="text-base" />} className="text-gray-300 border-gray-700 hover:bg-gray-800 rounded-xl">
                            View
                          </Button>
                        </Link>
                        <Button
                          size="sm"
                          variant="bordered"
                          startContent={<MdOutlineCancel className="text-base" />}
                          className="text-rose-500 border-rose-500/20 hover:bg-rose-500/10 rounded-xl"
                          onClick={() => handleCancelClick(request._id)}
                        >
                          Cancel
                        </Button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* স্ক্রিনের মাঝখানে ভেসে থাকা কাস্টম ডার্ক মোডাল */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* ব্যাকগ্রাউন্ড আবছা করার ওভারলে */}
            <div 
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => !isCancelLoading && setIsModalOpen(false)} // লোডিং চললে বাইরে ক্লিক করে বন্ধ করা যাবে না
            />
            
            {/* কন্টেন্ট বক্স */}
            <div className="relative w-full max-w-md bg-[#111622] border border-gray-800 rounded-2xl p-6 shadow-2xl space-y-4 font-mono z-10 animate-in fade-in zoom-in-95 duration-200">
              <h2 className="text-xl font-bold text-white">Confirm Cancellation</h2>
              <p className="text-gray-300 text-sm leading-relaxed">
                Are you sure you want to cancel this adoption request? This action cannot be undone.
              </p>
              
              <div className="flex justify-end gap-3 pt-2">
                <Button 
                  variant="flat" 
                  className="bg-gray-800 text-gray-300 rounded-xl px-4" 
                  onClick={() => setIsModalOpen(false)}
                  disabled={isCancelLoading}
                >
                  No, Keep it
                </Button>
                <Button 
                  className="bg-rose-500 hover:bg-rose-600 text-white font-bold rounded-xl px-4 min-w-[110px]" 
                  onClick={executeDelete}
                  disabled={isCancelLoading} // ডাবল ক্লিক আটকাবে
                >
                  {isCancelLoading ? "Cancelling..." : "Yes, Cancel"}
                </Button>
              </div>
            </div>
          </div>
        )}

      </div>
    </ScrollMotion>
  );
}
