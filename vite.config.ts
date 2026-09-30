import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import netlify from "@netlify/vite-plugin-tanstack-start";

const plugins = [
  tanstackStart({
    server: {
      entry: "server",
    },
  }),
  react(),
  tailwindcss(),
];

if (process.env.NETLIFY === "true") {
  plugins.splice(1, 0, netlify());
}

export default defineConfig({
  plugins,
  resolve: {
    tsconfigPaths: true,
  },
  css: {
    transformer: "lightningcss",
  },
});