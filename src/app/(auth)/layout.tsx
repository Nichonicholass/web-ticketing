import NextImage from "@/components/NextImage";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="md:flex min-h-screen w-full">
      {/* <section className="w-full md:w-[50%] lg:w-[47%] h-[50vh] md:h-screen relative flex items-center justify-center p-6">
        <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl bg-slate-900">
          <NextImage
            src="/register/auth-img.png"
            alt="Artwork Background"
            width={705}
            height={992}
            className="absolute inset-0 md:top-[10%] xl:top-0 object-cover w-full h-full rounded-2xl"
          />
        </div>
      </section> */}

      {/* <section className="absolute right-0 h-max lg:h-full w-full overflow-y-auto md:w-1/2 lg:w-[53%]"> */}
      <section className="absolute right-0 h-max lg:h-full w-full overflow-y-auto">
        {children}
      </section>
    </main>
  );
}
