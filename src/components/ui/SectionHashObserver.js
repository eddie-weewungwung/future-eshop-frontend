"use client";

import { useEffect } from "react";

export default function SectionHashObserver() {
  useEffect(() => {
    const shopSection = document.getElementById("shop");
    if (!shopSection) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (
            window.location.pathname !== "/" ||
            window.location.hash !== "#shop"
          ) {
            window.history.replaceState(null, "", "/#shop");
          }
        } else {
          if (window.location.pathname !== "/" || window.location.hash !== "") {
            window.history.replaceState(null, "", "/");
          }
        }
      },
      {
        root: null,
        rootMargin: "-40px 0px -45% 0px",
        threshold: 0.15,
      },
    );

    observer.observe(shopSection);

    return () => observer.disconnect();
  }, []);

  return null;
}
