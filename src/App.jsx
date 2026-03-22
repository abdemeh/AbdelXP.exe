import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { desktopApps, resumeData, wallpapers, windowLayout } from "./resumeData";

const INITIAL_WINDOWS = [];
const MOBILE_BREAKPOINT = 980;
const BOOT_DURATION_MS = 2200;
const LANGUAGE_STORAGE_KEY = "abdelxp-language";
const WALLPAPER_STORAGE_KEY = "abdelxp-wallpaper";
const ZOOM_STORAGE_KEY = "abdelxp-zoom";
const SOUND_STORAGE_KEY = "abdelxp-sound";
const WELCOME_LABEL = "Welcome";
const RAPID_CLICK_THRESHOLD = 9;
const RAPID_CLICK_WINDOW_MS = 1600;
const RAPID_CLICK_COOLDOWN_MS = 3500;
const RIGHT_CLICK_ALERT_COOLDOWN_MS = 1200;
const ZOOM_LEVELS = [0.88, 0.99, 1.1, 1.21, 1.32, 1.43];
const ZOOM_DISPLAY_BASE = 1.1;
const TIP_MIN_INTERVAL_MS = 18000;
const TIP_MAX_INTERVAL_MS = 35000;
const TIP_AUTO_DISMISS_MS = 9000;
const withBasePath = (path) => `${import.meta.env.BASE_URL}${path.replace(/^\/+/, "")}`;

const APP_LABELS = {
  en: {
    about: "About Me",
    education: "Education",
    experience: "Experience",
    projects: "Projects",
    skills: "Skills",
    hobbies: "Hobbies",
    contact: "Contact",
    resume: "Resume"
  },
  fr: {
    about: "À propos",
    education: "Éducation",
    experience: "Expérience",
    projects: "Projets",
    skills: "Compétences",
    hobbies: "Loisirs",
    contact: "Contact",
    resume: "CV"
  }
};

const UI_TEXT = {
  en: {
    bootTitle: "Welcome",
    bootSubtitle: "Loading your retro desktop...",
    popupTitle: "Welcome to my Retro Resume Desktop",
    popupText:
      "This site works like a classic OS desktop. Open apps from icons or the taskbar, and drag windows from the title bar.",
    popupItems: [
      "About Me: quick profile and summary",
      "Education and Experience: timeline of my journey",
      "Projects and Skills: stack and portfolio highlights",
      "Contact: email and social links"
    ],
    popupButton: "Enter Desktop",
    clickAlertTitle: "Easy there",
    clickAlertText: "Too many quick clicks. Give the desktop a short break.",
    clickAlertButton: "OK",
    rightClickAlertTitle: "Right click disabled",
    rightClickAlertText:
      "Right click is disabled on this desktop. Please use the app controls and buttons.",
    rightClickAlertButton: "OK",
    tipTitle: "Fun facts",
    tipOpenButton: "Open facts",
    tipPrev: "Previous fact",
    tipNext: "Next fact",
    tipClose: "Close facts",
    tips: [
      "I love cooking \u2014 always trying new recipes!",
      "I am always on Discord, feel free to message me!",
      "Big PC gaming fan \u2014 this is my main hobby.",
      "EA Sports FC is my favorite game. Let\u2019s play!",
      "I listen to music while coding. Every single time.",
      "I am a Real Madrid fan.",
      "Night owl \u2014 I do my best work late at night.",
      "My PC is always on \u2014 I\u2019m basically always online.",
      "I love Formula 1! Max Verstappen is the best \u2014 Tu Tu Turu!"
    ],
    start: "Start",
    language: "Language",
    english: "English",
    french: "French",
    zoom: "Zoom",
    zoomIn: "Zoom in",
    zoomOut: "Zoom out",
    resetZoom: "Reset",
    wallpaper: "Wallpaper",
    shutdown: "Shutdown",
    chooseUser: "Choose a user",
    clickToLogin: "Click to login",
    educationTitle: "Education",
    experienceTitle: "Experience",
    projectsTitle: "Projects",
    skillsTitle: "Skills",
    hobbiesTitle: "Hobbies",
    gamingLabel: "Gaming",
    cookingLabel: "Cooking",
    cookingText:
      "Moroccan Cuisine: I love trying whatever I find on TikTok (or whatever my mom tells me).",
    surfLabel: "Surf",
    surfText: "When I am in Taghazot, Agadir.",
    contactTitle: "Contact",
    resumeTitle: "Resume",
    downloadResume: "Download Resume",
    locationLabel: "Location",
    specializationLabel: "Specialization",
    emailLabel: "Email",
    openInGithub: "Open in GitHub",
    skillsLabels: {
      cloud: "Cloud & DevOps",
      backend: "Backend",
      frontend: "Frontend",
      systems: "Languages & Systems",
      design: "Design"
    }
  },
  fr: {
    bootTitle: "Bienvenue",
    bootSubtitle: "Chargement de votre bureau rétro...",
    popupTitle: "Bienvenue sur mon Bureau CV Rétro",
    popupText:
      "Ce site fonctionne comme un ancien système. Ouvrez les applis via les icônes ou la barre des tâches, et déplacez les fenêtres depuis la barre de titre.",
    popupItems: [
      "À propos: profil et présentation rapide",
      "Éducation et Expérience: frise de mon parcours",
      "Projets et Compétences: stack et réalisations",
      "Contact: email et liens sociaux"
    ],
    popupButton: "Entrer sur le bureau",
    clickAlertTitle: "Doucement",
    clickAlertText: "Trop de clics très rapides. Laissez souffler le bureau un instant.",
    clickAlertButton: "OK",
    rightClickAlertTitle: "Clic droit désactivé",
    rightClickAlertText:
      "Le clic droit est désactivé sur ce bureau. Utilisez les boutons et commandes de l'application.",
    rightClickAlertButton: "OK",
    tipTitle: "Anecdotes",
    tipOpenButton: "Ouvrir les anecdotes",
    tipPrev: "Anecdote précédente",
    tipNext: "Anecdote suivante",
    tipClose: "Fermer les anecdotes",
    tips: [
      "J\u2019adore cuisiner \u2014 toujours de nouvelles recettes !",
      "Je suis toujours sur Discord, n\u2019h\u00e9sitez pas \u00e0 m\u2019\u00e9crire !",
      "Grand fan de jeux vid\u00e9o, surtout sur PC.",
      "EA Sports FC est mon jeu pr\u00e9f\u00e9r\u00e9. \u00c0 bient\u00f4t !",
      "J\u2019\u00e9coute de la musique en codant. Sans exception.",
      "Je suis fan du Real Madrid.",
      "Je suis couche-tard \u2014 je travaille mieux la nuit.",
      "Mon PC tourne en permanence \u2014 je suis quasi toujours en ligne.",
      "J\u2019adore la Formule 1 ! Max Verstappen est le meilleur \u2014 Tu Tu Turu !"
    ],
    start: "Démarrer",
    language: "Langue",
    english: "Anglais",
    french: "Français",
    zoom: "Zoom",
    zoomIn: "Zoom avant",
    zoomOut: "Zoom arrière",
    resetZoom: "Réinitialiser",
    wallpaper: "Fond d'écran",
    shutdown: "Arrêter",
    chooseUser: "Choisir un utilisateur",
    clickToLogin: "Cliquez pour vous connecter",
    educationTitle: "Éducation",
    experienceTitle: "Expérience",
    projectsTitle: "Projets",
    skillsTitle: "Compétences",
    hobbiesTitle: "Loisirs",
    gamingLabel: "Gaming",
    cookingLabel: "Cuisine",
    cookingText:
      "Cuisine marocaine : j'adore tester ce que je trouve sur TikTok (ou ce que ma mère me conseille).",
    surfLabel: "Surf",
    surfText: "Quand je suis à Taghazot, Agadir.",
    contactTitle: "Contact",
    resumeTitle: "CV",
    downloadResume: "Télécharger le CV",
    locationLabel: "Localisation",
    specializationLabel: "Spécialisation",
    emailLabel: "Email",
    openInGithub: "Ouvrir sur GitHub",
    skillsLabels: {
      cloud: "Cloud & DevOps",
      backend: "Backend",
      frontend: "Frontend",
      systems: "Langages & Systèmes",
      design: "Design"
    }
  }
};

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function formatTaskbarClock(value, language) {
  const locale = language === "fr" ? "fr-FR" : "en-GB";

  return {
    time: new Intl.DateTimeFormat(locale, {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false
    }).format(value),
    date: new Intl.DateTimeFormat(locale, {
      day: "2-digit",
      month: "2-digit",
      year: "numeric"
    }).format(value)
  };
}

function playAudio(audioElement) {
  if (!audioElement) {
    return;
  }

  try {
    audioElement.currentTime = 0;
    const playPromise = audioElement.play();
    if (playPromise && typeof playPromise.catch === "function") {
      playPromise.catch(() => {});
    }
  } catch {
    // Audio can be blocked by browser autoplay policy.
  }
}

function getWindowStyle(appId, index, windowPositions) {
  const draggedPosition = windowPositions[appId];

  return {
    ...windowLayout[appId],
    ...(draggedPosition
      ? {
          left: `${draggedPosition.left}px`,
          top: `${draggedPosition.top}px`
        }
      : {}),
    zIndex: 40 + index
  };
}

function getResumePdfPath(language) {
  if (language === "fr") {
    return withBasePath("docs/resume_fr.pdf");
  }

  return withBasePath("docs/resume_en.pdf");
}

function App() {
  const [language, setLanguage] = useState(() => {
    if (typeof window === "undefined") {
      return "en";
    }

    const savedLanguage = window.localStorage.getItem(LANGUAGE_STORAGE_KEY);
    return savedLanguage === "en" || savedLanguage === "fr" ? savedLanguage : "en";
  });
  const [openOrder, setOpenOrder] = useState(INITIAL_WINDOWS);
  const [taskbarApps, setTaskbarApps] = useState(INITIAL_WINDOWS);
  const [showWelcome, setShowWelcome] = useState(false);
  const [clockTime, setClockTime] = useState(() => new Date());
  const [windowPositions, setWindowPositions] = useState({});
  const [selectedWallpaperId, setSelectedWallpaperId] = useState(() => {
    if (typeof window === "undefined") {
      return wallpapers[0].id;
    }

    const savedWallpaper = window.localStorage.getItem(WALLPAPER_STORAGE_KEY);
    const exists = wallpapers.some((wallpaper) => wallpaper.id === savedWallpaper);
    return exists ? savedWallpaper : wallpapers[0].id;
  });
  const [uiScale, setUiScale] = useState(() => {
    if (typeof window === "undefined") {
      return 1.1;
    }

    const savedZoom = Number.parseFloat(window.localStorage.getItem(ZOOM_STORAGE_KEY) ?? "1.1");
    return ZOOM_LEVELS.includes(savedZoom) ? savedZoom : 1.1;
  });
  const [startMenuOpen, setStartMenuOpen] = useState(false);
  const [sessionState, setSessionState] = useState("booting");
  const [bootMode, setBootMode] = useState("initial");
  const [showClickAlert, setShowClickAlert] = useState(false);
  const [showRightClickAlert, setShowRightClickAlert] = useState(false);
  const [showTip, setShowTip] = useState(false);
  const [isTipPinned, setIsTipPinned] = useState(false);
  const [currentTipIndex, setCurrentTipIndex] = useState(0);
  const [soundEnabled, setSoundEnabled] = useState(() => {
    if (typeof window === "undefined") {
      return true;
    }

    const saved = window.localStorage.getItem(SOUND_STORAGE_KEY);
    return saved === null || saved === "true";
  });

  const desktopRef = useRef(null);
  const dragState = useRef(null);
  const loginAudioRef = useRef(null);
  const logoutAudioRef = useRef(null);
  const alertAudioRef = useRef(null);
  const infoAudioRef = useRef(null);
  const dingAudioRef = useRef(null);
  const loginSoundPlayedRef = useRef(false);
  const loginSoundInteractionHandlerRef = useRef(null);
  const rapidClickTimestampsRef = useRef([]);
  const lastRapidClickAlertRef = useRef(0);
  const lastRightClickAlertRef = useRef(0);

  const removeLoginInteractionListener = useCallback(() => {
    if (!loginSoundInteractionHandlerRef.current) {
      return;
    }

    const handler = loginSoundInteractionHandlerRef.current;
    document.removeEventListener("pointerdown", handler);
    document.removeEventListener("keydown", handler);
    loginSoundInteractionHandlerRef.current = null;
  }, []);

  const resume = resumeData[language] ?? resumeData.en;
  const texts = UI_TEXT[language] ?? UI_TEXT.en;
  const appLabels = APP_LABELS[language] ?? APP_LABELS.en;

  const appById = useMemo(
    () => Object.fromEntries(desktopApps.map((app) => [app.id, app])),
    []
  );

  const activeWallpaper =
    wallpapers.find((item) => item.id === selectedWallpaperId) ?? wallpapers[0];

  const activeAppId = openOrder.at(-1) ?? null;
  const clockDisplay = useMemo(
    () => formatTaskbarClock(clockTime, language),
    [clockTime, language]
  );
  const zoomIndex = ZOOM_LEVELS.findIndex((level) => level === uiScale);
  const canZoomOut = zoomIndex > 0;
  const canZoomIn = zoomIndex < ZOOM_LEVELS.length - 1;
  const shellStyle = useMemo(
    () => ({ "--ui-scale": String(uiScale) }),
    [uiScale]
  );

  useEffect(() => {
    const timerId = window.setInterval(() => {
      setClockTime(new Date());
    }, 1000);

    return () => {
      window.clearInterval(timerId);
    };
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    window.localStorage.setItem(LANGUAGE_STORAGE_KEY, language);
  }, [language]);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    window.localStorage.setItem(WALLPAPER_STORAGE_KEY, selectedWallpaperId);
  }, [selectedWallpaperId]);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    window.localStorage.setItem(ZOOM_STORAGE_KEY, String(uiScale));
  }, [uiScale]);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    window.localStorage.setItem(SOUND_STORAGE_KEY, String(soundEnabled));
  }, [soundEnabled]);

  useEffect(() => {
    const allowLoginSoundRetry =
      sessionState === "booting" || (sessionState === "desktop" && showWelcome);

    if (!allowLoginSoundRetry) {
      removeLoginInteractionListener();
      return;
    }

    if (sessionState === "booting") {
      setStartMenuOpen(false);
      loginSoundPlayedRef.current = false;
    }

    const tryPlayLoginSound = () => {
      if (loginSoundPlayedRef.current) {
        removeLoginInteractionListener();
        return;
      }

      if (!soundEnabled) {
        loginSoundPlayedRef.current = true;
        removeLoginInteractionListener();
        return;
      }

      const loginAudio = loginAudioRef.current;
      if (!loginAudio) {
        return;
      }

      try {
        loginAudio.currentTime = 0;
        const playPromise = loginAudio.play();

        if (playPromise && typeof playPromise.then === "function") {
          playPromise
            .then(() => {
              loginSoundPlayedRef.current = true;
              removeLoginInteractionListener();
            })
            .catch(() => {});
        } else {
          loginSoundPlayedRef.current = true;
          removeLoginInteractionListener();
        }
      } catch {
        // Browser can block autoplay without user interaction.
      }
    };

    if (!loginSoundInteractionHandlerRef.current) {
      const interactionHandler = () => {
        tryPlayLoginSound();
      };

      loginSoundInteractionHandlerRef.current = interactionHandler;
      document.addEventListener("pointerdown", interactionHandler);
      document.addEventListener("keydown", interactionHandler);
    }

    tryPlayLoginSound();

    if (sessionState !== "booting") {
      return;
    }

    const bootTimer = window.setTimeout(() => {
      setSessionState("desktop");
      if (bootMode === "initial") {
        setShowWelcome(true);
      }
    }, BOOT_DURATION_MS);

    return () => {
      window.clearTimeout(bootTimer);
    };
  }, [bootMode, sessionState, showWelcome, removeLoginInteractionListener, soundEnabled]);

  useEffect(() => {
    if (sessionState !== "desktop" || showWelcome || showClickAlert || showRightClickAlert) {
      rapidClickTimestampsRef.current = [];
      return;
    }

    const handleRapidClicks = (event) => {
      if (event.pointerType === "mouse" && event.button !== 0) {
        return;
      }

      const now = Date.now();

      rapidClickTimestampsRef.current = [...rapidClickTimestampsRef.current, now].filter(
        (timestamp) => now - timestamp <= RAPID_CLICK_WINDOW_MS
      );

      const cooldownElapsed =
        now - lastRapidClickAlertRef.current >= RAPID_CLICK_COOLDOWN_MS;

      if (
        rapidClickTimestampsRef.current.length >= RAPID_CLICK_THRESHOLD &&
        cooldownElapsed
      ) {
        rapidClickTimestampsRef.current = [];
        lastRapidClickAlertRef.current = now;
        setStartMenuOpen(false);
        setShowClickAlert(true);
        if (soundEnabled) {
          playAudio(alertAudioRef.current);
        }
      }
    };

    document.addEventListener("pointerdown", handleRapidClicks);

    return () => {
      document.removeEventListener("pointerdown", handleRapidClicks);
    };
  }, [sessionState, showWelcome, showClickAlert, showRightClickAlert, soundEnabled]);

  useEffect(() => {
    const handleContextMenu = (event) => {
      event.preventDefault();

      const canShowAlert = sessionState === "desktop" && !showWelcome && !showClickAlert;
      if (!canShowAlert) {
        return;
      }

      const now = Date.now();
      const cooldownElapsed =
        now - lastRightClickAlertRef.current >= RIGHT_CLICK_ALERT_COOLDOWN_MS;

      if (!cooldownElapsed || showRightClickAlert) {
        return;
      }

      lastRightClickAlertRef.current = now;
      setStartMenuOpen(false);
      setShowRightClickAlert(true);
      if (soundEnabled) {
        playAudio(alertAudioRef.current);
      }
    };

    document.addEventListener("contextmenu", handleContextMenu);

    return () => {
      document.removeEventListener("contextmenu", handleContextMenu);
    };
  }, [sessionState, showWelcome, showClickAlert, showRightClickAlert, soundEnabled]);

  // Schedule tip balloon to appear periodically on the desktop.
  useEffect(() => {
    if (sessionState !== "desktop" || showWelcome || showClickAlert || showRightClickAlert || showTip) {
      return;
    }

    const delay = TIP_MIN_INTERVAL_MS + Math.random() * (TIP_MAX_INTERVAL_MS - TIP_MIN_INTERVAL_MS);
    const timerId = window.setTimeout(() => {
      setCurrentTipIndex(Math.floor(Math.random() * texts.tips.length));
      setIsTipPinned(false);
      setShowTip(true);
      if (soundEnabled) {
        playAudio(infoAudioRef.current);
      }
    }, delay);

    return () => window.clearTimeout(timerId);
  }, [sessionState, showWelcome, showClickAlert, showRightClickAlert, showTip, texts.tips.length, soundEnabled]);

  // Auto-dismiss tip balloon after a few seconds.
  useEffect(() => {
    if (!showTip || isTipPinned) {
      return;
    }

    const timerId = window.setTimeout(() => {
      setShowTip(false);
      setIsTipPinned(false);
    }, TIP_AUTO_DISMISS_MS);
    return () => window.clearTimeout(timerId);
  }, [showTip, isTipPinned]);

  const handleDragging = useCallback((event) => {
    const dragInfo = dragState.current;

    if (!dragInfo) {
      return;
    }

    const scale = dragInfo.scale || 1;
    const desktopWidth = dragInfo.desktopRect.width / scale;
    const desktopHeight = dragInfo.desktopRect.height / scale;
    const windowWidth = dragInfo.windowWidth / scale;
    const windowHeight = dragInfo.windowHeight / scale;

    const pointerX = (event.clientX - dragInfo.desktopRect.left) / scale;
    const pointerY = (event.clientY - dragInfo.desktopRect.top) / scale;

    const maxLeft = Math.max(0, desktopWidth - windowWidth);
    const maxTop = Math.max(0, desktopHeight - windowHeight);

    const nextLeft = clamp(pointerX - dragInfo.offsetX, 0, maxLeft);

    const nextTop = clamp(pointerY - dragInfo.offsetY, 0, maxTop);

    setWindowPositions((previous) => {
      const current = previous[dragInfo.appId];

      if (current && current.left === nextLeft && current.top === nextTop) {
        return previous;
      }

      return {
        ...previous,
        [dragInfo.appId]: {
          left: nextLeft,
          top: nextTop
        }
      };
    });
  }, []);

  const stopDragging = useCallback(() => {
    dragState.current = null;
    document.removeEventListener("pointermove", handleDragging);
    document.removeEventListener("pointerup", stopDragging);
  }, [handleDragging]);

  useEffect(() => {
    return () => {
      document.removeEventListener("pointermove", handleDragging);
      document.removeEventListener("pointerup", stopDragging);
    };
  }, [handleDragging, stopDragging]);

  const focusWindow = (appId) => {
    setStartMenuOpen(false);

    setTaskbarApps((previous) => {
      if (previous.includes(appId)) {
        return previous;
      }
      return [...previous, appId];
    });

    setOpenOrder((previous) => {
      if (!previous.includes(appId)) {
        return [...previous, appId];
      }
      return [...previous.filter((item) => item !== appId), appId];
    });
  };

  const minimizeWindow = (appId) => {
    setOpenOrder((previous) => previous.filter((item) => item !== appId));
  };

  const closeWindow = (appId) => {
    setOpenOrder((previous) => previous.filter((item) => item !== appId));
    setTaskbarApps((previous) => previous.filter((item) => item !== appId));
  };

  const toggleWindowFromTaskbar = (appId) => {
    setOpenOrder((previous) => {
      const isOpen = previous.includes(appId);
      const isActive = previous.at(-1) === appId;

      if (!isOpen) {
        return [...previous, appId];
      }

      if (isActive) {
        return previous.filter((item) => item !== appId);
      }
      return [...previous.filter((item) => item !== appId), appId];
    });
  };

  const startDragging = (event, appId) => {
    if (event.button !== 0) {
      return;
    }

    if (event.target.closest(".xp-controls")) {
      return;
    }

    if (window.innerWidth <= MOBILE_BREAKPOINT) {
      return;
    }

    const desktopElement = desktopRef.current;
    const windowElement = event.currentTarget.closest(".xp-window");

    if (!desktopElement || !windowElement) {
      return;
    }

    event.preventDefault();
    focusWindow(appId);

    const desktopRect = desktopElement.getBoundingClientRect();
    const windowRect = windowElement.getBoundingClientRect();
    const scale = uiScale || 1;

    dragState.current = {
      appId,
      offsetX: (event.clientX - windowRect.left) / scale,
      offsetY: (event.clientY - windowRect.top) / scale,
      desktopRect,
      windowWidth: windowRect.width,
      windowHeight: windowRect.height,
      scale
    };

    document.addEventListener("pointermove", handleDragging);
    document.addEventListener("pointerup", stopDragging);
  };

  const handleShutdown = () => {
    setShowWelcome(false);
    setStartMenuOpen(false);
    setShowClickAlert(false);
    setShowRightClickAlert(false);
    setShowTip(false);
    setIsTipPinned(false);
    setOpenOrder([]);
    setTaskbarApps([]);
    if (soundEnabled) {
      playAudio(logoutAudioRef.current);
    }
    window.setTimeout(() => {
      setSessionState("user-picker");
    }, 400);
  };

  const handleUserLogin = () => {
    setBootMode("relogin");
    setSessionState("booting");
    setShowClickAlert(false);
    setShowRightClickAlert(false);
    setShowTip(false);
    setIsTipPinned(false);
    setOpenOrder(INITIAL_WINDOWS);
    setTaskbarApps(INITIAL_WINDOWS);
  };

  const handleZoomOut = () => {
    setUiScale((previous) => {
      const index = ZOOM_LEVELS.findIndex((level) => level === previous);
      if (index <= 0) {
        return previous;
      }

      return ZOOM_LEVELS[index - 1];
    });
  };

  const handleZoomIn = () => {
    setUiScale((previous) => {
      const index = ZOOM_LEVELS.findIndex((level) => level === previous);
      if (index < 0 || index >= ZOOM_LEVELS.length - 1) {
        return previous;
      }

      return ZOOM_LEVELS[index + 1];
    });
  };

  const toggleSound = () => {
    setSoundEnabled((prev) => {
      const newState = !prev;
      if (newState) {
        playAudio(dingAudioRef.current);
      }
      return newState;
    });
  };

  const openTipsPanel = () => {
    if (texts.tips.length === 0) {
      return;
    }

    if (showTip) {
      closeTipsPanel();
      return;
    }

    setStartMenuOpen(false);

    if (!showTip) {
      setCurrentTipIndex(Math.floor(Math.random() * texts.tips.length));
      if (soundEnabled) {
        playAudio(infoAudioRef.current);
      }
    }

    setIsTipPinned(true);
    setShowTip(true);
  };

  const closeTipsPanel = () => {
    setShowTip(false);
    setIsTipPinned(false);
  };

  const showPreviousTip = () => {
    setCurrentTipIndex((previous) => {
      const count = texts.tips.length;
      if (count === 0) {
        return previous;
      }

      return (previous - 1 + count) % count;
    });
  };

  const showNextTip = () => {
    setCurrentTipIndex((previous) => {
      const count = texts.tips.length;
      if (count === 0) {
        return previous;
      }

      return (previous + 1) % count;
    });
  };

  if (sessionState === "user-picker") {
    return (
      <div className="session-shell" style={shellStyle}>
        <audio ref={loginAudioRef} src={withBasePath("music/login.wav")} preload="auto" />
        <audio ref={logoutAudioRef} src={withBasePath("music/logout.wav")} preload="auto" />

        <main className="user-picker-screen">
          <img className="session-logo" src={withBasePath("images/windows.png")} alt="" aria-hidden="true" />
          <h1>{WELCOME_LABEL}</h1>
          <p className="session-subtitle">{texts.chooseUser}</p>
          <button type="button" className="user-tile" onClick={handleUserLogin}>
            <img src={withBasePath("images/profile.png")} alt="User avatar" />
            <span>{resume.profile.name}</span>
            <small>{texts.clickToLogin}</small>
          </button>
        </main>
      </div>
    );
  }

  return (
    <div className="os-shell" style={shellStyle}>
      <audio ref={loginAudioRef} src={withBasePath("music/login.wav")} preload="auto" />
      <audio ref={logoutAudioRef} src={withBasePath("music/logout.wav")} preload="auto" />
      <audio ref={alertAudioRef} src={withBasePath("music/alert.wav")} preload="auto" />
      <audio ref={infoAudioRef} src={withBasePath("music/info.wav")} preload="auto" />
      <audio ref={dingAudioRef} src={withBasePath("music/ding.wav")} preload="auto" />

      <main
        className="desktop-area"
        ref={desktopRef}
        style={{ "--desktop-wallpaper": `url(${activeWallpaper.file})` }}
        onMouseDown={() => setStartMenuOpen(false)}
      >
        <section className="desktop-icons" aria-label="Desktop icons">
          {desktopApps.map((app) => (
            <button
              key={app.id}
              type="button"
              className="desktop-icon"
              onClick={() => focusWindow(app.id)}
              aria-label={`Open ${appLabels[app.id] ?? app.label}`}
            >
              <img src={app.icon} alt="" aria-hidden="true" />
              <span>{appLabels[app.id] ?? app.label}</span>
            </button>
          ))}
        </section>

        {openOrder.map((appId, index) => {
          const app = appById[appId];
          const isActive = activeAppId === appId;
          const appTitle = appLabels[appId] ?? app.label;

          return (
            <article
              key={appId}
              className={`xp-window ${isActive ? "active" : ""}`}
              style={getWindowStyle(appId, index, windowPositions)}
              onMouseDown={() => focusWindow(appId)}
            >
              <div
                className="xp-titlebar"
                onPointerDown={(event) => startDragging(event, appId)}
              >
                <div className="xp-title">
                  <img src={app.icon} alt="" aria-hidden="true" />
                  <span>{appTitle}</span>
                </div>

                <div className="xp-controls">
                  <button
                    type="button"
                    className="xp-control min"
                    onClick={() => minimizeWindow(appId)}
                    aria-label={`Minimize ${appTitle}`}
                  />
                  <button
                    type="button"
                    className="xp-control max disabled"
                    disabled
                    aria-label={`Maximize ${appTitle}`}
                  />
                  <button
                    type="button"
                    className="xp-control close"
                    onClick={() => closeWindow(appId)}
                    aria-label={`Close ${appTitle}`}
                  />
                </div>
              </div>

              <div className="window-content">
                {renderWindowContent(appId, resume, texts, language)}
              </div>
            </article>
          );
        })}
      </main>

      {sessionState === "booting" ? (
        <section className="boot-overlay" aria-label={WELCOME_LABEL}>
          <div className="boot-branding-top">
            <img src={withBasePath("images/windows.png")} alt="" aria-hidden="true" />
            <p className="boot-branding-text">AbdelXP.exe</p>
          </div>
          <h1>{WELCOME_LABEL}</h1>
        </section>
      ) : null}

      {showWelcome && sessionState === "desktop" ? (
        <section
          className="welcome-overlay"
          role="dialog"
          aria-modal="true"
          aria-labelledby="welcome-title"
        >
          <article className="welcome-window">
            <div className="xp-titlebar welcome-titlebar">
              <div className="xp-title">
                <img src={withBasePath("images/file.png")} alt="" aria-hidden="true" />
                <span>{texts.bootTitle}</span>
              </div>

              <button
                type="button"
                className="xp-control close"
                onClick={() => setShowWelcome(false)}
                aria-label="Close welcome popup"
              />
            </div>

            <div className="welcome-content">
              <h2 id="welcome-title">{texts.popupTitle}</h2>
              <p>{texts.popupText}</p>
              <ul className="welcome-list">
                {texts.popupItems.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <button
                type="button"
                className="welcome-button"
                onClick={() => setShowWelcome(false)}
              >
                {texts.popupButton}
              </button>
            </div>
          </article>
        </section>
      ) : null}

      {showClickAlert && sessionState === "desktop" ? (
        <section
          className="alert-overlay"
          role="alertdialog"
          aria-modal="true"
          aria-labelledby="click-alert-title"
        >
          <article className="alert-window">
            <div className="xp-titlebar welcome-titlebar">
              <div className="xp-title">
                <img src={withBasePath("images/alert.png")} alt="" aria-hidden="true" />
                <span>{texts.clickAlertTitle}</span>
              </div>

              <button
                type="button"
                className="xp-control close"
                onClick={() => setShowClickAlert(false)}
                aria-label={language === "fr" ? "Fermer l'alerte" : "Close alert"}
              />
            </div>

            <div className="alert-content">
              <img
                src={withBasePath("images/alert.png")}
                className="alert-illustration"
                alt=""
                aria-hidden="true"
              />

              <div>
                <h2 id="click-alert-title">{texts.clickAlertTitle}</h2>
                <p>{texts.clickAlertText}</p>
              </div>
            </div>

            <div className="alert-actions">
              <button
                type="button"
                className="welcome-button"
                onClick={() => setShowClickAlert(false)}
              >
                {texts.clickAlertButton}
              </button>
            </div>
          </article>
        </section>
      ) : null}

      {showRightClickAlert && sessionState === "desktop" ? (
        <section
          className="alert-overlay"
          role="alertdialog"
          aria-modal="true"
          aria-labelledby="right-click-alert-title"
        >
          <article className="alert-window">
            <div className="xp-titlebar welcome-titlebar">
              <div className="xp-title">
                <img src={withBasePath("images/alert.png")} alt="" aria-hidden="true" />
                <span>{texts.rightClickAlertTitle}</span>
              </div>

              <button
                type="button"
                className="xp-control close"
                onClick={() => setShowRightClickAlert(false)}
                aria-label={language === "fr" ? "Fermer l'alerte" : "Close alert"}
              />
            </div>

            <div className="alert-content">
              <img
                src={withBasePath("images/alert.png")}
                className="alert-illustration"
                alt=""
                aria-hidden="true"
              />

              <div>
                <h2 id="right-click-alert-title">{texts.rightClickAlertTitle}</h2>
                <p>{texts.rightClickAlertText}</p>
              </div>
            </div>

            <div className="alert-actions">
              <button
                type="button"
                className="welcome-button"
                onClick={() => setShowRightClickAlert(false)}
              >
                {texts.rightClickAlertButton}
              </button>
            </div>
          </article>
        </section>
      ) : null}

  {sessionState === "desktop" ? (
      <footer className="xp-taskbar">
        <div className="start-menu-anchor" onMouseDown={(event) => event.stopPropagation()}>
          <button
            type="button"
            className="start-button"
            aria-label="Start menu"
            onClick={() => setStartMenuOpen((previous) => !previous)}
          >
            <img className="start-icon" src={withBasePath("images/windows.png")} alt="" aria-hidden="true" />
            <span>{texts.start}</span>
          </button>

          {startMenuOpen ? (
            <section className="start-menu" aria-label="Start menu panel">
              <header className="start-menu-header">
                <img src={withBasePath("images/profile.png")} alt="" aria-hidden="true" />
                <span>{resume.profile.name}</span>
              </header>

              <div className="start-menu-section">
                <h3>{texts.language}</h3>
                <div className="start-menu-row">
                  <button
                    type="button"
                    className={`menu-chip ${language === "en" ? "active" : ""}`}
                    onClick={() => setLanguage("en")}
                  >
                    {texts.english}
                  </button>
                  <button
                    type="button"
                    className={`menu-chip ${language === "fr" ? "active" : ""}`}
                    onClick={() => setLanguage("fr")}
                  >
                    {texts.french}
                  </button>
                </div>
              </div>

              <div className="start-menu-section">
                <h3>{texts.wallpaper}</h3>
                <div className="wallpaper-strip" role="list" aria-label={texts.wallpaper}>
                  {wallpapers.map((wallpaper) => {
                    const label = wallpaper.label[language] ?? wallpaper.label.en;
                    const isActive = wallpaper.id === selectedWallpaperId;

                    return (
                      <button
                        key={wallpaper.id}
                        type="button"
                        className={`wallpaper-tile ${isActive ? "active" : ""}`}
                        onClick={() => setSelectedWallpaperId(wallpaper.id)}
                        aria-label={label}
                        title={label}
                      >
                        <span
                          className="wallpaper-preview"
                          style={{ backgroundImage: `url(${wallpaper.file})` }}
                        />
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="start-menu-section">
                <h3>{texts.zoom}</h3>

                <div className="start-menu-row zoom-row">
                  <button
                    type="button"
                    className="menu-chip zoom-chip"
                    onClick={handleZoomOut}
                    disabled={!canZoomOut}
                    aria-label={texts.zoomOut}
                    title={texts.zoomOut}
                  >
                    -
                  </button>

                  <span className="zoom-value">{`${Math.round((uiScale / ZOOM_DISPLAY_BASE) * 100)}%`}</span>

                  <button
                    type="button"
                    className="menu-chip zoom-chip"
                    onClick={handleZoomIn}
                    disabled={!canZoomIn}
                    aria-label={texts.zoomIn}
                    title={texts.zoomIn}
                  >
                    +
                  </button>
                </div>
              </div>

              <button type="button" className="shutdown-button" onClick={handleShutdown}>
                {texts.shutdown}
              </button>
            </section>
          ) : null}
        </div>

        <div className="task-items" aria-label="Taskbar apps">
          {taskbarApps.length > 0 ? (
            taskbarApps.map((appId) => {
              const app = appById[appId];
              const isOpen = openOrder.includes(appId);
              const isActive = activeAppId === appId;
              const appTitle = appLabels[appId] ?? app.label;

              return (
                <button
                  key={appId}
                  type="button"
                  className={`task-item ${isOpen ? "open" : ""} ${isActive ? "active" : ""}`}
                  onClick={() => toggleWindowFromTaskbar(appId)}
                >
                  <img src={app.icon} alt="" aria-hidden="true" />
                  <span>{appTitle}</span>
                </button>
              );
            })
          ) : null}
        </div>

        <div className="task-tray">
          {showTip && sessionState === "desktop" ? (
            <div className="tip-balloon" role="dialog" aria-label={texts.tipTitle}>
              <div className="tip-balloon-header">
                <span className="tip-balloon-title">
                  <span className="tip-balloon-icon" aria-hidden="true">ℹ</span>
                  {texts.tipTitle}
                </span>

                <div className="tip-balloon-controls">
                  <button
                    type="button"
                    className="tip-balloon-nav"
                    onClick={showPreviousTip}
                    aria-label={texts.tipPrev}
                    title={texts.tipPrev}
                  >
                    &larr;
                  </button>

                  <button
                    type="button"
                    className="tip-balloon-nav"
                    onClick={showNextTip}
                    aria-label={texts.tipNext}
                    title={texts.tipNext}
                  >
                    &rarr;
                  </button>

                  <button
                    type="button"
                    className="tip-balloon-close"
                    onClick={closeTipsPanel}
                    aria-label={texts.tipClose}
                    title={texts.tipClose}
                  >
                    ✕
                  </button>
                </div>
              </div>

              <div className="tip-balloon-body">
                <p>{texts.tips[currentTipIndex] ?? ""}</p>
              </div>
            </div>
          ) : null}

          <button
            type="button"
            className={`tray-info-button ${showTip && isTipPinned ? "active" : ""}`}
            onClick={openTipsPanel}
            aria-label={texts.tipOpenButton}
            title={texts.tipOpenButton}
          >
            <img src={withBasePath("images/mistery.png")} alt="" aria-hidden="true" />
          </button>

          <button
            type="button"
            className={`tray-sound-button ${soundEnabled ? "active" : ""}`}
            onClick={toggleSound}
            aria-label={soundEnabled ? "Sound on" : "Sound off"}
            title={soundEnabled ? "Sound on" : "Sound off"}
          >
            <img
              src={soundEnabled ? withBasePath("images/sound_on.png") : withBasePath("images/sound_off.png")}
              alt=""
              aria-hidden="true"
            />
          </button>

          <div
            className="task-clock"
            aria-label={language === "fr" ? "Date et heure actuelles" : "Current date and time"}
          >
            <span className="clock-date">{clockDisplay.date}</span>
            <span className="clock-time">{clockDisplay.time}</span>
          </div>
        </div>
      </footer>
      ) : null}
    </div>
  );
}

function renderWindowContent(appId, resume, texts, language) {
  switch (appId) {
    case "about":
      return <AboutPanel profile={resume.profile} texts={texts} />;
    case "education":
      return (
        <TimelinePanel
          title={texts.educationTitle}
          items={resume.education}
          secondaryKey="institution"
        />
      );
    case "experience":
      return (
        <TimelinePanel
          title={texts.experienceTitle}
          items={resume.experience}
          secondaryKey="company"
        />
      );
    case "projects":
      return <ProjectsPanel projects={resume.projects} texts={texts} />;
    case "skills":
      return <SkillsPanel skills={resume.skills} texts={texts} />;
    case "hobbies":
      return <HobbiesPanel texts={texts} />;
    case "contact":
      return <ContactPanel profile={resume.profile} texts={texts} />;
    case "resume":
      return <ResumePanel language={language} texts={texts} />;
    default:
      return null;
  }
}

function AboutPanel({ profile, texts }) {
  return (
    <section className="window-body about-panel">
      <div className="about-header">
        <img
          src={withBasePath("images/profile.png")}
          className="profile-avatar"
          alt="Profile avatar"
        />
        <div>
          <h2>{profile.name}</h2>
          <p className="muted">{profile.title}</p>
        </div>
      </div>

      <p>{profile.longBio}</p>

      <ul className="details-grid">
        <li>
          <span>{texts.locationLabel}</span>
          <strong>{profile.contact.location}</strong>
        </li>
        <li>
          <span>{texts.specializationLabel}</span>
          <strong>{profile.specialization}</strong>
        </li>
        <li>
          <span>{texts.emailLabel}</span>
          <strong>{profile.contact.email}</strong>
        </li>
      </ul>
    </section>
  );
}

function TimelinePanel({ title, items, secondaryKey }) {
  return (
    <section className="window-body">
      <h2>{title}</h2>
      <div className="timeline-list">
        {items.map((item) => (
          <article key={`${item.period}-${item.title}`} className="timeline-card">
            <header>
              <h3>{item.title}</h3>
              <span>{item.period}</span>
            </header>
            <p className="muted">{item[secondaryKey]}</p>
            <p>{item.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function ProjectsPanel({ projects, texts }) {
  return (
    <section className="window-body">
      <h2>{texts.projectsTitle}</h2>
      <div className="project-grid">
        {projects.map((project) => (
          <article key={project.title} className="project-card">
            <h3>{project.title}</h3>
            <p>{project.description}</p>
            <div className="tag-list">
              {project.tags.map((tag) => (
                <span key={`${project.title}-${tag}`} className="pixel-tag">
                  {tag}
                </span>
              ))}
            </div>
            <a href={project.url} target="_blank" rel="noreferrer" className="project-link">
              {texts.openInGithub}
            </a>
          </article>
        ))}
      </div>
    </section>
  );
}

function SkillsPanel({ skills, texts }) {
  const labels = texts.skillsLabels;

  return (
    <section className="window-body">
      <h2>{texts.skillsTitle}</h2>
      <div className="skill-groups">
        {Object.entries(skills).map(([group, values]) => (
          <article key={group} className="skill-block">
            <h3>{labels[group]}</h3>
            <div className="tag-list">
              {values.map((value) => (
                <span key={`${group}-${value}`} className="pixel-tag">
                  {value}
                </span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function HobbiesPanel({ texts }) {
  const gameCovers = [
    {
      title: "Valorant",
      image: withBasePath("images/games/valorant.png")
    },
    {
      title: "EA FC 26",
      image: withBasePath("images/games/ea_fc_26.png")
    },
    {
      title: "The Last of Us",
      image: withBasePath("images/games/the_last_of_us.png")
    },
    {
      title: "Red Dead",
      image: withBasePath("images/games/red_dead_redemption.png")
    }
  ];

  return (
    <section className="window-body hobbies-panel">
      <h2>{texts.hobbiesTitle}</h2>

      <article className="hobby-card">
        <header className="hobby-header">
          <img src={withBasePath("images/controller.png")} alt="" aria-hidden="true" />
          <h3>{texts.gamingLabel}</h3>
        </header>

        <div className="game-cd-row">
          {gameCovers.map((game) => (
            <figure key={game.title} className="game-cd">
              <span className="game-cd-cover-wrap">
                <img className="game-cd-cover" src={game.image} alt={`${game.title} cover`} />
              </span>
              <figcaption>{game.title}</figcaption>
            </figure>
          ))}
        </div>
      </article>

      <div className="hobby-secondary-grid">
        <article className="hobby-card">
          <header className="hobby-header">
            <img src={withBasePath("images/cooking.png")} alt="" aria-hidden="true" />
            <h3>{texts.cookingLabel}</h3>
          </header>
          <p>{texts.cookingText}</p>
        </article>

        <article className="hobby-card">
          <header className="hobby-header">
            <img src={withBasePath("images/surf.png")} alt="" aria-hidden="true" />
            <h3>{texts.surfLabel}</h3>
          </header>
          <p>{texts.surfText}</p>
        </article>
      </div>
    </section>
  );
}

function ResumePanel({ language, texts }) {
  const resumePdfPath = getResumePdfPath(language);

  return (
    <section className="window-body resume-panel">
      <div className="resume-toolbar">
        <h2>{texts.resumeTitle}</h2>

        <a
          className="resume-download-btn"
          href={resumePdfPath}
          download
          aria-label={texts.downloadResume}
          title={texts.downloadResume}
        >
          <img src={withBasePath("images/download.png")} alt="" aria-hidden="true" />
          <span>{texts.downloadResume}</span>
        </a>
      </div>

      <iframe
        className="resume-frame"
        src={resumePdfPath}
        title={texts.resumeTitle}
      />
    </section>
  );
}

function ContactPanel({ profile, texts }) {
  const { contact } = profile;

  return (
    <section className="window-body contact-panel">
      <h2>{texts.contactTitle}</h2>
      <a className="contact-row" href={`mailto:${contact.email}`}>
        <img src={withBasePath("images/mail.png")} alt="" aria-hidden="true" />
        <span>{contact.email}</span>
      </a>

      <div className="contact-row">
        <img src={withBasePath("images/location.png")} alt="" aria-hidden="true" />
        <span>{contact.address}</span>
      </div>

      <a className="contact-row" href={contact.github} target="_blank" rel="noreferrer">
        <img src={withBasePath("images/github.png")} alt="" aria-hidden="true" />
        <span>github.com/abdemeh</span>
      </a>

      <a className="contact-row" href={contact.linkedin} target="_blank" rel="noreferrer">
        <img src={withBasePath("images/linkedin.png")} alt="" aria-hidden="true" />
        <span>{contact.linkedin.replace(/^https?:\/\//, "")}</span>
      </a>
    </section>
  );
}

export default App;
