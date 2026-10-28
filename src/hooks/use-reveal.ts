import { useEffect, useRef } from "react";

/**
 * Adds `.is-revealed` to the element once it scrolls into view.
 * Styling lives in the `reveal` / `is-revealed` utilities; users with
 * reduced-motion preferences get the content immediately (CSS handles it).
 */
export function useReveal<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      el.classList.add("is-revealed");
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-revealed");
            observer.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.12 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return ref;
}

/** Smoothly scrolls to a section id, keeping the sticky header clear. */
export function scrollToSection(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  el.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "start" });
  // Move focus for keyboard users without adding the element to tab order.
  el.setAttribute("tabindex", "-1");
  el.focus({ preventScroll: true });
}
