import path from 'path';
import { readDir, toCssModule, toJsModule } from "./utils.js";

async function copyCssFiles(input, output) {
  const items = readDir(input);
    
  for(const item of items) {
    if (item.indexOf(".css") != -1) {
      await toCssModule(path.join(input, item), path.join(output, item), true);
    } 
  }
}

async function copyTsFiles(input, output) {
  const items = readDir(input);
    
  for(const item of items) {
    if (item.indexOf(".ts") != -1) {
      await toJsModule(path.join(input, item), path.join(output, item.replace(".ts", ".js")));
      await toJsModule(path.join(input, item), path.join(output, item.replace(".ts", ".min.js")), true);
    }
  }
}

export default async function() {
  await copyCssFiles("./src/cdn/elements", "./dist/cdn/elements");
  await copyCssFiles("./src/cdn/helpers", "./dist/cdn/helpers");
  await copyCssFiles("./src/cdn/settings", "./dist/cdn/settings");
  await copyTsFiles("./src/cdn/elements", "./dist/cdn/elements");
  await copyTsFiles("./src/cdn/helpers", "./dist/cdn/helpers");
  await copyTsFiles("./src/cdn/settings", "./dist/cdn/settings");
}