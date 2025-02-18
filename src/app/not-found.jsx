import { BaseLayout } from "@/components";
import { Link, routing } from "@/i18n/routing";
import { getMessages } from "next-intl/server";
import { cookies } from "next/headers";

export default async function GlobalNotFound() {
  const cookieStore = await cookies();
  const locale = cookieStore.get("NEXT_LOCALE").value;
  const messages = await getMessages({ locale });
  return (
    <BaseLayout locale={routing.defaultLocale}>
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-4xl mb-4">404 - Page Not Found</h1>
        <p className="text-lg mb-4">
          Sorry, the page you're looking for does not exist.
        </p>
        <Link
          href="/"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Go back to the homepage
        </Link>
      </div>
    </BaseLayout>
  );
}
