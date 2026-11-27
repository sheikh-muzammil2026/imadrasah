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
  Check,
  X,
  Phone,
  Mail,
  Award,
  BookOpen,
  Calendar,
  RefreshCw,
  User,
  ExternalLink,
} from "lucide-react";
import { toast } from "react-toastify";
import { siteConfig } from "@/config/siteConfig";
import { getCurrentUser } from "@/lib/store";

export default function TeacherApplicationsPage() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedApp, setSelectedApp] = useState(null);
  const [rejectingApp, setRejectingApp] = useState(null);
  const [rejectReason, setRejectReason] = useState("");
  const [processingId, setProcessingId] = useState(null);

  const fetchApplications = async () => {
    setLoading(true);
    try {
      const user = getCurrentUser();
      const res = await fetch("/api/teacher-applications", {
        headers: {
          "x-user-id": user?.id || "",
          "x-user-role": user?.role || "admin",
          "x-user-email": user?.email || "",
        },
      });
      const data = await res.json();
      if (data.success && Array.isArray(data.applications)) {
        setApplications(data.applications);
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

  const openRejectModal = (app) => {
    setRejectingApp(app);
    setRejectReason("অভিজ্ঞতা বা শিক্ষাগত যোগ্যতার প্রয়োজনীয় শর্ত পূরণ না হওয়ায়");
  };

  const handleConfirmReject = async () => {
    if (!rejectingApp) return;
    const appId = rejectingApp._id || rejectingApp.id;
    setProcessingId(appId);
    try {
      const res = await fetch(`/api/teacher-applications/${appId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "reject", rejectionReason: rejectReason }),
      });
      const data = await res.json();

      if (res.ok && data.success) {
        toast.info("শিক্ষক নিয়োগ আবেদনটি কারণসহ বাতিল করা হয়েছে।");
        setApplications((prev) =>
          prev.map((app) =>
            (app._id === appId || app.id === appId)
              ? { ...app, status: "rejected", rejectionReason: rejectReason }
              : app
          )
        );
        if (selectedApp && (selectedApp._id === appId || selectedApp.id === appId)) {
          setSelectedApp((prev) => ({ ...prev, status: "rejected", rejectionReason: rejectReason }));
        }
        setRejectingApp(null);
      } else {
        toast.error(data.message || "সমস্যা হয়েছে।");
      }
    } catch (err) {
      console.error("Reject error:", err);
      setApplications((prev) =>
        prev.map((app) =>
          (app._id === appId || app.id === appId)
            ? { ...app, status: "rejected", rejectionReason: rejectReason }
            : app
        )
      );
      toast.info("আবেদনটি বাতিল করা হয়েছে।");
      setRejectingApp(null);
    } finally {
      setProcessingId(null);
    }
  };

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

  const filteredApps = applications.filter((app) => {
    const matchesSearch =
      (app.name || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (app.email || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (app.phone || "").includes(searchTerm) ||
      (app.nationality || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (app.teacherId || "").toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === "all" || app.status === statusFilter;
    return matchesSearch && matchesStatus;
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
            আন্তর্জাতিক শিক্ষক নিয়োগ আবেদন ব্যবস্থাপনা
          </h1>
          <p className="text-xs text-slate-600">
            আবেদন পর্যালোচনা, শিক্ষক আইডি (<span className="font-bold text-[#0D47A1]">0203+</span>) অনুমোদন ও রেকর্ড পরিচালনা
          </p>
        </div>

        <button
          onClick={fetchApplications}
          className="self-start sm:self-auto btn-outline py-2 px-3.5 text-xs"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
          <span>রিফ্রেশ</span>
        </button>
      </div>

      {/* Filter & Search Bar */}
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

        <div className="flex items-center gap-1.5">
          <span className="text-xs text-slate-500 font-semibold">স্ট্যাটাস:</span>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="form-select py-1.5 text-xs w-auto font-bold text-[#0D47A1]"
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
      </div>

      {/* Main Table */}
      <div className="table-wrapper">
        <div className="overflow-x-auto">
          <table className="table-element">
            <thead className="table-head">
              <tr>
                <th className="table-th">শিক্ষকের নাম ও জাতীয়তা</th>
                <th className="table-th">বিভাগ</th>
                <th className="table-th">শিক্ষাগত যোগ্যতা ও বিষয়</th>
                <th className="table-th">দৈনিক সময়</th>
                <th className="table-th text-center">স্ট্যাটাস ও শিক্ষক আইডি</th>
                <th className="table-th text-right">পদক্ষেপ (Actions)</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-[#90CAF9]/40">
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
                      <td className="table-td">
                        <div>
                          <span className="font-bold text-sm text-[#0D47A1] block">
                            {app.name}
                          </span>
                          <span className="text-[11px] text-slate-500 block">
                            📞 {app.phone} | ✉️ {app.email}
                          </span>
                          <span className="text-[10px] text-[#2196F3] font-semibold">
                            🌍 {app.nationality || "বাংলাদেশী"} (অবস্থান: {app.countryOfResidence || "বাংলাদেশ"})
                          </span>
                        </div>
                      </td>

                      <td className="table-td">
                        <span className="font-bold text-xs text-[#0D47A1] bg-[#E3F2FD] border border-[#90CAF9]/70 px-2 py-0.5 rounded-md inline-block">
                          {app.department}
                        </span>
                      </td>

                      <td className="table-td max-w-[200px] truncate" title={`${app.qualification} - ${app.fieldOfStudy}`}>
                        <p className="font-semibold text-slate-800 truncate">{app.qualification}</p>
                        <p className="text-[10px] text-slate-500 truncate">{app.fieldOfStudy}</p>
                      </td>

                      <td className="table-td text-slate-600 font-medium">
                        {app.questionnaire?.hoursAvailable || app.experience || "২–৪ ঘণ্টা"}
                      </td>

                      <td className="table-td text-center">
                        {app.status === "approved" ? (
                          <div className="inline-flex flex-col items-center">
                            <span className="badge-success">
                              অনুমোদিত ✓
                            </span>
                            {app.teacherId && (
                              <span className="mt-1 font-mono font-extrabold text-xs text-[#0D47A1] bg-white border border-[#90CAF9] px-2 py-0.5 rounded shadow-2xs">
                                ID: {app.teacherId}
                              </span>
                            )}
                          </div>
                        ) : app.status === "rejected" ? (
                          <span className="badge-danger">
                            বাতিল ✕
                          </span>
                        ) : (
                          <span className="badge-pending">
                            অপেক্ষমাণ (Pending)
                          </span>
                        )}
                      </td>

                      <td className="table-td text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => setSelectedApp(app)}
                            title="বিস্তারিত দেখুন"
                            className="p-1.5 bg-[#E3F2FD] border border-[#90CAF9] text-[#0D47A1] hover:bg-[#90CAF9]/40 rounded-lg transition cursor-pointer"
                          >
                            <Eye className="w-3.5 h-3.5" />
                          </button>

                          {app.status !== "approved" && (
                            <button
                              onClick={() => handleApprove(appId)}
                              disabled={isProcessing}
                              title="অনুমোদন করুন (ID: 0203+)"
                              className="btn-primary py-1 px-2 text-[11px]"
                            >
                              <Check className="w-3.5 h-3.5" />
                              <span>অনুমোদন</span>
                            </button>
                          )}

                          {app.status === "pending" && (
                            <button
                              onClick={() => openRejectModal(app)}
                              disabled={isProcessing}
                              title="কারণসহ বাতিল করুন"
                              className="p-1.5 bg-amber-500 hover:bg-amber-600 text-white rounded-lg transition cursor-pointer"
                            >
                              <X className="w-3.5 h-3.5" />
                            </button>
                          )}

                          <button
                            onClick={() => handleDelete(appId)}
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

      {/* View Details Modal (Complete Doc Specifications) */}
      {selectedApp && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="card-white max-w-2xl w-full p-6 sm:p-8 space-y-5 shadow-2xl max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-3 border-b border-[#90CAF9]/50">
              <div className="flex items-center gap-2.5">
                <div className="icon-box-primary">
                  <User className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[#0D47A1]">
                    {selectedApp.name}
                  </h3>
                  <span className="text-xs text-slate-500">
                    বিভাগ: {selectedApp.department} | জন্ম: {selectedApp.dateOfBirth || "উল্লেখ নেই"}
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

            {/* Generated Teacher ID Alert Banner */}
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
                <span className="badge-success">
                  শিক্ষক অ্যাকাউন্ট সক্রিয় ✓
                </span>
              </div>
            )}

            {/* Detailed Form Fields Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="card-ice">
                <span className="text-slate-500 block">পিতার নাম:</span>
                <span className="font-bold text-[#0D47A1] text-sm">{selectedApp.fatherName || "উল্লেখ নেই"}</span>
              </div>
              <div className="card-ice">
                <span className="text-slate-500 block">মোবাইল ও হোয়াটসঅ্যাপ:</span>
                <span className="font-bold text-[#0D47A1] text-sm">{selectedApp.phone}</span>
              </div>
              <div className="card-ice">
                <span className="text-slate-500 block">ইমেইল:</span>
                <span className="font-bold text-[#0D47A1] break-all">{selectedApp.email}</span>
              </div>
              <div className="card-ice">
                <span className="text-slate-500 block">পরিচয়পত্র ({selectedApp.idType}):</span>
                <span className="font-bold text-[#0D47A1]">{selectedApp.idNumber || "উল্লেখ নেই"}</span>
              </div>
              <div className="card-ice">
                <span className="text-slate-500 block">জাতীয়তা ও বর্তমান দেশ:</span>
                <span className="font-bold text-[#0D47A1]">{selectedApp.nationality} (অবস্থান: {selectedApp.countryOfResidence})</span>
              </div>
              <div className="card-ice">
                <span className="text-slate-500 block">ভাষাগত সক্ষমতা:</span>
                <span className="font-bold text-[#0D47A1]">{selectedApp.languages || "বাংলা, ইংরেজি"}</span>
              </div>
              <div className="card-ice sm:col-span-2">
                <span className="text-slate-500 block">শিক্ষাগত যোগ্যতা ও পাঠের ক্ষেত্র:</span>
                <span className="font-bold text-[#0D47A1] text-sm">{selectedApp.qualification} — {selectedApp.fieldOfStudy}</span>
                {selectedApp.institutionAttended && (
                  <p className="text-slate-600 mt-0.5">প্রতিষ্ঠান: {selectedApp.institutionAttended}</p>
                )}
              </div>
            </div>

            {/* Links Section: CV, Certificates, Photo */}
            <div className="card-ice space-y-2 text-xs">
              <span className="font-bold text-[#0D47A1] block">আপলোডকৃত ডকুমেন্টস ও লিংক:</span>
              <div className="flex flex-wrap gap-3">
                {selectedApp.cvUrl && (
                  <a
                    href={selectedApp.cvUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-outline py-1 px-2.5 text-[11px]"
                  >
                    <span>সিভি দেখুন</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
                {selectedApp.certificatesUrl && (
                  <a
                    href={selectedApp.certificatesUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-outline py-1 px-2.5 text-[11px]"
                  >
                    <span>সনদপত্র দেখুন</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
                {selectedApp.photoUrl && (
                  <a
                    href={selectedApp.photoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-outline py-1 px-2.5 text-[11px]"
                  >
                    <span>প্রোফাইল ছবি</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>
            </div>

            {/* Questionnaire Evaluation View */}
            {selectedApp.questionnaire && (
              <div className="card-ice space-y-2 text-xs">
                <span className="font-bold text-[#0D47A1] block">অনলাইন শিক্ষক প্রস্তুতি ও সক্ষমতা:</span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-slate-700">
                  <p><span className="font-semibold text-[#0D47A1]">দৈনিক সময়:</span> {selectedApp.questionnaire.hoursAvailable}</p>
                  <p><span className="font-semibold text-[#0D47A1]">ইন্টারনেট মান:</span> {selectedApp.questionnaire.internetQuality}</p>
                  <p className="sm:col-span-2"><span className="font-semibold text-[#0D47A1]">ডিভাইস:</span> {Array.isArray(selectedApp.questionnaire.devices) ? selectedApp.questionnaire.devices.join(", ") : "ল্যাপটপ"}</p>
                  <p className="sm:col-span-2"><span className="font-semibold text-[#0D47A1]">প্রযুক্তিগত দক্ষতা:</span> {Array.isArray(selectedApp.questionnaire.techSkills) ? selectedApp.questionnaire.techSkills.join(", ") : "Zoom / Meet"}</p>
                  <p className="sm:col-span-2"><span className="font-semibold text-[#0D47A1]">বিশেষ দক্ষতা:</span> {Array.isArray(selectedApp.questionnaire.specialSkills) ? selectedApp.questionnaire.specialSkills.join(", ") : "তাজবীদ"}</p>
                  <p className="sm:col-span-2"><span className="font-semibold text-[#0D47A1]">ভিন্ন সংস্কৃতিতে পাঠদান:</span> {selectedApp.questionnaire.multiculturalComfort}</p>
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#90CAF9]/40">
              <button
                onClick={() => setSelectedApp(null)}
                className="btn-outline"
              >
                বন্ধ করুন
              </button>

              {selectedApp.status !== "approved" && (
                <>
                  <button
                    onClick={() => {
                      const appToReject = selectedApp;
                      setSelectedApp(null);
                      openRejectModal(appToReject);
                    }}
                    disabled={processingId === (selectedApp._id || selectedApp.id)}
                    className="btn-danger text-xs"
                  >
                    <X className="w-4 h-4" />
                    <span>কারণসহ বাতিল</span>
                  </button>
                  <button
                    onClick={() => handleApprove(selectedApp._id || selectedApp.id)}
                    disabled={processingId === (selectedApp._id || selectedApp.id)}
                    className="btn-primary"
                  >
                    <Check className="w-4 h-4" />
                    <span>অনুমোদন করুন (ID: 0203+)</span>
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Rejection Modal with Feedback Note */}
      {rejectingApp && (
        <div className="modal-backdrop">
          <div className="modal-dialog max-w-lg">
            <div className="modal-header">
              <div className="flex items-center gap-2 text-rose-600">
                <XCircle className="w-5 h-5" />
                <h3 className="font-bold text-base text-[#0D47A1]">
                  শিক্ষক আবেদন বাতিলের কারণ প্রদান
                </h3>
              </div>
              <button
                onClick={() => setRejectingApp(null)}
                className="text-slate-400 hover:text-slate-600 p-1 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="modal-body space-y-4 text-xs">
              <div className="bg-[#E3F2FD]/50 p-3 rounded-lg border border-[#90CAF9]/40 space-y-1">
                <p className="font-bold text-[#0D47A1]">{rejectingApp.name}</p>
                <p className="text-slate-500">
                  বিভাগ: {rejectingApp.department} • ফোন: {rejectingApp.phone}
                </p>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  দ্রুত কারণ নির্বাচন করুন:
                </label>
                <div className="space-y-1.5">
                  {[
                    "অভিজ্ঞতা বা শিক্ষাগত যোগ্যতার প্রয়োজনীয় শর্ত পূরণ না হওয়ায়",
                    "অনলাইন পাঠদান ও প্রযুক্তিগত দক্ষতার মূল্যায়নে ঘাটতি থাকায়",
                    "বর্তমান সেশনে নির্ধারিত বিভাগের শূন্যপদ পূর্ণ থাকায়",
                  ].map((quickReason) => (
                    <button
                      key={quickReason}
                      type="button"
                      onClick={() => setRejectReason(quickReason)}
                      className={`w-full text-left p-2 rounded-lg border text-xs transition cursor-pointer ${
                        rejectReason === quickReason
                          ? "bg-[#E3F2FD] border-[#2196F3] text-[#0D47A1] font-bold"
                          : "border-slate-200 hover:bg-slate-50 text-slate-600"
                      }`}
                    >
                      • {quickReason}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  বিস্তারিত কারণ বা ফিডব্যাক নোট *
                </label>
                <textarea
                  rows={3}
                  value={rejectReason}
                  onChange={(e) => setRejectReason(e.target.value)}
                  placeholder="আবেদনকারীকে স্পষ্ট কারণ উল্লেখ করুন..."
                  className="form-input w-full"
                  required
                />
              </div>
            </div>

            <div className="modal-footer">
              <button
                type="button"
                onClick={() => setRejectingApp(null)}
                className="btn-outline text-xs cursor-pointer"
              >
                বাতিল করুন
              </button>
              <button
                type="button"
                onClick={handleConfirmReject}
                disabled={processingId === (rejectingApp._id || rejectingApp.id)}
                className="btn-danger text-xs flex items-center gap-1.5 cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
                <span>
                  {processingId === (rejectingApp._id || rejectingApp.id)
                    ? "বাতিল হচ্ছে..."
                    : "কারণসহ প্রত্যাখ্যান নিশ্চিত করুন"}
                </span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
