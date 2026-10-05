import netflix from "../assets/images/netflix.webp";
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
    featured: false,
    title: "ChatGPT Clone",
    description:
      "A modern AI chat application that delivers a conversational experience similar to ChatGPT. Features a clean responsive interface, dynamic messaging, API integration, and conversation history management.",
    tech: ["React", "JavaScript", "CSS", "REST API"],
    image: chatgpt,
    liveDemo: "https://gpt-clone-seven-xi.vercel.app/",
    github: "https://github.com/Kalx6/GPT-Clone",
  },

  {
    id: "netflix-clone",
    featured: false,
    title: "Netflix Clone",
    description:
      "A responsive Netflix-inspired streaming interface that displays trending and categorized movies using a movie API. Built with reusable React components and modern responsive design principles.",
    tech: ["React", "JavaScript", "CSS", "Movie API"],
    image: netflix,
    liveDemo: "https://netflix-clone-lilac-three-24.vercel.app/",
    github: "https://github.com/Kalx6/Netflix-clone",
  },
];
