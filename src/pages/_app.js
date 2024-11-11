import Head from "next/head";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>
          MoodSongs - Discover Music for Every Mood | Happy, Romantic, EDM,
          Hip-Hop
        </title>
        <meta
          name="description"
          content="Explore music based on your mood. From Happy, Romantic, EDM, Hip-Hop, and more, find the perfect tunes for every moment."
        />
        <meta name="robots" content="index, follow" />
        <meta
          property="og:title"
          content="MoodSongs - Discover Music for Every Mood"
        />
        <meta
          property="og:description"
          content="Explore music based on your mood. From Happy, Romantic, EDM, Hip-Hop, and more, find the perfect tunes for every moment."
        />

        <meta
          name="twitter:card"
          content="https://www.moodsongs.net/images/opengraph-image.png"
        />
        <meta
          name="twitter:title"
          content="MoodSongs - Discover Music for Every Mood"
        />
        <meta
          name="twitter:description"
          content="Explore music based on your mood. From Happy, Romantic, EDM, Hip-Hop, and more, find the perfect tunes for every moment."
        />
        <meta
          name="twitter:image"
          content="https://www.moodsongs.net/images/opengraph-image.png"
        />
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
