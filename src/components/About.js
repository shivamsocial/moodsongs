import Image from "next/image";
import Link from "next/link";
import { FaTelegram, FaLinkedin, FaTwitter, FaEnvelope } from "react-icons/fa"; // Importing social media icons
import Navbar from "../components/Navbar";

const AboutPage = () => {
  return (
    <>
      <Navbar />
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "flex-start",
          justifyContent: "space-between",
          padding: "40px",
          backgroundColor: "inherit",
          flexWrap: "wrap", // Allows wrapping on smaller screens
        }}
      >
        {/* Main Content */}
        <div
          style={{
            flex: 1,
            padding: "20px",
            maxWidth: "700px",
            minWidth: "300px", // Prevents the content from becoming too narrow
          }}
        >
          <h1 style={{ fontSize: "36px", color: "white", fontWeight: "bold" }}>
            Welcome to Mood Songs
          </h1>

          <h2
            style={{ fontSize: "28px", color: "#4CAF50", marginBottom: "20px" }}
          >
            Our Story
          </h2>
          <p style={{ fontSize: "18px", lineHeight: "1.6" }}>
            Mood Songs was developed on a simple idea: to match songs based on
            mood and genre. As a passionate developer, I, Shivam Upadhyay,
            created a platform that goes beyond playlists to offer mood and
            genre-specific YouTube playlists.
          </p>
          <p style={{ fontSize: "18px", lineHeight: "1.6" }}>
            My love for music has driven me to create a space where people can
            find the perfect song for any moment.
          </p>

          <h2 style={{ fontSize: "28px", color: "#4CAF50", marginTop: "40px" }}>
            Our Mission
          </h2>
          <p style={{ fontSize: "18px", lineHeight: "1.6" }}>
            At Mood Songs, our mission is to make music discovery easier and
            more personal. With just one click, anyone can access a playlist
            that fits their mood. We cover over 20 moods and 10 languages,
            ensuring there is always a song that matches your emotional state.
          </p>
          <ul style={{ fontSize: "18px", marginLeft: "20px" }}>
            <li>
              <strong>Purpose:</strong> Provide an intuitive platform for mood
              and genre-based music discovery.
            </li>
            <li>
              <strong>Values:</strong> Simplicity, personalization, and a deep
              love for music.
            </li>
            <li>
              <strong>Goals:</strong> To offer personalized song recommendations
              based on mood and genre.
            </li>
          </ul>

          <h2 style={{ fontSize: "28px", color: "#4CAF50", marginTop: "40px" }}>
            Why Mood Songs?
          </h2>
          <ul style={{ fontSize: "18px", marginLeft: "20px" }}>
            <li>
              <strong>Unique:</strong> Every song and playlist is handpicked
              with research in all 10 languages.
            </li>
            <li>
              <strong>Global and Local:</strong> Mood Songs integrates with 10
              languages, making music recommendations accessible worldwide.
            </li>
          </ul>

          <h2 style={{ fontSize: "28px", color: "#4CAF50", marginTop: "40px" }}>
            Social Proof
          </h2>
          <p style={{ fontSize: "18px", lineHeight: "1.6" }}>
            Mood Songs has resonated with music enthusiasts across the internet.
            Here’s what some of our users have said on social media:
          </p>
          <blockquote
            style={{
              fontSize: "20px",
              fontStyle: "italic",
              margin: "20px 0",
              color: "yellow",
              borderLeft: "4px solid #4CAF50",
              paddingLeft: "20px",
            }}
          >
            “Mood Songs is my daily go-to for finding songs that lift me up or
            calm me down. It’s like having a musical friend who gets me.” –
            Sarah L.
          </blockquote>
          <blockquote
            style={{
              fontSize: "20px",
              fontStyle: "italic",
              margin: "20px 0",
              color: "yellow",
              borderLeft: "4px solid #4CAF50",
              paddingLeft: "20px",
            }}
          >
            “Finally, a platform that doesn’t just dump random playlists but
            actually feels like it knows my vibe.” – Ankit K.
          </blockquote>
        </div>

        {/* Sidebar */}
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
            Join the Mood Songs Community
          </h2>
          <p
            style={{
              fontSize: "18px",
              lineHeight: "1.6",
              marginBottom: "20px",
            }}
          >
            We’re not just a website; we’re a community of music lovers. Join us
            on this journey.
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
      </div>
    </>
  );
};

export default AboutPage;
