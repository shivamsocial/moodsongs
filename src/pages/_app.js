import Head from "next/head";
import "../styles/globals.css";
import { Nunito } from "@next/font/google";
const nunito = Nunito({
  subset: ["latin"],
  weight: ["300", "400", "600", "700"],
});

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/images/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/images/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/images/favicon-16x16.png"
        />
        <link rel="manifest" href="/images/site.webmanifest" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="canonical" href="https://www.moodsongs.net" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
