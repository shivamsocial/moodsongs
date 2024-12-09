import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);

    // Retrieve locale directly from context
    const locale = ctx.locale || "en"; // Default to 'en' if locale is not available

    return { ...initialProps, locale };
  }

  render() {
    const { locale } = this.props;

    return (
      <Html lang={locale}>
        {/* Dynamically set the lang attribute */}
        <Head>
          {/* Google Analytics gtag.js Script */}
          <script
            async
            src={`https://www.googletagmanager.com/gtag/js?id=G-NLD3F8R8M8`}
          ></script>
          <script
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', 'G-NLD3F8R8M8');
              `,
            }}
          ></script>

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
        </Head>
        <body className="antialiased">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
