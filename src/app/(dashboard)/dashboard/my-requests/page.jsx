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

  const handleCancel = async (id) => {
    const proceed = window.confirm(
      "Are you sure you want to cancel this adoption request?",
    );
    if (!proceed) return;

    const { data: tokenData } = await authClient.token();
    console.log(tokenData, "tokenData");

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/my-requests/${id}`, {
        method: "DELETE",
        headers: {
          authorization: `Bearer ${tokenData.token}`,
        },
      });
      const data = await response.json();

      if (data.success) {
        toast(data.message);

        const remainingRequests = requests.filter((req) => req._id !== id);
        setRequests(remainingRequests);
      } else {
        toast("Failed to delete the request.");
      }
    } catch (error) {
      console.error("Error deleting request:", error);
    }
  };

  const totalRequests = requests.length;
  const pendingRequests = requests.filter((r) => r.status === "Pending").length;
  const approvedRequests = requests.filter(
    (r) => r.status === "Approved",
  ).length;
  const rejectedRequests = requests.filter(
    (r) => r.status === "Rejected",
  ).length;

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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Total Card */}
          <div className="bg-[#111622] border border-gray-800 rounded-2xl p-6 text-center space-y-2">
            <div className="text-3xl font-bold text-white">{totalRequests}</div>
            <div className="text-xs text-gray-400 uppercase tracking-wider font-mono">
              Total
            </div>
          </div>

          {/* Pending Card */}
          <div className="bg-[#111622] border border-gray-800 rounded-2xl p-6 text-center space-y-2">
            <div className="text-3xl font-bold text-amber-500">
              {pendingRequests}
            </div>
            <div className="text-xs text-gray-400 uppercase tracking-wider font-mono">
              Pending
            </div>
          </div>

          {/* Approved Card */}
          <div className="bg-[#111622] border border-gray-800 rounded-2xl p-6 text-center space-y-2">
            <div className="text-3xl font-bold text-emerald-500">
              {approvedRequests}
            </div>
            <div className="text-xs text-gray-400 uppercase tracking-wider font-mono">
              Approved
            </div>
          </div>

          {/* Rejected Card */}
          <div className="bg-[#111622] border border-gray-800 rounded-2xl p-6 text-center space-y-2">
            <div className="text-3xl font-bold text-rose-500">
              {rejectedRequests}
            </div>
            <div className="text-xs text-gray-400 uppercase tracking-wider font-mono">
              Rejected
            </div>
          </div>
        </div>

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
                    <td colSpan="5" className="text-center py-12 text-gray-500">
                      No adoption requests found.
                    </td>
                  </tr>
                ) : (
                  requests.map((request) => (
                    <tr
                      key={request._id}
                      className="hover:bg-gray-800/20 transition-colors"
                    >
                      <td className="p-4 sm:p-5 font-bold text-white">
                        {request.petName}
                      </td>
                      <td className="p-4 sm:p-5 text-gray-400">
                        {request.requestDate}
                      </td>
                      <td className="p-4 sm:p-5 text-gray-400">
                        {request.pickupDate}
                      </td>
                      <td className="p-4 sm:p-5">
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-amber-500/10 text-amber-500 border border-amber-500/20">
                          ⏱️ {request.status}
                        </span>
                      </td>
                      <td className="p-4 sm:p-5 text-right space-x-2">
                        {/* View Button */}
                        <Link href={`/all-pets/${request.petId}`}>
                          <Button
                            size="sm"
                            variant="bordered"
                            startContent={
                              <MdOutlineRemoveRedEye className="text-base" />
                            }
                            className="text-gray-300 border-gray-700 hover:bg-gray-800 rounded-xl"
                          >
                            View
                          </Button>
                        </Link>
                        {/* Cancel Button */}
                        <Button
                          size="sm"
                          variant="bordered"
                          startContent={
                            <MdOutlineCancel className="text-base" />
                          }
                          className="text-rose-500 border-rose-500/20 hover:bg-rose-500/10 rounded-xl"
                          onClick={() => handleCancel(request._id)}
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
      </div>
    </ScrollMotion>
  );
}
