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
import { Icon } from "./Icon";
import { Button } from "./Button";
import Image from "next/image";

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
        ? "bg-accent/10 text-accent"
        : "text-text-muted hover:text-text-primary hover:bg-surface-muted"
    }
  `;

  const NavContent = () => (
    <Fragment>
      <Link
        href="/profile"
        className={navLinkClass("/profile")}
        onClick={() => setOpen(false)}
      >
        <Icon icon={faUserCircle} className="text-sm" />
        <span>الملف الشخصي</span>
      </Link>

      <Link
        href="/messages"
        className={navLinkClass("/messages")}
        onClick={() => setOpen(false)}
      >
        <Icon icon={faMessage} className="text-sm" />
        <span>الرسائل الواردة</span>
      </Link>
      <Link
        href="/questions"
        className={navLinkClass("/questions")}
        onClick={() => setOpen(false)}
      >
        <Icon icon={faComments} className="text-sm" />
        <span>أسئلتي</span>
      </Link>
    </Fragment>
  );

  return (
    <header className="fixed top-0 w-full z-50 px-4 md:px-10 h-20 flex items-center justify-between bg-surface/80 backdrop-blur-md border-b border-border/50">
      <div className="flex items-center gap-4">
        <Link href="/" className="flex items-center gap-2 group">
          <Image
            src="/images/logo.png"
            alt="بصراحة"
            width={200}
            height={40}
            quality={100}
          />
        </Link>
      </div>

      {token ? (
        <nav className="hidden lg:flex items-center gap-2 bg-surface-muted/50 p-1.5 rounded-2xl border border-border/50">
          <NavContent />
        </nav>
      ) : null}

      <div className="flex items-center gap-3">
        {!token ? (
          <Fragment>
            <Link
              href="/auth/login"
              className="hidden sm:block text-text-primary font-bold px-6 py-2.5 hover:text-accent transition-colors"
            >
              تسجيل الدخول
            </Link>
            <Link
              href="/auth/signup"
              className="bg-accent text-white font-bold px-6 py-2.5 rounded-xl shadow-lg shadow-primary/20 hover:bg-accent/90 hover:-translate-y-0.5 transition-all flex items-center gap-2"
            >
              <Icon icon={faBolt} className="text-xs" />
              <span>ابدأ الآن</span>
            </Link>
          </Fragment>
        ) : (
          <Fragment>
            <div className="flex items-center gap-4">
              <div className="h-8 w-[1px] bg-border mx-2 hidden sm:block"></div>
              <LogoutButton />
            </div>

            {token ? (
              <Button
                onClick={() => setOpen(true)}
                icon={faBarsStaggered}
                className="lg:hidden w-10 h-10 !p-5 rounded-xl !bg-surface-muted !text-text-primary border !border-border shadow-none"
              />
            ) : null}
          </Fragment>
        )}
      </div>

      <Drawer
        onClose={() => setOpen(false)}
        open={open}
        title={
          <Image
            src="/images/logo.png"
            alt="بصراحة"
            width={200}
            height={40}
            quality={100}
          />
        }
      >
        <div className="flex flex-col gap-2">
          <NavContent />
        </div>
      </Drawer>
    </header>
  );
};
