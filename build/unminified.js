import { build } from "vite";
import { toModule } from "./utils.js";

export default async function() {
  try {
    await build({
      build: {
        minify: false,
        assetsInlineLimit: 0,
        outDir: "./dist/cdn",
        rollupOptions: {
          preserveEntrySignatures: "allow-extension",
          input: {
            "beer": "./src/cdn.ts",
          },
          output: {
            entryFileNames: "[name].js",
            chunkFileNames: "[name].js",
            assetFileNames: (info) => (info.name?.includes(".css")) ? "[name].css" : "[name].[ext]",
            manualChunks: undefined,
          },
        },
      },
    });
  
    toModule("./dist/cdn/beer.css");
  } catch(error) {
    console.log(error);
  }
}
