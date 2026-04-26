import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import { imagetools } from "vite-imagetools";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
  },
  plugins: [
    react(),
    imagetools({
      defaultDirectives: (url) => {
        // Activate the responsive pipeline only for `?preset=responsive`.
        // Generates AVIF + WebP + JPG fallback at 768/1280/1920 widths,
        // exposes the result as a Picture object (sources + img).
        if (url.searchParams.get("preset") === "responsive") {
          return new URLSearchParams({
            format: "avif;webp;jpg",
            w: "768;1280;1920",
            quality: "75",
            as: "picture",
          });
        }
        return new URLSearchParams();
      },
    }),
    mode === "development" && componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
