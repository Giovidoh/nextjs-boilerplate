import GoogleIcon from "@/public/assets/images/logos/google.svg";
import MicrosoftIcon from "@/public/assets/images/logos/microsoft.svg";
import { useTranslations } from "next-intl";
import Link from "next/link";

const OAuthLoginButtons = () => {
  const t = useTranslations("auth.oauth");

  return (
    <div className="flex w-full flex-col items-center justify-center gap-5">
      <div className="flex w-full items-center justify-center gap-5">
        <hr className="h-0.5 w-full bg-[#AAAAAA]" />
        <p>{t("separator")}</p>
        <hr className="h-0.5 w-full bg-[#AAAAAA]" />
      </div>
      <div className="flex items-center justify-center gap-7">
        <Link href="/">
          <GoogleIcon className="size-6 text-primary" />
        </Link>
        <Link href="/">
          <MicrosoftIcon className="size-6 text-primary" />
        </Link>
      </div>
    </div>
  );
};

export default OAuthLoginButtons;
