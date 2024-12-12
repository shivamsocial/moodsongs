import React from "react";

const PrivacyPolicy = () => {
  return (
    <div
      style={{
        margin: "20px",
        lineHeight: "1.6",
      }}
    >
      <div
        style={{
          maxWidth: "900px",
          margin: "0 auto",
          padding: "20px",
          backgroundColor: "#f9f9f9",
          borderRadius: "8px",
        }}
      >
        <h1 style={{ textAlign: "center", color: "#333" }}>
          Privacy Policy for Mood Songs
        </h1>
        <p style={{ textAlign: "center", fontStyle: "italic", color: "#666" }}>
          <strong>Last Updated: December 12, 2024</strong>
        </p>

        <section style={{ marginBottom: "30px" }}>
          <h2
            style={{ color: "green", fontSize: "24px", marginBottom: "10px" }}
          >
            Introduction
          </h2>
          <p style={{ fontSize: "16px", color: "#333" }}>
            At <strong>Mood Songs</strong> (accessible from{" "}
            <a
              href="https://www.moodsongs.net"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "green" }}
            >
              https://www.moodsongs.net
            </a>
            ), we respect your privacy and are committed to protecting your
            personal information. This Privacy Policy outlines how we collect,
            use, and protect your data when you visit and interact with our
            website.
          </p>
        </section>

        <section style={{ marginBottom: "30px" }}>
          <h2
            style={{ color: "green", fontSize: "24px", marginBottom: "10px" }}
          >
            Data Collection and Use
          </h2>
          <ul
            style={{
              listStyleType: "disc",
              marginLeft: "20px",
              fontSize: "16px",
              color: "#333",
            }}
          >
            <li style={{ marginBottom: "10px" }}>
              <strong>No Personal Data Collected</strong>: Mood Songs does not
              collect any personally identifiable information (PII) from users.
              We do not require any form of registration or login to access the
              content on our website.
            </li>
            <li style={{ marginBottom: "10px" }}>
              <strong>Cookies</strong>: We do not use cookies for tracking or
              advertising purposes. However, <strong>YouTube</strong>, the
              third-party service we use to fetch video content, may set cookies
              in your browser to provide its services. These cookies are outside
              of our control. You can find more information on how YouTube
              handles cookies and user data in their{" "}
              <a
                href="https://policies.google.com/privacy"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "green" }}
              >
                privacy policy
              </a>
              .
            </li>
            <li style={{ marginBottom: "10px" }}>
              <strong>Data from YouTube Data API</strong>: Our website utilizes
              the YouTube Data API to fetch video content, including video URLs,
              titles, and metadata. This data is stored securely in our database
              for the sole purpose of delivering content to users. This
              information is not linked to any personal information and cannot
              identify individual users.
            </li>
          </ul>
        </section>

        <section style={{ marginBottom: "30px" }}>
          <h2
            style={{ color: "green", fontSize: "24px", marginBottom: "10px" }}
          >
            Third-Party Services
          </h2>
          <p style={{ fontSize: "16px", color: "#333" }}>
            Our website integrates with the following third-party services:
          </p>
          <ul
            style={{
              listStyleType: "disc",
              marginLeft: "20px",
              fontSize: "16px",
              color: "#333",
            }}
          >
            <li style={{ marginBottom: "10px" }}>
              <strong>YouTube</strong>: Content on our website is fetched using
              the YouTube Data API. The data sent to YouTube is governed by
              YouTube’s privacy policy, which can be found{" "}
              <a
                href="https://policies.google.com/privacy"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "green" }}
              >
                here
              </a>
              . YouTube may set cookies on your device while you view videos.
            </li>
            <li style={{ marginBottom: "10px" }}>
              <strong>MongoDB</strong>: We store video metadata (such as video
              titles and URLs) in MongoDB, a third-party database service.
              MongoDB does not store personal data. For more information on how
              MongoDB handles data, you can visit their privacy policy{" "}
              <a
                href="https://www.mongodb.com/legal/privacy-policy"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "green" }}
              >
                here
              </a>
              .
            </li>
          </ul>
        </section>

        <section style={{ marginBottom: "30px" }}>
          <h2
            style={{ color: "green", fontSize: "24px", marginBottom: "10px" }}
          >
            Data Retention
          </h2>
          <p style={{ fontSize: "16px", color: "#333" }}>
            We retain video-related metadata (video titles and URLs) for as long
            as it is necessary to provide our services and improve the user
            experience. We may delete this data at our discretion if it is no
            longer needed or upon the request of a user, although we do not
            store any personal data.
          </p>
        </section>

        <section style={{ marginBottom: "30px" }}>
          <h2
            style={{ color: "green", fontSize: "24px", marginBottom: "10px" }}
          >
            Data Security
          </h2>
          <p style={{ fontSize: "16px", color: "#333" }}>
            We prioritize the security of your data. While no website can
            guarantee complete security, we use reasonable administrative,
            physical, and technical safeguards to protect the information stored
            in our database. However, please be aware that no method of data
            transmission over the internet or method of electronic storage is
            completely secure.
          </p>
        </section>

        <section style={{ marginBottom: "30px" }}>
          <h2
            style={{ color: "green", fontSize: "24px", marginBottom: "10px" }}
          >
            International Data Transfers
          </h2>
          <p style={{ fontSize: "16px", color: "#333" }}>
            As we use services like MongoDB and YouTube, your video-related
            metadata may be stored and processed in countries outside your own.
            We ensure that such transfers comply with applicable data protection
            laws.
          </p>
        </section>

        <section style={{ marginBottom: "30px" }}>
          <h2
            style={{ color: "green", fontSize: "24px", marginBottom: "10px" }}
          >
            Legal Basis for Data Processing
          </h2>
          <p style={{ fontSize: "16px", color: "#333" }}>
            We process video metadata based on our legitimate interest in
            providing an optimized user experience on the website and improving
            our content offerings.
          </p>
        </section>

        <section style={{ marginBottom: "30px" }}>
          <h2
            style={{ color: "green", fontSize: "24px", marginBottom: "10px" }}
          >
            Children&apos;s Privacy
          </h2>
          <p style={{ fontSize: "16px", color: "#333" }}>
            Mood Songs does not knowingly collect or solicit personal data from
            children under 13 years of age. If we learn that we have collected
            personal data from a child under 13, we will delete that information
            as soon as possible.
          </p>
        </section>

        <section style={{ marginBottom: "30px" }}>
          <h2
            style={{ color: "green", fontSize: "24px", marginBottom: "10px" }}
          >
            External Links Disclaimer
          </h2>
          <p style={{ fontSize: "16px", color: "#333" }}>
            Our website may contain links to third-party websites or services
            that are not operated by us. We are not responsible for the privacy
            practices of those third-party websites and encourage you to review
            their privacy policies.
          </p>
        </section>

        <section style={{ marginBottom: "30px" }}>
          <h2
            style={{ color: "green", fontSize: "24px", marginBottom: "10px" }}
          >
            User Consent
          </h2>
          <p style={{ fontSize: "16px", color: "#333" }}>
            By accessing and using Mood Songs, you consent to the practices
            outlined in this Privacy Policy.
          </p>
        </section>

        <section style={{ marginBottom: "30px" }}>
          <h2
            style={{ color: "green", fontSize: "24px", marginBottom: "10px" }}
          >
            Changes to This Privacy Policy
          </h2>
          <p style={{ fontSize: "16px", color: "#333" }}>
            We may update this Privacy Policy from time to time. Any changes
            will be posted on this page, with an updated &quot;Last
            Updated&quot; date. We encourage you to review this policy
            periodically.
          </p>
        </section>

        <section style={{ marginBottom: "30px" }}>
          <h2
            style={{ color: "green", fontSize: "24px", marginBottom: "10px" }}
          >
            Contact Us
          </h2>
          <p style={{ fontSize: "16px", color: "#333" }}>
            If you have any questions or concerns about this Privacy Policy, you
            can reach us at:
          </p>
          <p style={{ fontSize: "16px", color: "#333" }}>
            <strong>Email</strong>:{" "}
            <a
              href="mailto:shivamupadhyaysocial@gmail.com"
              style={{ color: "green" }}
            >
              shivamupadhyaysocial@gmail.com
            </a>
            <br />
            <strong>Contact Page</strong>:{" "}
            <a
              href="https://www.moodsongs.net/contact"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "green" }}
            >
              https://www.moodsongs.net/contact
            </a>
          </p>
        </section>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
