import fs from "fs-extra";

function canBeNested(file) {
  return !/(global.css|light.css|dark.css|font.css|beer.css|beer.min.css|beer.scoped.css|beer.scoped.min.css)$/.test(file);
}

function needsToRevert(file) {
  return /(global.css|beer.css|beer.min.css|beer.scoped.css|beer.scoped.min.css)$/.test(file);
}

export function toUrl(content) {
  return content.replace(/url\((\/|..\/\w+\/)/g, "url(");
}

export function toScoped(file, content) {
  let newContent = canBeNested(file)
    ? `:is(.beer, beer-css) { ${content} }`
    : content.replace(/\b(body|html)\b/g, ":is(.beer, beer-css)")
      .replace(/\/\* begin scoped \*\//g, ":is(.beer, beer-css) { ")
      .replace(/\/\* end scoped \*\//g, "}");
  
  return needsToRevert(file)
    ? `:is(.beer, beer-css) * { all: revert; }\n\n${newContent}\n\n:is(.beer, beer-css) { overflow: unset; display: block; }\n\n:is(.beer, beer-css):not(.light, .dark) { background: none; }`
    : newContent;
}

export function toMinify(content) {
  return content.replace(/\s{2,}|(\/\*.+\*\/)/g, "");
}

export function toModule(file, scoped = false, minify = false) {
  let content = fs.readFileSync(file, "utf-8");
  content = toUrl(content);
  if (scoped) content = toScoped(file, content);
  if (minify) content = toMinify(content);
  fs.writeFileSync(file, content);
}
