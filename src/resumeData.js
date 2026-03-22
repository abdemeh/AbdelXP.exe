const withBasePath = (path) => `${import.meta.env.BASE_URL}${path.replace(/^\/+/, "")}`;

export const resumeData = {
  en: {
    profile: {
      name: "Abdellatif El-Mahdaoui",
      title: "Engineering Student - Cloud Computing Specialty",
      specialization: "3rd-year Cloud Computing Engineering Student",
      bio: "Currently an engineering student at CY Tech, I specialize in Cloud Computing and Full Stack development.",
      longBio:
        "3rd-year engineering student (Master's level) at CY Tech, specializing in Cloud Computing Engineering. Passionate about software development, distributed systems, and cloud solutions, I distinguish myself through curiosity, rigor, and autonomy. My background has allowed me to develop solid skills in DevOps and Cloud environments, with a strong interest in technological innovation.",
      contact: {
        address: "Talence, France",
        email: "elmahdaoui@cy-tech.fr",
        location: "Talence, France",
        github: "https://github.com/abdemeh",
        linkedin: "https://linkedin.com/in/elmahdaoui/"
      }
    },
    experience: [
      {
        period: "April - August 2025",
        title: "Web Developer (Internship)",
        company: "INFOSAT Agadir, Morocco",
        description:
          "Development of web and desktop applications (Java, JEE, Angular, PHP). Deployment and administration of virtualized servers under Proxmox with network and service configuration."
      },
      {
        period: "October 24, 2024",
        title: "Junior Team Manager for Hackathon",
        company: "ATILLA-CY Tech Hackathon, France",
        description:
          "Managed a 6-person team during a hackathon and coordinated the delivery of an FPS game project built in Python."
      },
      {
        period: "2021 - 2022",
        title: "Freelance",
        company: "UpWork / Fiverr",
        description:
          "Built automation scripts and custom tools (Python, Selenium, Pandas, C#, PHP, PyAutoGUI) for international clients."
      },
      {
        period: "April - June 2020",
        title: "Junior Developer (Internship)",
        company: "Faculty of Sciences Fez, Morocco",
        description:
          "Developed a web platform for courses and exams using React, HTML, CSS, JavaScript, PHP, and MySQL."
      }
    ],
    education: [
      {
        period: "2023 - 2026",
        title: "Engineering Degree - Cloud Computing Engineering",
        institution: "CY Tech Engineering School, Pau",
        description: "Engineering cycle in Cloud Computing with focus on modern cloud architectures."
      },
      {
        period: "2019 - 2020",
        title: "Pro. License - Information Systems and Software Engineering",
        institution: "Faculty of Sciences Fez, Morocco",
        description: "Professional license focused on information systems and software development."
      },
      {
        period: "2017 - 2019",
        title: "University Diploma of Technology - Computer Engineering",
        institution: "Higher School of Technology Guelmim, Morocco",
        description: "Strong foundation in programming, systems, and software engineering practices."
      }
    ],
    projects: [
      {
        title: "GDPR Platform - Data Anonymization",
        tags: ["Python", "Flask", "React", "TailwindCSS", "Pandas", "Numpy"],
        description:
          "Built a complete web app to anonymize CSV files through masking, pseudonymization, generalization, perturbation, and aggregation.",
        url: "https://github.com/abdemeh/PlateformeRGPD"
      },
      {
        title: "Apex F1",
        tags: ["React", "Vite", "i18next", "CSS Modules", "API"],
        description:
          "Modern responsive F1 dashboard to visualize live stats, standings, and driver details with bilingual support.",
        url: "https://github.com/abdemeh/apex-f1"
      },
      {
        title: "Real-Time Financial Portfolio Management",
        tags: ["Scala", "Akka HTTP", "React", "MongoDB", "TailwindCSS"],
        description:
          "Developed a secure platform with JWT authentication, REST APIs, and a modern frontend for real-time portfolio management.",
        url: "https://github.com/abdemeh/GestionPortefeuillesFinance"
      },
      {
        title: "CY-Books",
        tags: ["Java", "GUI", "Management", "Algorithms"],
        description:
          "Designed a full library management application with user handling, stock tracking, and loan alert workflows.",
        url: "https://github.com/abdemeh/CY-Books"
      },
      {
        title: "University Platform",
        tags: ["PHP", "MySQL", "Bootstrap", "HTML", "CSS", "JavaScript"],
        description: "Web application for managing university users and student services.",
        url: "https://github.com/abdemeh/GestionMaterielUniversitaire"
      }
    ],
    skills: {
      cloud: ["AWS", "Google Cloud", "Azure", "Terraform", "Docker", "Firebase", "Git"],
      backend: ["Java", "Spring", "Oracle", "MySQL", "MongoDB", "Node.js", "Scala", "PHP"],
      frontend: ["React", "Angular", "JavaScript", "Tailwind CSS", "HTML", "CSS"],
      systems: ["Linux", "Python", "C++", "C", "Electron", "R", "Windows", "Mac OS"],
      design: ["Figma", "Adobe Photoshop", "Adobe Illustrator", "Adobe Premiere Pro"]
    }
  },
  fr: {
    profile: {
      name: "Abdellatif El-Mahdaoui",
      title: "Étudiant ingénieur - Spécialité Cloud Computing",
      specialization: "Étudiant en 3e année d'ingénierie Cloud Computing",
      bio: "Actuellement étudiant ingénieur à CY Tech, je me spécialise en Cloud Computing et en développement Full Stack.",
      longBio:
        "Étudiant en 3e année du cycle ingénieur (BAC+5) à CY Tech, spécialité Ingénierie du Cloud Computing. Passionné par le développement logiciel, les systèmes distribués et les solutions cloud, je me distingue par ma curiosité, ma rigueur et mon autonomie. Mon parcours m'a permis de développer des compétences solides en environnements DevOps et Cloud.",
      contact: {
        address: "Talence, France",
        email: "elmahdaoui@cy-tech.fr",
        location: "Talence, France",
        github: "https://github.com/abdemeh",
        linkedin: "https://linkedin.com/in/elmahdaoui/"
      }
    },
    experience: [
      {
        period: "Avril - Août 2025",
        title: "Développeur Web (Stage)",
        company: "INFOSAT Agadir, Maroc",
        description:
          "Développement d'applications web et desktop (Java, JEE, Angular, PHP). Déploiement et administration de serveurs virtualisés sous Proxmox avec configuration réseau et services."
      },
      {
        period: "24 Octobre 2024",
        title: "Junior Team Manager pour Hackathon",
        company: "Hackathon ATILLA-CY Tech, France",
        description:
          "Management d'une équipe de 6 personnes pendant un hackathon, coordination et suivi du développement d'un jeu FPS en Python."
      },
      {
        period: "2021 - 2022",
        title: "Freelance",
        company: "UpWork / Fiverr",
        description:
          "Développement de scripts d'automatisation et d'outils sur mesure (Python, Selenium, Pandas, C#, PHP, PyAutoGUI) pour des clients internationaux."
      },
      {
        period: "Avril - Juin 2020",
        title: "Développeur Junior (Stage)",
        company: "Faculté des Sciences de Fès, Maroc",
        description:
          "Développement d'une plateforme web de cours/examens avec React, HTML, CSS, JavaScript, PHP et MySQL."
      }
    ],
    education: [
      {
        period: "2023 - 2026",
        title: "Cycle d'ingénieur - Ingénierie du Cloud Computing",
        institution: "CY Tech école d'ingénieurs, Pau",
        description: "Cycle d'ingénieur axé sur le Cloud Computing et les architectures modernes."
      },
      {
        period: "2019 - 2020",
        title: "Licence Pro - Systèmes d'Information et Génie Logiciel",
        institution: "Faculté des Sciences de Fès, Maroc",
        description: "Formation orientée systèmes d'information et développement logiciel."
      },
      {
        period: "2017 - 2019",
        title: "DUT - Génie Informatique",
        institution: "École Supérieure de Technologie Guelmim, Maroc",
        description: "Base solide en programmation, systèmes et génie logiciel."
      }
    ],
    projects: [
      {
        title: "Plateforme RGPD - Anonymisation de Données",
        tags: ["Python", "Flask", "React", "TailwindCSS", "Pandas", "Numpy"],
        description:
          "Application web complète pour anonymiser des fichiers CSV via plusieurs méthodes (masquage, pseudonymisation, généralisation, perturbation, agrégation).",
        url: "https://github.com/abdemeh/PlateformeRGPD"
      },
      {
        title: "Apex F1",
        tags: ["React", "Vite", "i18next", "CSS Modules", "API"],
        description:
          "Dashboard F1 moderne et réactif pour visualiser les statistiques en temps réel, classements et détails pilotes.",
        url: "https://github.com/abdemeh/apex-f1"
      },
      {
        title: "Gestion de Portefeuilles Financiers en Temps Réel",
        tags: ["Scala", "Akka HTTP", "React", "MongoDB", "TailwindCSS"],
        description:
          "Plateforme sécurisée avec API REST, authentification JWT et interface moderne en React pour la gestion de portefeuilles.",
        url: "https://github.com/abdemeh/GestionPortefeuillesFinance"
      },
      {
        title: "CY-Books",
        tags: ["Java", "GUI", "Management", "Algorithms"],
        description:
          "Application complète de gestion de bibliothèque: utilisateurs, suivi des stocks, alertes de prêts et historique.",
        url: "https://github.com/abdemeh/CY-Books"
      },
      {
        title: "Plateforme Universitaire",
        tags: ["PHP", "MySQL", "Bootstrap", "HTML", "CSS", "JavaScript"],
        description: "Application web pour la gestion des utilisateurs et services universitaires.",
        url: "https://github.com/abdemeh/GestionMaterielUniversitaire"
      }
    ],
    skills: {
      cloud: ["AWS", "Google Cloud", "Azure", "Terraform", "Docker", "Firebase", "Git"],
      backend: ["Java", "Spring", "Oracle", "MySQL", "MongoDB", "Node.js", "Scala", "PHP"],
      frontend: ["React", "Angular", "JavaScript", "Tailwind CSS", "HTML", "CSS"],
      systems: ["Linux", "Python", "C++", "C", "Electron", "R", "Windows", "Mac OS"],
      design: ["Figma", "Adobe Photoshop", "Adobe Illustrator", "Adobe Premiere Pro"]
    }
  }
};

export const desktopApps = [
  {
    id: "about",
    label: "About Me",
    taskLabel: "About Me",
    windowTitle: "About Me",
    icon: withBasePath("images/about.png")
  },
  {
    id: "education",
    label: "Education",
    taskLabel: "Education",
    windowTitle: "Education",
    icon: withBasePath("images/graduation.png")
  },
  {
    id: "experience",
    label: "Experience",
    taskLabel: "Experience",
    windowTitle: "Experience",
    icon: withBasePath("images/suitcase.png")
  },
  {
    id: "projects",
    label: "Projects",
    taskLabel: "Projects",
    windowTitle: "Projects",
    icon: withBasePath("images/code.png")
  },
  {
    id: "skills",
    label: "Skills",
    taskLabel: "Skills",
    windowTitle: "Skills",
    icon: withBasePath("images/book.png")
  },
  {
    id: "hobbies",
    label: "Hobbies",
    taskLabel: "Hobbies",
    windowTitle: "Hobbies",
    icon: withBasePath("images/controller.png")
  },
  {
    id: "contact",
    label: "Contact",
    taskLabel: "Contact",
    windowTitle: "Contact",
    icon: withBasePath("images/mail.png")
  },
  {
    id: "resume",
    label: "Resume",
    taskLabel: "Resume",
    windowTitle: "Resume",
    icon: withBasePath("images/resume.png")
  }
];

export const windowLayout = {
  about: { left: "6%", top: "12%", width: "min(430px, 90vw)", height: "465px" },
  education: { left: "20%", top: "16%", width: "min(520px, 92vw)", height: "470px" },
  experience: { left: "35%", top: "10%", width: "min(560px, 94vw)", height: "590px" },
  projects: { left: "18%", top: "24%", width: "min(650px, 95vw)", height: "460px" },
  skills: { left: "9%", top: "23%", width: "min(600px, 93vw)", height: "440px" },
  hobbies: { left: "20%", top: "14%", width: "min(560px, 95vw)", height: "470px" },
  contact: { left: "46%", top: "24%", width: "min(420px, 92vw)", height: "280px" },
  resume: { left: "14%", top: "9%", width: "min(760px, 96vw)", height: "620px" }
};

export const wallpapers = [
  {
    id: "wallpaper-1",
    file: withBasePath("images/wallpaper-1.png"),
    label: {
      en: "Wallpaper 1",
      fr: "Fond d'écran 1"
    }
  },
  {
    id: "wallpaper-2",
    file: withBasePath("images/wallpaper-2.png"),
    label: {
      en: "Wallpaper 2",
      fr: "Fond d'écran 2"
    }
  },
  {
    id: "wallpaper-3",
    file: withBasePath("images/wallpaper-3.png"),
    label: {
      en: "Wallpaper 3",
      fr: "Fond d'écran 3"
    }
  },
  {
    id: "wallpaper-4",
    file: withBasePath("images/wallpaper-4.png"),
    label: {
      en: "Wallpaper 4",
      fr: "Fond d'écran 4"
    }
  }
];
