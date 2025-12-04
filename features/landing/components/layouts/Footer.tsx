// import facebookIcon from '@/public/assets/images/logos/facebook.svg?url';
// import instagramIcon from '@/public/assets/images/logos/instagram.svg?url';
// import linkedinIcon from '@/public/assets/images/logos/linkedin.svg?url';
import { useTranslations } from "next-intl";
import LogoLink from "@/components/buttons/LogoLink";
import FooterLink from "@/features/landing/components/buttons/FooterLink";
// import SocialLink from '../buttons/SocialLink';

const Footer = () => {
  const t = useTranslations("footer");

  const footerLinks = {
    navigation: {
      label: t("sections.navigation.title"),
      links: [
        { label: t("sections.navigation.links.home"), href: "/" },
        { label: t("sections.navigation.links.pricing"), href: "/pricing" },
        { label: t("sections.navigation.links.about"), href: "/about" },
        { label: t("sections.navigation.links.blog"), href: "/blog" },
      ],
    },
    support: {
      label: t("sections.support.title"),
      links: [
        { label: t("sections.support.links.faq"), href: "/faq" },
        { label: t("sections.support.links.helpCenter"), href: "/help" },
        { label: t("sections.support.links.contact"), href: "/contact" },
        { label: t("sections.support.links.status"), href: "/status" },
      ],
    },
    legal: {
      label: t("sections.legal.title"),
      links: [
        { label: t("sections.legal.links.privacyPolicy"), href: "/privacy" },
        { label: t("sections.legal.links.termsOfService"), href: "/terms" },
        { label: t("sections.legal.links.cookiePolicy"), href: "/cookies" },
      ],
    },
  };

  return (
    <footer className="bg-accent rounded-t-2xl sm:bg-transparent">
      <div className="container mx-auto flex w-full flex-col items-center gap-5 px-5 py-14 md:px-16 lg:pt-60 lg:pb-10">
        <div className="flex w-full flex-col items-start justify-between gap-10 md:flex-row lg:gap-40">
          <div className="flex flex-col justify-center gap-2 md:max-w-sm">
            <LogoLink />
            <p className="max-w-2xl text-[clamp(14px,1.5vw,16px)] font-medium text-black">
              {t("description")}
            </p>
          </div>
          <div className="grid w-full items-start justify-between gap-10 min-[320px]:flex">
            <div className="flex flex-col justify-center gap-2">
              <h3 className="text-sm font-medium text-black">
                {footerLinks.navigation.label}
              </h3>
              {footerLinks.navigation.links.map((link, index) => (
                <FooterLink
                  key={`${link.label}-${index}`}
                  href={link.href}
                  label={link.label}
                />
              ))}
            </div>
            <div className="flex flex-col justify-center gap-2">
              <h3 className="text-sm font-medium text-black">
                {footerLinks.support.label}
              </h3>
              {footerLinks.support.links.map((link, index) => (
                <FooterLink
                  key={`${link.label}-${index}`}
                  href={link.href}
                  label={link.label}
                />
              ))}
            </div>
            <div className="flex flex-col justify-center gap-2">
              <h3 className="text-sm font-medium text-black">
                {footerLinks.legal.label}
              </h3>
              {footerLinks.legal.links.map((link, index) => (
                <FooterLink
                  key={`${link.label}-${index}`}
                  href={link.href}
                  label={link.label}
                />
              ))}
            </div>
          </div>
        </div>
        <div className="mt-10 w-full border-t border-black/20 pt-6 text-center">
          <p className="text-sm text-black/80">{t("copyright")}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
