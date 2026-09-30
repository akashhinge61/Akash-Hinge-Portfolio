var projectData = {
    id: "jtbd",
    title: "Making Group Ordering More Reliable",
    subtitle: "A Jobs-to-be-Done and First Principles analysis of group ordering",
    hook: "The real challenge in group ordering is not placing the order. It is coordinating people, contributions, payments, and decisions without creating stress or uncertainty.",
    description: "A Product Management exercise using Jobs-to-be-Done and First Principles Thinking to understand the deeper problems behind group ordering and identify the principles needed to create a more reliable experience.",
    date: "Module 1",
    image: "assets/projects/jtbd/cover.jpg",
    tags: [
        "Product Management",
        "JTBD",
        "First Principles Thinking",
        "Problem Discovery",
        "User Needs",
        "Product Thinking",
        "Problem Analysis"
    ],

    overview: "This project explored group ordering through the Jobs-to-be-Done framework and First Principles Thinking. Instead of looking only at the surface-level ordering flow, I focused on what users are actually trying to accomplish, what creates friction, and what deeper problem exists underneath the experience.",

    context: "The project focused on the situation where one person is responsible for collecting and finalizing orders for a group. The challenge goes beyond combining individual choices because every participant needs to contribute on time, decisions need to be coordinated, and one person ultimately has to finalize the order.",

    challenge: "Group ordering can create friction when participants are late, contributions are missing, orders are incorrect or delayed, and the final outcome depends heavily on other people's reliability. This can leave one person carrying the responsibility for the entire order.",

    jtbd: {
        title: "Jobs-to-be-Done",
        statement: "When ordering for a group, I want a dependable way to collect, manage, and finalize everyone's orders, so that I can avoid errors, delays, and stress, and ensure fairness and accuracy for all participants.",
        description: "The JTBD helped frame the problem around the outcome the user wants to achieve rather than around a specific feature or interface."
    },

    userNeeds: {
        title: "User Needs Captured",
        needs: [
            {
                type: "Functional",
                text: "Collect and finalize orders efficiently."
            },
            {
                type: "Emotional",
                text: "Reduce stress, responsibility, and uncertainty."
            },
            {
                type: "Social",
                text: "Maintain fairness and reliability among group members."
            }
        ]
    },

    painPoints: {
        title: "User Pain Points",
        points: [
            "Late or missing contributions from participants.",
            "One person may end up paying for others or handling mistakes.",
            "Orders may be placed incorrectly or become delayed.",
            "Users may be uncertain about delivery or order accuracy."
        ]
    },

    deeperAnxiety: {
        title: "The Deeper Anxiety",
        points: [
            "Lack of control over the final order.",
            "Dependence on other people's reliability.",
            "Fear of conflict or embarrassment in group settings."
        ]
    },

    firstPrinciples: {
        title: "Breaking the Problem Down",
        challengedAssumption: "Group ordering is simply combining multiple individual orders.",

        coreBreakdown: [
            "Decision-making: Everyone must choose their items.",
            "Contribution: Each participant must act in time.",
            "Payment and execution: One person finalizes the order.",
            "Constraints: Human unpredictability and time dependencies."
        ],

        insight: "The real problem is coordinating people under uncertainty, not the technical act of ordering."
    },

    fundamentalProblems: [
        "Coordination friction.",
        "Lack of accountability.",
        "No guaranteed outcome.",
        "Trust deficit."
    ],

    solutionPrinciples: [
        {
            principle: "Enable asynchronous contribution",
            purpose: "Allow participants to contribute without requiring everyone to act at exactly the same time."
        },
        {
            principle: "Assign clear ownership of finalization",
            purpose: "Make responsibility for completing the group order explicit."
        },
        {
            principle: "Provide guaranteed outcomes",
            purpose: "Use mechanisms such as auto-finalization or a clear cutoff to reduce uncertainty."
        },
        {
            principle: "Ensure transparent visibility",
            purpose: "Give participants clear visibility into the group's order and its progress."
        }
    ],

    productThinking: "The exercise changed my perspective from looking at group ordering as a collection of UI or feature problems to understanding the human coordination problem underneath it. The deeper need is not simply convenience. Users need control, trust, predictability, and a clear path to a reliable outcome.",

    problemStatement: "How might we make group ordering more predictable and reliable by reducing coordination friction, improving accountability, and giving users greater control over the final outcome?",

    reflection: {
        title: "What Changed in My Thinking",
        points: [
            "My initial assumptions focused mainly on UI and feature-level issues.",
            "Breaking the problem down revealed deeper coordination and trust challenges.",
            "Understanding the user's desired outcome helped separate symptoms from the underlying problem.",
            "First Principles Thinking helped identify the fundamental constraints behind the experience."
        ]
    },

    keyTakeaways: [
        "JTBD helps focus on what users are trying to accomplish rather than what features they want.",
        "A visible product problem may be a symptom of a deeper behavioral or coordination problem.",
        "Human unpredictability can become a significant product constraint.",
        "Good product thinking requires understanding control, trust, accountability, and predictability.",
        "First Principles Thinking can help break a familiar problem into its fundamental components."
    ],

    gallery: [],

    learnings: [
        "Learned how to frame user needs through Jobs-to-be-Done.",
        "Practiced identifying functional, emotional, and social needs.",
        "Used First Principles Thinking to challenge an initial assumption.",
        "Learned to separate surface-level problems from deeper user anxieties.",
        "Understood how product principles can emerge from root problem analysis."
    ],

    liveDemo: ""
};