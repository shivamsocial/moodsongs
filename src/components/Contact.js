import Image from "next/image";
import Link from "next/link";
import { FaTelegram, FaLinkedin, FaTwitter, FaEnvelope } from "react-icons/fa"; // Importing social media icons

const Contact = () => {
  return (
    <div
      style={{
        flex: 1,
        padding: "10px",
        borderLeft: "1px solid #ddd",
        textAlign: "center",
        backgroundColor: "#fff",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        borderRadius: "8px",
        minWidth: "250px", // Ensures sidebar doesn't collapse too much on mobile
      }}
    >
      <img
        src="/images/shivam.jpg"
        alt="Shivam Upadhyay Photo"
        width={200}
        height={200}
        style={{
          borderRadius: "50%",
          marginBottom: "20px",
          border: "4px solid #4CAF50",
        }}
      />
      <h3 style={{ fontSize: "24px", color: "#333", marginBottom: "20px" }}>
        Connect with Me
      </h3>
      <ul
        style={{
          listStyle: "none",
          padding: 0,
          display: "flex",
          justifyContent: "center",
          gap: "20px",
        }}
      >
        <li>
          <Link href="https://www.linkedin.com/in/shivupa/">
            <FaLinkedin
              style={{
                fontSize: "35px",
                color: "#0077b5",
                transition: "color 0.3s",
                cursor: "pointer",
              }}
            />
          </Link>
        </li>
        <li>
          <Link href="https://x.com/shivamupdate">
            <FaTwitter
              style={{
                fontSize: "35px",
                color: "#1da1f2",
                transition: "color 0.3s",
                cursor: "pointer",
              }}
            />
          </Link>
        </li>
        <li>
          <Link href="mailto:shivamupadhyaysocial@gmail.com" passHref>
            <FaEnvelope
              style={{
                fontSize: "35px",
                color: "#1da1f2",
                transition: "color 0.3s",
                cursor: "pointer",
              }}
            />
          </Link>
        </li>
      </ul>

      <h2 style={{ fontSize: "24px", color: "#333", marginTop: "40px" }}>
        Join the MoodSongs Community
      </h2>
      <p style={{ fontSize: "18px", lineHeight: "1.6", marginBottom: "20px" }}>
        We’re not just a website; we’re a community of music lovers. Join us on
        this journey.
      </p>
      <p>
        <strong>
          <Link href="https://t.me/moodsongsmusic" passHref>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center", // Center content horizontally
                fontSize: "18px",
                color: "red",
                marginTop: "20px",
                transition: "color 0.3s",
                cursor: "pointer",
              }}
            >
              <FaTelegram
                style={{
                  fontSize: "35px",
                  transition: "color 0.3s, transform 0.3s",
                  marginRight: "10px", // Space between icon and text
                }}
              />
              <span
                style={{
                  fontSize: "18px",
                  color: "#333",
                  textDecoration: "none",
                  transition: "color 0.3s",
                }}
              >
                Join Telegram
              </span>
            </div>
          </Link>
        </strong>
      </p>
    </div>
  );
};

export default Contact;
