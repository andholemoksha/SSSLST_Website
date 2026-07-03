// Samithi Connect Programme (SCP) content.
// Sections, each with a list of activity cards. Clicking a card opens that
// activity's page (placeholder for now).
// Detail content will come from Django later
// (see AGENT.md: Component -> Hook -> Service -> API).

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

// User-facing text for the Samithi Connect feature (keep copy out of components).
export const samithiContent = {
  emptyMessage: "Samithi Connect activities aren't available yet. Check back soon.",
  activityPage: {
    backLabel: "Back to Samithi Connect",
    description: (section) => `Samithi Connect · ${section}`,
    comingSoon: (name) => `${name} content is coming soon.`,
  },
};
