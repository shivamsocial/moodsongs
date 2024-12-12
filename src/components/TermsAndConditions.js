import React from "react";
import Link from "next/link";

const TermsAndConditions = () => {
  const styles = {
    container: {
      margin: "0 auto",
      padding: "20px",
      maxWidth: "800px",
      backgroundColor: "#f9f9f9",
      color: "#333",
    },
    heading: {
      textAlign: "center",
      color: "green",
    },
    section: {
      marginBottom: "20px",
    },
    subHeading: {
      fontSize: "1.2rem",
      color: "green",
      marginTop: "20px",
    },
    paragraph: {
      fontSize: "1rem",
      lineHeight: "1.6",
      marginBottom: "10px",
    },
    list: {
      marginLeft: "20px",
      listStyleType: "disc",
    },
    link: {
      color: "#2980b9",
      textDecoration: "none",
    },
    contactInfo: {
      listStyleType: "none",
      paddingLeft: "0",
    },
    contactItem: {
      marginBottom: "10px",
    },
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Terms and Conditions for Mood Songs</h1>
      <p style={styles.paragraph}>
        <strong>Last Updated: December 12, 2024</strong>
      </p>

      <section style={styles.section}>
        <h2 style={styles.subHeading}>1. Introduction</h2>
        <p style={styles.paragraph}>
          These Terms and Conditions govern your use of the Mood Songs website
          (accessible from{" "}
          <Link href="https://www.moodsongs.net" style={styles.link}>
            https://www.moodsongs.net
          </Link>
          ). By accessing and using this website, you agree to comply with these
          Terms. If you do not agree to these Terms, you must refrain from using
          the website.
        </p>
      </section>

      <section style={styles.section}>
        <h2 style={styles.subHeading}>2. Use of the Website</h2>
        <p style={styles.paragraph}>
          Mood Songs offers free mood and genre-based video song recommendations
          from YouTube through the use of the YouTube Data API. You are allowed
          to browse the content and use the website for personal, non-commercial
          purposes. Any other use, including but not limited to, modifying,
          copying, or distributing the content, is prohibited without our
          express written consent.
        </p>
      </section>

      <section style={styles.section}>
        <h2 style={styles.subHeading}>3. Content Ownership</h2>
        <p style={styles.paragraph}>
          All video content displayed on Mood Songs is provided by YouTube via
          the YouTube Data API. Mood Songs does not own or control the
          videos/content displayed on our website. By using the website, you
          acknowledge that all content is owned by the respective copyright
          holders, and you agree to comply with YouTube’s Terms of Service.
        </p>
      </section>

      <section style={styles.section}>
        <h2 style={styles.subHeading}>4. User Data</h2>
        <p style={styles.paragraph}>
          We respect your privacy and are committed to protecting your data. We
          do not collect or store any personally identifiable information (PII).
          The only data stored is video metadata (such as video titles and URLs)
          fetched from the YouTube Data API, which is used solely to provide
          relevant video content to users. For more information on how we handle
          user data, please refer to our{" "}
          <Link href="/privacy" style={styles.link}>
            Privacy Policy
          </Link>
          .
        </p>
      </section>

      <section style={styles.section}>
        <h2 style={styles.subHeading}>5. Third-Party Services</h2>
        <p style={styles.paragraph}>
          Our website integrates with third-party services such as YouTube and
          MongoDB. We use the YouTube Data API to fetch video content, and we
          store video-related metadata using MongoDB. These third-party services
          have their own privacy policies and terms, and we encourage you to
          review them before using the website.
        </p>
      </section>

      <section style={styles.section}>
        <h2 style={styles.subHeading}>6. Restrictions</h2>
        <p style={styles.paragraph}>
          You are prohibited from using the website in any manner that:
        </p>
        <ul style={styles.list}>
          <li>Violates applicable laws or regulations.</li>
          <li>Infringes the intellectual property rights of others.</li>
          <li>
            Attempts to interfere with the functioning of the website or its
            services.
          </li>
          <li>
            Engages in harmful activities such as distributing malware or
            attempting to access unauthorized areas of the website.
          </li>
        </ul>
      </section>

      <section style={styles.section}>
        <h2 style={styles.subHeading}>7. Disclaimer of Warranties</h2>
        <p style={styles.paragraph}>
          Mood Songs provides the website and its services &quot;as is&quot; and
          without warranties of any kind, either express or implied. We do not
          guarantee the accuracy, reliability, or completeness of the video
          content or metadata displayed on the website. We are not responsible
          for any errors, interruptions, or delays in the website’s operation.
        </p>
      </section>

      <section style={styles.section}>
        <h2 style={styles.subHeading}>8. Limitation of Liability</h2>
        <p style={styles.paragraph}>
          To the maximum extent permitted by applicable law, Mood Songs shall
          not be liable for any indirect, incidental, special, or consequential
          damages arising out of or in connection with the use of the website or
          the inability to use the website, including but not limited to, loss
          of data, loss of business opportunities, or damage to your device or
          equipment.
        </p>
      </section>

      <section style={styles.section}>
        <h2 style={styles.subHeading}>9. Modifications</h2>
        <p style={styles.paragraph}>
          We reserve the right to modify, suspend, or discontinue the website
          and its services at any time without notice. We may also update these
          Terms and Conditions from time to time. Any changes will be posted on
          this page with an updated &quot;Last Updated&quot; date. We encourage
          you to review these Terms periodically.
        </p>
      </section>

      <section style={styles.section}>
        <h2 style={styles.subHeading}>10. Governing Law</h2>
        <p style={styles.paragraph}>
          These Terms and Conditions are governed by the laws of the country or
          state in which Mood Songs operates. By using the website, you consent
          to the exclusive jurisdiction of the courts in that jurisdiction in
          any dispute arising out of or relating to the use of the website.
        </p>
      </section>

      <section style={styles.section}>
        <h2 style={styles.subHeading}>11. Contact Us</h2>
        <p style={styles.paragraph}>
          If you have any questions or concerns about these Terms and
          Conditions, you can contact us at:
        </p>
        <ul style={styles.contactInfo}>
          <li style={styles.contactItem}>
            <strong>Email:</strong>{" "}
            <Link
              href="mailto:shivamupadhyaysocial@gmail.com"
              style={styles.link}
            >
              shivamupadhyaysocial@gmail.com
            </Link>
          </li>
          <li style={styles.contactItem}>
            <strong>Contact Page:</strong>{" "}
            <Link href="/contact" style={styles.link}>
              https://www.moodsongs.net/contact
            </Link>
          </li>
        </ul>
      </section>
    </div>
  );
};

export default TermsAndConditions;
