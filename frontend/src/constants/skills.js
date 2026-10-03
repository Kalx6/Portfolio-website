import { Monitor, Code2, Database, Wrench } from "lucide-react";

export const SKILLS = [
  {
    category: "Frontend",
    icon: Monitor,
    items: [
      "React / Vite",
      "JavaScript (ES6+)",
      "Tailwind CSS"
    ],
  },
  {
    category: "Backend",
    icon: Code2,
    items: [
      "Node.js / Express",
      "REST APIs",
      "Authentication"
    ],
  },
  {
    category: "Database",
    icon: Database,
    items: ["PostgreSQL", "MySQL"],
  },
  {
    category: "Tools",
    icon: Wrench,
    items: ["Git / GitHub", "VS Code", "Postman"],
  },
];
