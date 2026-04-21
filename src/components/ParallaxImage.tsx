import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface ParallaxImageProps {
  src: string;
  alt?: string;
  className?: string;
  style?: React.CSSProperties;
  intensity?: number; // total px of vertical drift. Default 40 (moderate).
  rounded?: number; // border-radius in px
}

const ParallaxImage = ({
  src,
  alt = "",
  className,
  style,
  intensity = 40,
  rounded = 0,
}: ParallaxImageProps) => {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Image moves from -intensity/2 to +intensity/2 across viewport.
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    [-intensity / 2, intensity / 2]
  );

  return (
    <div
      ref={ref}
      className={className}
      style={{
        position: "relative",
        overflow: "hidden",
        borderRadius: rounded,
        ...style,
      }}
    >
      <motion.img
        src={src}
        alt={alt}
        style={{
          y,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          display: "block",
          // 1.15x scale compensates for the ±intensity/2 drift, preventing edge gaps.
          scale: 1.15,
        }}
      />
    </div>
  );
};

export default ParallaxImage;
