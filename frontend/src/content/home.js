import curriculumImage from "@/assets/explore/curriculum1.jpg";
import samithiConnectImage from "@/assets/explore/samithiconnect.jpeg";
import dhyanaVahiniImage from "@/assets/explore/jyothimeditation.jpg";
import projectsImage from "@/assets/explore/projects.jpg";
import photoGalleryImage from "@/assets/explore/photogallery.jpg";
import heroMobileImage from "@/assets/home/hero.jpg";

export const home = {
      hero: {
        eyebrow: "The Flagship Programme of the Sri Sathya Sai Seva Organisations, India",
        heading: "Sri Sathya Sai Leadership Through ",
        headingHighlight: "Self Transformation",
        supporting: "In association with the Sri Sathya Sai Institute of Higher Learning, Prasanthi Nilayam",
        quote: {
          text: "I want you to be leaders to protect the world. Leaders like lions, self-reliant, courageous, majestic, and just. The lion is the king of animals and I want you to be king among men.",
          attribution: "Bhagawan Sri Sathya Sai Baba - Summer Course, 1992",
        },
        ctaPrimary: { label: "Explore", to: "/programme/overview" },
        ctaSecondary: null,
        youtube: { url: "https://www.youtube.com/watch?v=WDPPI92cFsw", label: "Watch Video" },
        publications: {
            title: "Our Publications",
            items: [
                {
                    label: "Sri Sathya Sai Netritvam",
                    type: "Magazine",
                    summary: "Inspiring leadership stories, insights and reflections from our SSSLST community.",
                    cta: "Read Latest Issue",
                    image: "/assets/publications/netritvam-cover.png",
                    to: "/netritvam",
                    featured: true,
                },
                {
                    label: "Sri Sathya Sai Prerana",
                    type: "Yearbook",
                    summary: "A chronicle of transformation capturing the experiences and reflections of every batch of participants.",
                    cta: "Explore Editions",
                    image: "/assets/publications/prerana-cover.jpg",
                    to: "/prerna",
                },
                {
                    label: "Sri Sathya Sai Monthly",
                    type: "Newsletter",
                    summary: "Updates, events and highlights from the SSSLST community.",
                    cta: "View This Month",
                    image: "/assets/publications/newsletter-cover.png",
                    to: "/newsletter",
                },
            ],
        },
        features: [
            { icon: "calendar", label: "Weekly Sessions" },
            { icon: "lotus", label: "Self Transformation" },
            { icon: "community", label: "Community Learning" },
            { icon: "book", label: "Structured Curriculum" },
            { icon: "graduation", label: "UGC Approved" },
            { icon: "certificate", label: "Certificate Upon Completion" },
        ],
        associations: [
            {
                name: "SSSIHL",
                description: "Sri Sathya Sai Institute of Higher Learning",
            },
            {
                name: "SSSSO",
                description: "Sri Sathya Sai Seva Organisations",
            },
        ],
        ugc: {
            title: "UGC Approved",
            subtitle: "University Grants Commission Approved Course",
        },
        scrollLabel: "Scroll to explore",
        backgroundMedia: {
            src: "https://hackend.in/bgvideo.mp4",
            poster: null,
            fallbackSrc: "http://hackend.in/bgvideo.mp4",
            mobileImage: heroMobileImage,
        },
    },
    highlights: [
        {
            title: "Self-awareness first",
            description:
                "Every lasting leadership skill is built on an honest understanding of yourself.",
        },
        {
            title: "Practice, not theory",
            description:
                "Our course is built around real exercises and reflection, not lectures alone.",
        },
        {
            title: "A community of peers",
            description:
                "Grow alongside a cohort of people who are just as committed to change as you are.",
        },
    ],
    programmeNumbers: [
        {
            value: 2600,
            label: "Graduates",
            icon: "graduation",
            showPlus: true,
        },
        {
            value: 31,
            label: "States",
            icon: "location",
            showPlus: false,
        },
        {
            value: 7,
            label: "Batches",
            icon: "book",
            showPlus: false,
        },
        {
            // Fallback shown before the live count loads (or if the stats API
            // is unreachable). The real value comes from /api/home/stats/.
            value: 500,
            label: "Projects",
            icon: "projects",
            showPlus: true,
        },
        {
            value: 258,
            label: "Current Participants",
            icon: "users",
            showPlus: false,
        },
    ],
    exploreSections: [
        {
            title: "Overview",
            image: curriculumImage,
            link: "/programme/overview",
        },
        {
            title: "Samithi Connect",
            image: samithiConnectImage,
            link: "/programme/samithi-connect",
        },
        {
            title: "Dhyana Vahini",
            image: dhyanaVahiniImage,
            link: "/programme/dhyana-vahini",
        },
        {
            title: "Projects",
            image: projectsImage,
            link: "/projects",
        },
        {
            title: "Photo Gallery",
            image: photoGalleryImage,
            link: "/gallery",
        },
    ],

};
