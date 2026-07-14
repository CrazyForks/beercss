import fs from "fs";
import { toModule } from "./utils.js";

export default async function scoped() {
  try {
    fs.copyFileSync("./dist/cdn/beer.css", "./dist/cdn/beer.scoped.css");
    fs.copyFileSync("./dist/cdn/beer.css", "./dist/cdn/beer.scoped.min.css");
    toModule("./dist/cdn/beer.scoped.css", true);
    toModule("./dist/cdn/beer.scoped.min.css", true, true);
  } catch (error) {
    console.error(error);
  }
}
