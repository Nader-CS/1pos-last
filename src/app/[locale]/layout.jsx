import { BaseLayout } from "@/components";
import { routing } from "@/i18n/routing";
import { notFound } from "next/navigation";

export const metadata = {
  title: "1POS",
  description: "1POS Project",
};

export default async function RootLayout({ children, params }) {
  const { locale } = await params;

  if (!routing.locales.includes(locale)) {
    notFound();
  }

  return <BaseLayout locale={locale}>{children}</BaseLayout>;
}
