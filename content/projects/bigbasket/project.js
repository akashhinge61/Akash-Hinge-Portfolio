var projectData = {
    id: "bigbasket",
    title: "Finding the Friction in BigBasket's Shopping Journey",
    subtitle: "A UX evaluation of discovery, search, product listing, and product details",
    hook: "The shopping journey started strong, but important information became harder to find as users moved deeper into the experience.",
    description: "A UX evaluation examining how visual clutter, search-result prioritization, inconsistent interfaces, and unclear actions can create friction across the BigBasket shopping journey.",
    date: "April 2026",
    image: "assets/projects/bigbasket/cover.png",
    tags: [
        "UX Evaluation",
        "User Experience",
        "Product Discovery",
        "Search Experience",
        "Usability",
        "Information Architecture",
        "UI Consistency"
    ],

    overview: "This evaluation looked at the BigBasket experience across four stages: the home screen, search and category browsing, product listings, and the product detail page.",

    context: "The evaluation focused on how easily users could discover products, understand search results, navigate product listings, and identify the correct actions when viewing a product.",

    challenge: "The experience contained useful information and functionality, but important content could become difficult to locate because of excessive banners, mixed search content, inconsistent visual treatment, and unclear calls to action.",

    userJourney: [
        "Home Screen",
        "Search / Category Browsing",
        "Product Listing",
        "Product Detail"
    ],

    evaluationStages: [
        {
            title: "Home Screen",
            points: [
                "Multiple brand banners appeared before the main product content.",
                "The search placement required two-handed interaction for a right-handed user.",
                "The primary product list was pushed below the banners.",
                "The Account option appeared at the top despite not being the immediate shopping task.",
                "The bottom navigation included Home, Categories, and Order Again, while Search and Account were not included.",
                "The main product menu was positioned further down, requiring additional scrolling."
            ]
        },

        {
            title: "Search and Category Browsing",
            points: [
                "Searching for milk surfaced milk-related products and other content.",
                "Additional category options such as Explore Bread Store were presented.",
                "Related category keywords were suggested.",
                "Offers were also included in the results.",
                "The search experience presented multiple types of content together instead of clearly prioritizing the exact product search."
            ]
        },

        {
            title: "Product Listing",
            points: [
                "The interface became more minimal compared with the earlier parts of the journey.",
                "Suggestions appeared quickly and pushed the desired results further down.",
                "The same product could appear both as a search result and as a suggestion.",
                "The cart option was small and did not stand out clearly.",
                "Offers that had previously been visually prominent were less visible on the listing page."
            ]
        },

        {
            title: "Product Detail",
            points: [
                "The product image occupied around 45% of the screen and could be reduced slightly.",
                "The visual treatment shifted from a vibrant interface to a much more minimal presentation.",
                "Some product information lacked clear visibility and had contrast issues.",
                "The Basket and Add actions created uncertainty about what each action would do.",
                "The buttons did not stand out as strongly as the interface elements on the home screen."
            ]
        }
    ],

    keyIssues: [
        "Visual clutter from excessive banners.",
        "Primary content hidden below the fold.",
        "Mixed content in search results, including products, categories, and offers.",
        "Lack of clear prioritization for exact matches.",
        "Inconsistent UI between screens.",
        "Duplicate product visibility between listings and suggestions.",
        "Confusing dual CTA between Add and Basket.",
        "Poor information clarity and low text contrast."
    ],

    problemPrioritization: {
        title: "The five issues that mattered most",
        points: [
            "Visual clutter from excessive banners.",
            "Mixed content in search results.",
            "Inconsistent UI between screens.",
            "Confusing dual CTA: Add vs Basket.",
            "Poor information clarity and low text contrast."
        ]
    },

    opportunity: "The evaluation pointed towards simplifying the discovery journey, giving exact product results clearer priority, maintaining a more consistent visual system, and making important actions and information easier to understand.",

    solutionDirections: [
        "Reduce unnecessary visual clutter on the home screen.",
        "Bring primary product content higher in the experience.",
        "Separate or better prioritize products, categories, and offers within search.",
        "Avoid showing duplicate products across search results and suggestions.",
        "Create stronger visual consistency between screens.",
        "Clarify the difference between product actions and cart actions.",
        "Improve text contrast and information hierarchy."
    ],

    productThinking: "The evaluation showed that usability is not only about whether a feature exists. The placement, hierarchy, consistency, and clarity of that feature can determine whether users understand and use it effectively.",

    uxDirection: "Rather than redesigning every element, the improvement direction focuses on the highest-friction parts of the journey: reducing clutter, improving content hierarchy, simplifying search results, strengthening UI consistency, and clarifying primary actions.",

    gallery: [],

    learnings: [
        "Visual hierarchy strongly affects product discovery.",
        "Showing more information does not necessarily make search more useful.",
        "Consistency between screens helps users understand how an interface behaves.",
        "Primary actions should be visually and functionally unambiguous.",
        "Small usability issues can compound across a multi-step shopping journey."
    ],

    liveDemo: ""
};