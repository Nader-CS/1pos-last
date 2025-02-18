import { NextIntlClientProvider } from "next-intl";
import StoreProvider from "./storeProvider";

const Providers = ({ children, messages }) => {
  return (
    <NextIntlClientProvider messages={messages}>
      <StoreProvider>{children}</StoreProvider>
    </NextIntlClientProvider>
  );
};
export default Providers;
