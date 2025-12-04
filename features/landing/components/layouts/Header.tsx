"use client";

import BaseButton from "@/components/buttons/BaseButton";
import BurgerBtn from "@/components/buttons/BurgerButton";
import LogoLink from "@/components/buttons/LogoLink";
import LanguageSelector from "@/components/selects/LanguageSelector";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useState } from "react";

const Navbar = () => {
  const t = useTranslations("header.navigation");

  const links = [
    {
      label: t("home"),
      href: "/",
    },
    {
      label: t("price"),
      href: "#price",
    },
    {
      label: t("about"),
      href: "#about",
    },
  ];

  return (
    <nav className="hidden items-center gap-[clamp(24px,4vw,40px)] md:flex">
      {links.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className="hover:text-primary text-[clamp(14px,1.5vw,16px)] font-medium text-black transition"
        >
          {link.label}
        </Link>
      ))}
    </nav>
  );
};

const MobileNavbar = ({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}) => {
  const t = useTranslations("header.navigation");

  const links = [
    {
      label: t("home"),
      href: "/",
    },
    {
      label: t("price"),
      href: "#price",
    },
    {
      label: t("about"),
      href: "#about",
    },
  ];

  return (
    <nav className="flex flex-col items-center justify-center gap-[clamp(24px,4vw,40px)]">
      {links.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className="hover:text-primary text-[clamp(16px,1.5vw,18px)] font-medium text-black transition"
          onClick={() => setIsOpen(false)}
        >
          {link.label}
        </Link>
      ))}
    </nav>
  );
};

const Header = () => {
  const t = useTranslations("header");
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 z-50 w-full bg-transparent backdrop-blur-xl">
      <div className="container mx-auto flex w-full flex-col items-center gap-5 px-5 py-5 md:px-16">
        <div className="flex w-full items-center justify-between">
          <LogoLink />
          <Navbar />
          <div className="flex items-center gap-5">
            <div className="hidden md:block">
              <LanguageSelector />
            </div>
            <div className="hidden sm:block">
              <BaseButton isLink href="/login">
                {t("login")}
              </BaseButton>
            </div>

            <BurgerBtn
              isOpen={isOpen}
              setIsOpen={setIsOpen}
              className="z-60 md:hidden"
            />
          </div>

          {isOpen && (
            <div className="absolute top-0 left-0 z-50 flex h-screen w-screen flex-col items-center justify-center gap-[clamp(24px,4vw,40px)] bg-white md:hidden">
              <MobileNavbar isOpen={isOpen} setIsOpen={setIsOpen} />

              <LanguageSelector />

              <div className="block sm:hidden">
                <BaseButton isLink href="/login">
                  {t("login")}
                </BaseButton>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
