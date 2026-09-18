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
      "Samithi Connect is an integral part of the SSSLST journey, encouraging participants to engage regularly with the nearest Sri Sathya Sai Seva Samithi. \nIt provides an opportunity to experience the spirit of seva, participate in Samithi activities and connect the learnings from the programme with practical service.",
    quote:
      "Young hearts. Meaningful service. Lasting change.",
    backgroundImage: "/assets/pictures/hero-background.jpeg",
    accentImage: "/assets/satsang/hero/satsang-hero.jpg",
  },

  emptyMessage:
    "Samithi Connect activities aren't available yet. Check back soon.",

  activityPage: {
    backLabel: "Back to Samithi Connect",
    description: (section) => `Samithi Connect · ${section}`,
    comingSoon: (name) => `${name} content is coming soon.`,
  },
};