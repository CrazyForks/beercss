import { build } from "vite";
import cssnano from "cssnano";
import { toModule } from "./utils.js";

export default async function() {
  try {
    await build({
      css: {
        postcss: {
          plugins: [
            cssnano({
              preset: 'default',
            }),
          ],
        },
      },
      build: {
        cssMinify: false,
        esbuild: {
          legalComments: 'none'
        },
        emptyOutDir: false,
        assetsInlineLimit: 0,
        outDir: "./dist/cdn",
        rollupOptions: {
          preserveEntrySignatures: "allow-extension",
          input: {
            "beer": "./src/cdn.ts",
          },
          output: {
            entryFileNames: "[name].min.js",
            chunkFileNames: "[name].min.js",
            assetFileNames: (info) => (info.name?.includes(".css")) ? "[name].min.css" : "[name].[ext]",
            manualChunks: undefined,
          },
        },
      },
    });

    toModule("./dist/cdn/beer.min.css", true);
  } catch (error) {
    console.error(error);
  }
}
