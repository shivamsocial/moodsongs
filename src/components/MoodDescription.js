import React from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";

const MoodDescription = () => {
  // Define the mood descriptions using the t function
  const t = useTranslations(); // Use the `t` function from next-intl

  const moodDescriptions = [
    {
      emoji: "👍",
      name: "good",
      description: "good_mood",
    },
    {
      emoji: "💘",
      name: "romantic",
      description: "romantic_mood",
    },
    {
      emoji: "😢",
      name: "sad",
      description: "sad_mood",
    },
    {
      emoji: "😌",
      name: "relax_chill",
      description: "relax_chill_mood",
    },
    {
      emoji: "📻",
      name: "lofi",
      description: "lofi_mood",
    },
    {
      emoji: "🥳",
      name: "party",
      description: "party_mood",
    },
    {
      emoji: "✈️",
      name: "travel",
      description: "travel_mood",
    },
    {
      emoji: "🚗",
      name: "driving",
      description: "driving_mood",
    },
    {
      emoji: "👶",
      name: "kids",
      description: "kids_mood",
    },
    {
      emoji: "🌟",
      name: "motivational",
      description: "motivational_mood",
    },
    {
      emoji: "🎸",
      name: "rock",
      description: "rock_mood",
    },
    {
      emoji: "💪",
      name: "rap",
      description: "rap_mood",
    },
    {
      emoji: "⚡",
      name: "edm",
      description: "edm_mood",
    },
    {
      emoji: "🤘",
      name: "hiphop",
      description: "hiphop_mood",
    },
    {
      emoji: "🙏",
      name: "folk",
      description: "folk_mood",
    },
    {
      emoji: "🕉️✝️",
      name: "devotional",
      description: "devotional_mood",
    },
    {
      emoji: "😊",
      name: "acoustic",
      description: "acoustic_mood",
    },
    {
      emoji: "🎷",
      name: "jazz",
      description: "jazz_mood",
    },
    {
      emoji: "🧘‍♂️",
      name: "meditation",
      description: "meditation_mood",
    },
  ];

  return (
    <div style={{ padding: "20px" }}>
      <h1
        style={{
          fontSize: "2.5rem",
          marginBottom: "20px",
          textAlign: "center",
        }}
      >
        {t("explore_our_moods")}
      </h1>
      <img
        src="/images/land3.jpg"
        alt="Illustration of music's impact on the brain"
        width={1000}
        height={450}
        style={{ display: "block", margin: "0 auto" }}
      />

      {moodDescriptions.map(({ emoji, name, description }) => (
        <div key={name} style={{ marginBottom: "30px" }}>
          <h2
            style={{
              fontSize: "1.8rem",
              display: "flex",
              alignItems: "center",
            }}
          >
            <span style={{ marginRight: "10px" }}>{emoji}</span>
            {t(name)}
          </h2>
          <p
            style={{ fontSize: "1.2rem", lineHeight: "1.6", marginTop: "10px" }}
          >
            {t(description)}
          </p>
        </div>
      ))}
    </div>
  );
};

export default MoodDescription;
