var projectData = {
    title: "Building Entertainment Discovery That Converts",
    subtitle: "Increasing Discovery-led Booking Conversion from 18% → 32%",
    hook: "Helping users move from endless browsing to confident entertainment decisions.",
    description: "A Product Improvement Case Study focused on understanding why BookMyShow users browse without booking and designing solutions to reduce decision fatigue through personalized discovery and smarter comparison.",
    date: "June 2026",
    image: "assets/projects/bookmyshow/cover.png", // Path to project banner image (e.g., assets/projects/bookmyshow/cover.png)
    tags: ["Product Discovery", "User Research", "Conversion Optimization", "RICE Framework", "UX Strategy"],

    overview: "Users often enter BookMyShow without a fixed entertainment choice, browse multiple listings, and struggle to decide what to book. This case study explores the decision-making gap and proposes product solutions that make discovery more relevant and booking decisions more confident.",

    targetUsers: [
        {
            name: "Inspiration Seeker",
            description: "Users who open the platform without a specific movie or entertainment option in mind and need inspiration."
        },
        {
            name: "Explorer at Risk",
            description: "Users who browse multiple options but struggle to move from exploration to a final decision."
        },
        {
            name: "Value Maximizer",
            description: "Users who carefully compare options, especially around budget and perceived value."
        },
        {
            name: "Social Planner",
            description: "Users planning entertainment around an occasion or social activity."
        }
    ],

    userProblems: [
        "Users face too many choices when they do not already know what they want to watch.",
        "Users experience decision fatigue while browsing multiple entertainment options.",
        "Recommendations are not sufficiently personalized to the user's intent or occasion.",
        "Users lack a clear in-app way to compare shortlisted options.",
        "Users lack enough confidence-building signals before making a booking."
    ],

    jobsToBeDone: [
        "Help me discover something relevant when I do not already know what I want to watch.",
        "Help me narrow down my choices without comparing everything myself.",
        "Help me understand which option fits my budget and preferences.",
        "Help me compare options quickly before making a booking decision.",
        "Help me feel confident that I am choosing the right option."
    ],

    research: [
        "20-response user survey to understand browsing, decision-making, and booking behaviour.",
        "Competitor analysis to identify patterns around discovery and decision support.",
        "App review analysis to identify recurring user pain points and expectations.",
        "Secondary research to support the understanding of entertainment discovery and decision-making."
    ],

    researchInsights: [
        "85% of respondents browse but do not immediately book.",
        "70% identified budget as the biggest factor when making a decision.",
        "45% reported spending most of their time deciding what to choose.",
        "Users do not need more options. They need more confidence to choose.",
        "Decision paralysis, rather than logistics, was identified as the primary barrier to conversion."
    ],

    problemPrioritization: {
        title: "Prioritize Problems",
        description: "The largest funnel drop-off occurred between comparison and booking, highlighting the need for stronger decision support.",
        problemStatement: "How might we help users move from browsing to a confident booking decision?"
    },

    opportunity: [
        "AI Personalization",
        "Occasion-Based Discovery",
        "Smart Compare",
        "Better Recommendations",
        "Decision Support"
    ],

    ideation: [
        "AI Match Score",
        "AI Occasion-Based Collections",
        "Plans for You",
        "Smart Compare",
        "Taste-Based Recommendations",
        "AI Personalization Engine",
        "Better Recommendation Signals",
        "Decision Support Cards",
        "Budget-Based Discovery",
        "Social Planning Recommendations"
    ],

    solutionPrioritization: {
        framework: "RICE Prioritization",

        selectedSolutions: [
            {
                name: "Plans for You",
                score: "31.25",
                reason: "Directly addresses the discovery and decision-making problem while providing a feasible MVP direction."
            },
            {
                name: "Smart Compare",
                score: "25.00",
                reason: "Addresses the comparison-to-booking drop-off by helping users evaluate options in one place."
            }
        ]
    },

    userFlow: {
        before: [
            "Open BookMyShow",
            "Browse multiple options",
            "Open individual listings",
            "Compare information manually",
            "Feel uncertain",
            "Leave or delay booking"
        ],

        after: [
            "Open BookMyShow",
            "Discover personalized Plans for You",
            "Explore relevant options",
            "Compare shortlisted choices using Smart Compare",
            "Gain confidence",
            "Complete booking"
        ]
    },

    solutions: [
        {
            title: "Plans for You",
            description: "A personalized discovery experience designed to help users find relevant entertainment without needing to know exactly what they want beforehand.",
            problemSolved: "Users struggle with discovery when they enter the platform without a fixed entertainment choice.",
            productThinking: [
                "Reduce irrelevant choices.",
                "Make discovery more personalized.",
                "Support users looking for inspiration.",
                "Connect recommendations with user intent and occasions."
            ],
            image: ""
        },

        {
            title: "Smart Compare",
            description: "A structured comparison experience designed to help users evaluate shortlisted entertainment options before making a booking decision.",
            problemSolved: "Users spend time comparing options manually and lack an in-app decision-support experience.",
            productThinking: [
                "Bring important comparison factors into one place.",
                "Reduce repetitive switching between listings.",
                "Make differences between options easier to understand.",
                "Increase confidence before booking."
            ],
            image: ""
        }
    ],

    uxAndPrototype: {
        description: "The proposed experience was translated into user flows and product interface concepts focused on reducing decision fatigue and improving booking confidence.",

        gallery: [
            // "projects/bookmyshow/images/screen1.png",
            // "projects/bookmyshow/images/screen2.png",
            // "projects/bookmyshow/images/screen3.png"
        ]
    },

    successMetrics: [
        {
            value: "18% → 32%",
            label: "Target discovery-led booking conversion"
        },
        {
            value: "Primary",
            label: "Discovery-to-booking conversion"
        },
        {
            value: "Secondary",
            label: "Time spent deciding"
        },
        {
            value: "Secondary",
            label: "Engagement with personalized discovery"
        },
        {
            value: "Secondary",
            label: "Usage of comparison experience"
        }
    ],

    learnings: [
        "More choices do not always create a better discovery experience. Users often need help narrowing their choices.",
        "The biggest product opportunity can exist between two existing steps rather than in adding another feature.",
        "Research helped identify decision fatigue as a more important problem than simply improving discovery volume.",
        "Personalization becomes more useful when it is connected to a clear user intent or decision.",
        "Good product solutions should reduce uncertainty, not just add functionality."
    ],

    // Optional: add image paths for the interactive carousel/lightbox
    gallery: [
        // "projects/bookmyshow/images/screen1.png",
        // "projects/bookmyshow/images/screen2.png"
    ],

    // Live demo link
    liveDemo: "https://bookmyshowatc1.netlify.app/"
};