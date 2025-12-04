import { cn } from "@/lib/utils";
import Link from "next/link";

interface FooterLinkProps {
  label: string;
  href: string;
  className?: string;
}

const FooterLink = ({ label, href, className }: FooterLinkProps) => {
  return (
    <Link
      href={href}
      className={cn(
        "hover:text-primary text-[clamp(12px,1.5vw,14px)] text-black transition",
        className
      )}
    >
      {label}
    </Link>
  );
};

export default FooterLink;
