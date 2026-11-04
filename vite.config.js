import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    allowedHosts: [
      "0d97-2409-40d1-c-c987-3c70-fbb6-ce70-363c.ngrok-free.app",
      ".ngrok-free.app",
    ],
  },
})
