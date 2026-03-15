import { useRef, PropsWithChildren, createContext, useContext } from "react";
import { motion, useMotionValue, useSpring, useTransform, MotionValue } from "framer-motion";

const DEFAULT_MAGNIFICATION = 88;
const DEFAULT_DISTANCE = 120;

interface DockContextType {
  mouseX: MotionValue<number>;
  magnification: number;
  distance: number;
}

const DockContext = createContext<DockContextType | null>(null);

interface DockProps extends PropsWithChildren {
  magnification?: number;
  distance?: number;
}

export const Dock = ({ children, magnification = DEFAULT_MAGNIFICATION, distance = DEFAULT_DISTANCE }: DockProps) => {
  const mouseX = useMotionValue(Infinity);

  return (
    <DockContext.Provider value={{ mouseX, magnification, distance }}>
      <motion.div
        onMouseMove={(e) => mouseX.set(e.pageX)}
        onMouseLeave={() => mouseX.set(Infinity)}
        className="flex items-end gap-5"
        style={{
          background: "rgba(255,255,255,0.04)",
          border: "1px solid rgba(26,107,255,0.25)",
          backdropFilter: "blur(12px)",
          borderRadius: "20px",
          padding: "12px 20px",
          height: "72px",
        }}
      >
        {children}
      </motion.div>
    </DockContext.Provider>
  );
};

interface DockIconProps extends PropsWithChildren {
  tooltip?: string;
  onClick?: () => void;
}

export const DockIcon = ({ children, tooltip, onClick }: DockIconProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const ctx = useContext(DockContext)!;

  const dist = useTransform(ctx.mouseX, (val: number) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return ctx.distance + 1;
    return val - rect.left - rect.width / 2;
  });

  const size = useSpring(
    useTransform(dist, [-ctx.distance, 0, ctx.distance], [40, ctx.magnification, 40]),
    { mass: 0.1, stiffness: 150, damping: 12 }
  );

  return (
    <motion.div
      ref={ref}
      style={{ width: size, height: size }}
      className="relative flex items-center justify-center cursor-pointer group"
      onClick={onClick}
    >
      {tooltip && (
        <span
          className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none"
          style={{ fontSize: "9px", letterSpacing: "0.2em", color: "#fff" }}
        >
          {tooltip}
        </span>
      )}
      {children}
    </motion.div>
  );
};
