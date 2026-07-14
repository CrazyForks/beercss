import fs from 'fs-extra';
import path from 'path';
import { toModule } from "./utils.js";

function filterByCssFiles(src) {
    const stats = fs.statSync(src);
    if (stats.isDirectory()) return true;

    return path.extname(src).toLowerCase() === '.css';
  };

function copyCssFiles(input, output, scoped = false) {
  fs.copySync(input, output, { filter: filterByCssFiles });
  const items = fs.readdirSync(output);
    
  for(const item of items) toModule(path.join(output, item), scoped, true);
}

export default function() {
  copyCssFiles("./src/cdn/elements", "./dist/cdn/elements");
  copyCssFiles("./src/cdn/helpers", "./dist/cdn/helpers");
  copyCssFiles("./src/cdn/settings", "./dist/cdn/settings");
  copyCssFiles("./src/cdn/elements", "./dist/cdn/scoped/elements", true);
  copyCssFiles("./src/cdn/helpers", "./dist/cdn/scoped/helpers", true);
  copyCssFiles("./src/cdn/settings", "./dist/cdn/scoped/settings", true);
}