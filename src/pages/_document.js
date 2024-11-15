// pages/_document.js
import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* Favicon and icon links */}
        <link
          rel="icon"
          href="https://www.moodsongs.net/images/favicon.ico"
          sizes="any"
        />
        <link
          rel="preload"
          href="https://fonts.googleapis.com/css2?family=Nunito:wght@300;400;600;700&display=swap"
          as="style"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Nunito:wght@300;400;600;700&display=swap"
          rel="stylesheet"
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="https://www.moodsongs.net/images/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="https://www.moodsongs.net/images/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="https://www.moodsongs.net/images/favicon-16x16.png"
        />
        <link rel="manifest" href="/images/site.webmanifest" />

        {/* Meta tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="MoodSongs - Discover Music for Every Mood"
        />
        <meta
          name="twitter:description"
          content="Listen to music that fits your mood perfectly. Choose from a variety of moods and enjoy the best music selections on MoodSongs."
        />
        <meta
          name="twitter:image"
          content="https://www.moodsongs.net/images/twitter-image.png"
        />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://www.moodsongs.net" />
      </Head>
      <body className="antialiased">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
