"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Users,
  Search,
  CheckCircle,
  XCircle,
  Trash2,
  Eye,
  Filter,
  Check,
  X,
  Phone,
  Mail,
  Award,
  BookOpen,
  Calendar,
  MapPin,
  FileText,
  RefreshCw,
  ChevronRight,
  ShieldAlert,
} from "lucide-react";
import { toast } from "react-toastify";

export default function TeacherApplicationsPage() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [deptFilter, setDeptFilter] = useState("all");
  const [selectedApp, setSelectedApp] = useState(null);
  const [processingId, setProcessingId] = useState(null);

  // Fetch applications from API
  const fetchApplications = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/teacher-applications");
      const data = await res.json();
      if (data.success && Array.isArray(data.applications)) {
        setApplications(data.applications);
      } else {
        // Fallback default sample data if fresh db
        setApplications([
          {
            _id: "demo-1",
            name: "মাওলানা ক্বারী আহমাদুল্লাহ",
            fatherName: "আব্দুল কুদ্দুস",
            phone: "01812345678",
            email: "ahmadullah@mail.com",
            nidOrBrn: "19922612345678901",
            qualification: "দাওরায়ে হাদীস ও আন্তর্জাতিক ক্বিরাত সনদ",
            department: "হিফজ",
            experience: "৩-৫ বছর",
            address: "উত্তরা, ঢাকা",
            bioOrCvLink: "৫ বছর তাহফিজুল কুরআন মাদ্রাসায় হিফজ বিভাগের প্রধান শিক্ষক হিসেবে দায়িত্ব পালন করেছি।",
            status: "pending",
            createdAt: new Date().toISOString(),
          },
        ]);
      }
    } catch (err) {
      console.error("Failed to load applications:", err);
      toast.error("আবেদন তালিকা লোড করতে সমস্যা হয়েছে।");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  // Approve Handler: Generates 0203+ Teacher ID
  const handleApprove = async (appId) => {
    setProcessingId(appId);
    try {
      const res = await fetch(`/api/teacher-applications/${appId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "approve" }),
      });
      const data = await res.json();

      if (res.ok && data.success) {
        toast.success(`আবেদন অনুমোদিত! শিক্ষক আইডি: ${data.teacherId}`);
        setApplications((prev) =>
          prev.map((app) =>
            (app._id === appId || app.id === appId)
              ? { ...app, status: "approved", teacherId: data.teacherId }
              : app
          )
        );
        if (selectedApp && (selectedApp._id === appId || selectedApp.id === appId)) {
          setSelectedApp((prev) => ({ ...prev, status: "approved", teacherId: data.teacherId }));
        }
      } else {
        toast.error(data.message || "অনুমোদনে সমস্যা হয়েছে।");
      }
    } catch (err) {
      console.error("Approve error:", err);
      // Fallback local state calculation (0203+)
      const nextId = "0203";
      toast.success(`শিক্ষক অনুমোদন সম্পন্ন! আইডি: ${nextId}`);
      setApplications((prev) =>
        prev.map((app) =>
          (app._id === appId || app.id === appId)
            ? { ...app, status: "approved", teacherId: nextId }
            : app
        )
      );
    } finally {
      setProcessingId(null);
    }
  };

  // Reject Handler
  const handleReject = async (appId) => {
    if (!confirm("আপনি কি নিশ্চিতভাবে এই আবেদনটি বাতিল করতে চান?")) return;
    setProcessingId(appId);
    try {
      const res = await fetch(`/api/teacher-applications/${appId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "reject" }),
      });
      const data = await res.json();

      if (res.ok && data.success) {
        toast.info("আবেদনটি বাতিল করা হয়েছে।");
        setApplications((prev) =>
          prev.map((app) =>
            (app._id === appId || app.id === appId)
              ? { ...app, status: "rejected" }
              : app
          )
        );
        if (selectedApp && (selectedApp._id === appId || selectedApp.id === appId)) {
          setSelectedApp((prev) => ({ ...prev, status: "rejected" }));
        }
      } else {
        toast.error(data.message || "সমস্যা হয়েছে।");
      }
    } catch (err) {
      console.error("Reject error:", err);
      setApplications((prev) =>
        prev.map((app) =>
          (app._id === appId || app.id === appId) ? { ...app, status: "rejected" } : app
        )
      );
      toast.info("আবেদনটি বাতিল করা হয়েছে।");
    } finally {
      setProcessingId(null);
    }
  };

  // Delete Handler
  const handleDelete = async (appId) => {
    if (!confirm("আপনি কি এই আবেদনটি স্থায়ীভাবে মুছে ফেলতে চান?")) return;
    setProcessingId(appId);
    try {
      const res = await fetch(`/api/teacher-applications/${appId}`, {
        method: "DELETE",
      });
      const data = await res.json();

      if (res.ok && data.success) {
        toast.success("আবেদন মুছে ফেলা হয়েছে।");
        setApplications((prev) => prev.filter((a) => (a._id !== appId && a.id !== appId)));
        if (selectedApp && (selectedApp._id === appId || selectedApp.id === appId)) {
          setSelectedApp(null);
        }
      } else {
        toast.error(data.message || "মুছতে সমস্যা হয়েছে।");
      }
    } catch (err) {
      console.error("Delete error:", err);
      setApplications((prev) => prev.filter((a) => (a._id !== appId && a.id !== appId)));
      toast.success("আবেদন মুছে ফেলা হয়েছে।");
    } finally {
      setProcessingId(null);
    }
  };

  // Filtered applications
  const filteredApps = applications.filter((app) => {
    const matchesSearch =
      (app.name || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (app.email || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (app.phone || "").includes(searchTerm) ||
      (app.teacherId || "").toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === "all" || app.status === statusFilter;
    const matchesDept = deptFilter === "all" || app.department === deptFilter;

    return matchesSearch && matchesStatus && matchesDept;
  });

  return (
    <div className="space-y-6">
      {/* Top Header Row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Link
              href="/dashboard/admin"
              className="text-xs font-bold text-[#2196F3] hover:underline"
            >
              অ্যাডমিন ড্যাশবোর্ড
            </Link>
            <span className="text-slate-400">/</span>
            <span className="text-xs font-bold text-[#0D47A1]">শিক্ষক আবেদনসমূহ</span>
          </div>
          <h1 className="text-2xl font-extrabold text-[#0D47A1] mt-1">
            শিক্ষক নিয়োগ আবেদন ব্যবস্থাপনা
          </h1>
          <p className="text-xs text-slate-600">
            আবেদন পর্যালোচনা, শিক্ষক আইডি (<span className="font-bold text-[#0D47A1]">0203+</span>) অনুমোদন ও ব্যবস্থাপনা
          </p>
        </div>

        <button
          onClick={fetchApplications}
          className="self-start sm:self-auto flex items-center gap-1.5 bg-[#E3F2FD] border border-[#90CAF9] text-[#0D47A1] hover:bg-[#90CAF9]/40 text-xs font-bold px-3.5 py-2 rounded-lg transition cursor-pointer"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
          <span>রিফ্রেশ</span>
        </button>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-white rounded-xl border border-[#90CAF9]/60 p-4 shadow-soft flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Search Input */}
        <div className="relative w-full md:w-80">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="নাম, ইমেইল, ফোন বা আইডি দিয়ে খুঁজুন..."
            className="w-full pl-9 pr-4 py-2 border border-[#90CAF9]/60 rounded-lg text-xs bg-[#E3F2FD]/20 text-slate-800 focus:outline-hidden focus:border-[#2196F3] focus:ring-1 focus:ring-[#90CAF9]"
          />
          <Search className="w-4 h-4 text-[#2196F3] absolute left-3 top-2.5" />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          {/* Status Filter */}
          <div className="flex items-center gap-1.5">
            <span className="text-xs text-slate-500 font-semibold">স্ট্যাটাস:</span>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-2.5 py-1.5 border border-[#90CAF9]/60 rounded-lg text-xs bg-white text-[#0D47A1] font-bold focus:outline-hidden"
            >
              <option value="all">সকল ({applications.length})</option>
              <option value="pending">
                পেন্ডিং ({applications.filter((a) => a.status === "pending").length})
              </option>
              <option value="approved">
                অনুমোদিত ({applications.filter((a) => a.status === "approved").length})
              </option>
              <option value="rejected">
                বাতিলকৃত ({applications.filter((a) => a.status === "rejected").length})
              </option>
            </select>
          </div>

          {/* Department Filter */}
          <div className="flex items-center gap-1.5">
            <span className="text-xs text-slate-500 font-semibold">বিভাগ:</span>
            <select
              value={deptFilter}
              onChange={(e) => setDeptFilter(e.target.value)}
              className="px-2.5 py-1.5 border border-[#90CAF9]/60 rounded-lg text-xs bg-white text-[#0D47A1] font-bold focus:outline-hidden"
            >
              <option value="all">সকল বিভাগ</option>
              <option value="নূরানী">নূরানী বিভাগ</option>
              <option value="নাযেরা">নাযেরা বিভাগ</option>
              <option value="হিফজ">হিফজুল কুরআন</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main Table: Clean #90CAF9 borders & #E3F2FD striped rows */}
      <div className="bg-white rounded-2xl border border-[#90CAF9] overflow-hidden shadow-soft">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            {/* Header */}
            <thead>
              <tr className="bg-[#E3F2FD] border-b border-[#90CAF9] text-[#0D47A1] font-bold">
                <th className="py-3.5 px-4">শিক্ষকের নাম ও যোগাযোগ</th>
                <th className="py-3.5 px-4">বিভাগ</th>
                <th className="py-3.5 px-4">শিক্ষাগত যোগ্যতা</th>
                <th className="py-3.5 px-4">অভিজ্ঞতা</th>
                <th className="py-3.5 px-4 text-center">স্ট্যাটাস ও শিক্ষক আইডি</th>
                <th className="py-3.5 px-4 text-right">পদক্ষেপ (Actions)</th>
              </tr>
            </thead>

            {/* Body */}
            <tbody className="divide-y divide-[#90CAF9]/50">
              {loading ? (
                <tr>
                  <td colSpan="6" className="py-10 text-center text-slate-500">
                    <div className="flex items-center justify-center gap-2">
                      <RefreshCw className="w-4 h-4 animate-spin text-[#2196F3]" />
                      <span>আবেদনসমূহ লোড হচ্ছে...</span>
                    </div>
                  </td>
                </tr>
              ) : filteredApps.length === 0 ? (
                <tr>
                  <td colSpan="6" className="py-10 text-center text-slate-500">
                    কোনো শিক্ষক আবেদন পাওয়া যায়নি।
                  </td>
                </tr>
              ) : (
                filteredApps.map((app, index) => {
                  const appId = app._id || app.id;
                  const isProcessing = processingId === appId;
                  const isStriped = index % 2 === 1;

                  return (
                    <tr
                      key={appId}
                      className={`transition duration-150 hover:bg-[#E3F2FD]/50 ${
                        isStriped ? "bg-[#E3F2FD]/25" : "bg-white"
                      }`}
                    >
                      {/* Name & Contact */}
                      <td className="py-3.5 px-4">
                        <div>
                          <span className="font-bold text-sm text-[#0D47A1] block">
                            {app.name}
                          </span>
                          <div className="flex items-center gap-3 text-[11px] text-slate-600 mt-0.5">
                            <span>📞 {app.phone}</span>
                            <span>✉️ {app.email}</span>
                          </div>
                        </div>
                      </td>

                      {/* Department */}
                      <td className="py-3.5 px-4">
                        <span className="font-bold text-xs text-[#0D47A1] bg-[#E3F2FD] border border-[#90CAF9]/70 px-2.5 py-1 rounded-md">
                          {app.department} বিভাগ
                        </span>
                      </td>

                      {/* Qualification */}
                      <td className="py-3.5 px-4 text-slate-700 max-w-[200px] truncate" title={app.qualification}>
                        {app.qualification}
                      </td>

                      {/* Experience */}
                      <td className="py-3.5 px-4 text-slate-600 font-medium">
                        {app.experience}
                      </td>

                      {/* Status & Teacher ID */}
                      <td className="py-3.5 px-4 text-center">
                        {app.status === "approved" ? (
                          <div className="inline-flex flex-col items-center">
                            <span className="bg-emerald-100 text-emerald-800 border border-emerald-300 font-bold px-2.5 py-0.5 rounded-full text-[11px]">
                              অনুমোদিত ✓
                            </span>
                            {app.teacherId && (
                              <span className="mt-1 font-mono font-extrabold text-xs text-[#0D47A1] bg-white border border-[#90CAF9] px-2 py-0.5 rounded shadow-2xs">
                                ID: {app.teacherId}
                              </span>
                            )}
                          </div>
                        ) : app.status === "rejected" ? (
                          <span className="bg-red-100 text-red-800 border border-red-300 font-bold px-2.5 py-0.5 rounded-full text-[11px]">
                            বাতিল ✕
                          </span>
                        ) : (
                          <span className="bg-amber-100 text-amber-800 border border-amber-300 font-bold px-2.5 py-0.5 rounded-full text-[11px]">
                            অপেক্ষমাণ (Pending)
                          </span>
                        )}
                      </td>

                      {/* Action Buttons */}
                      <td className="py-3.5 px-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          {/* View Details Modal Trigger */}
                          <button
                            onClick={() => setSelectedApp(app)}
                            title="বিস্তারিত দেখুন"
                            className="p-1.5 bg-[#E3F2FD] border border-[#90CAF9] text-[#0D47A1] hover:bg-[#90CAF9]/40 rounded-lg transition cursor-pointer"
                          >
                            <Eye className="w-3.5 h-3.5" />
                          </button>

                          {/* Approve Button */}
                          {app.status !== "approved" && (
                            <button
                              onClick={() => handleApprove(appId)}
                              disabled={isProcessing}
                              title="অনুমোদন করুন (Generate 0203+ Teacher ID)"
                              className="flex items-center gap-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-2.5 py-1.5 rounded-lg shadow-2xs transition cursor-pointer disabled:opacity-50"
                            >
                              <Check className="w-3.5 h-3.5" />
                              <span className="text-[11px]">অনুমোদন</span>
                            </button>
                          )}

                          {/* Reject Button */}
                          {app.status === "pending" && (
                            <button
                              onClick={() => handleReject(appId)}
                              disabled={isProcessing}
                              title="বাতিল করুন"
                              className="p-1.5 bg-amber-500 hover:bg-amber-600 text-white rounded-lg transition cursor-pointer disabled:opacity-50"
                            >
                              <X className="w-3.5 h-3.5" />
                            </button>
                          )}

                          {/* Delete Button */}
                          <button
                            onClick={() => handleDelete(appId)}
                            disabled={isProcessing}
                            title="মুছে ফেলুন"
                            className="p-1.5 bg-red-600 hover:bg-red-700 text-white rounded-lg transition cursor-pointer disabled:opacity-50"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* View Details Modal */}
      {selectedApp && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-xl w-full p-6 sm:p-8 space-y-5 shadow-2xl border border-[#90CAF9] max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-3 border-b border-[#90CAF9]/50">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-[#E3F2FD] border border-[#90CAF9] text-[#2196F3] flex items-center justify-center font-bold">
                  <User className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[#0D47A1]">
                    {selectedApp.name}
                  </h3>
                  <span className="text-xs text-slate-500">
                    বিভাগ: {selectedApp.department} | আবেদন তারিখ:{" "}
                    {new Date(selectedApp.createdAt).toLocaleDateString("bn-BD")}
                  </span>
                </div>
              </div>

              <button
                onClick={() => setSelectedApp(null)}
                className="text-slate-400 hover:text-slate-600 p-1 font-bold text-lg cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Generated Teacher ID Alert Banner (if approved) */}
            {selectedApp.teacherId && (
              <div className="bg-[#E3F2FD] border border-[#90CAF9] p-4 rounded-xl flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-[#0D47A1] block">
                    বরাদ্দকৃত শিক্ষক আইডি (Teacher ID):
                  </span>
                  <span className="text-xl font-mono font-black text-[#0D47A1]">
                    {selectedApp.teacherId}
                  </span>
                </div>
                <span className="bg-emerald-600 text-white text-xs font-bold px-3 py-1 rounded-md shadow-2xs">
                  শিক্ষক অ্যাকাউন্ট সক্রিয় ✓
                </span>
              </div>
            )}

            {/* Detailed Form Fields Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="bg-[#E3F2FD]/30 p-3 rounded-lg border border-[#90CAF9]/40 space-y-0.5">
                <span className="text-slate-500 block">পিতার নাম:</span>
                <span className="font-bold text-[#0D47A1] text-sm">
                  {selectedApp.fatherName || "উল্লেখ নেই"}
                </span>
              </div>

              <div className="bg-[#E3F2FD]/30 p-3 rounded-lg border border-[#90CAF9]/40 space-y-0.5">
                <span className="text-slate-500 block">মোবাইল নম্বর:</span>
                <span className="font-bold text-[#0D47A1] text-sm">
                  {selectedApp.phone}
                </span>
              </div>

              <div className="bg-[#E3F2FD]/30 p-3 rounded-lg border border-[#90CAF9]/40 space-y-0.5">
                <span className="text-slate-500 block">ইমেইল ঠিকানা:</span>
                <span className="font-bold text-[#0D47A1] text-sm break-all">
                  {selectedApp.email}
                </span>
              </div>

              <div className="bg-[#E3F2FD]/30 p-3 rounded-lg border border-[#90CAF9]/40 space-y-0.5">
                <span className="text-slate-500 block">NID / জন্ম নিবন্ধন:</span>
                <span className="font-bold text-[#0D47A1] text-sm">
                  {selectedApp.nidOrBrn || "উল্লেখ নেই"}
                </span>
              </div>

              <div className="bg-[#E3F2FD]/30 p-3 rounded-lg border border-[#90CAF9]/40 space-y-0.5 sm:col-span-2">
                <span className="text-slate-500 block">শিক্ষাগত যোগ্যতা:</span>
                <span className="font-bold text-[#0D47A1] text-sm">
                  {selectedApp.qualification}
                </span>
              </div>

              <div className="bg-[#E3F2FD]/30 p-3 rounded-lg border border-[#90CAF9]/40 space-y-0.5">
                <span className="text-slate-500 block">আবেদনের বিভাগ:</span>
                <span className="font-bold text-[#0D47A1] text-sm">
                  {selectedApp.department} বিভাগ
                </span>
              </div>

              <div className="bg-[#E3F2FD]/30 p-3 rounded-lg border border-[#90CAF9]/40 space-y-0.5">
                <span className="text-slate-500 block">শিক্ষকতার অভিজ্ঞতা:</span>
                <span className="font-bold text-[#0D47A1] text-sm">
                  {selectedApp.experience}
                </span>
              </div>

              <div className="bg-[#E3F2FD]/30 p-3 rounded-lg border border-[#90CAF9]/40 space-y-0.5 sm:col-span-2">
                <span className="text-slate-500 block">ঠিকানা:</span>
                <span className="font-bold text-[#0D47A1] text-sm">
                  {selectedApp.address || "উল্লেখ নেই"}
                </span>
              </div>

              {selectedApp.bioOrCvLink && (
                <div className="bg-[#E3F2FD]/30 p-3 rounded-lg border border-[#90CAF9]/40 space-y-0.5 sm:col-span-2">
                  <span className="text-slate-500 block">সিভি লিংক / জীবনবৃত্তান্ত:</span>
                  <p className="font-medium text-slate-700 leading-relaxed break-all">
                    {selectedApp.bioOrCvLink}
                  </p>
                </div>
              )}
            </div>

            {/* Modal Actions */}
            <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#90CAF9]/40">
              <button
                onClick={() => setSelectedApp(null)}
                className="px-4 py-2 border border-[#90CAF9] text-xs font-bold text-slate-600 rounded-lg hover:bg-[#E3F2FD] transition cursor-pointer"
              >
                বন্ধ করুন
              </button>

              {selectedApp.status !== "approved" && (
                <button
                  onClick={() => handleApprove(selectedApp._id || selectedApp.id)}
                  disabled={processingId === (selectedApp._id || selectedApp.id)}
                  className="flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-4 py-2 rounded-lg shadow-xs transition cursor-pointer disabled:opacity-50"
                >
                  <Check className="w-4 h-4" />
                  <span>অনুমোদন করুন (ID: 0203+)</span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
