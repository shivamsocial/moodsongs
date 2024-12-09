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
  const [messages, setMessages] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch messages instead of importing
  const loadMessages = async () => {
    try {
      const res = await fetch(`/locales/${locale}/common.json`);
      if (!res.ok) throw new Error("Failed to load messages");
      return await res.json();
    } catch (error) {
      console.error("Error loading locale messages:", error);
      const fallbackRes = await fetch("/locales/en/common.json");
      return await fallbackRes.json();
    }
  };

  useEffect(() => {
    const fetchMessages = async () => {
      setIsLoading(true);
      const loadedMessages = await loadMessages();
      setMessages(loadedMessages);
      setIsLoading(false);
    };

    fetchMessages();
  }, [locale]);

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
