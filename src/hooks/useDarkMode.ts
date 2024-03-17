import { useState, useEffect } from "react";

function useDarkMode() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const isDarkMode = localStorage.getItem("darkMode");
    setDarkMode(isDarkMode === "dark");
    document.documentElement.classList.add("dark");

    if (isDarkMode === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);

    localStorage.setItem("darkMode", darkMode ? "light" : "dark");

    if (darkMode) {
      document.documentElement.classList.remove("dark");
    } else {
      document.documentElement.classList.add("dark");
    }
  };

  return { darkMode, toggleDarkMode };
}

export default useDarkMode;
