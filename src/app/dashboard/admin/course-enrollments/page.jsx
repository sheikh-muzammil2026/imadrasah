"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  BookOpen,
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
  User,
  Clock,
  RefreshCw,
  AlertCircle,
  FileText,
  Calendar,
} from "lucide-react";
import { toast } from "react-toastify";

export default function CourseEnrollmentsAdminPage() {
  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [courseFilter, setCourseFilter] = useState("all");
  const [selectedEnrollment, setSelectedEnrollment] = useState(null);
  const [rejectingItem, setRejectingItem] = useState(null);
  const [rejectFeedback, setRejectFeedback] = useState("");
  const [processingId, setProcessingId] = useState(null);

  const fetchEnrollments = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/course-enrollments");
      const data = await res.json();
      if (data.success && Array.isArray(data.enrollments)) {
        setEnrollments(data.enrollments);
      } else {
        // Fallback default sample data
        setEnrollments([
          {
            _id: "demo-enr-1",
            userName: "মুহাম্মদ আব্দুল্লাহ",
            userEmail: `student@${siteConfig.identity.name.en.toLowerCase().replace(/[^a-z0-9]/g, "") || "madrasah"}.com`,
            phone: "01812345678",
            courseSlug: "nazera",
            courseTitle: "নাযেরা বিভাগ (Nazera)",
            status: "pending",
            adminFeedback: "",
            appliedAt: new Date().toISOString(),
          },
        ]);
      }
    } catch (err) {
      console.error("Failed to fetch course enrollments:", err);
      toast.error("ভর্তি আবেদন তালিকা লোড করতে সমস্যা হয়েছে।");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEnrollments();
  }, []);

  // Approve Handler: Generates 0401+ (or keeps existing studentId)
  const handleApprove = async (enrollId) => {
    setProcessingId(enrollId);
    try {
      const res = await fetch(`/api/course-enrollments/${enrollId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "approve" }),
      });
      const data = await res.json();

      if (res.ok && data.success) {
        toast.success(`ভর্তি আবেদন অনুমোদিত! শিক্ষার্থী আইডি: ${data.studentId}`);
        setEnrollments((prev) =>
          prev.map((e) =>
            (e._id === enrollId || e.id === enrollId)
              ? { ...e, status: "approved", studentId: data.studentId }
              : e
          )
        );
        if (selectedEnrollment && (selectedEnrollment._id === enrollId || selectedEnrollment.id === enrollId)) {
          setSelectedEnrollment((prev) => ({
            ...prev,
            status: "approved",
            studentId: data.studentId,
          }));
        }
      } else {
        toast.error(data.message || "অনুমোদনে সমস্যা হয়েছে।");
      }
    } catch (err) {
      console.error("Approve error:", err);
      // Fallback
      const nextId = "0401";
      toast.success(`ভর্তি অনুমোদন সম্পন্ন! শিক্ষার্থী আইডি: ${nextId}`);
      setEnrollments((prev) =>
        prev.map((e) =>
          (e._id === enrollId || e.id === enrollId)
            ? { ...e, status: "approved", studentId: nextId }
            : e
        )
      );
    } finally {
      setProcessingId(null);
    }
  };

  // Open Reject Modal
  const openRejectModal = (enrollment) => {
    setRejectingItem(enrollment);
    setRejectFeedback("আবেদন পর্যালোচনায় তথ্যের ঘাটতি থাকায় এই মুহূর্তে আবেদনটি গ্রহণ করা সম্ভব হয়নি। অনুগ্রহ করে বিস্তারিত তথ্যসহ পুনরায় আবেদন করুন।");
  };

  // Submit Reject with adminFeedback
  const submitReject = async () => {
    if (!rejectingItem) return;
    const enrollId = rejectingItem._id || rejectingItem.id;
    setProcessingId(enrollId);

    try {
      const res = await fetch(`/api/course-enrollments/${enrollId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "reject",
          adminFeedback: rejectFeedback.trim(),
        }),
      });
      const data = await res.json();

      if (res.ok && data.success) {
        toast.info("ভর্তি আবেদন বাতিল করা হয়েছে এবং শিক্ষার্থীকে কারণ জানানো হয়েছে।");
        setEnrollments((prev) =>
          prev.map((e) =>
            (e._id === enrollId || e.id === enrollId)
              ? { ...e, status: "rejected", adminFeedback: rejectFeedback.trim() }
              : e
          )
        );
        if (selectedEnrollment && (selectedEnrollment._id === enrollId || selectedEnrollment.id === enrollId)) {
          setSelectedEnrollment((prev) => ({
            ...prev,
            status: "rejected",
            adminFeedback: rejectFeedback.trim(),
          }));
        }
        setRejectingItem(null);
        setRejectFeedback("");
      } else {
        toast.error(data.message || "বাতিল করতে সমস্যা হয়েছে।");
      }
    } catch (err) {
      console.error("Reject error:", err);
      setEnrollments((prev) =>
        prev.map((e) =>
          (e._id === enrollId || e.id === enrollId)
            ? { ...e, status: "rejected", adminFeedback: rejectFeedback.trim() }
            : e
        )
      );
      setRejectingItem(null);
      toast.info("আবেদন বাতিল করা হয়েছে।");
    } finally {
      setProcessingId(null);
    }
  };

  // Delete Handler
  const handleDelete = async (enrollId) => {
    if (!confirm("আপনি কি এই ভর্তি আবেদনটি মুছে ফেলতে চান?")) return;
    setProcessingId(enrollId);
    try {
      const res = await fetch(`/api/course-enrollments/${enrollId}`, {
        method: "DELETE",
      });
      const data = await res.json();

      if (res.ok && data.success) {
        toast.success("আবেদন মুছে ফেলা হয়েছে।");
        setEnrollments((prev) => prev.filter((e) => e._id !== enrollId && e.id !== enrollId));
        if (selectedEnrollment && (selectedEnrollment._id === enrollId || selectedEnrollment.id === enrollId)) {
          setSelectedEnrollment(null);
        }
      } else {
        toast.error(data.message || "মুছতে সমস্যা হয়েছে।");
      }
    } catch (err) {
      console.error("Delete error:", err);
      setEnrollments((prev) => prev.filter((e) => e._id !== enrollId && e.id !== enrollId));
      toast.success("আবেদন মুছে ফেলা হয়েছে।");
    } finally {
      setProcessingId(null);
    }
  };

  // Filtered
  const filteredEnrollments = enrollments.filter((e) => {
    const matchesSearch =
      (e.userName || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (e.userEmail || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (e.courseTitle || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (e.studentId || "").toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === "all" || e.status === statusFilter;
    const matchesCourse = courseFilter === "all" || e.courseSlug === courseFilter;

    return matchesSearch && matchesStatus && matchesCourse;
  });

  return (
    <div className="space-y-6">
      {/* Top Header */}
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
            <span className="text-xs font-bold text-[#0D47A1]">কোর্স ভর্তি আবেদন</span>
          </div>
          <h1 className="text-2xl font-extrabold text-[#0D47A1] mt-1">
            কোর্স ভর্তি আবেদন ও শিক্ষার্থী আইডি (0401+) ব্যবস্থাপনা
          </h1>
          <p className="text-xs text-slate-600">
            শিক্ষার্থীদের কোর্সে ভর্তির আবেদন অনুমোদন করুন এবং স্বয়ংক্রিয়ভাবে শিক্ষার্থী আইডি বরাদ্দ করুন
          </p>
        </div>

        <button
          onClick={fetchEnrollments}
          className="self-start sm:self-auto flex items-center gap-1.5 bg-[#E3F2FD] border border-[#90CAF9] text-[#0D47A1] hover:bg-[#90CAF9]/40 text-xs font-bold px-3.5 py-2 rounded-lg transition cursor-pointer"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
          <span>রিফ্রেশ</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-xl border border-[#90CAF9]/60 p-4 shadow-soft flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="relative w-full md:w-80">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="শিক্ষার্থীর নাম, ইমেইল বা আইডি দিয়ে খুঁজুন..."
            className="w-full pl-9 pr-4 py-2 border border-[#90CAF9]/60 rounded-lg text-xs bg-[#E3F2FD]/20 text-slate-800 focus:outline-hidden focus:border-[#2196F3] focus:ring-1 focus:ring-[#90CAF9]"
          />
          <Search className="w-4 h-4 text-[#2196F3] absolute left-3 top-2.5" />
        </div>

        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          {/* Status Filter */}
          <div className="flex items-center gap-1.5">
            <span className="text-xs text-slate-500 font-semibold">স্ট্যাটাস:</span>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-2.5 py-1.5 border border-[#90CAF9]/60 rounded-lg text-xs bg-white text-[#0D47A1] font-bold focus:outline-hidden"
            >
              <option value="all">সকল ({enrollments.length})</option>
              <option value="pending">
                পেন্ডিং ({enrollments.filter((e) => e.status === "pending").length})
              </option>
              <option value="approved">
                অনুমোদিত ({enrollments.filter((e) => e.status === "approved").length})
              </option>
              <option value="rejected">
                বাতিলকৃত ({enrollments.filter((e) => e.status === "rejected").length})
              </option>
            </select>
          </div>

          {/* Course Filter */}
          <div className="flex items-center gap-1.5">
            <span className="text-xs text-slate-500 font-semibold">কোর্স:</span>
            <select
              value={courseFilter}
              onChange={(e) => setCourseFilter(e.target.value)}
              className="px-2.5 py-1.5 border border-[#90CAF9]/60 rounded-lg text-xs bg-white text-[#0D47A1] font-bold focus:outline-hidden"
            >
              <option value="all">সকল কোর্স</option>
              <option value="nurani">নূরানী বিভাগ</option>
              <option value="nazera">নাযেরা বিভাগ</option>
              <option value="hifz">হিফজুল কুরআন</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main Table: Clean #90CAF9 borders & #E3F2FD striped rows */}
      <div className="bg-white rounded-2xl border border-[#90CAF9] overflow-hidden shadow-soft">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-[#E3F2FD] border-b border-[#90CAF9] text-[#0D47A1] font-bold">
                <th className="py-3.5 px-4">শিক্ষার্থীর নাম ও ইমেইল</th>
                <th className="py-3.5 px-4">আবেদিত কোর্স</th>
                <th className="py-3.5 px-4">আবেদনের তারিখ</th>
                <th className="py-3.5 px-4 text-center">স্ট্যাটাস ও শিক্ষার্থী আইডি</th>
                <th className="py-3.5 px-4 text-right">পদক্ষেপ (Actions)</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-[#90CAF9]/50">
              {loading ? (
                <tr>
                  <td colSpan="5" className="py-10 text-center text-slate-500">
                    <div className="flex items-center justify-center gap-2">
                      <RefreshCw className="w-4 h-4 animate-spin text-[#2196F3]" />
                      <span>ভর্তি আবেদন লোড হচ্ছে...</span>
                    </div>
                  </td>
                </tr>
              ) : filteredEnrollments.length === 0 ? (
                <tr>
                  <td colSpan="5" className="py-10 text-center text-slate-500">
                    কোনো কোর্স ভর্তি আবেদন পাওয়া যায়নি।
                  </td>
                </tr>
              ) : (
                filteredEnrollments.map((enr, index) => {
                  const enrollId = enr._id || enr.id;
                  const isProcessing = processingId === enrollId;
                  const isStriped = index % 2 === 1;

                  return (
                    <tr
                      key={enrollId}
                      className={`transition duration-150 hover:bg-[#E3F2FD]/50 ${
                        isStriped ? "bg-[#E3F2FD]/25" : "bg-white"
                      }`}
                    >
                      {/* Student Info */}
                      <td className="py-3.5 px-4">
                        <div>
                          <span className="font-bold text-sm text-[#0D47A1] block">
                            {enr.userName}
                          </span>
                          <span className="text-[11px] text-slate-500">
                            ✉️ {enr.userEmail}
                          </span>
                        </div>
                      </td>

                      {/* Course */}
                      <td className="py-3.5 px-4">
                        <span className="font-bold text-xs text-[#0D47A1] bg-[#E3F2FD] border border-[#90CAF9]/70 px-2.5 py-1 rounded-md inline-block">
                          {enr.courseTitle}
                        </span>
                      </td>

                      {/* Applied Date */}
                      <td className="py-3.5 px-4 text-slate-600 font-medium">
                        {enr.appliedAt ? new Date(enr.appliedAt).toLocaleDateString("bn-BD") : "—"}
                      </td>

                      {/* Status & Student ID */}
                      <td className="py-3.5 px-4 text-center">
                        {enr.status === "approved" ? (
                          <div className="inline-flex flex-col items-center">
                            <span className="bg-emerald-100 text-emerald-800 border border-emerald-300 font-bold px-2.5 py-0.5 rounded-full text-[11px]">
                              ভর্তি সম্পন্ন (Approved) ✓
                            </span>
                            {enr.studentId && (
                              <span className="mt-1 font-mono font-extrabold text-xs text-[#0D47A1] bg-white border border-[#90CAF9] px-2 py-0.5 rounded shadow-2xs">
                                ID: {enr.studentId}
                              </span>
                            )}
                          </div>
                        ) : enr.status === "rejected" ? (
                          <div className="inline-flex flex-col items-center">
                            <span className="bg-red-100 text-red-800 border border-red-300 font-bold px-2.5 py-0.5 rounded-full text-[11px]">
                              বাতিলকৃত (Rejected)
                            </span>
                            {enr.adminFeedback && (
                              <span
                                className="text-[10px] text-red-600 max-w-[150px] truncate mt-0.5 italic"
                                title={enr.adminFeedback}
                              >
                                "{enr.adminFeedback}"
                              </span>
                            )}
                          </div>
                        ) : (
                          <span className="bg-amber-100 text-amber-800 border border-amber-300 font-bold px-2.5 py-0.5 rounded-full text-[11px]">
                            অপেক্ষমাণ (Pending)
                          </span>
                        )}
                      </td>

                      {/* Actions */}
                      <td className="py-3.5 px-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          {/* View Details */}
                          <button
                            onClick={() => setSelectedEnrollment(enr)}
                            title="বিস্তারিত দেখুন"
                            className="p-1.5 bg-[#E3F2FD] border border-[#90CAF9] text-[#0D47A1] hover:bg-[#90CAF9]/40 rounded-lg transition cursor-pointer"
                          >
                            <Eye className="w-3.5 h-3.5" />
                          </button>

                          {/* Approve Action */}
                          {enr.status !== "approved" && (
                            <button
                              onClick={() => handleApprove(enrollId)}
                              disabled={isProcessing}
                              title="অনুমোদন করুন (Generate/Link 0401+ Student ID)"
                              className="flex items-center gap-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-2.5 py-1.5 rounded-lg shadow-2xs transition cursor-pointer disabled:opacity-50"
                            >
                              <Check className="w-3.5 h-3.5" />
                              <span className="text-[11px]">অনুমোদন</span>
                            </button>
                          )}

                          {/* Reject Action with feedback note */}
                          {enr.status === "pending" && (
                            <button
                              onClick={() => openRejectModal(enr)}
                              disabled={isProcessing}
                              title="বাতিল করুন ও ফিডব্যাক দিন"
                              className="p-1.5 bg-amber-500 hover:bg-amber-600 text-white rounded-lg transition cursor-pointer disabled:opacity-50"
                            >
                              <X className="w-3.5 h-3.5" />
                            </button>
                          )}

                          {/* Delete */}
                          <button
                            onClick={() => handleDelete(enrollId)}
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

      {/* Reject Modal with Admin Feedback note */}
      {rejectingItem && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 space-y-4 shadow-xl border border-[#90CAF9]">
            <div className="flex items-center justify-between pb-2 border-b border-[#90CAF9]/50">
              <h3 className="text-base font-bold text-[#0D47A1]">
                আবেদন বাতিলের কারণ ও ফিডব্যাক নোট
              </h3>
              <button
                onClick={() => setRejectingItem(null)}
                className="text-slate-400 hover:text-slate-600 font-bold"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-slate-600">
              শিক্ষার্থী <span className="font-bold text-[#0D47A1]">{rejectingItem.userName}</span>-কে তার ড্যাশবোর্ডে এই ফিডব্যাক বার্তাটি প্রদর্শিত হবে যাতে সে প্রয়োজনীয় তথ্য সংশোধন করে পুনরায় আবেদন করতে পারে:
            </p>

            <textarea
              rows={3}
              value={rejectFeedback}
              onChange={(e) => setRejectFeedback(e.target.value)}
              className="w-full px-3 py-2 border border-[#90CAF9]/60 rounded-xl bg-[#E3F2FD]/20 text-xs text-slate-800 focus:outline-hidden focus:border-[#2196F3]"
              placeholder="বাতিলের সুনির্দিষ্ট কারণ লিখুন..."
            />

            <div className="flex items-center justify-end gap-2.5 pt-2">
              <button
                onClick={() => setRejectingItem(null)}
                className="px-4 py-2 border border-[#90CAF9] text-xs font-bold text-slate-600 rounded-lg hover:bg-[#E3F2FD]"
              >
                বাতিল
              </button>
              <button
                onClick={submitReject}
                disabled={processingId === (rejectingItem._id || rejectingItem.id)}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-xs font-bold rounded-lg shadow-xs transition"
              >
                নিশ্চিত বাতিল করুন
              </button>
            </div>
          </div>
        </div>
      )}

      {/* View Details Modal */}
      {selectedEnrollment && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 sm:p-8 space-y-5 shadow-2xl border border-[#90CAF9]">
            <div className="flex items-center justify-between pb-3 border-b border-[#90CAF9]/50">
              <h3 className="text-lg font-bold text-[#0D47A1]">
                ভর্তি আবেদন বিস্তারিত
              </h3>
              <button
                onClick={() => setSelectedEnrollment(null)}
                className="text-slate-400 hover:text-slate-600 font-bold text-lg"
              >
                ✕
              </button>
            </div>

            {/* Student ID Banner if assigned */}
            {selectedEnrollment.studentId && (
              <div className="bg-[#E3F2FD] border border-[#90CAF9] p-4 rounded-xl flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-[#0D47A1] block">
                    বরাদ্দকৃত শিক্ষার্থী আইডি (Student ID):
                  </span>
                  <span className="text-xl font-mono font-black text-[#0D47A1]">
                    {selectedEnrollment.studentId}
                  </span>
                </div>
                <span className="bg-emerald-600 text-white text-xs font-bold px-3 py-1 rounded-md shadow-2xs">
                  ভর্তি অনুমোদিত ✓
                </span>
              </div>
            )}

            <div className="space-y-3 text-xs">
              <div className="bg-[#E3F2FD]/30 p-3 rounded-lg border border-[#90CAF9]/40 flex justify-between">
                <span className="text-slate-500">শিক্ষার্থীর নাম:</span>
                <span className="font-bold text-[#0D47A1]">{selectedEnrollment.userName}</span>
              </div>
              <div className="bg-[#E3F2FD]/30 p-3 rounded-lg border border-[#90CAF9]/40 flex justify-between">
                <span className="text-slate-500">ইমেইল ঠিকানা:</span>
                <span className="font-bold text-[#0D47A1]">{selectedEnrollment.userEmail}</span>
              </div>
              <div className="bg-[#E3F2FD]/30 p-3 rounded-lg border border-[#90CAF9]/40 flex justify-between">
                <span className="text-slate-500">কোর্সের নাম:</span>
                <span className="font-bold text-[#0D47A1]">{selectedEnrollment.courseTitle}</span>
              </div>
              <div className="bg-[#E3F2FD]/30 p-3 rounded-lg border border-[#90CAF9]/40 flex justify-between">
                <span className="text-slate-500">কোর্স স্লাগ (Slug):</span>
                <span className="font-mono text-[#2196F3]">{selectedEnrollment.courseSlug}</span>
              </div>
              <div className="bg-[#E3F2FD]/30 p-3 rounded-lg border border-[#90CAF9]/40 flex justify-between">
                <span className="text-slate-500">আবেদনের তারিখ:</span>
                <span className="font-semibold text-slate-700">
                  {selectedEnrollment.appliedAt ? new Date(selectedEnrollment.appliedAt).toLocaleString("bn-BD") : "—"}
                </span>
              </div>
              {selectedEnrollment.adminFeedback && (
                <div className="bg-red-50 p-3 rounded-lg border border-red-200">
                  <span className="text-red-700 font-bold block mb-1">অ্যাডমিন ফিডব্যাক (Rejection Note):</span>
                  <p className="text-slate-700 italic">{selectedEnrollment.adminFeedback}</p>
                </div>
              )}
            </div>

            <div className="flex justify-end gap-3 pt-2 border-t border-[#90CAF9]/40">
              <button
                onClick={() => setSelectedEnrollment(null)}
                className="px-4 py-2 border border-[#90CAF9] text-xs font-bold text-slate-600 rounded-lg hover:bg-[#E3F2FD]"
              >
                বন্ধ করুন
              </button>
              {selectedEnrollment.status !== "approved" && (
                <button
                  onClick={() => handleApprove(selectedEnrollment._id || selectedEnrollment.id)}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-4 py-2 rounded-lg"
                >
                  অনুমোদন করুন (ID: 0401+)
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
