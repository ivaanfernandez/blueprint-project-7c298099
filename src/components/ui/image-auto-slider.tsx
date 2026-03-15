import * as React from "react";

interface SliderImage {
  src: string;
  alt: string;
}

interface ImageAutoSliderProps {
  images: SliderImage[];
}

export const ImageAutoSlider: React.FC<ImageAutoSliderProps> = ({ images }) => {
  const doubled = [...images, ...images];

  return (
    <div
      className="w-full overflow-hidden"
      style={{
        mask: "linear-gradient(90deg, transparent 0%, black 10%, black 90%, transparent 100%)",
        WebkitMask: "linear-gradient(90deg, transparent 0%, black 10%, black 90%, transparent 100%)",
        pointerEvents: "none",
      }}
    >
      <div className="flex gap-4 animate-[scroll-right_20s_linear_infinite] w-max">
        {doubled.map((img, i) => (
          <img
            key={i}
            src={img.src}
            alt={img.alt}
            className="w-64 h-40 md:w-80 md:h-52 lg:w-96 lg:h-60 rounded-xl object-cover flex-shrink-0 transition-all duration-300 hover:scale-105 hover:brightness-110"
            loading="lazy"
          />
        ))}
      </div>
      <style>{`
        @keyframes scroll-right {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
};
