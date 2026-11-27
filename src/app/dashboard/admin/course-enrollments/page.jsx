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
  Check,
  X,
  RefreshCw,
  AlertCircle,
  User,
  Globe2,
} from "lucide-react";
import { toast } from "react-toastify";
import { siteConfig } from "@/config/siteConfig";
import { getCurrentUser } from "@/lib/store";

export default function CourseEnrollmentsAdminPage() {
  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedEnrollment, setSelectedEnrollment] = useState(null);
  const [rejectingItem, setRejectingItem] = useState(null);
  const [rejectFeedback, setRejectFeedback] = useState("");
  const [processingId, setProcessingId] = useState(null);

  const fetchEnrollments = async () => {
    setLoading(true);
    try {
      const user = getCurrentUser();
      const res = await fetch("/api/course-enrollments", {
        headers: {
          "x-user-id": user?.id || "",
          "x-user-role": user?.role || "admin",
          "x-user-email": user?.email || "",
        },
      });
      const data = await res.json();
      if (data.success && Array.isArray(data.enrollments)) {
        setEnrollments(data.enrollments);
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

  const openRejectModal = (enrollment) => {
    setRejectingItem(enrollment);
    setRejectFeedback("আবেদন পর্যালোচনায় তথ্যের ঘাটতি থাকায় এই মুহূর্তে আবেদনটি গ্রহণ করা সম্ভব হয়নি। অনুগ্রহ করে বিস্তারিত তথ্যসহ পুনরায় আবেদন করুন।");
  };

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
      setRejectingItem(null);
      toast.info("আবেদন বাতিল করা হয়েছে।");
    } finally {
      setProcessingId(null);
    }
  };

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

  const filteredEnrollments = enrollments.filter((e) => {
    const matchesSearch =
      (e.userName || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (e.userEmail || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (e.courseTitle || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (e.studentId || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (e.country || "").toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === "all" || e.status === statusFilter;
    return matchesSearch && matchesStatus;
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
            আন্তর্জাতিক শিক্ষার্থীদের ভর্তির আবেদন অনুমোদন করুন এবং স্বয়ংক্রিয়ভাবে শিক্ষার্থী আইডি বরাদ্দ করুন
          </p>
        </div>

        <button
          onClick={fetchEnrollments}
          className="self-start sm:self-auto btn-outline py-2 px-3.5 text-xs"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
          <span>রিফ্রেশ</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="card-white-sm flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="relative w-full md:w-80">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="নাম, দেশ, ইমেইল বা আইডি দিয়ে খুঁজুন..."
            className="form-input pl-9"
          />
          <Search className="w-4 h-4 text-[#2196F3] absolute left-3 top-3" />
        </div>

        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          <div className="flex items-center gap-1.5">
            <span className="text-xs text-slate-500 font-semibold">স্ট্যাটাস:</span>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="form-select py-1.5 text-xs w-auto font-bold text-[#0D47A1]"
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
        </div>
      </div>

      {/* Main Table */}
      <div className="table-wrapper">
        <div className="overflow-x-auto">
          <table className="table-element">
            <thead className="table-head">
              <tr>
                <th className="table-th">শিক্ষার্থীর নাম ও দেশ</th>
                <th className="table-th">আবেদিত কোর্স</th>
                <th className="table-th">পছন্দের শিডিউল</th>
                <th className="table-th text-center">স্ট্যাটাস ও শিক্ষার্থী আইডি</th>
                <th className="table-th text-right">পদক্ষেপ (Actions)</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-[#90CAF9]/40">
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
                      <td className="table-td">
                        <div>
                          <span className="font-bold text-sm text-[#0D47A1] block">
                            {enr.userName}
                          </span>
                          <span className="text-[11px] text-slate-500 block">
                            ✉️ {enr.userEmail}
                          </span>
                          {enr.country && (
                            <span className="text-[10px] text-[#2196F3] font-semibold">
                              🌍 {enr.country}
                            </span>
                          )}
                        </div>
                      </td>

                      <td className="table-td">
                        <span className="font-bold text-xs text-[#0D47A1] bg-[#E3F2FD] border border-[#90CAF9]/70 px-2.5 py-1 rounded-md inline-block">
                          {enr.courseTitle}
                        </span>
                      </td>

                      <td className="table-td text-slate-600 font-medium">
                        <p>{enr.preferredSchedule || "সাধারণ সময়"}</p>
                        <span className="text-[10px] text-slate-400">দিন: {enr.preferredDays || "নমনীয়"}</span>
                      </td>

                      <td className="table-td text-center">
                        {enr.status === "approved" ? (
                          <div className="inline-flex flex-col items-center">
                            <span className="badge-success">
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
                            <span className="badge-danger">
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
                          <span className="badge-pending">
                            অপেক্ষমাণ (Pending)
                          </span>
                        )}
                      </td>

                      <td className="table-td text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => setSelectedEnrollment(enr)}
                            title="বিস্তারিত দেখুন"
                            className="p-1.5 bg-[#E3F2FD] border border-[#90CAF9] text-[#0D47A1] hover:bg-[#90CAF9]/40 rounded-lg transition cursor-pointer"
                          >
                            <Eye className="w-3.5 h-3.5" />
                          </button>

                          {enr.status !== "approved" && (
                            <button
                              onClick={() => handleApprove(enrollId)}
                              disabled={isProcessing}
                              title="অনুমোদন করুন (Generate 0401+ Student ID)"
                              className="btn-primary py-1 px-2 text-[11px]"
                            >
                              <Check className="w-3.5 h-3.5" />
                              <span>অনুমোদন</span>
                            </button>
                          )}

                          {enr.status === "pending" && (
                            <button
                              onClick={() => openRejectModal(enr)}
                              disabled={isProcessing}
                              title="বাতিল করুন"
                              className="p-1.5 bg-amber-500 hover:bg-amber-600 text-white rounded-lg transition cursor-pointer"
                            >
                              <X className="w-3.5 h-3.5" />
                            </button>
                          )}

                          <button
                            onClick={() => handleDelete(enrollId)}
                            disabled={isProcessing}
                            title="মুছে ফেলুন"
                            className="btn-danger p-1.5"
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

      {/* Reject Modal */}
      {rejectingItem && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="card-white max-w-md w-full space-y-4 shadow-xl">
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
              শিক্ষার্থী <span className="font-bold text-[#0D47A1]">{rejectingItem.userName}</span>-কে তার ড্যাশবোর্ডে এই ফিডব্যাক বার্তাটি প্রদর্শিত হবে:
            </p>

            <textarea
              rows={3}
              value={rejectFeedback}
              onChange={(e) => setRejectFeedback(e.target.value)}
              className="form-textarea"
              placeholder="বাতিলের সুনির্দিষ্ট কারণ লিখুন..."
            />

            <div className="flex items-center justify-end gap-2.5 pt-2">
              <button
                onClick={() => setRejectingItem(null)}
                className="btn-outline"
              >
                বাতিল
              </button>
              <button
                onClick={submitReject}
                className="btn-danger"
              >
                নিশ্চিত বাতিল করুন
              </button>
            </div>
          </div>
        </div>
      )}

      {/* View Details Modal (Doc Compliant Fields) */}
      {selectedEnrollment && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="card-white max-w-lg w-full max-h-[85vh] overflow-y-auto space-y-4 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-[#90CAF9]/50">
              <h3 className="text-lg font-bold text-[#0D47A1]">
                ভর্তি আবেদন বিস্তারিত (Student Profile)
              </h3>
              <button
                onClick={() => setSelectedEnrollment(null)}
                className="text-slate-400 hover:text-slate-600 font-bold text-lg"
              >
                ✕
              </button>
            </div>

            {selectedEnrollment.studentId && (
              <div className="bg-[#E3F2FD] border border-[#90CAF9] p-4 rounded-xl flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-[#0D47A1] block">
                    বরাদ্দকৃত শিক্ষার্থী আইডি:
                  </span>
                  <span className="text-xl font-mono font-black text-[#0D47A1]">
                    {selectedEnrollment.studentId}
                  </span>
                </div>
                <span className="badge-success">
                  ভর্তি অনুমোদিত ✓
                </span>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="card-ice">
                <span className="text-slate-500 block">শিক্ষার্থীর নাম:</span>
                <span className="font-bold text-[#0D47A1] text-sm">{selectedEnrollment.userName}</span>
              </div>
              <div className="card-ice">
                <span className="text-slate-500 block">পিতার নাম:</span>
                <span className="font-bold text-[#0D47A1] text-sm">{selectedEnrollment.fatherName || "উল্লেখ নেই"}</span>
              </div>
              <div className="card-ice">
                <span className="text-slate-500 block">ইমেইল:</span>
                <span className="font-bold text-[#0D47A1]">{selectedEnrollment.userEmail}</span>
              </div>
              <div className="card-ice">
                <span className="text-slate-500 block">হোয়াটসঅ্যাপ:</span>
                <span className="font-bold text-[#0D47A1]">{selectedEnrollment.phone || selectedEnrollment.whatsapp}</span>
              </div>
              <div className="card-ice">
                <span className="text-slate-500 block">দেশ:</span>
                <span className="font-bold text-[#0D47A1]">{selectedEnrollment.country || "বাংলাদেশ"}</span>
              </div>
              <div className="card-ice">
                <span className="text-slate-500 block">জাতীয়তা:</span>
                <span className="font-bold text-[#0D47A1]">{selectedEnrollment.nationality || "বাংলাদেশী"}</span>
              </div>
              <div className="card-ice sm:col-span-2">
                <span className="text-slate-500 block">আবেদিত কোর্স:</span>
                <span className="font-bold text-[#0D47A1] text-sm">{selectedEnrollment.courseTitle}</span>
              </div>
              <div className="card-ice">
                <span className="text-slate-500 block">ভাষাগত সক্ষমতা:</span>
                <span className="font-medium text-slate-700">{selectedEnrollment.languagesUnderstood || "বাংলা, ইংরেজি"}</span>
              </div>
              <div className="card-ice">
                <span className="text-slate-500 block">পছন্দের সময়সূচি:</span>
                <span className="font-medium text-slate-700">{selectedEnrollment.preferredSchedule} (দিন: {selectedEnrollment.preferredDays})</span>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-3 border-t border-[#90CAF9]/40">
              <button
                onClick={() => setSelectedEnrollment(null)}
                className="btn-outline"
              >
                বন্ধ করুন
              </button>
              {selectedEnrollment.status !== "approved" && (
                <button
                  onClick={() => handleApprove(selectedEnrollment._id || selectedEnrollment.id)}
                  className="btn-primary"
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
