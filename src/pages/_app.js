import "../styles/globals.css";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";
import Head from "next/head";
import { IntlProvider } from "next-intl";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import styles1 from "../styles/videoPage.module.css"; // Import custom loading styles

function MyApp({ Component, pageProps }) {
  const { locale } = useRouter();
  const [messages, setMessages] = useState(null); // This holds the messages
  const [isLoading, setIsLoading] = useState(true); // To manage loading state

  // Dynamically load the translation files based on the current locale
  const loadMessages = async () => {
    try {
      const messages = await import(
        `../../public/locales/${locale}/common.json`
      );
      return messages.default;
    } catch (error) {
      console.error("Error loading locale messages:", error);
      return import("../../public/locales/en/common.json").then(
        (messages) => messages.default
      ); // Fallback to English if loading fails
    }
  };

  useEffect(() => {
    const loadLocaleMessages = async () => {
      const loadedMessages = await loadMessages();
      setMessages(loadedMessages);
      setIsLoading(false); // Once messages are loaded, set loading to false
    };

    loadLocaleMessages();
  }, [locale]); // Re-run when the locale changes

  // Display spinner if still loading
  if (isLoading) {
    return (
      <div className={styles1.spinnerContainer}>
        <div className={styles1.spinner}></div>
        <p className={styles1.spinnerText}>
          🤖 AI is curating the perfect playlist for your mood... 🚀🚀
        </p>
      </div>
    );
  }

  return (
    <IntlProvider
      messages={messages}
      locale={locale}
      defaultLocale="en"
      timeZone="UTC"
    >
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Component {...pageProps} />
      <SpeedInsights />
      <Analytics />
    </IntlProvider>
  );
}

export default MyApp;
