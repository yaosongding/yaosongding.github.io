export const translations = {
  zh: {
    site: {
      title: "Anderson Yao",
      description: "个人网站",
    },
    nav: {
      about: "关于",
      techStack: "技术栈",
      projects: "项目",
      blog: "博客",
      contact: "联系",
    },
    home: {
      greeting: "你好，我是",
      role: "软件工程师",
      intro:
        "热爱构建简洁、高效的软件系统。专注于系统设计与工程实践。",
    },
    techStack: {
      title: "技术栈",
      languages: "语言",
      frontend: "前端",
      backend: "后端",
      tools: "工具 & 基础设施",
    },
    projects: {
      title: "项目作品",
      noProjects: "暂无项目展示。",
    },
    blog: {
      title: "博客",
      readingTime: "分钟阅读",
      noPosts: "暂无文章。",
      backToBlog: "← 返回博客",
    },
    contact: {
      title: "联系方式",
      email: "邮箱",
      github: "GitHub",
      linkedin: "LinkedIn",
    },
    footer: {
      builtWith: "由 Astro 构建，部署于 GitHub Pages",
    },
    langSwitch: {
      label: "EN",
      url: "/en",
    },
  },
  en: {
    site: {
      title: "Anderson Yao",
      description: "Personal Website",
    },
    nav: {
      about: "About",
      techStack: "Tech Stack",
      projects: "Projects",
      blog: "Blog",
      contact: "Contact",
    },
    home: {
      greeting: "Hi, I'm",
      role: "Software Engineer",
      intro:
        "I build clean, efficient software systems. Focused on system design and engineering practice.",
    },
    techStack: {
      title: "Tech Stack",
      languages: "Languages",
      frontend: "Frontend",
      backend: "Backend",
      tools: "Tools & Infrastructure",
    },
    projects: {
      title: "Projects",
      noProjects: "No projects to show yet.",
    },
    blog: {
      title: "Blog",
      readingTime: "min read",
      noPosts: "No posts yet.",
      backToBlog: "← Back to Blog",
    },
    contact: {
      title: "Contact",
      email: "Email",
      github: "GitHub",
      linkedin: "LinkedIn",
    },
    footer: {
      builtWith: "Built with Astro, deployed on GitHub Pages",
    },
    langSwitch: {
      label: "中文",
      url: "/zh",
    },
  },
} as const;

export type Locale = keyof typeof translations;
export type TranslationKey = typeof translations;
