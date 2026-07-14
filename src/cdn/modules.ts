import { randomId } from "./utils";

const _id = randomId();
let _elements: string[] = [];
let _helpers: string[] = [];
let _urls: { [key: string]: Promise<string> } = {};
let _url = new URL(import.meta.url);

export function getModule(url: string, path: string, scoped: boolean): string {
  return new URL(scoped ? path.replace("./", "./scoped/") : path, url).href;
}

export async function importModulesFromUrl(url?: string): Promise<string> {
  url = url || _url?.href;
  if (!url) return "";

  const urlObject = new URL(url);
  const elements: string[] = urlObject.searchParams.get("elements")?.split(",")?.filter(Boolean) || [];
  const helpers: string[] = urlObject.searchParams.get("helpers")?.split(",")?.filter(Boolean) || [];
  const isScoped = !!urlObject.searchParams.get("scoped");
  
  if (!elements.length && !helpers.length) return "";

  const mergedElements = Array.from(new Set([...elements, ..._elements])).sort();
  const mergedHelpers = Array.from(new Set([...helpers, ..._helpers])).sort();

  if (mergedElements.length == _elements.length && mergedHelpers.length == _helpers.length) return "";
  
  _elements = mergedElements;
  _helpers = mergedHelpers;

  const modules: string[] = [
    getModule(url, "./settings/global.css", isScoped),
    getModule(url, "./settings/light.css", isScoped),
    getModule(url, "./settings/dark.css", isScoped),
    getModule(url, "./settings/font.css", isScoped),
    getModule(url, "./settings/reset.css", isScoped),
    getModule(url, "./settings/theme.css", isScoped),
    ...mergedHelpers.map((name) => getModule(url, `./helpers/${name}.css`, isScoped)),
    ...mergedElements.map((name) => getModule(url, `./elements/${name}.css`, isScoped)),
  ];

  const requests: Promise<string>[] = [];
  for(let module of modules) {
    _urls[module] = _urls[module] || fetch(module)
      .then((response) => response.ok ? response.text() : "")
      .catch(() => "")
    requests.push(_urls[module]);
  }

  const responses = (await Promise.allSettled<any>(requests))
    .filter((response: any) => !!response.value)
    .map((response: any) => response.value);

  let styleElement = document.getElementById(_id);
  if (styleElement) {
    styleElement.textContent = responses.join("\n");
    return styleElement.textContent;
  }
  
  styleElement = document.createElement("style");
  styleElement.id = _id;
  styleElement.textContent = responses.join("\n");
  const scriptElement = document.querySelector("head > script[src*=beer]");
  if (scriptElement) scriptElement.insertAdjacentElement("afterend", styleElement);
  else document.head.appendChild(styleElement);
  return styleElement.textContent;
}

export async function importModulesFromQueryString(queryString: string): Promise<string> {
  const params = new URLSearchParams(queryString);
  const urlObject = new URL(_url);

  urlObject.searchParams.set("elements", params.get("elements") || "");
  urlObject.searchParams.set("helpers", params.get("helpers") || "");

  return importModulesFromUrl(urlObject.href);
}