"use client";

import { ChevronDown, Menu } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { useState } from "react";

import Typography from "@/components/Typography";
import Button from "@/components/buttons/Button";
import clsx from "@/lib/clsxm";

export default function Navbar() {
  const [isActive, setIsActive] = useState(false);
  const [isSubmenuOpen, setIsSubmenuOpen] = useState(false);

  if (typeof window === "undefined") return notFound();

  return (
    <>
      {/* Backdrop untuk submenu */}
      <div
        className={clsx(
          "absolute left-0 top-0 hidden w-full lg:z-30 lg:hidden bg-white",
          isSubmenuOpen && "lg:block",
        )}
        onClick={() => isSubmenuOpen && setIsSubmenuOpen(false)}
      />

      <section
        className="sticky top-0 z-30 flex w-full items-center bg-typo-white justify-between bg-success-50 px-4 py-2 md:px-14 md:py-2 lg:px-8 xl:px-14  border-b border-slate-900"
        onClick={() => isSubmenuOpen && setIsSubmenuOpen(false)}
      >
        {/* Logo */}
        <Link href="/" className=" ">
          <Typography variant="t" weight="bold" className="text-slate-900">
            DASHBOARD
          </Typography>
          {/* TO DO : PROFILE */}
          {/* <NextImage
            src="/logo/logo-only.png"
            width={381}
            height={558}
            alt="footer-logo"
            className="w-full"
          /> */}
        </Link>

        {/* Menu Utama */}
        <div
          className={clsx(
            "absolute left-0 -z-10 w-full flex-col items-start bg-white px-4 py-3 transition-all duration-200 md:px-14 md:py-6 lg:static lg:z-0 lg:flex lg:flex-row lg:items-center lg:justify-start lg:space-x-8 lg:space-y-0 lg:py-4",
            window.innerWidth < 1024 && isActive
              ? "top-[72px] max-[350px]:top-[64px] min-[400px]:top-11 sm:top-[76px]"
              : "-top-[500px]",
          )}
        >
          {/* My Workspace Dropdown */}
          <div className="relative flex flex-col mt-0 items-start lg:w-fit max-md:mb-4">
            <Button
              variant="outline"
              className="group flex items-center space-x-2"
              onClick={() => setIsSubmenuOpen((prev) => !prev)}
            >
              <Typography
                variant="btn"
                weight="medium"
                className="text-secondary-500 transition duration-200 group-hover:text-secondary-400"
              >
                My Workspace
              </Typography>
              <ChevronDown className="text-secondary-500 group-hover:text-secondary-400 transition duration-200" />
            </Button>

            <div
              className={clsx(
                "mt-2 w-full space-y-2 rounded-lg bg-white p-3 shadow-md transition-all duration-200",
                "lg:absolute lg:left-0 lg:top-12 lg:w-[250px]",
                !isSubmenuOpen && "hidden",
              )}
            >
              <Link href="/workspace">
                <Typography
                  variant="btn"
                  weight="medium"
                  className="block rounded-md px-3 py-2 text-left transition duration-200 hover:bg-slate-200"
                >
                  Workspace 1
                </Typography>
              </Link>
              <Link href="/workspace">
                <Typography
                  variant="btn"
                  weight="medium"
                  className="block rounded-md px-3 py-2 text-left transition duration-200 hover:bg-slate-200"
                >
                  Workspace 2
                </Typography>
              </Link>
            </div>
          </div>

          <Link href="/planning-kelas" onClick={() => setIsActive(false)}>
            <Typography
              variant="btn"
              weight="medium"
              className="text-slate-900 transition duration-200 hover:text-slate-600 max-md:mb-4"
            >
              Planning Kelas
            </Typography>
          </Link>

          <Link href="/" onClick={() => setIsActive(false)}>
            <Typography
              variant="btn"
              weight="medium"
              className="text-slate-900 transition duration-200 hover:text-slate-600 max-md:mb-4"
            >
              Setting Kelas
            </Typography>
          </Link>

          <Link href="/" onClick={() => setIsActive(false)}>
            <Typography
              variant="btn"
              weight="medium"
              className="text-slate-900 transition duration-200 hover:text-slate-600  max-md:mb-4"
            >
              Invite Teman
            </Typography>
          </Link>
        </div>

        {/* Hamburger menu */}
        <Menu
          className="block h-8 w-8 cursor-pointer transition duration-200 hover:text-default-800 lg:hidden"
          onClick={() => setIsActive((prev) => !prev)}
        />
      </section>
    </>
  );
}
