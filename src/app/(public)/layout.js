import Navbar from "@/components/public/shared/navbar/navbar";
import Footer from "@/components/public/shared/footer";
import WhatsAppButton from "@/components/WhatsAppButton";

export default function PublicLayout({ children }) {
  return (
    <div className="flex flex-col min-h-screen bg-[#F5FAFD]">
      <Navbar />
      <main className="flex-1">{children}</main>
      <WhatsAppButton />
      <Footer />
    </div>
  );
}
