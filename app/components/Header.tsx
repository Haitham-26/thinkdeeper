"use client";

import Link from "next/link";
import React, { Fragment, useState } from "react";
import { LogoutButton } from "./LogoutButton";
import { usePathname } from "next/navigation";
import { Drawer } from "./Drawer";
import { faComments } from "@fortawesome/free-solid-svg-icons/faComments";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons/faUserCircle";
import { faBolt } from "@fortawesome/free-solid-svg-icons/faBolt";
import { faMessage } from "@fortawesome/free-solid-svg-icons/faMessage";
import { faBarsStaggered } from "@fortawesome/free-solid-svg-icons/faBarsStaggered";
import { faRightToBracket } from "@fortawesome/free-solid-svg-icons/faRightToBracket";
import { faHouse } from "@fortawesome/free-solid-svg-icons/faHouse";
import { faCircleQuestion } from "@fortawesome/free-solid-svg-icons/faCircleQuestion";
import { Icon } from "./Icon";
import { Button } from "./Button";
import Image from "next/image";

const publicLinks = [
  { title: "الرئيسية", path: "/", icon: faHouse },
  { title: "كيفية الاستخدام", path: "/how-it-works", icon: faCircleQuestion },
  { title: "أسئلة المنتدى", path: "/questions/public", icon: faBolt },
];

const privateLinks = [
  { title: "الملف الشخصي", path: "/profile", icon: faUserCircle },
  { title: "الرسائل الواردة", path: "/messages", icon: faMessage },
  { title: "أسئلتي", path: "/questions", icon: faComments },
  { title: "أسئلة المنتدى", path: "/questions/public", icon: faBolt },
];

type HeaderProps = {
  token?: string;
};

export const Header: React.FC<HeaderProps> = ({ token }) => {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const navLinkClass = (path: string) => `
    relative px-5 py-3 md:py-2 rounded-xl font-bold transition-all duration-300 flex items-center gap-3 w-full md:w-auto
    ${
      pathname === path
        ? "bg-accent/20 text-accent"
        : "text-slate-300 hover:text-white hover:bg-white/5"
    }
  `;

  const PublicNavContent = () => (
    <Fragment>
      {publicLinks.map((link) => (
        <Link
          key={link.path}
          href={link.path}
          className={navLinkClass(link.path)}
          onClick={() => setOpen(false)}
        >
          <Icon icon={link.icon} className="text-sm" />
          <span>{link.title}</span>
        </Link>
      ))}
    </Fragment>
  );

  const NavContent = () => (
    <Fragment>
      {privateLinks.map((link) => (
        <Link
          key={link.path}
          href={link.path}
          className={navLinkClass(link.path)}
          onClick={() => setOpen(false)}
        >
          <Icon icon={link.icon} className="text-sm" />
          <span>{link.title}</span>
        </Link>
      ))}
    </Fragment>
  );

  const GuestNavContent = () => (
    <div className="flex flex-col gap-3 mt-4">
      <PublicNavContent />
      <div className="h-[1px] bg-white/10 my-2"></div>
      <Link
        href="/auth/login"
        className={`${navLinkClass("/auth/login")} border border-white/10 justify-center`}
        onClick={() => setOpen(false)}
      >
        <Icon icon={faRightToBracket} className="text-sm" />
        <span>تسجيل الدخول</span>
      </Link>
      <Link
        href="/auth/signup"
        className="bg-accent text-white font-bold px-5 py-4 rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-accent/20"
        onClick={() => setOpen(false)}
      >
        <Icon icon={faBolt} className="text-xs" />
        <span>إنشاء حساب</span>
      </Link>
    </div>
  );

  return (
    <header className="fixed top-0 w-full z-50 px-4 md:px-10 h-20 flex items-center justify-between bg-[#0f172a]/95 backdrop-blur-md border-b border-white/10">
      <div className="flex items-center gap-8">
        <Link href="/" className="flex items-center gap-2 group">
          <Image
            src="/images/logo.png"
            alt="بصراحة"
            width={160}
            height={35}
            quality={100}
            className="brightness-110"
          />
        </Link>
      </div>

      <nav className="hidden lg:flex items-center gap-2 bg-white/5 p-1.5 rounded-2xl border border-white/10">
        {token ? <NavContent /> : <PublicNavContent />}
      </nav>

      <div className="flex items-center gap-3">
        {!token ? (
          <Fragment>
            <Link
              href="/auth/login"
              className="hidden sm:block text-slate-300 font-bold px-6 py-2.5 hover:text-white transition-colors"
            >
              تسجيل الدخول
            </Link>
            <Link
              href="/auth/signup"
              className="hidden sm:flex bg-accent text-white font-bold px-6 py-2.5 rounded-xl shadow-lg shadow-accent/20 hover:bg-accent/90 hover:-translate-y-0.5 transition-all items-center gap-2"
            >
              إنشاء حساب
            </Link>

            <Button
              onClick={() => setOpen(true)}
              icon={faBarsStaggered}
              className="lg:hidden w-10 h-10 !p-5 rounded-xl !bg-white/5 !text-white border !border-white/10 shadow-none hover:!bg-white/10"
            />
          </Fragment>
        ) : (
          <Fragment>
            <div className="flex items-center gap-4">
              <div className="h-8 w-[1px] bg-white/10 mx-2 hidden sm:block"></div>
              <LogoutButton />
            </div>

            <Button
              onClick={() => setOpen(true)}
              icon={faBarsStaggered}
              className="lg:hidden w-10 h-10 !p-5 rounded-xl !bg-white/5 !text-white border !border-white/10 shadow-none hover:!bg-white/10"
            />
          </Fragment>
        )}
      </div>

      <Drawer
        onClose={() => setOpen(false)}
        open={open}
        title={
          <Image src="/images/logo.png" alt="بصراحة" width={140} height={30} />
        }
      >
        <div className="flex flex-col gap-2">
          {token ? <NavContent /> : <GuestNavContent />}
        </div>
      </Drawer>
    </header>
  );
};
