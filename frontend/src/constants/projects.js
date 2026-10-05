import chatgpt from "../assets/images/ChatGPT.png";
import forum from "../assets/images/forum.webp";

export const PROJECTS = [
  {
    id: "ai-powered-evangadi-forum",
    featured: true,
    title: "AI-Powered Evangadi Forum",
    description:
      "A full-stack community platform inspired by Stack Overflow that enables users to securely register, authenticate, post questions, answer discussions, and collaborate with the community. The platform features AI-powered capabilities including Retrieval-Augmented Generation (RAG) for document upload and context-aware question answering, semantic search for discovering relevant discussions, and similar question recommendations to reduce duplicate posts and improve knowledge discovery.",
    tech: [
      "React",
      "Node.js",
      "Express.js",
      "MySQL",
      "JWT",
      "Google Gemini API",
      "RAG",
      "Vector Embeddings",
      "Semantic Search",
      "CSS",
    ],
    image: forum,
    liveDemo: "https://ai-powered-forum-project-three.vercel.app/",
    github: "https://github.com/Kalx6/ai-powered-forum-project",
  },

  {
    id: "chatgpt-clone",
    featured: true,
    title: "ChatGPT Clone",
    description:
      "A full-stack AI chat application with secure email and password authentication. Each user gets private, persistent chat history, powered by the Gemini API, with markdown and code highlighting, a responsive collapsible sidebar, and a rate-limited API.",
    tech: ["React", "Node.js", "Express", "MySQL", "JWT", "Gemini API"],
    image: chatgpt,
    liveDemo: "https://gpt-clone-seven-xi.vercel.app/",
    github: "https://github.com/Kalx6/GPT-Clone",
  },
];
