var projectData = {
    id: "twitter-aaarrr",
    title: "Finding Growth Opportunities at Twitter (X)",
    subtitle: "An AARRR funnel analysis to identify growth gaps and prioritize product initiatives",
    hook: "Growth is not only about getting users in. It is about helping them reach value, come back, engage, and eventually become advocates.",
    description: "A Product Management assignment analyzing the Twitter (X) user journey through the AARRR funnel, identifying major drop-off points and growth opportunities, and prioritizing product initiatives using the RICE framework.",
    date: "June 2026",
    image: "assets/projects/X (twitter)/cover.jpg",
    tags: [
        "Product Management",
        "AARRR Framework",
        "Growth Strategy",
        "Product Analytics",
        "RICE Prioritization",
        "User Journey",
        "Product Strategy"
    ],

    overview: "This project analyzed the Twitter (X) user journey across the five AARRR growth stages: Acquisition, Activation, Retention, Revenue, and Referral. The goal was to understand where users may drop off, identify product gaps, and propose initiatives that could improve activation, retention, engagement, and long-term growth.",

    context: "The analysis focused on how users move from discovering and signing up for Twitter to experiencing value, developing usage habits, engaging with the platform, becoming paying users, and sharing content with others.",

    challenge: "The platform can attract users, but growth depends on what happens after acquisition. New users may struggle to build a relevant feed, find accounts and communities, create their first post, or understand the value of Premium features. These gaps can affect activation, retention, engagement, and conversion.",

    aaarrrFunnel: [
        {
            stage: "Acquisition",
            journey: "Install the app, visit the website, and sign up through Google, Apple, or email.",
            valueMoment: "The user realizes Twitter provides real-time information and trending conversations."
        },
        {
            stage: "Activation",
            journey: "Follow interests, discover a personalized feed, and engage with the first tweet.",
            valueMoment: "The user sees a highly relevant feed after selecting their interests."
        },
        {
            stage: "Retention",
            journey: "Browse the feed daily, post content, receive notifications, and follow trending topics.",
            valueMoment: "The user develops a habit of checking updates multiple times a day."
        },
        {
            stage: "Revenue",
            journey: "Interact with advertisements, explore Premium, and participate in creator monetization.",
            valueMoment: "The user understands the value of Premium features such as verification, longer posts, and enhanced visibility."
        },
        {
            stage: "Referral",
            journey: "Share tweets externally, invite friends, and spread viral content.",
            valueMoment: "The user shares valuable content and influences others to join."
        }
    ],

    keyDropOffPoints: [
        {
            stage: "Acquisition → Activation",
            points: [
                "The sign-up process may feel lengthy.",
                "New users may not know whom to follow.",
                "An empty or irrelevant feed can weaken the first experience."
            ]
        },
        {
            stage: "Activation → Retention",
            points: [
                "Feed quality may not match user expectations.",
                "Users may struggle to find relevant communities.",
                "Limited early engagement can reduce the likelihood of returning."
            ]
        },
        {
            stage: "Retention → Revenue",
            points: [
                "Users may have limited understanding of Premium benefits.",
                "The perceived value may not be strong enough to encourage subscription."
            ]
        }
    ],

    keyInsights: [
        "New users need a relevant experience quickly after signup.",
        "An empty or weak social graph can reduce the value of the initial feed.",
        "Many users consume content without taking the step of creating their first post.",
        "Excessive or irrelevant notifications can create notification fatigue.",
        "Users may not clearly understand the value proposition of Premium."
    ],

    growthGaps: [
        {
            title: "Weak Personalization for New Users",
            problem: "New users may receive generic content immediately after signup.",
            impact: "A weak first experience can reduce activation.",
            opportunity: "Improve onboarding personalization and interest selection."
        },
        {
            title: "Empty Social Graph",
            problem: "Users may initially follow too few relevant accounts.",
            impact: "The feed can appear inactive or irrelevant.",
            opportunity: "Use AI-powered recommendations to help users discover accounts during onboarding."
        },
        {
            title: "Users Hesitate to Post",
            problem: "Many users consume content but never create their first post.",
            impact: "Lower contribution can reduce engagement and retention.",
            opportunity: "Reduce posting anxiety through guided posting experiences."
        },
        {
            title: "Notification Fatigue",
            problem: "Excessive notifications may annoy users.",
            impact: "Users may disable notifications or disengage from the platform.",
            opportunity: "Make notifications more personalized and relevant."
        },
        {
            title: "Low Premium Conversion",
            problem: "Users may not understand the practical value of Premium benefits.",
            impact: "Potential subscription opportunities may be lost.",
            opportunity: "Allow users to better experience or understand Premium value before subscribing."
        }
    ],

    supportingEvidence: [
        "Feed relevance issues.",
        "Difficulty finding interesting accounts.",
        "Too many notifications.",
        "Confusion around the Premium value proposition.",
        "Low-quality or irrelevant content recommendations."
    ],

    strategicFocus: "The analysis focused primarily on Activation and Retention because these stages were identified as having a strong influence on long-term growth.",

    productEpics: [
        {
            title: "AI-Powered Smart Onboarding",
            stage: "Activation",
            insight: "New users struggle to build a relevant feed.",
            solution: "Create AI-powered onboarding that uses selected interests to recommend relevant accounts and build a personalized starter feed.",
            expectedOutcome: "Faster time-to-value, improved activation, and a better first-day experience."
        },
        {
            title: "Guided First Post Experience",
            stage: "Activation",
            insight: "Many users never create their first tweet.",
            solution: "Provide guided first-post templates such as asking a question, sharing an opinion, or introducing yourself, with AI-assisted content ideas.",
            expectedOutcome: "Increased first-post creation, higher engagement, and stronger activation."
        },
        {
            title: "Personalized Re-Engagement Engine",
            stage: "Retention",
            insight: "Some users stop returning after the first week.",
            solution: "Create intelligent notifications based on user interests, previous engagement patterns, and trending discussions.",
            expectedOutcome: "Improved Day 7 retention and increased session frequency."
        },
        {
            title: "Community Discovery Hub",
            stage: "Retention",
            insight: "Users may struggle to discover communities that match their interests.",
            solution: "Create a dedicated discovery experience featuring Communities, Spaces, and trending niche conversations.",
            expectedOutcome: "Increased engagement, longer sessions, and improved retention."
        }
    ],

    prioritization: {
        title: "RICE Prioritization",
        formula: "(Reach × Impact × Confidence) ÷ Effort",
        initiatives: [
            {
                initiative: "AI-Powered Smart Onboarding",
                reach: 9,
                impact: 9,
                confidence: 8,
                effort: 5,
                riceScore: 129.6
            },
            {
                initiative: "Personalized Re-Engagement Engine",
                reach: 8,
                impact: 8,
                confidence: 8,
                effort: 5,
                riceScore: 102.4
            },
            {
                initiative: "Guided First Post Experience",
                reach: 7,
                impact: 7,
                confidence: 7,
                effort: 4,
                riceScore: 85.75
            },
            {
                initiative: "Community Discovery Hub",
                reach: 6,
                impact: 7,
                confidence: 7,
                effort: 6,
                riceScore: 49
            }
        ]
    },

    finalRecommendation: {
        title: "Prioritization Outcome",
        primaryInitiative: "AI-Powered Smart Onboarding",
        primaryReason: "It reaches new users at the beginning of their journey and directly addresses the problem of building a relevant feed quickly.",
        secondaryInitiative: "Personalized Re-Engagement Engine",
        secondaryReason: "It addresses retention by helping users find relevant reasons to return and continue engaging with the platform."
    },

    opportunity: "The analysis identified an opportunity to improve the early user experience, reduce friction in finding relevant content and people, encourage contribution, and create more personalized reasons for users to return.",

    productThinking: "The AARRR framework helped me look at the product as a continuous user journey rather than a collection of individual features. RICE then provided a structured way to compare potential initiatives based on reach, impact, confidence, and effort.",

    successMetrics: [
        "Higher activation rates.",
        "Faster time-to-value for new users.",
        "Improved first-week and Day 7 retention.",
        "Higher first-post creation and user engagement.",
        "Increased session frequency.",
        "Stronger long-term engagement and network effects."
    ],

    keyTakeaways: [
        "Growth problems can exist at different stages of the same user journey.",
        "AARRR helps identify where users gain or lose value throughout the funnel.",
        "Activation and retention are closely connected to the quality of a user's early experience.",
        "Product opportunities should be connected to specific user and business problems.",
        "RICE helps bring structure to prioritization instead of choosing initiatives based only on intuition."
    ],

    gallery: [],

    learnings: [
        "Learned how to map a product experience using the AARRR funnel.",
        "Practiced identifying user drop-off points across different growth stages.",
        "Learned to convert product gaps into larger product epics.",
        "Applied RICE to prioritize product initiatives.",
        "Understood how growth strategy connects user experience, engagement, retention, and revenue."
    ],

    liveDemo: ""
};