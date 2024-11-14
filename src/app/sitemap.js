export default function sitemap() {
  const moods = [
    { emoji: "😀", name: "Happy" },
    { emoji: "💘", name: "Romantic" },
    { emoji: "⚡", name: "EDM" },
    { emoji: "🤘", name: "Hip-Hop" },
    { emoji: "🌟", name: "Motivational" },
    { emoji: "💪", name: "Rap" },
    { emoji: "🎸", name: "Rock" },
    { emoji: "🥳", name: "Party" },
    { emoji: "🎷", name: "Jazz" },
    { emoji: "😊", name: "Acoustic" },
    { emoji: "🙏", name: "Folk" },
    { emoji: "🕉️✝️", name: "Devotional" },
    { emoji: "🧘‍♂️", name: "Meditation" },
    { emoji: "👶", name: "Children" },
    { emoji: "😌", name: "Relax Chill" },
    { emoji: "📻", name: "Lofi" },
  ];

  const urls = moods.map((mood) => ({
    // Remove the query parameters to clean the URL
    url: `https://www.moodsongs.net/video/${mood.name}`,
    lastModified: new Date(),
    changeFrequency: "daily",
    priority: 0.8,
  }));

  // Add homepage URL
  urls.unshift({
    url: "https://www.moodsongs.net/",
    lastModified: new Date(),
    changeFrequency: "daily",
    priority: 1.0,
  });

  return urls;
}
