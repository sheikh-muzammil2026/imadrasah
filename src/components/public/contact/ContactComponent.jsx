"use client";

import { useState } from "react";
import { Mail, Phone, MapPin, Send, CheckCircle2 } from "lucide-react";
import { toast } from "react-toastify";
import { siteConfig } from "@/config/siteConfig";

export default function ContactComponent() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    toast.success("আপনার বার্তা সফলভাবে পাঠানো হয়েছে। দ্রুত আপনার সাথে যোগাযোগ করা হবে।");
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
        <h1 className="text-3xl font-extrabold text-[#0D47A1]">যোগাযোগ করুন</h1>
        <p className="text-sm text-slate-600">
          ভর্তি বা যেকোনো পরামর্শের জন্য আমাদের সাথে সরাসরি যোগাযোগ করুন
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Contact Info Cards */}
        <div className="space-y-4">
          <div className="bg-white rounded-xl border border-[#90CAF9]/60 p-5 shadow-soft flex items-start gap-4">
            <div className="w-10 h-10 rounded-lg bg-[#E3F2FD] border border-[#90CAF9] text-[#2196F3] flex items-center justify-center shrink-0">
              <Phone className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-[#0D47A1]">হটলাইন ও হোয়াটসঅ্যাপ</h3>
              <a
                href={`tel:${siteConfig.contact.phone.replace(/\s+/g, '')}`}
                className="text-xs text-[#2196F3] font-bold block mt-1 hover:underline"
              >
                {siteConfig.contact.phone}
              </a>
              <span className="text-[11px] text-slate-500">
                {siteConfig.contact.supportHours.bn}
              </span>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-[#90CAF9]/60 p-5 shadow-soft flex items-start gap-4">
            <div className="w-10 h-10 rounded-lg bg-[#E3F2FD] border border-[#90CAF9] text-[#2196F3] flex items-center justify-center shrink-0">
              <Mail className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-[#0D47A1]">ইমেইল ঠিকানা</h3>
              <a
                href={`mailto:${siteConfig.contact.email}`}
                className="text-xs text-[#2196F3] font-bold block mt-1 hover:underline break-all"
              >
                {siteConfig.contact.email}
              </a>
              <span className="text-[11px] text-slate-500">২৪ ঘণ্টার মধ্যে রিপ্লাই</span>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-[#90CAF9]/60 p-5 shadow-soft flex items-start gap-4">
            <div className="w-10 h-10 rounded-lg bg-[#E3F2FD] border border-[#90CAF9] text-[#2196F3] flex items-center justify-center shrink-0">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-[#0D47A1]">অফিস ঠিকানা</h3>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                {siteConfig.contact.address.bn}
              </p>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-[#90CAF9]/60 p-6 sm:p-8 shadow-soft">
          {submitted ? (
            <div className="text-center py-10 space-y-3">
              <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
              <h3 className="text-lg font-bold text-[#0D47A1]">ধন্যবাদ!</h3>
              <p className="text-xs text-slate-600">
                আপনার বার্তাটি গ্রহণ করা হয়েছে। আমাদের প্রতিনিধি দ্রুত যোগাযোগ করবেন।
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#0D47A1] mb-1">
                    আপনার নাম *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3 py-2 border border-[#90CAF9]/60 rounded-lg text-xs bg-[#E3F2FD]/30 focus:outline-hidden focus:border-[#2196F3] focus:ring-1 focus:ring-[#90CAF9]"
                    placeholder="পুরো নাম লিখুন"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#0D47A1] mb-1">
                    মোবাইল নম্বর *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3 py-2 border border-[#90CAF9]/60 rounded-lg text-xs bg-[#E3F2FD]/30 focus:outline-hidden focus:border-[#2196F3] focus:ring-1 focus:ring-[#90CAF9]"
                    placeholder="01XXXXXXXXX"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#0D47A1] mb-1">
                  ইমেইল (ঐচ্ছিক)
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3 py-2 border border-[#90CAF9]/60 rounded-lg text-xs bg-[#E3F2FD]/30 focus:outline-hidden focus:border-[#2196F3] focus:ring-1 focus:ring-[#90CAF9]"
                  placeholder="example@mail.com"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#0D47A1] mb-1">
                  আপনার বার্তা / প্রশ্ন *
                </label>
                <textarea
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-3 py-2 border border-[#90CAF9]/60 rounded-lg text-xs bg-[#E3F2FD]/30 focus:outline-hidden focus:border-[#2196F3] focus:ring-1 focus:ring-[#90CAF9]"
                  placeholder="আপনি কোন কোর্সে আগ্রহী বা কী জানতে চান লিখুন..."
                />
              </div>

              <button
                type="submit"
                className="bg-[#0D47A1] hover:bg-[#0a3880] text-white text-xs font-bold px-6 py-2.5 rounded-lg shadow-xs transition duration-150 flex items-center gap-2 cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
                <span>বার্তা পাঠান</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
