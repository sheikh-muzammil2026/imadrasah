"use client";

import { useState } from "react";
import { Mail, Phone, MapPin, Send, CheckCircle2 } from "lucide-react";
import { toast } from "react-toastify";

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
        <h1 className="text-3xl font-extrabold text-[#064E73]">যোগাযোগ করুন</h1>
        <p className="text-sm text-[#4A606D]">
          ভর্তি বা যেকোনো পরামর্শের জন্য আমাদের সাথে সরাসরি যোগাযোগ করুন
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Contact Info Cards */}
        <div className="space-y-4">
          <div className="bg-white rounded-xl border border-[#E2EEF5] p-5 shadow-soft flex items-start gap-4">
            <div className="w-10 h-10 rounded-lg bg-[#0288D1]/10 text-[#0288D1] flex items-center justify-center shrink-0">
              <Phone className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-[#064E73]">হটলাইন ও হোয়াটসঅ্যাপ</h3>
              <a href="tel:+8801767911188" className="text-xs text-[#0288D1] font-semibold block mt-1 hover:underline">
                +880 1767 911 188
              </a>
              <span className="text-[11px] text-gray-400">সকাল ৯:০০ - রাত ১০:০০</span>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-[#E2EEF5] p-5 shadow-soft flex items-start gap-4">
            <div className="w-10 h-10 rounded-lg bg-[#0288D1]/10 text-[#0288D1] flex items-center justify-center shrink-0">
              <Mail className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-[#064E73]">ইমেইল ঠিকানা</h3>
              <a href="mailto:info@qurankanon.com" className="text-xs text-[#0288D1] font-semibold block mt-1 hover:underline">
                info@qurankanon.com
              </a>
              <span className="text-[11px] text-gray-400">২৪ ঘণ্টার মধ্যে রিপ্লাই</span>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-[#E2EEF5] p-5 shadow-soft flex items-start gap-4">
            <div className="w-10 h-10 rounded-lg bg-[#0288D1]/10 text-[#0288D1] flex items-center justify-center shrink-0">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-[#064E73]">অফিস ঠিকানা</h3>
              <p className="text-xs text-[#4A606D] mt-1">
                সেক্টর-১১, উত্তরা, ঢাকা-১২৩০, বাংলাদেশ।
              </p>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-[#E2EEF5] p-6 sm:p-8 shadow-soft">
          {submitted ? (
            <div className="text-center py-10 space-y-3">
              <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
              <h3 className="text-lg font-bold text-[#064E73]">ধন্যবাদ!</h3>
              <p className="text-xs text-[#4A606D]">
                আপনার বার্তাটি গ্রহণ করা হয়েছে। আমাদের প্রতিনিধি দ্রুত যোগাযোগ করবেন।
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#064E73] mb-1">
                    আপনার নাম *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3 py-2 border border-[#E2EEF5] rounded-lg text-xs bg-[#F5FAFD] focus:outline-hidden focus:border-[#0288D1]"
                    placeholder="পুরো নাম লিখুন"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#064E73] mb-1">
                    মোবাইল নম্বর *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3 py-2 border border-[#E2EEF5] rounded-lg text-xs bg-[#F5FAFD] focus:outline-hidden focus:border-[#0288D1]"
                    placeholder="01XXXXXXXXX"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#064E73] mb-1">
                  ইমেইল (ঐচ্ছিক)
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3 py-2 border border-[#E2EEF5] rounded-lg text-xs bg-[#F5FAFD] focus:outline-hidden focus:border-[#0288D1]"
                  placeholder="example@mail.com"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#064E73] mb-1">
                  আপনার বার্তা / প্রশ্ন *
                </label>
                <textarea
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-3 py-2 border border-[#E2EEF5] rounded-lg text-xs bg-[#F5FAFD] focus:outline-hidden focus:border-[#0288D1]"
                  placeholder="আপনি কোন কোর্সে আগ্রহী বা কী জানতে চান লিখুন..."
                />
              </div>

              <button
                type="submit"
                className="bg-[#0288D1] hover:bg-[#0277BD] text-white text-xs font-bold px-6 py-2.5 rounded-lg shadow-xs transition duration-150 flex items-center gap-2"
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
