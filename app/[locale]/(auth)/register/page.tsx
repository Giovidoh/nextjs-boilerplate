"use client";

import LogoLink from "@/components/buttons/LogoLink";
import Main from "@/components/layouts/Main";
import { userRoles } from "@/features/account/dashboard/constants/user-roles.constant";
import OAuthLoginButtons from "@/features/auth/components/OAuthLoginButtons";
import RegisterForm from "@/features/auth/components/forms/RegisterForm";
import authRoutes from "@/features/auth/config/routes";
import { RegisterFormSchema } from "@/features/auth/schemas/register-form-schema";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { toast } from "sonner";

gsap.registerPlugin(useGSAP);

export default function RegisterPage() {
  const t = useTranslations("auth.register");
  const router = useRouter();

  // État partagé pour les données du formulaire
  const [registerData, setRegisterData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
  });

  // ANIMATION
  const step1Ref = useRef<HTMLDivElement | null>(null);
  const step2Ref = useRef<HTMLDivElement | null>(null);

  useGSAP(() => {
    gsap.from(step1Ref.current, {
      autoAlpha: 0,
      opacity: 0,
      xPercent: 100,
      duration: 0.7,
    });

    gsap.from(step2Ref.current, {
      autoAlpha: 0,
      opacity: 0,
      xPercent: 100,
      duration: 0.7,
    });
  }, []);

  // END ANIMATION

  // Gestion de la soumission
  const handleSubmit = (values: RegisterFormSchema) => {
    setRegisterData((prev) => ({ ...prev, ...values }));
  };

  return (
    <Main>
      <section className="flex h-full min-h-screen items-center justify-between gap-10 p-5">
        <div className="flex h-full w-full flex-col items-center justify-center gap-5">
          <div className="flex w-full max-w-md items-start justify-between gap-5">
            <h1 className="text-[clamp(24px,3vw,28px)]">{t("title")}</h1>
            <LogoLink />
          </div>
          <div className="w-full max-w-md">
            <div ref={step1Ref} className="invisible">
              <RegisterForm
                onSubmit={handleSubmit}
                defaultValues={{
                  first_name: registerData.first_name,
                  last_name: registerData.last_name,
                  email: registerData.email,
                }}
              />
            </div>
          </div>
          <div className="flex flex-col items-center justify-center gap-7">
            <OAuthLoginButtons />
            <p className="text-sm">
              {t("haveAccount")}{" "}
              <Link
                href={authRoutes.login.index}
                className="hover:text-primary font-medium transition"
              >
                {t("loginLink")}
              </Link>
            </p>
          </div>
        </div>
      </section>
    </Main>
  );
}
