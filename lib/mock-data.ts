export type Skill = {
  name: string;
  level: "Beginner" | "Intermediate" | "Advanced" | "Expert";
};

export type Candidate = {
  id: string;
  name: string;
  role: string;
  location: string;
  distance: string;
  rating: number;
  ratingCount: number;
  availability: string;
  bio: string;
  skills: Skill[];
  interests: string[];
  lookingFor: string[];
  github: string;
  linkedin: string;
  matchScore: number;
  reasons: string[];
};

export const candidates: Candidate[] = [
  {
    id: "arjun",
    name: "Arjun Kumar",
    role: "ML Engineer",
    location: "Koramangala, Bengaluru",
    distance: "3.4 km away",
    rating: 4.7,
    ratingCount: 18,
    availability: "Available on Oct 17",
    bio: "Backend-heavy builder who loves shipping AI-powered tools for developer workflows.",
    skills: [
      { name: "Python", level: "Expert" },
      { name: "PyTorch", level: "Advanced" },
      { name: "FastAPI", level: "Advanced" },
      { name: "PostgreSQL", level: "Advanced" },
    ],
    interests: ["AI", "Developer Tools", "FinTech"],
    lookingFor: ["Frontend", "Product", "UI/UX"],
    github: "@arjunkumar",
    linkedin: "linkedin.com/in/arjunkumar",
    matchScore: 91,
    reasons: [
      "4.2 km away",
      "Interested in AI",
      "Your backend skills complement their frontend focus",
      "Available on October 17",
      "Active GitHub contributor",
    ],
  },
  {
    id: "meera",
    name: "Meera Iyer",
    role: "Product Designer",
    location: "Indiranagar, Bengaluru",
    distance: "2.7 km away",
    rating: 4.9,
    ratingCount: 12,
    availability: "Available on Oct 17",
    bio: "Designs clean, thoughtful product experiences and moves quickly from concept to prototype.",
    skills: [
      { name: "Figma", level: "Expert" },
      { name: "UX Research", level: "Advanced" },
      { name: "Design Systems", level: "Advanced" },
      { name: "Prototyping", level: "Advanced" },
    ],
    interests: ["Climate", "HealthTech", "AI"],
    lookingFor: ["Frontend", "Marketing", "Product"],
    github: "Not connected",
    linkedin: "linkedin.com/in/meeraiyer",
    matchScore: 88,
    reasons: [
      "Strong product fit",
      "Shared interest in AI and climate",
      "Works well with backend + UX overlap",
      "Likely to build fast together",
      "Nearby and available",
    ],
  },
  {
    id: "rahul",
    name: "Rahul Menon",
    role: "Frontend Engineer",
    location: "Whitefield, Bengaluru",
    distance: "9.1 km away",
    rating: 4.6,
    ratingCount: 21,
    availability: "Partially available on Oct 17",
    bio: "Builds polished user experiences and ships experiments without losing technical quality.",
    skills: [
      { name: "React", level: "Expert" },
      { name: "TypeScript", level: "Expert" },
      { name: "Next.js", level: "Advanced" },
      { name: "UI Systems", level: "Advanced" },
    ],
    interests: ["Developer Tools", "Open Source", "Education"],
    lookingFor: ["Backend", "ML", "Product"],
    github: "@rahulmenon",
    linkedin: "linkedin.com/in/rahulmenon",
    matchScore: 86,
    reasons: [
      "Complementary role match",
      "Shared interest in developer tooling",
      "Strong frontend execution",
      "Good fit for a product-heavy build",
      "Available with a flexible schedule",
    ],
  },
  {
    id: "sana",
    name: "Sana Shah",
    role: "Full Stack Engineer",
    location: "Kochi, Kerala",
    distance: "12.5 km away",
    rating: 4.8,
    ratingCount: 29,
    availability: "Available on Oct 17",
    bio: "Product-minded engineer who enjoys building user-facing systems with strong architecture behind them.",
    skills: [
      { name: "Node.js", level: "Advanced" },
      { name: "TypeScript", level: "Expert" },
      { name: "React", level: "Advanced" },
      { name: "Supabase", level: "Advanced" },
    ],
    interests: ["Open Source", "Education", "Social Impact"],
    lookingFor: ["Design", "ML", "Cybersecurity"],
    github: "@sanashah",
    linkedin: "linkedin.com/in/sanashah",
    matchScore: 84,
    reasons: [
      "Great all-round technical fit",
      "Likes open-source and product execution",
      "Builds with modern tooling",
      "Available on your selected date",
      "Relevant for a fast MVP sprint",
    ],
  },
];

export const matches = [
  {
    id: "match-rahul",
    name: "Rahul Menon",
    role: "Frontend Engineer",
    distance: "2.1 km",
    status: "Matched",
    lastMessage: "We should sketch the ideation flow tonight.",
    unread: 2,
    intent: "Oct 17 · In person",
  },
  {
    id: "match-meera",
    name: "Meera Iyer",
    role: "Product Designer",
    distance: "3.4 km",
    status: "Waiting for response",
    lastMessage: "Interested in your profile — want to chat?",
    unread: 0,
    intent: "Oct 17 · In person",
  },
];

export const chatMessages: Record<string, { sender: "me" | "them"; text: string }[]> = {
  "match-rahul": [
    { sender: "them", text: "Hey! I saw you are looking for a frontend + product partner." },
    { sender: "me", text: "Exactly. We could build a polished MVP with a strong user flow." },
    { sender: "them", text: "Perfect. I can lead UI and interaction design while you handle backend/API architecture." },
    { sender: "me", text: "That sounds like a strong complement. Want to sketch the idea tonight?" },
  ],
  "match-meera": [
    { sender: "them", text: "I love the idea of pairing strong product thinking with a real technical build." },
    { sender: "me", text: "We could also test the experience with a fast user flow and a strong story." },
  ],
};

export const skillOptions = [
  "Python",
  "TypeScript",
  "React",
  "Next.js",
  "Node.js",
  "Go",
  "Rust",
  "AI/ML",
  "UI/UX",
  "Product",
  "Cybersecurity",
  "DevOps",
  "Data",
  "Cloud",
  "Design Systems",
];

export const interestOptions = [
  "AI",
  "Developer Tools",
  "FinTech",
  "Climate",
  "HealthTech",
  "Cybersecurity",
  "Open Source",
  "Education",
  "Robotics",
  "Social Impact",
  "Gaming",
  "Web3",
];

export const roleOptions = [
  "Frontend",
  "Backend",
  "Full Stack",
  "ML",
  "Design",
  "Product",
  "Data",
  "DevOps",
  "Security",
];
