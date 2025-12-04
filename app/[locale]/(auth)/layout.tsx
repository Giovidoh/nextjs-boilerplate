import "@/styles/globals.css";
import type { Metadata } from "next";
import { APP_NAME, APP_DESCRIPTION } from "@/configs/app-config";

export const metadata: Metadata = {
  title: APP_NAME,
  description: APP_DESCRIPTION,
};

export default function AuthLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <section className="flex min-h-screen flex-col">{children}</section>;
}
