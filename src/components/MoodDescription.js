import React from "react";
import { useTranslations } from "next-intl";

const MoodDescription = () => {
  // Define the mood descriptions using the t function
  const t = useTranslations(); // Use the `t` function from next-intl

  const moodDescriptions = [
    { emoji: "👍", name: "good", description: "good_mood" },
    { emoji: "💘", name: "romantic", description: "romantic_mood" },
    { emoji: "😢", name: "sad", description: "sad_mood" },
    { emoji: "😌", name: "relax_chill", description: "relax_chill_mood" },
    { emoji: "📻", name: "lofi", description: "lofi_mood" },
    { emoji: "🥳", name: "party", description: "party_mood" },
    { emoji: "✈️", name: "travel", description: "travel_mood" },
    { emoji: "🚗", name: "driving", description: "driving_mood" },
    { emoji: "👶", name: "kids", description: "kids_mood" },
    { emoji: "🌟", name: "motivational", description: "motivational_mood" },
    { emoji: "🎸", name: "rock", description: "rock_mood" },
    { emoji: "💪", name: "rap", description: "rap_mood" },
    { emoji: "⚡", name: "edm", description: "edm_mood" },
    { emoji: "🤘", name: "hiphop", description: "hiphop_mood" },
    { emoji: "🙏", name: "folk", description: "folk_mood" },
    { emoji: "🕉️✝️", name: "devotional", description: "devotional_mood" },
    { emoji: "😊", name: "acoustic", description: "acoustic_mood" },
    { emoji: "🎷", name: "jazz", description: "jazz_mood" },
    { emoji: "🧘‍♂️", name: "meditation", description: "meditation_mood" },
  ];

  return (
    <div style={{ padding: "20px" }}>
      <h1
        style={{
          fontSize: "2.5rem",
          marginBottom: "20px",
          textAlign: "center",
          color: "white",
        }}
      >
        {t("explore_our_moods")}
      </h1>

      {/* Responsive image with img tag */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center", // Center the image
          textAlign: "center", // Center the image caption
          padding: "20px",
        }}
      >
        <img
          src="/images/land3.jpg"
          alt="Illustration of music's impact on the brain"
          style={{
            width: "100%", // Ensure it is responsive and takes full width
            height: "auto", // Maintain aspect ratio
            objectFit: "cover", // This ensures the image covers the area without stretching
          }}
        />
      </div>

      {/* Mapping through moods */}
      {moodDescriptions.map(({ emoji, name, description }) => (
        <div key={name} style={{ marginBottom: "30px" }}>
          <h2
            style={{
              fontSize: "1.8rem",
              display: "flex",
              alignItems: "center",
              color: "white", // Make sure long words break nicely
              flexWrap: "wrap", // Ensure the emoji and text wrap on smaller screens
            }}
          >
            <span style={{ marginRight: "10px" }}>{emoji}</span>
            {t(name)}
          </h2>
          <p
            style={{
              fontSize: "1.2rem",
              lineHeight: "1.6",
              marginTop: "10px",
              wordBreak: "break-word",
              color: "white", // Make sure long words break nicely
            }}
          >
            {t(description)}
          </p>
        </div>
      ))}
    </div>
  );
};

export default MoodDescription;
