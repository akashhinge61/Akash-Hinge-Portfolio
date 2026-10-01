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
        date: "September 2026",
        introduction: "Choosing a career was not difficult because I could not start. It was difficult because I was unsure whether I could truly see myself in one path.",
        body: [
            {
                heading: "The Moment It Clicked",
                text: "After SSC, I chose Commerce because I was interested in management, business, and technology. I wanted something different, where I could work with people, lead teams, create things, and see the impact of my work.For a while, I believed Product Management was not for me because I assumed strong technical knowledge was necessary. But during my BBA, I kept thinking about how products could be better, how UI could improve, and how user experiences could be simpler. The idea of PM never really left me."
            },
            {
                heading: "What Excites Me About PM",
                text: "Product Management brings together what I enjoy: understanding people, solving problems, building ideas, working with teams, and learning from feedback. I like that a product is never simply finished. It keeps evolving."
            },
            {
                heading: "The Learning Path",
                text: "My BBA gave me a foundation in management and marketing. My internship and full-time experience at a software and AI company exposed me to clients, teams, business strategies, metrics, and product possibilities.I then started learning AI Product Management, explored user research, UX, ideation, AI, and technical concepts, and began building case studies and projects. Step by step, I was building my foundation."
            }
        ],
        takeaways: [
           "Curiosity can reveal your direction.",
           "Learning can replace assumptions with confidence.",
           "Every experience can contribute to your future role.",
           "Building is the best way to understand products."
        ],
        conclusion: "I do not see Product Management as a sudden career choice. It became clear through everything I explored, learned, and built.My foundation is ready. Now I am looking for opportunities to turn that foundation into real product-building experience."
    },
	
	{
    title: "From “I Can’t Build This” to “Let Me Try”",
    category: "PM Learning Journey",
    excerpt: "How building a live MVP from a non-tech background changed the way I understand technology and Product Management.",
    date: "July 2026",
    introduction: "I come from a pure non-tech background. Before my Product Management capstone, I knew how to use websites and apps, but I had little understanding of how they were actually built. After completing my research, root-cause analysis, ideation, prioritization, and wireframes, I wanted to take the project one step further. A live demo was not required, but I wanted to turn my solution into a working prototype and learn what it actually takes to build a product.",
    body: [
        {
            heading: "I Started With Almost No Technical Knowledge",
            text: "My first step was understanding the basics: frontend, backend, APIs, databases, bugs, debugging, Git, GitHub, and deployment. A restaurant helped me understand it. The frontend is what customers experience, like the waiter, tables, ambience, and menu. The backend is what happens behind the scenes, like the kitchen and chefs. The API acts as a communication layer between them, while the database stores the information the product needs."
        },
        {
            heading: "Then I Actually Tried to Build It",
            text: "I started using VS Code and Antigravity. Since I wasn't a developer, I began by clearly explaining what I wanted to build. My prompts included my capstone solution, UX/UI direction, colour scheme, animations, interactions, and overall experience. Antigravity created an implementation plan, I reviewed and finalized it, and then we worked back and forth to build and improve the product."
        },
        {
            heading: "The Tools I Used",
            text: "Each tool helped me understand a different part of the product. I used Antigravity for AI-assisted coding and iteration, Supabase for the database and data, Render for the backend, and Netlify to deploy the frontend. Git and GitHub helped me manage and store the code and track changes as I continued building."
        },
        {
            heading: "Debugging Became Part of Learning",
            text: "Things broke, and that became one of the most useful parts of the experience. Instead of only asking the agent to fix an issue, I started asking why it happened, what the root cause was, and how I could prevent it in the future. That is how I gradually learned about folder structures, code syntax, brackets, files, bugs, and debugging. I wasn't learning technical concepts from a textbook. I was learning because I needed to solve a real problem."
        },
        {
            heading: "Technology Changed How I Think About Product Management",
            text: "This experience changed my view of technical knowledge in Product Management. A PM doesn't need to be a developer, but understanding how technology works helps them communicate better with technical teams, understand constraints, ask better questions, and make more realistic product decisions."
        },
        {
            heading: "The Moment It Became Real",
            text: "The best part wasn't seeing the code. It was seeing my idea on the screen. My research, problem definition, root-cause analysis, ideas, prioritization, and UX thinking had finally become something I could interact with. I was able to use the solution I had imagined, and that feeling was very different from simply looking at a wireframe."
        },
        {
            heading: "What This Journey Taught Me",
            text: "I learned that you don't need a technical background to start building. You learn differently when you have a real problem to solve. I also learned that AI tools can make experimentation more accessible, and that debugging is not just about fixing something, but understanding why it broke."
        },
        {
            heading: "Where I Am Now",
            text: "I still don't consider myself a developer, and I don't think I need to be one. But technology no longer feels like a completely different world. I now understand more about how an idea moves from a product problem through research, UX, prioritization, and building into something people can actually use."
        }
    ],
    takeaways: [
        "You don't need a technical background to start learning how products are built",
        "Building a real product teaches differently than simply reading about technology",
        "AI tools can make technical experimentation more accessible",
        "Debugging is not just fixing an issue; it is understanding why it happened",
        "Technical knowledge helps PMs understand feasibility, constraints, and trade-offs",
        "A working prototype can make a product idea much more tangible"
    ],
    conclusion: "This experience taught me that Product Management does not stop at designing the solution. Sometimes, the next step is trying to build it. I may still be learning the technical side, but now I feel much more comfortable exploring how ideas can move from a product problem to something real."
},

    {
    title: "What I Learned From My Product Management Capstone",
    category: "PM Learning Journey",
    excerpt: "My BookMyShow capstone turned four months of learning into one end-to-end product problem-solving experience.",
    date: "July 2026",
    introduction: "After completing my four-month AI Product Management course, I spent a month working on a BookMyShow capstone. I chose it because it focused on a real user problem and gave me the opportunity to think through how an actual product could solve it.",
    body: [
        {
            heading: "From Learning to Building",
            text: "The capstone brought together everything I had learned during the course. I worked through problem discovery, user research, journey mapping, ideation, prioritization, solution design, and prototyping. The goal was to understand why users browse entertainment but often struggle to make a booking decision."
        },
        {
            heading: "What I Built",
            text: "My research showed that decision-making was a major barrier. I explored multiple opportunities and used the RICE framework to prioritize ideas. The final direction focused on Plans for You for personalized, occasion-based discovery and Smart Compare to help users evaluate options with more confidence."
        },
        {
            heading: "Learning From Feedback",
            text: "Presenting the project to an experienced Product Manager was one of the most valuable parts of the experience. I received positive feedback on my presentation, live demo, and product thinking, along with technical areas I could continue improving."
        },
        {
            heading: "The Outcome",
            text: "I completed the capstone with a 9.8/10 score and ranked first in my cohort. More importantly, the project helped me move from simply learning Product Management concepts to actually applying them to a product problem."
        }
    ],
    takeaways: [
        "A real product problem makes frameworks easier to understand and apply",
        "Good product decisions start with understanding the problem, not jumping to solutions",
        "Prioritization is about choosing what creates the most meaningful value",
        "Feedback can reveal gaps that are difficult to identify on your own",
        "Building and presenting a product helped me understand PM beyond theory"
    ],
    conclusion: "My capstone was more than the final project of a four-month course. It became a foundation for how I want to approach Product Management: understand the problem, listen to users, make thoughtful decisions, build, and keep improving."
}

];
