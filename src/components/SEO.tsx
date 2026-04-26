import { useEffect } from "react";

interface SEOProps {
  title?: string;
  description?: string;
  canonical?: string;
  children?: React.ReactNode; // accepted for backwards-compat, ignored
}

/**
 * Lightweight head manager — replaces react-helmet-async to avoid
 * its known "Cannot read properties of null (reading 'useState')"
 * dedupe issue with Vite. Sets <title>, meta description, and canonical
 * imperatively on mount; restores previous values on unmount.
 */
const setMeta = (name: string, content: string, attr: "name" | "property" = "name") => {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${name}"]`);
  const created = !el;
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, name);
    document.head.appendChild(el);
  }
  const prev = el.getAttribute("content");
  el.setAttribute("content", content);
  return () => {
    if (created) el?.remove();
    else if (prev !== null) el?.setAttribute("content", prev);
  };
};

const setCanonical = (href: string) => {
  let el = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  const created = !el;
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", "canonical");
    document.head.appendChild(el);
  }
  const prev = el.getAttribute("href");
  el.setAttribute("href", href);
  return () => {
    if (created) el?.remove();
    else if (prev !== null) el?.setAttribute("href", prev);
  };
};

export const SEO = ({ title, description, canonical }: SEOProps) => {
  useEffect(() => {
    const cleanups: Array<() => void> = [];
    const prevTitle = document.title;
    if (title) document.title = title;
    if (description) {
      cleanups.push(setMeta("description", description));
      cleanups.push(setMeta("og:description", description, "property"));
    }
    if (title) {
      cleanups.push(setMeta("og:title", title, "property"));
    }
    if (canonical) cleanups.push(setCanonical(canonical));
    return () => {
      document.title = prevTitle;
      cleanups.forEach((fn) => fn());
    };
  }, [title, description, canonical]);

  return null;
};

export default SEO;
