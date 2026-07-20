import { Monitor, Code2, Database, Wrench } from "lucide-react";

export const SKILLS = [
  {
    category: "Frontend",
    icon: Monitor,
    items: [
      "React / Vite",
      "JavaScript (ES6+)",
      "Tailwind CSS",
      "Framer Motion",
    ],
  },
  {
    category: "Backend",
    icon: Code2,
    items: [
      "Node.js / Express",
      "REST APIs",
      "Authentication",
      "Server Architecture",
    ],
  },
  {
    category: "Database",
    icon: Database,
    items: ["PostgreSQL", "MySQL", "Database Design", "Query Optimization"],
  },
  {
    category: "Tools",
    icon: Wrench,
    items: ["Git / GitHub", "VS Code", "Postman", "CI/CD Basics"],
  },
];
