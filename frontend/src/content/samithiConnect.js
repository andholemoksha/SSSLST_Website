// User-facing text for the Samithi Connect feature
export const samithiSections = [
  {
    slug: "spiritual",
    title: "Spiritual",
    activities: [
      {
        slug: "bhajan",
        name: "Bhajan",
        image: "/assets/samithi-connect/spiritual/bhajan.jpg",
      },
      {
        slug: "nagar-sankeertan",
        name: "Nagar Sankeertan",
        image: "/assets/samithi-connect/spiritual/nagar-sankeertan.jpg",
      },
      {
        slug: "vedam",
        name: "Vedam",
        image: "/assets/samithi-connect/spiritual/vedam.jpeg",
      },
      {
        slug: "parayanam",
        name: "Any Parayanam",
        image: "/assets/samithi-connect/spiritual/parayanam.jpeg",
      },
      {
        slug: "meditation",
        name: "Meditation",
        image: "/assets/samithi-connect/spiritual/meditation.jpg",
      },
      {
        slug: "other-spiritual-activity",
        name: "Other Spiritual Activity",
        image:
          "/assets/samithi-connect/spiritual/other-spiritual-activity.jpg",
      },
    ],
  },

  {
    slug: "education",
    title: "Education",
    activities: [
      {
        slug: "sri-sathya-sai-balvikas",
        name: "Sri Sathya Sai Balvikas",
        image:
          "/assets/samithi-connect/education/sri-sathya-sai-balvikas.jpg",
        imagePosition: "center top",
      },
      {
        slug: "parenting",
        name: "Parenting",
        image: "/assets/samithi-connect/education/parenting.jpg",
      },
      {
        slug: "vidya-jyoti",
        name: "Vidya Jyoti",
        image: "/assets/samithi-connect/education/vidya-jyoti.jpg",
      },
      {
        slug: "other-educational-initiatives",
        name: "Other Educational Initiatives",
        image:
          "/assets/samithi-connect/education/other-educational-initiatives.jpeg",
        imagePosition: "50% 35%",
      },
    ],
  },

  {
    slug: "service",
    title: "Service",
    activities: [
      {
        slug: "narayan-seva",
        name: "Narayan Seva",
        image: "/assets/samithi-connect/service/narayan-seva.jpg",
      },
      {
        slug: "medical-camps-liquid-love",
        name: "Medical Camps / Liquid Love",
        image:
          "/assets/samithi-connect/service/medical-camps-liquid-love.jpg",
      },
      {
        slug: "disaster-management",
        name: "Disaster Management",
        image: "/assets/samithi-connect/service/disaster-management.jpg",
      },
      {
        slug: "village-seva",
        name: "Village Seva",
        image: "/assets/samithi-connect/service/village-seva.jpg",
        imagePosition: "60% 15%",
      },
      {
        slug: "skill-development",
        name: "Skill Development",
        image: "/assets/samithi-connect/service/skill-development.jpg",
      },
      {
        slug: "other-service-activity",
        name: "Other Service Activity",
        image:
          "/assets/samithi-connect/service/other-service-activity.jpg",
      },
    ],
  },

  {
    slug: "reflections",
    title: "Reflections",
    activities: [
      {
        slug: "text",
        name: "Text",
        image: "/assets/samithi-connect/reflections/text.jpg",
        imagePosition: "60% 5%",

      },
      {
        slug: "video",
        name: "Video",
        image: "/assets/samithi-connect/reflections/video.jpg",
        imagePosition: "60% 15%",
      },
    ],
  },
];

export const samithiContent = {
  hero: {
    title: "Samithi Connect",
    subtitle:
      "A 3 month initiative designed to deepen the connection between youth participants and the organisation through active service and local engagement at the grassroots level.",
    quote: "Young hearts. Meaningful service. Lasting change.",
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