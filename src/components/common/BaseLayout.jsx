import Providers from "@/provider";
import { getMessages } from "next-intl/server";

export default async function BaseLayout({ children, locale }) {
  const messages = await getMessages();
  return (
    <html lang={locale} dir={locale == "en" ? "ltr" : "rtl"}>
      <body>
        <Providers messages={messages}>{children}</Providers>
      </body>
    </html>
  );
}
