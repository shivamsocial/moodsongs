export default function sitemap() {
  const moods = ["Romantic", "Happy", "Sad", "Motivational", "Chill", "Party"];

  const urls = moods.map((mood) => ({
    url: `https://www.moodsongs.net/video/${mood}?videoIndex=0`,
    lastModified: new Date(),
    changeFrequency: "daily",
    priority: 0.8,
  }));

  // Add homepage URL
  urls.unshift({
    url: "https://www.moodsongs.net/",
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 1.0,
  });

  return urls;
}
