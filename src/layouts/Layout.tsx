import Footer from "@/layouts/Footer";
import Navbar from "@/layouts/Navbar";

export default function MainLayout({
  children,
  withNavbar,
  withFooter,
  className,
  workspaceId,
}: {
  children: React.ReactNode;
  withNavbar: boolean;
  withFooter: boolean;
  className?: string;
  workspaceId?: string;
}) {
  return (
    <main className={className}>
      {withNavbar && <Navbar workspaceId={workspaceId} />}
      {children}
      {withFooter && <Footer />}
    </main>
  );
}
