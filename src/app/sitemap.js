import fs from "fs";
import path from "path";

export default function sitemap() {
  // Directory path to translations
  const localesPath = path.join(process.cwd(), "public", "locales");

  // Get all supported locales (subfolders in the 'locales' directory)
  const locales = fs.readdirSync(localesPath);

  // Comprehensive list of moods
  const moods = [
    { emoji: "😀", key: "happy" },
    { emoji: "👍", key: "good" },
    { emoji: "💘", key: "romantic" },
    { emoji: "😢", key: "sad" },
    { emoji: "😌", key: "relax_chill" },
    { emoji: "📻", key: "lofi" },
    { emoji: "🥳", key: "party" },
    { emoji: "✈️", key: "travel" },
    { emoji: "🚗", key: "driving" },
    { emoji: "👶", key: "kids" },
    { emoji: "🌟", key: "motivational" },
    { emoji: "🎸", key: "rock" },
    { emoji: "💪", key: "rap" },
    { emoji: "⚡", key: "edm" },
    { emoji: "🤘", key: "hip_hop" },
    { emoji: "🙏", key: "folk" },
    { emoji: "🕉️✝️", key: "devotional" },
    { emoji: "😊", key: "acoustic" },
    { emoji: "🎷", key: "jazz" },
    { emoji: "🧘‍♂️", key: "meditation" },
  ];

  const urls = [];

  locales.forEach((locale) => {
    // Path to the current locale's common.json
    const translationFilePath = path.join(localesPath, locale, "common.json");

    // Read and parse the translation file
    const translations = JSON.parse(
      fs.readFileSync(translationFilePath, "utf-8")
    );

    moods.forEach((mood) => {
      const translatedName = translations[mood.key] || mood.key; // Fallback to key if no translation exists
      const moodSlug = translatedName.toLowerCase().replace(/\s+/g, "-"); // Create slug-friendly URL

      urls.push({
        url: `https://www.moodsongs.net/${locale}/${moodSlug}`, // Dynamic mood page route
        lastModified: new Date().toISOString(),
        changeFrequency: "daily",
        priority: 0.9,
      });
    });

    // Add localized homepage for each locale
    urls.push({
      url: `https://www.moodsongs.net/${locale}`, // Homepage route for each locale
      lastModified: new Date().toISOString(),
      changeFrequency: "daily",
      priority: 1.0,
    });
  });

  return urls;
}
