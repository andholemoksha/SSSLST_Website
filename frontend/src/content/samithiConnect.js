// User-facing text for the Samithi Connect feature
export const samithiSections = [
  {
    slug: "spiritual",
    title: "Spiritual",
    activities: [
      { slug: "bhajan", name: "Bhajan" },
      { slug: "nagar-sankeertan", name: "Nagar Sankeertan" },
      { slug: "vedam", name: "Vedam" },
      { slug: "parayanam", name: "Any Parayanam" },
      { slug: "meditation", name: "Meditation" },
      { slug: "other-spiritual-activity", name: "Other Spiritual Activity" },
    ],
  },
  {
    slug: "education",
    title: "Education",
    activities: [
      { slug: "sri-sathya-sai-balvikas", name: "Sri Sathya Sai Balvikas" },
      { slug: "parenting", name: "Parenting" },
      { slug: "vidya-jyoti", name: "Vidya Jyoti" },
      { slug: "other-educational-initiatives", name: "Other Educational Initiatives" },
    ],
  },
  {
    slug: "service",
    title: "Service",
    activities: [
      { slug: "narayan-seva", name: "Narayan Seva" },
      { slug: "medical-camps-liquid-love", name: "Medical Camps / Liquid Love" },
      { slug: "disaster-management", name: "Disaster Management" },
      { slug: "village-seva", name: "Village Seva" },
      { slug: "skill-development", name: "Skill Development" },
      { slug: "other-service-activity", name: "Other Service Activity" },
    ],
  },
  {
    slug: "reflections",
    title: "Reflections",
    activities: [
      { slug: "text", name: "Text" },
      { slug: "video", name: "Video" },
    ],
  },
];

export const samithiContent = {
  hero: {
    title: "Samithi Connect",
    subtitle:
      "A 3 month initiative designed to deepen the connection between youth participants and the organisation through active service and local engagement at the grassroots level.",
    quote:
      "Young hearts. Meaningful service. Lasting change.",
    backgroundImage: "/assets/satsang/hero/satsang-hero.jpg",
    accentImage: "/assets/satsang/hero/satsang-hero.jpg",
    overlay: "bg-gradient-to-r from-hero-bg/80 via-hero-bg/55 to-hero-bg/25",
  },

  emptyMessage:
    "Samithi Connect activities aren't available yet. Check back soon.",

  activityPage: {
    backLabel: "Back to Samithi Connect",
    description: (section) => `Samithi Connect · ${section}`,
    comingSoon: (name) => `${name} content is coming soon.`,
  },
};