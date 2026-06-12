/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { StudyModule, Achievement } from './types.ts';

export const ACHIEVEMENTS: Achievement[] = [
  { id: 'first_step', title: 'Lvl 1 Novice', description: 'Certified in fundamental Vibe Coding principles.', icon: '🎓', unlockedAtXp: 100 },
  { id: 'prompt_squire', title: 'Prompt Squire', description: 'Proven master of few-shot and context prompting.', icon: '⚡', unlockedAtXp: 300 },
  { id: 'cyber_adept', title: 'Cyber Adept', description: 'Possesses knowledge of web and no-code architectures.', icon: '🔮', unlockedAtXp: 600 },
  { id: 'ui_vanguard', title: 'UI Vanguard', description: 'Exhibits extreme clarity on user journey flows and contrast.', icon: '🎨', unlockedAtXp: 1000 },
  { id: 'vibe_master', title: 'Vibe Architect', description: 'Completed all training simulation levels.', icon: '👑', unlockedAtXp: 1800 }
];

export const STUDY_MODULES: StudyModule[] = [
  {
    id: 1,
    levelNum: 1,
    title: "Introduction to Vibe Coding",
    subtitle: "Level 1: The AI Paradigm Shift",
    category: "Philosophy",
    difficulty: "Beginner",
    rewardXp: 150,
    objectives: [
      "Understand what Vibe Coding is and how it differs from traditional coding",
      "Learn how AI is changing software development cycle paradigms",
      "Grasp the concept of conveying intent rather than managing syntax"
    ],
    sections: [
      {
        title: "What is Vibe Coding?",
        paragraphs: [
          "Vibe Coding is a modern approach to software development that leverages generative AI tools to output code directly from natural language prompts. Instead of drafting every line of syntax manually, you describe what you want to build in plain English, and the AI translates those specifications into functional code.",
          "The term \"Vibe\" refers to an intuitive, intent-driven mental model. You convey the essence of the architecture and the user requirements, and the AI resolves the concrete syntax (e.g. elements, braces, tags). It democratizes programming for non-technical creators while serving as a 10x force multiplier for professional engineers."
        ]
      },
      {
        title: "Traditional Coding vs Vibe Coding",
        paragraphs: [
          "In Traditional Coding, success is constrained by memory of syntactic rules, manual compilation, line-by-line debugging, and language-specific design patterns. The learning curve stretches from months to years, and significant time is lost tracking down minor errors like missing semicolons.",
          "In Vibe Coding, you operate as a technical pilot. You steer the AI, orchestrate file division, validate security borders, and adjust styling variables. Debugging is done by feeding system logs or error stacks back into the model for instant diagnostics. You focus entirely on user experience and business logic."
        ]
      },
      {
        title: "Benefits and Limitations",
        paragraphs: [
          "Benefits: Radically accelerated deployment speed (hours instead of weeks), massive reduction in startup cost, automatic security checks, rapid prototyping, and easier cognitive loading (it eliminates syntactic friction).",
          "Limitations: High reliance on prompt quality, risk of model hallucinations (phantom APIs or mock libraries), and occasional implementation drift. It requires human pilots to verify imports, configurations, and environment credentials."
        ]
      }
    ],
    practicalExercises: [
      "Open any generative AI Chat and ask it: 'Generate a single-file elegant HTML greeting page with Tailwind CSS.'",
      "Save the result in a local directory, open it in a browser, and hover over its interactive elements to view transitions."
    ],
    assignment: {
      title: "Create a Simple Personal Profile Webpage",
      requirements: [
        "Include your full name and a dynamic photo placeholder.",
        "Add a 3-sentence biography representing your developer class.",
        "Include fully-styled hover states on social links."
      ]
    },
    quiz: {
      question: "Which option best describes the core operational shift in Vibe Coding?",
      options: [
        "Writing machine code directly using physical switches.",
        "Focusing on natural language intent and leaving syntax compilation to the AI.",
        "Avoiding code entirely and drawing layouts on physical paper.",
        "Letting automated test suites write their own unit tests."
      ],
      correctAnswerIndex: 1,
      explanation: "Vibe Coding focuses on conveying high-level human intent through rich prompting, allowing the AI to construct and refine the actual programming syntax."
    }
  },
  {
    id: 2,
    levelNum: 2,
    title: "AI Tools for Vibe Coding",
    subtitle: "Level 2: Building Your Tool-Chain",
    category: "Tooling",
    difficulty: "Beginner",
    rewardXp: 200,
    objectives: [
      "Learn the core strengths of different specialized generative models",
      "Compare outputs from chat interfaces and AI-native IDEs",
      "Understand where each tool excels in a production stack"
    ],
    sections: [
      {
        title: "The LLM Landscape",
        paragraphs: [
          "Different models have distinct training biases and execution profiles. ChatGPT (OpenAI) offers highly versatile logic and general-purpose scripting capability. Claude (Anthropic) is highly valued for long-context comprehension, reading huge code files, and designing complex architecture paths with low hallucinations.",
          "Gemini (Google) stands out due to its rapid reasoning, massive token window, native code compilation tests, and deep Google ecosystem integrations. DeepSeek provides powerful, specialized coding logic on technical mathematical algorithms."
        ]
      },
      {
        title: "AI-Native Integrated Development Environments",
        paragraphs: [
          "While chat interfaces are good for concepts, full productivity requires tooling inside your editor. GitHub Copilot integrates directly into editors as a smart autocomplete companion. Cursor AI, a dedicated fork of VS Code, possesses file-system awareness, allowing you to ask questions about your entire project, make surgical edits with single shortcuts, and auto-apply code safely."
        ]
      }
    ],
    practicalExercises: [
      "Generate a single CSS button in ChatGPT and Gemini using the identical prompt and compare their drop-shadow and padding selections."
    ],
    assignment: {
      title: "The Multi-AI Code Duel",
      requirements: [
        "Generate a simple calculator's layout through two different AI chat modules.",
        "Inspect the structural grid of both files and document who constructed cleaner responsive wrappers."
      ]
    },
    quiz: {
      question: "Which tool is a dedicated fork of VS Code, allowing chat-based query over your entire local codebase?",
      options: [
        "GitHub Copilot Extension",
        "Cursor AI",
        "Perplexity Search",
        "Google Sheets"
      ],
      correctAnswerIndex: 1,
      explanation: "Cursor AI is built on the VS Code source but integrates native, context-aware AI interactions that understand your local project structure."
    }
  },
  {
    id: 3,
    levelNum: 3,
    title: "Prompt Engineering for Developers",
    subtitle: "Level 3: Conveying Intent Like an Architect",
    category: "Prompting",
    difficulty: "Intermediate",
    rewardXp: 220,
    objectives: [
      "Master context prompting and the role assignment pattern",
      "Understand the mechanics of Chain-of-Thought (CoT) reasoning",
      "Utilize Few-Shot prompting to dictate rigorous output structures"
    ],
    sections: [
      {
        title: "The Anatomy of a Production Prompt",
        paragraphs: [
          "A professional prompt is composed of: 1) Role / Persona (e.g. 'You are a veteran security auditor...'), 2) Clear Goal, 3) Implementation Constraints (e.g. 'Use vanilla React, no external state libraries'), 4) Exact Context (e.g. 'Running behind an nginx reverse proxy on Port 3000'), and 5) Expected Output formatting.",
          "Failing to dictate boundaries invites model drift. The more precise your negative constraints (what not to do), the cleaner the generated code will be."
        ]
      },
      {
        title: "Advanced Prompting Paradigms",
        paragraphs: [
          "Chain-of-Thought (CoT) prompts force the AI to write down its logic step-by-step prior to writing any code. This decreases logical errors. Few-Shot prompting feeds 1 to 3 mock inputs and outputs into the prompt first, setting an exact structural standard for the AI to replicate."
        ]
      }
    ],
    practicalExercises: [
      "Write a prompt with the template: [Role] + [Constraint] + [Target Output] to create a calendar widget."
    ],
    assignment: {
      title: "Anatomy of constraints",
      requirements: [
        "Consolidate a prompt that blocks the AI from utilizing any frameworks other than native Tailwind CSS."
      ]
    },
    quiz: {
      question: "Which technique requires providing 1-3 structural examples of input-output mappings in the prompt itself?",
      options: [
        "Zero-Shot Prompting",
        "Few-Shot Prompting",
        "Iterative Debugging",
        "System Log Refactoring"
      ],
      correctAnswerIndex: 1,
      explanation: "Few-Shot prompting guides the model's pattern matching by showing examples of output formats before requesting the actual generation."
    }
  },
  {
    id: 4,
    levelNum: 4,
    title: "Web Development with AI",
    subtitle: "Level 4: HTML, CSS, & Javascript Mastery",
    category: "Development",
    difficulty: "Intermediate",
    rewardXp: 250,
    objectives: [
      "Understand core semantic tags and browser layout engines",
      "Utilize Flexbox and grid systems for pixel-perfect mobile-first design",
      "Harness Event Listeners and LocalStorage for simple persistence"
    ],
    sections: [
      {
        title: "Semantic HTML & Responsive Elements",
        paragraphs: [
          "HTML structures information online. Using semantic tags like <main>, <header>, and 🕹️ <section> helps visually impaired accessibility readers and improves SEO. CSS controls the visual layout. Traditional floating structures are deprecated; modern layouts rely heavily on Flexbox (one-dimensional alignment) and CSS Grid (two-dimensional matrices)."
        ]
      },
      {
        title: "JavaScript and Dynamic DOM Modification",
        paragraphs: [
          "JavaScript infuses life into elements. It registers user trigger listeners (e.g. click, scroll), alters element classes dynamically, and saves progress state locally via localStorage. In the AI era, understanding DOM flow lets you quickly correct scripting tags."
        ]
      }
    ],
    practicalExercises: [
      "Construct a CSS container with display: grid that rearranges from 3 columns to 1 column on mobile breakpoints."
    ],
    assignment: {
      title: "Local State Tracker",
      requirements: [
        "Write a functional counter that reads its previous value from localStorage on load."
      ]
    },
    quiz: {
      question: "What modern CSS layout engine is native for creating grid-based column and row configurations?",
      options: [
        "CSS Float Engine",
        "Inline Block Layouts",
        "CSS Grid",
        "Box Margin Sizing"
      ],
      correctAnswerIndex: 2,
      explanation: "CSS Grid is a powerful native mechanism for dividing layouts into custom responsive columns and rows."
    }
  },
  {
    id: 5,
    levelNum: 5,
    title: "No-Code and Low-Code Development",
    subtitle: "Level 5: Unleashing Rapid Prototypes",
    category: "Development",
    difficulty: "Intermediate",
    rewardXp: 260,
    objectives: [
      "Understand differences between no-code databases and relational systems",
      "Learn when to use Bubble, Softr, Glide, and FlutterFlow",
      "Master spreadsheet-database integration with Airtable"
    ],
    sections: [
      {
        title: "Intro to Visual Programming Platforms",
        paragraphs: [
          "No-code systems replace text programming with graphical canvas builders. Bubble handles complex, custom transactional apps with detailed logic and user authentication. Softr links seamlessly to Airtable data matrices to render custom dashboards. FlutterFlow outputs native mobile packages for Android and iOS using high-performance Flutter frameworks."
        ]
      }
    ],
    practicalExercises: [
      "Map out the data fields needed for an inventory app synced with spreadsheet columns."
    ],
    assignment: {
      title: "School CRM Schema Design",
      requirements: [
        "Plan a schema that links 'Students Table' to 'Attendance Records' without manual relational code."
      ]
    },
    quiz: {
      question: "If you need to rapidly create client portal views using data hosted in Airtable sheets, which platform is best?",
      options: [
        "FlutterFlow",
        "Softr",
        "Vercel Serverless",
        "Adalo Core"
      ],
      correctAnswerIndex: 1,
      explanation: "Softr is optimized to sync instantly with Airtable, rendering secure, customized portals and listings without code."
    }
  },
  {
    id: 6,
    levelNum: 6,
    title: "UI/UX Design with AI",
    subtitle: "Level 6: Human-Centered Design Aesthetics",
    category: "Design",
    difficulty: "Advanced",
    rewardXp: 280,
    objectives: [
      "Apply consistency, visual hierarchy, and contrast parameters",
      "Design clear, frictionless user experience flows",
      "Differentiate between wireframing fidelities"
    ],
    sections: [
      {
        title: "The Visual Grid of UI",
        paragraphs: [
          "A stunning design isn't accidental—it balances layout, text sizing, color, and spacing. Visual hierarchy commands the eye to read headlines first. Micro-feedback transitions (such as hover and active button state changes) assure users their taps are processed correctly."
        ]
      },
      {
        title: "Frictionless Journeys",
        paragraphs: [
          "User Experience (UX) focuses on minimizing steps to purchase or save. Clear empty states, predictive forms, and contextual menus prevent cognitive fatigue. Always test contrast levels to protect sight accessibility on small screens."
        ]
      }
    ],
    practicalExercises: [
      "Apply standard padding parameters (e.g. p-4, p-6, px-8) on varying components to observe physical balance."
    ],
    assignment: {
      title: "The Accessible Form",
      requirements: [
        "Review a generated form to confirm error labels are clearly associated with invalid inputs."
      ]
    },
    quiz: {
      question: "Which principle directs a user's eyes to the most critical action button first by altering size, weight, and color relative to secondary elements?",
      options: [
        "Whitespace",
        "Visual Hierarchy",
        "Flexbox Wrapping",
        "System Log Refactoring"
      ],
      correctAnswerIndex: 1,
      explanation: "Visual Hierarchy leverages structural variations (size, color, weight) to emphasize critical points of interest before secondary elements."
    }
  },
  {
    id: 7,
    levelNum: 7,
    title: "Mobile App Development with AI",
    subtitle: "Level 7: Responsive Mobile Platforms",
    category: "Development",
    difficulty: "Advanced",
    rewardXp: 300,
    objectives: [
      "Understand Mobile frameworks like React Native and Expo",
      "Optimize touchscreen interfaces and user interactions",
      "Deploy code to native build packages"
    ],
    sections: [
      {
        title: "The Mobile Viewport",
        paragraphs: [
          "Designing for mobile devices introduces different constraints: variable aspect ratios, physical gestures (swipes, long presses), keyboard overlays, and tactile touch targets (which must be at least 44px).",
          "Cross-platform frameworks like React Native and Flutter allow code compilation to both iOS and Android. Expo streamlines React Native by providing built-in SDK packages for cameras, sharing, and notifications."
        ]
      }
    ],
    practicalExercises: [
      "Audit a card layout to ensure all clickable action buttons are touch-friendly (44x44px minimum sizing)."
    ],
    assignment: {
      title: "Expo Native Features",
      requirements: [
        "Plan a workflow to access camera permissions using React Native Expo imports."
      ]
    },
    quiz: {
      question: "What is the recommended minimum surface sizing for touchable button elements on mobile devices to prevent user error?",
      options: [
        "10px by 10px",
        "24px by 24px",
        "44px by 44px",
        "120px by 120px"
      ],
      correctAnswerIndex: 2,
      explanation: "UX conventions mandate touch targets of at least 44px by 44px to accommodate different fingertip sizes without accidental selections."
    }
  },
  {
    id: 8,
    levelNum: 8,
    title: "Databases and Cloud Storage",
    subtitle: "Level 8: Real-Time Data Streams",
    category: "Cloud",
    difficulty: "Advanced",
    rewardXp: 320,
    objectives: [
      "Contrast Relational (SQL) and NoSQL Document architectures",
      "Configure Firestore persistent structures and collections",
      "Enforce standard security configurations for open reading paths"
    ],
    sections: [
      {
        title: "Persistent Structured Data",
        paragraphs: [
          "Storage options depend on structural needs. SQL databases (like PostgreSQL) are rigid and enforce connections across tables. Document stores (like firestore, part of Firebase) manage data in JSON-style collections and documents, allowing scaling without migrations.",
          "Securing variables requires strict rule definitions. You must verify user matching parameters inside cloud rule files to deny unauthorized reading or modifications."
        ]
      }
    ],
    practicalExercises: [
      "Diagram a 'User Profile' collection containing sub-collection pointers for 'Course Metrics'."
    ],
    assignment: {
      title: "Firestore Core Sizing",
      requirements: [
        "Write secure pseudo Firestore rules that only allow users to edit documents bearing their own UID."
      ]
    },
    quiz: {
      question: "Which structure does Firebase Firestore use to group individual records together?",
      options: [
        "CSV Spreadsheet Columns",
        "Nested Relational Indexes",
        "Collections and Documents",
        "Binary Byte Segments"
      ],
      correctAnswerIndex: 2,
      explanation: "NoSQL stores like Firestore arrange record items into Documents grouped neatly inside thematic Collections."
    }
  },
  {
    id: 9,
    levelNum: 9,
    title: "Automation and API Channels",
    subtitle: "Level 9: Orchestrating Services",
    category: "Systems",
    difficulty: "Advanced",
    rewardXp: 340,
    objectives: [
      "Configure REST API endpoints and process JSON packets",
      "Integrate Zapier/Make webhooks to connect cloud services",
      "Handle API credentials securely inside environment assets"
    ],
    sections: [
      {
        title: "Web Services & Data Transmission",
        paragraphs: [
          "Applications survive on dynamic real-world connections. Web APIs transmit information across networks using REST or GraphQL channels. Secrets (like the Gemini Key) must never exist directly inside public frontend views, requiring proxy routers or environment variable boundaries.",
          "Visual automation tools like Zapier let you capture webhooks and update email databases, Slack chats, or Google Sheets with trigger-action flows."
        ]
      }
    ],
    practicalExercises: [
      "Declare a secret inside .env.example and outline an Express routing block that uses process.env without exposure."
    ],
    assignment: {
      title: "The Automated Webhook Plan",
      requirements: [
        "Draft a payload model that transmits student graduation alerts to an automated email flow."
      ]
    },
    quiz: {
      question: "To prevent vital credential keys (e.g. GEMINI_API_KEY) from being stolen, where should they be loaded and executed?",
      options: [
        "Directly in client-side HTML script tags",
        "On the backend server using process.env wrappers",
        "Inside public CSS properties",
        "Within easily inspectable browser comments"
      ],
      correctAnswerIndex: 1,
      explanation: "Security standards demand keeping raw API secrets isolated on server environments, loading them via context variables."
    }
  },
  {
    id: 10,
    levelNum: 10,
    title: "SaaS Deployment & Capstone Finale",
    subtitle: "Level 10: Ship on Production",
    category: "Deployment",
    difficulty: "Advanced",
    rewardXp: 400,
    objectives: [
      "Understand continuous deployment via GitHub triggers",
      "Deploy full-stack code on cloud hosting platforms",
      "Pitch projects to audience circles"
    ],
    sections: [
      {
        title: "Hosting, Continuous Integration & SaaS Launch",
        paragraphs: [
          "Developing the code is only half the battle. Hosting providers like Vercel, Netlify, and Cloud Run handle automatic compilations whenever you push revisions to a repository.",
          "Launching on Product Hunt, presenting projects on social channels, and pricing services appropriately are crucial steps for modern software success."
        ]
      }
    ],
    practicalExercises: [
      "Prepare a 3-sentence elevator pitch summarizing how a target client solves a problem with your application."
    ],
    assignment: {
      title: "PVC-AID Capstone Pitch",
      requirements: [
        "Plan your deployment steps and define the key telemetry parameters for launching your application safely."
      ]
    },
    quiz: {
      question: "What service paradigm facilitates syncing code changes with a live website on every git commit automatically?",
      options: [
        "Manual FTP Uploads",
        "Continuous Deployment (CD) pipelines",
        "Offline Storage Backups",
        "Local System Restarts"
      ],
      correctAnswerIndex: 1,
      explanation: "CD systems connect with GitHub/GitLab to automatically rebuild and redepoy your live files on every commit."
    }
  }
];
