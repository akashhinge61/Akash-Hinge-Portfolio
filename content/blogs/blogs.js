/**
 * Blog Content
 * Edit this file to add, update, or remove blog posts.
 * Each post supports: title, category, excerpt, date, introduction, body (array of blocks), takeaways, conclusion.
 * Only sections with real content will be displayed.
 */
const blogContent = [

    {
        title: "Why I Chose Product Management",
        category: "Personal",
        excerpt: "The story behind my decision to pursue product management — and what excites me about building things that matter.",
        date: "Sep 2026",
        introduction: "I didn't start with product management. Like many people, I stumbled into it — and then it clicked. This is the story of how I went from studying business to wanting to build products.",
        body: [
            {
                heading: "The Moment It Clicked",
                text: "During my BBA, I kept asking 'why' about the apps I used every day. Why does this feature exist? Why is this button here? Why do I keep coming back to this app but not that one? I realized I wasn't just curious — I was thinking like a product person."
            },
            {
                heading: "What Excites Me About PM",
                text: "Product Management sits at the intersection of users, business, and technology. You don't need to be the best coder or the best designer — you need to understand problems deeply and think about solutions holistically."
            },
            {
                heading: "The Learning Path",
                text: "I've been learning through courses, case studies, and hands-on projects. Breaking down real apps, mapping user journeys, and trying to think about what I would do differently. It's been the most engaging learning experience I've had."
            }
        ],
        takeaways: [
            "Product Management is about solving problems, not just building features",
            "Curiosity about 'why' is the most important PM skill",
            "You don't need a tech background to think in products",
            "Learning by doing — case studies and teardowns — beats passive learning"
        ],
        conclusion: "I'm still early in my journey, but I'm more certain than ever that this is the path I want to pursue. Building products that solve real problems for real people — that's what gets me up in the morning."
    },

    {
        title: "What I Learned From Tearing Down 3 Apps",
        category: "Product Thinking",
        excerpt: "Breaking down BookMyShow, BigBasket, and Zepto taught me more about product thinking than any course could.",
        date: "Aug 2026",
        introduction: "The best way to learn product management isn't reading about it — it's doing it. I spent weeks tearing down three popular Indian apps, and here's what I learned about how products really work.",
        body: [
            {
                heading: "The Approach",
                text: "For each app, I mapped the core user journey, identified friction points, reviewed competitive alternatives, and proposed improvements. I treated each teardown like a mini case study."
            },
            {
                heading: "Patterns I Noticed",
                text: "Across all three apps, the same patterns kept emerging: users value simplicity over feature richness, trust is built through transparency, and small UX improvements in high-frequency flows have disproportionate impact."
            },
            {
                heading: "The Hardest Part",
                text: "Prioritization. It's easy to generate ideas — it's hard to decide what matters most. Frameworks like RICE and MoSCoW helped, but they're tools, not answers. Judgment matters more than any framework."
            }
        ],
        takeaways: [
            "Tearing down apps builds stronger product intuition than reading case studies",
            "The best product decisions are often about what NOT to build",
            "Frameworks support thinking but don't replace it",
            "Every app has invisible design decisions that shape user behavior"
        ],
        conclusion: "If you're getting into product management, start tearing down the apps you use every day. Ask why things are the way they are. You'll be surprised how much you learn."
    }

];
