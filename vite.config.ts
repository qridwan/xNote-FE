import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
// import dts from 'vite-plugin-dts'
import path from "node:path";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const isDev = mode !== "production";

  return {
    plugins: [
      react(),
      // dts({
      //   rollupTypes: true,
      //   afterBuild: (emittedFiles) => {
      //     emittedFiles.forEach((content, filePath) => {
      //       if (filePath.endsWith('.d.ts')) {
      //         const newFilePath = filePath.replace('.d.ts', '.d.cts')
      //         fs.writeFileSync(newFilePath, content)
      //       }
      //     })
      //   },
      // }),
    ],
    resolve: {
      alias: [{ find: "@", replacement: path.resolve(__dirname, "src") }],
    },
    build: {
      cssMinify: "esbuild",
      minify: "esbuild",
      outDir: "dist",
      sourcemap: isDev,
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes("@tiptap")) {
              return "tiptap";
            }
            if (id.includes("node_modules")) {
              return "vendor";
            }
            if (id.includes("src/utils")) {
              return "utils";
            }
            if (id.includes("src/locales")) {
              return "locales";
            }
          },
        },
        // external: ['react', 'react-dom', 'react/jsx-runtime', 'katex', 'shiki', 'docx', '@radix-ui/react-dropdown-menu', '@radix-ui/react-icons', '@radix-ui/react-label', '@radix-ui/react-popover', '@radix-ui/react-separator', '@radix-ui/react-slot', '@radix-ui/react-switch', '@radix-ui/react-tabs', '@radix-ui/react-toast', '@radix-ui/react-toggle', '@radix-ui/react-tooltip', '@radix-ui/react-select', 'react-colorful', 'scroll-into-view-if-needed', 'tippy.js', 'valtio', 'echo-drag-handle-plugin', 'lucide-react', 'prosemirror-docx', 'file-saver', 're-resizable', '@excalidraw/excalidraw', '@radix-ui/react-dialog'],
      },
    },
  };
});
