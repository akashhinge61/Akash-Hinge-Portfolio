var projectData = {
    id: "zomato-analytics-metrics",
    title: "Optimizing Zomato's Food Delivery Journey",
    subtitle: "An analytics and metrics exercise covering OKRs, funnel analysis, initiatives, and cohort-based retention",
    hook: "A food delivery product is not only about getting an order placed. The real opportunity is making discovery, ordering, delivery, and repeat usage feel reliable enough to become a daily habit.",
    description: "A Product Management analysis of Zomato's food delivery journey, focused on CY2026 OKRs, metric ladders, funnel drop-off hypotheses, product initiatives, and cohort-based retention strategies for Tier-1 city users.",
    date: "May 2026",
    image: "assets/projects/zomato/cover.png",
    tags: [
        "Product Management",
        "Product Analytics",
        "OKRs",
        "Funnel Analysis",
        "Cohort Analysis",
        "Retention",
        "Metric Strategy"
    ],

    overview: "This assignment analyzed the complete Zomato food delivery journey from discovery to delivery. I defined a CY2026 objective and key results, connected product initiatives to input and output metrics, identified funnel drop-off hypotheses, and explored how different user cohorts could require different retention strategies.",

    context: "The analysis focused on making Zomato the default daily food companion for users in Tier-1 cities by improving personalization, reducing friction, increasing reliability, and building stronger long-term habits.",

    objective: "Make Zomato the default daily food companion for users in Tier-1 cities by delivering a seamless, personalized, and reliable food ordering experience across discovery, ordering, and delivery.",

    okrs: [
        {
            title: "KR1 — 90-Day Retention",
            target: "20%",
            description: "Increase the 90-day user retention rate from the existing baseline to 20% by the end of CY2026."
        },
        {
            title: "KR2 — Order Frequency",
            target: "+25%",
            description: "Increase average monthly order frequency per active user by 25%."
        },
        {
            title: "KR3 — Checkout Abandonment",
            target: "-15%",
            description: "Reduce checkout abandonment by 15% through friction reduction."
        },
        {
            title: "KR4 — On-Time Delivery",
            target: "95%",
            description: "Improve the on-time delivery satisfaction score to 95% across Tier-1 cities."
        }
    ],

    metricLadders: [
        {
            initiative: "Personalized Recommendations",
            goal: "Improve engagement and repeat ordering through better personalization.",
            inputMetrics: [
                "Recommendation CTR",
                "Search-to-menu conversion",
                "Feed engagement",
                "Time on discovery"
            ],
            outputMetrics: [
                "Repeat orders",
                "Retention rate",
                "Restaurant discovery conversion"
            ],
            northStarMetric: "Monthly Active Ordering Users (MAOU)"
        },

        {
            initiative: "Simplified Checkout Experience",
            goal: "Reduce friction and improve checkout completion rates.",
            inputMetrics: [
                "Checkout interaction time",
                "Coupon success rate",
                "Payment completion",
                "Cart abandonment"
            ],
            outputMetrics: [
                "Successful order placements",
                "Checkout drop-offs",
                "Conversion rate"
            ],
            northStarMetric: "Orders Placed per Active User"
        },

        {
            initiative: "Loyalty & Habit-Building Programs",
            goal: "Increase ordering frequency and long-term retention.",
            inputMetrics: [
                "Loyalty participation rate",
                "Repeat order frequency",
                "Notification engagement",
                "Subscription renewals"
            ],
            outputMetrics: [
                "Order frequency",
                "Customer retention",
                "Repeat customers"
            ],
            northStarMetric: "Monthly Active Ordering Users (MAOU)"
        },

        {
            initiative: "Delivery Reliability Improvements",
            goal: "Improve trust and the post-order experience.",
            inputMetrics: [
                "Average delivery time",
                "Partner acceptance rate",
                "Support response time",
                "Issue resolution rate"
            ],
            outputMetrics: [
                "Customer satisfaction",
                "Cancellations",
                "Retention"
            ],
            northStarMetric: "Successful Orders Delivered"
        }
    ],

    challenge: "The food delivery experience contains multiple points where users may lose interest or abandon the journey. Repetitive discovery, decision fatigue, unclear pricing, checkout friction, and unreliable delivery can all affect whether a user completes an order and whether they return.",

    funnelAnalysis: [
        {
            stage: "App Open",
            problem: "Users may leave if the homepage feels repetitive or does not provide personalized recommendations.",
            hypothesis: "Context-aware recommendations on the homepage may increase engagement and restaurant discovery."
        },

        {
            stage: "Restaurant Discovery",
            problem: "Too many options may create decision fatigue and cause users to stop browsing.",
            hypothesis: "Enhanced search relevance and preference-based filtering may improve discovery conversion."
        },

        {
            stage: "Menu View",
            problem: "Users may hesitate to add items when food visuals, descriptions, or customization information are limited.",
            hypothesis: "Richer menu details and food images may improve menu-to-cart conversion."
        },

        {
            stage: "Cart Creation",
            problem: "High delivery charges or unclear pricing may cause users to abandon the cart.",
            hypothesis: "Transparent pricing and personalized offers shown earlier may reduce cart abandonment."
        },

        {
            stage: "Checkout",
            problem: "Offers, upsells, and additional options can create visual clutter and overwhelm users.",
            hypothesis: "Simplifying checkout and reducing unnecessary visual clutter may improve completion rates."
        },

        {
            stage: "Order Placed → Delivered",
            problem: "Long or uncertain delivery timelines can lead to cancellations, while poor delivery experiences can contribute to churn.",
            hypothesis: "Accurate timelines, proactive communication, and more reliable delivery may reduce cancellations and increase repeat orders."
        }
    ],

    cohortAnalysis: [
        {
            title: "New vs. Repeat Users",
            userPattern: "New users are placing their first few orders, while repeat users regularly return to the platform.",
            challenge: "A poor first experience, including delivery delays, confusing navigation, or limited personalization, can reduce trust and prevent repeat usage.",
            hypothesis: "Improving onboarding, the first-order experience, and personalized recommendations may increase repeat order rates among new users."
        },

        {
            title: "High-Frequency vs. Low-Frequency Users",
            userPattern: "High-frequency users order multiple times per week, while low-frequency users use the platform occasionally.",
            challenge: "Low-frequency users may not see enough value, convenience, or habit formation to make Zomato part of their regular routine.",
            hypothesis: "Personalized engagement, loyalty rewards, and habit-building features may increase ordering frequency and retention."
        },

        {
            title: "Discount-Driven vs. Full-Price Users",
            userPattern: "Discount-driven users primarily order during offers, while full-price users prioritize convenience and reliability.",
            challenge: "Discount-driven users may reduce usage when offers decline, resulting in weaker long-term loyalty.",
            hypothesis: "Loyalty programs and personalized value beyond discounts may improve retention among discount-driven users."
        }
    ],

    productInitiatives: [
        {
            title: "Personalized Recommendations",
            focus: "Discovery & Engagement",
            purpose: "Make food discovery more relevant and encourage repeat ordering through better personalization."
        },

        {
            title: "Simplified Checkout Experience",
            focus: "Conversion",
            purpose: "Remove unnecessary friction from checkout and improve order completion."
        },

        {
            title: "Loyalty & Habit-Building Programs",
            focus: "Retention",
            purpose: "Increase order frequency and strengthen long-term user habits."
        },

        {
            title: "Delivery Reliability Improvements",
            focus: "Trust & Retention",
            purpose: "Improve the post-order experience through more reliable delivery and better communication."
        }
    ],

    opportunity: "The analysis identified four connected opportunity areas: make discovery more personalized, reduce unnecessary friction during ordering, create stronger habits through loyalty and engagement, and improve delivery reliability to strengthen trust.",

    strategy: [
        "Strengthen personalization across discovery and recommendations.",
        "Reduce friction and visual clutter during checkout.",
        "Use loyalty and engagement mechanisms to encourage repeat ordering.",
        "Improve delivery transparency and reliability.",
        "Tailor retention strategies according to user behavior and ordering patterns."
    ],

    productThinking: "The exercise helped me understand that product metrics are most useful when they are connected to a clear user problem and business objective. Instead of looking at one number in isolation, I mapped initiatives from input metrics to output metrics and ultimately to a north star metric.",

    successMetrics: [
        "90-day retention target of 20%.",
        "25% increase in average monthly order frequency per active user.",
        "15% reduction in checkout abandonment.",
        "95% on-time delivery satisfaction score across Tier-1 cities.",
        "Improved discovery conversion and repeat ordering.",
        "Reduced cancellations and stronger customer retention."
    ],

    keyTakeaways: [
        "OKRs help connect a broad product objective with measurable outcomes.",
        "A funnel helps identify where users may drop off and where experiments can be tested.",
        "Metric ladders connect product activity with meaningful business outcomes.",
        "Different user cohorts can have different retention problems and therefore need different strategies.",
        "Improving the complete journey can be more valuable than optimizing one isolated step."
    ],

    learnings: [
        "Learned how to define product OKRs and measurable key results.",
        "Practiced mapping input metrics, output metrics, and north star metrics.",
        "Learned how to identify funnel drop-off hypotheses across a complete user journey.",
        "Used cohort analysis to think about different retention behaviors.",
        "Improved my understanding of how analytics can support product strategy and prioritization."
    ],

    gallery: [],

    liveDemo: ""
};