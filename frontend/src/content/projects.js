// Static taxonomy for the Projects hub (the 8 wings).
// Images are local assets for now; project lists per category will come from
// Django later (see AGENT.md: Component -> Hook -> Service -> API).

import spiritualWing from "@/assets/categories/spiritual-wing.jpg";
import serviceWing from "@/assets/categories/service-wing.jpeg";
import educationWing from "@/assets/categories/education-wing.jpg";
import youthWing from "@/assets/categories/youth-wing.jpg";
import medicalWing from "@/assets/categories/medical-healthcare.jpg";
import ruralWing from "@/assets/categories/rural-development.jpg";
import environmentWing from "@/assets/categories/environment.jpeg";
import otherWing from "@/assets/categories/other.jpeg";

export const projectCategories = [
  {
    slug: "spiritual-wing",
    title: "Spiritual Wing",
    description: "Bhajans, satsangs, and devotional service initiatives.",
    image: spiritualWing,
    count: 12,
  },
  {
    slug: "service-wing",
    title: "Service Wing",
    description: "Grama seva, Narayana seva, and community service drives.",
    image: serviceWing,
    count: 20,
  },
  {
    slug: "education-wing",
    title: "Education Wing",
    description: "Bal Vikas, tuitions, and value-education programmes.",
    image: educationWing,
    count: 15,
  },
  {
    slug: "youth-wing",
    title: "Youth Wing",
    description: "Youth-led leadership drives and awareness camps.",
    image: youthWing,
    count: 18,
  },
  {
    slug: "medical-healthcare",
    title: "Medical / Healthcare",
    description: "Medical camps, blood donation, and health awareness.",
    image: medicalWing,
    count: 9,
  },
  {
    slug: "rural-development",
    title: "Rural Development",
    description: "Village upliftment, sanitation, and water projects.",
    image: ruralWing,
    count: 11,
  },
  {
    slug: "environment",
    title: "Environment",
    description: "Tree plantation, clean-up, and sustainability efforts.",
    image: environmentWing,
    count: 7,
  },
  {
    slug: "other",
    title: "Other",
    description: "Special and cross-category leadership initiatives.",
    image: otherWing,
    count: 5,
  },
];

// User-facing text for the Projects feature (keep copy out of components).
export const projectsContent = {
  countNoun: "Projects",
  emptyMessage: "Project categories aren't available yet. Check back soon.",
  categoryPage: {
    backLabel: "Back to Projects",
    comingSoon: (title) => `${title} projects are coming soon.`,
  },
};
