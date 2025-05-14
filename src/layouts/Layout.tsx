import Footer from "@/layouts/Footer";
import Navbar from "@/layouts/Navbar";

export default function MainLayout({
  children,
  withNavbar,
  withFooter,
  className,
}: {
  children: React.ReactNode;
  withNavbar: boolean;
  withFooter: boolean;
  className?: string;
}) {
  return (
    <main className={className}>
      {withNavbar && <Navbar />}
      {children}
      {withFooter && <Footer />}
    </main>
  );
}
