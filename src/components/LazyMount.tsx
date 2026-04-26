import { useEffect, useRef, useState, ReactNode } from "react";

interface Props {
  children: ReactNode;
  /** Margen de pre-carga antes de entrar al viewport (default: 300px) */
  rootMargin?: string;
  /** Altura mínima del placeholder mientras el componente no se ha cargado */
  placeholderHeight?: string;
  /** Clase CSS opcional para el placeholder */
  placeholderClassName?: string;
  /** Threshold del IntersectionObserver (default: 0) */
  threshold?: number;
}

const LazyMountSkeleton = ({ height, className }: { height: string; className?: string }) => (
  <div
    className={`lazy-mount-skeleton ${className ?? ""}`.trim()}
    style={{ minHeight: height }}
    aria-hidden="true"
  >
    <div className="lazy-mount-skeleton-pulse" />
  </div>
);

const LazyMount = ({
  children,
  rootMargin = "300px",
  placeholderHeight = "400px",
  placeholderClassName = "",
  threshold = 0,
}: Props) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    // Fallback for very old browsers
    if (typeof IntersectionObserver === "undefined") {
      setShouldRender(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry?.isIntersecting) {
          setShouldRender(true);
          observer.disconnect();
        }
      },
      { rootMargin, threshold }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [rootMargin, threshold]);

  return (
    <div ref={ref} className="lazy-mount-wrapper" style={{ minHeight: shouldRender ? undefined : placeholderHeight }}>
      {shouldRender ? children : <LazyMountSkeleton height={placeholderHeight} className={placeholderClassName} />}
    </div>
  );
};

export default LazyMount;
