// User-facing text for the Samithi Connect feature
import bhajanImage from "@/assets/samithi-connect/spiritual/bhajan.jpg";
import nagarSankeertanImage from "@/assets/samithi-connect/spiritual/nagar-sankeertan.jpg";
import vedamImage from "@/assets/samithi-connect/spiritual/vedam.jpeg";
import parayanamImage from "@/assets/samithi-connect/spiritual/parayanam.jpeg";
import meditationImage from "@/assets/samithi-connect/spiritual/meditation.jpg";
import otherSpiritualActivityImage from "@/assets/samithi-connect/spiritual/other-spiritual-activity.jpg";
import sriSathyaSaiBalvikasImage from "@/assets/samithi-connect/education/sri-sathya-sai-balvikas.jpg";
import parentingImage from "@/assets/samithi-connect/education/parenting.jpg";
import vidyaJyotiImage from "@/assets/samithi-connect/education/vidya-jyoti.jpg";
import otherEducationalInitiativesImage from "@/assets/samithi-connect/education/other-educational-initiatives.jpeg";
import narayanSevaImage from "@/assets/samithi-connect/service/narayan-seva.jpg";
import medicalCampsLiquidLoveImage from "@/assets/samithi-connect/service/medical-camps-liquid-love.jpg";
import disasterManagementImage from "@/assets/samithi-connect/service/disaster-management.jpg";
import villageSevaImage from "@/assets/samithi-connect/service/village-seva.jpg";
import skillDevelopmentImage from "@/assets/samithi-connect/service/skill-development.jpg";
import otherServiceActivityImage from "@/assets/samithi-connect/service/other-service-activity.jpg";
import textImage from "@/assets/samithi-connect/reflections/text.jpg";
import videoImage from "@/assets/samithi-connect/reflections/video.jpg";

export const samithiSections = [
  {
    slug: "spiritual",
    title: "Spiritual",
    activities: [
      {
        slug: "bhajan",
        name: "Bhajan",
        image: bhajanImage,
      },
      {
        slug: "nagar-sankeertan",
        name: "Nagar Sankeertan",
        image: nagarSankeertanImage,
      },
      {
        slug: "vedam",
        name: "Vedam",
        image: vedamImage,
      },
      {
        slug: "parayanam",
        name: "Any Parayanam",
        image: parayanamImage,
      },
      {
        slug: "meditation",
        name: "Meditation",
        image: meditationImage,
      },
      {
        slug: "other-spiritual-activity",
        name: "Other Spiritual Activity",
        image: otherSpiritualActivityImage,
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
        image: sriSathyaSaiBalvikasImage,
        imagePosition: "center top",
      },
      {
        slug: "parenting",
        name: "Parenting",
        image: parentingImage,
      },
      {
        slug: "vidya-jyoti",
        name: "Vidya Jyoti",
        image: vidyaJyotiImage,
      },
      {
        slug: "other-educational-initiatives",
        name: "Other Educational Initiatives",
        image: otherEducationalInitiativesImage,
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
        image: narayanSevaImage,
      },
      {
        slug: "medical-camps-liquid-love",
        name: "Medical Camps / Liquid Love",
        image: medicalCampsLiquidLoveImage,
      },
      {
        slug: "disaster-management",
        name: "Disaster Management",
        image: disasterManagementImage,
      },
      {
        slug: "village-seva",
        name: "Village Seva",
        image: villageSevaImage,
        imagePosition: "60% 15%",
      },
      {
        slug: "skill-development",
        name: "Skill Development",
        image: skillDevelopmentImage,
      },
      {
        slug: "other-service-activity",
        name: "Other Service Activity",
        image: otherServiceActivityImage,
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
        image: textImage,
        imagePosition: "60% 5%",

      },
      {
        slug: "video",
        name: "Video",
        image: videoImage,
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