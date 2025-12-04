import LogoLink from "@/components/buttons/LogoLink";
import Main from "@/components/layouts/Main";
import LoginForm from "@/features/auth/components/forms/LoginForm";
import OAuthLoginButtons from "@/features/auth/components/OAuthLoginButtons";
import { useTranslations } from "next-intl";
import Link from "next/link";
import authRoutes from "@/features/auth/config/routes";
export default function LoginPage() {
  const t = useTranslations("auth.login");

  return (
    <Main>
      <section className="flex h-full min-h-screen items-center justify-between gap-10 p-5">
        <div className="flex h-full w-full flex-col items-center justify-center gap-5">
          <div className="flex w-full max-w-md items-start justify-between gap-5">
            <h1 className="text-[clamp(24px,3vw,28px)]">{t("title")}</h1>
            <LogoLink />
          </div>
          <div className="w-full max-w-md">
            <LoginForm />
          </div>
          <div className="flex flex-col items-center justify-center gap-7">
            <OAuthLoginButtons />
            <p className="text-sm">
              {t("noAccount")}{" "}
              <Link
                href={authRoutes.register.index}
                className="hover:text-primary font-medium transition"
              >
                {t("signUpLink")}
              </Link>
            </p>
          </div>
        </div>
      </section>
    </Main>
  );
}
