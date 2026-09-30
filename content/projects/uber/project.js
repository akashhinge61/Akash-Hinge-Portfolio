var projectData = {
    id: "uber",
    title: "Making Ride Pickups Easier to Find",
    subtitle: "A problem discovery and user research study on pickup coordination in crowded urban environments",
    hook: "The ride may be booked, but the journey can still get stuck when the rider and driver cannot find each other.",
    description: "A research-led exploration of pickup problems in crowded urban environments, looking at location clarity, rider-driver coordination, navigation, and trust during the pickup phase.",
    date: "April 2026",
    image: "assets/projects/uber/cover.png",
    tags: [
        "Product Discovery",
        "User Research",
        "Market Research",
        "Problem Discovery",
        "Ride-Hailing",
        "Pickup Experience",
        "User Interviews"
    ],

    overview: "This project explored the challenges users face during the ride pickup phase, particularly in crowded urban environments where GPS accuracy, landmarks, traffic, and unclear pickup points can make coordination difficult.",

    researchGoal: "To understand user challenges during the ride pickup phase and identify gaps in location clarity, coordination, and trust using survey data and user interviews.",

    targetUsers: [
        "Daily commuters including office workers and students.",
        "Occasional users travelling for shopping and outings.",
        "Travellers using ride-hailing services around airports and railway stations.",
        "Groups using ride-hailing for outings."
    ],

    marketResearch: {
        targetMarket: [
            "Urban ride-hailing users aged 18–45.",
            "Smartphone users in metro cities.",
            "A large user base of approximately 100M+ users in India.",
            "Approximately 30–40% of users were identified as facing pickup issues in the project research."
        ],

        existingAlternatives: [
            "Calling or messaging drivers.",
            "Sharing live location.",
            "Giving landmarks as directions.",
            "Moving towards main roads or gates.",
            "Using other ride-hailing platforms such as Ola and Rapido.",
            "Using Google Maps."
        ],

        constraints: [
            "Data privacy considerations around location data.",
            "GPS accuracy limitations.",
            "Fixed pickup zones at places such as airports and malls."
        ],

        trends: [
            "AI-based navigation and prediction.",
            "Smarter maps and real-time tracking.",
            "Hyperlocal pickup guidance.",
            "Greater focus on improving the post-booking experience."
        ]
    },

    userResearch: [
        "User survey responses were reviewed to understand common pickup problems.",
        "User interviews were conducted around pickup clarity, confusion, coordination, trust, and potential improvements.",
        "A prototype was used during the interview process to gather feedback on the proposed direction."
    ],

    interviewQuestions: [
        "What do you think this feature is trying to help you with?",
        "Is the pickup guidance clear to you?",
        "Was anything confusing while using this feature?",
        "Would this reduce the need to call the driver? Why or why not?",
        "Does this help solve the problem of drivers not finding your location?",
        "Would you actually follow these instructions in a real situation?",
        "Do you think this would save time during pickup?",
        "Would you trust the suggested pickup point?",
        "In what situations do you think this would not work well?",
        "What would you improve or change in this feature?"
    ],

    researchInsights: [
        "Busy streets were identified as a common environment where pickup problems occur.",
        "The driver's inability to find the user's location emerged as a primary pain point.",
        "Users commonly rely on calling the driver to resolve pickup issues.",
        "Users reported moderate stress during pickup.",
        "Current pickup instructions received a neutral response regarding clarity.",
        "Trust in ETA and pickup accuracy was also neutral.",
        "Users actively use GPS tracking to solve pickup problems.",
        "Landmark-based guidance was perceived as clear and helpful.",
        "Guided pickup could reduce dependency on phone calls and improve coordination.",
        "Trust gaps and limitations still exist in crowded environments."
    ],

    problemStatement: "Ride-hailing pickup can become difficult when the rider and driver are not aligned on the exact pickup location, especially in crowded streets and complex environments.",

    problemPrioritization: {
        title: "The coordination gap",
        points: [
            "Drivers may struggle to locate the rider.",
            "Riders may not know exactly where to wait.",
            "Users rely on calls to coordinate the pickup.",
            "GPS alone may not provide enough context in crowded environments.",
            "Unclear pickup points can reduce trust and increase stress."
        ]
    },

    opportunity: "The research highlighted an opportunity to make pickup coordination more guided, location-aware, and transparent instead of relying heavily on calls between riders and drivers.",

    strategyImplications: [
        "Reduce driver-user coordination friction.",
        "Build trust around system-generated pickup points.",
        "Adapt pickup suggestions to high-density environments.",
        "Strengthen landmark-based and guided navigation.",
        "Provide clearer and more dynamic ETA and pickup information."
    ],

    ideation: [
        {
            title: "Driver-Confirmed Pickup Point",
            description: "Show confirmation that the driver is heading towards the same pickup point, helping reduce confusion and build trust."
        },
        {
            title: "Smart Dynamic Pickup Optimization",
            description: "Suggest better pickup locations using factors such as traffic conditions and crowd density, particularly in busy streets."
        },
        {
            title: "Step-by-Step Guided Pickup",
            description: "Provide instructions such as walking 30 metres to the main road or standing near a specific landmark to reduce ambiguity."
        }
    ],

    solutionPrioritization: "The research-led product direction centred on three connected needs: clearer pickup locations, stronger rider-driver alignment, and step-by-step guidance for difficult environments.",

    userFlow: [
        "User books a ride.",
        "The system identifies the pickup environment.",
        "A suitable pickup point is suggested.",
        "Driver and rider receive aligned pickup information.",
        "User receives landmark-based or step-by-step guidance.",
        "Dynamic updates help the user reach the pickup point.",
        "User and driver connect with less need for phone coordination."
    ],

    prototype: "A prototype was used during user interviews to explore the guided pickup concept and gather feedback around clarity, trust, usefulness, and real-world limitations.",

    productThinking: "The research suggested that the pickup problem is not simply a map problem. Users need contextual guidance that helps them understand where to stand, where the driver is going, and what to do when the environment makes GPS-based pickup difficult.",

    successMetrics: [
        "Reduce the number of pickup-related calls between riders and drivers.",
        "Improve pickup-point clarity.",
        "Reduce pickup coordination time.",
        "Increase confidence in suggested pickup locations.",
        "Improve successful pickup coordination in crowded environments."
    ],

    gallery: [],

    learnings: [
        "Problem discovery helped reveal that pickup friction extends beyond basic GPS accuracy.",
        "Users often create their own workarounds, such as calling drivers or moving towards main roads.",
        "Landmarks can provide useful context where map-based instructions are not enough.",
        "Trust is an important part of pickup coordination.",
        "Research can reveal opportunities that are not obvious from the core booking flow alone."
    ],

    liveDemo: ""
};