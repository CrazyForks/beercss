import fs from "fs";
import { toMinify } from "./utils.js";

export default async function() {
  try {
    const unminified = fs.readFileSync("./src/cdn/customElement.js", "utf-8");
    const minified = toMinify(unminified);

    fs.writeFileSync("./dist/cdn/beer.custom-element.js", unminified);
    fs.writeFileSync("./dist/cdn/beer.custom-element.min.js", minified);
  } catch (error) {
    console.error(error);
  }
}
