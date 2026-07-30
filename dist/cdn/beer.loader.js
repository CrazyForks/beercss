//#region src/cdn/globals.ts
var _context$1 = globalThis;
_context$1.__BeerCssGlobals__ = _context$1.__BeerCssGlobals__ || {};
var globals_default = () => {
	return _context$1.__BeerCssGlobals__;
};
//#endregion
//#region src/cdn/utils.ts
var _settings = [];
var _elements = [];
var _helpers = [];
var _urls = {};
var _url$1 = new URL(import.meta.url);
var _id = "__BeerCssStyleTag__";
var _allSettings = [
	"global",
	"light",
	"dark",
	"font",
	"reset",
	"theme"
];
var _allElements = [
	"badge",
	"bar",
	"button",
	"card",
	"chip",
	"dialog",
	"divider",
	"expansion",
	"field",
	"grid",
	"icon",
	"layout",
	"list",
	"mainLayout",
	"media",
	"menu",
	"navigation",
	"overlay",
	"page",
	"progress",
	"selection",
	"shape",
	"slider",
	"snackbar",
	"tab",
	"table",
	"tooltip",
	"typography"
];
var _allHelpers = [
	"alignment",
	"blur",
	"color",
	"direction",
	"elevate",
	"form",
	"margin",
	"opacity",
	"padding",
	"position",
	"responsive",
	"ripple",
	"scroll",
	"shadow",
	"size",
	"space",
	"wave",
	"zoom"
];
var _allJs = [
	"dialog",
	"field",
	"menu",
	"page",
	"progress",
	"ripple",
	"slider",
	"snackbar",
	"theme"
];
var _emptyNodeList = [];
var _weakMap = /* @__PURE__ */ new WeakMap();
navigator.userAgent.includes("Chrome");
navigator.userAgent.includes("Firefox");
navigator.userAgent.includes("Safari");
navigator.userAgent.includes("Windows");
navigator.userAgent.includes("Macintosh");
navigator.userAgent.includes("Linux");
navigator.userAgent.includes("Android");
/iPad|iPhone|iPod/.test(navigator.userAgent);
function guid() {
	return "fxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
		const r = Math.random() * 16 | 0;
		return (c === "x" ? r : r & 3 | 8).toString(16);
	});
}
function query(selector, element) {
	try {
		return typeof selector === "string" ? (element ?? document).querySelector(selector) : selector;
	} catch {
		return null;
	}
}
function queryAll(selector, element) {
	try {
		return typeof selector === "string" ? (element ?? document).querySelectorAll(selector) : selector ?? _emptyNodeList;
	} catch {
		return _emptyNodeList;
	}
}
function hasClass(element, name) {
	return element?.classList.contains(name) ?? false;
}
function hasTag(element, name) {
	return element?.tagName?.toLowerCase() === name;
}
function addClass(element, name) {
	if (element instanceof NodeList) for (let i = 0; i < element.length; i++) element[i].classList.add(name);
	else element?.classList.add(name);
}
function removeClass(element, name) {
	if (element instanceof NodeList) for (let i = 0; i < element.length; i++) element[i].classList.remove(name);
	else element?.classList.remove(name);
}
function on(element, name, callback, useCapture = true) {
	if (element?.addEventListener) element.addEventListener(name, callback, useCapture);
}
function onWeak(element, name, callback, useCapture = true) {
	if (!element) return;
	const el = element;
	let events = _weakMap.get(el);
	if (!events) {
		events = /* @__PURE__ */ new Map();
		_weakMap.set(el, events);
	}
	const key = name + (useCapture ? "1" : "0");
	let callbacks = events.get(key);
	if (!callbacks) {
		callbacks = /* @__PURE__ */ new Set();
		events.set(key, callbacks);
	}
	if (callbacks.has(callback)) return;
	callbacks.add(callback);
	on(element, name, callback, useCapture);
}
function closest(element, selector) {
	return element?.closest(selector);
}
function queryDataUi(id) {
	return query("[data-ui=\"#" + id + "\"]");
}
function updateAllClickable(element) {
	if (element.id && hasClass(element, "page")) element = queryDataUi(element.id) ?? element;
	const container = closest(element, ".tabs, nav");
	if (!container) return;
	removeClass(queryAll("a", container), "active");
	if (!hasTag(element, "button") && !hasClass(element, "button") && !hasClass(element, "chip")) addClass(element, "active");
}
function getCssModule(url, path, scoped) {
	return new URL(scoped ? path.replace(".min.css", ".scoped.min.css") : path, url).href;
}
function getJsModule(url, path) {
	return new URL(path, url).href;
}
function hasJs(name) {
	return _allJs.indexOf(name) != -1;
}
function getScriptElement() {
	return Array.from(document.querySelectorAll("script[type=module]")).find((x) => (x.getAttribute("src") || x.innerHTML).indexOf("beer.") != -1);
}
async function importModulesFromUrl(url) {
	url = url || _url$1?.href;
	if (!url) return "";
	const params = new URL(url).searchParams;
	const settings = params.get("settings")?.split(",")?.filter(Boolean) || [];
	const elements = params.get("elements")?.split(",")?.filter(Boolean) || [];
	const helpers = params.get("helpers")?.split(",")?.filter(Boolean) || [];
	const scoped = !!params.get("scoped");
	if (!settings.length && !elements.length && !helpers.length) return "";
	const mergedSettings = params.has("settings") ? Array.from(/* @__PURE__ */ new Set([...settings, ..._settings])).sort() : _allSettings;
	const mergedElements = params.has("elements") ? Array.from(/* @__PURE__ */ new Set([...elements, ..._elements])).sort() : _allElements;
	const mergedHelpers = params.has("helpers") ? Array.from(/* @__PURE__ */ new Set([...helpers, ..._helpers])).sort() : _allHelpers;
	if (mergedSettings.length == _settings.length && mergedElements.length == _elements.length && mergedHelpers.length == _helpers.length) return "";
	_settings = mergedSettings;
	_elements = mergedElements;
	_helpers = mergedHelpers;
	const cssModules = [
		...mergedSettings.map((name) => getCssModule(url, `./settings/${name}.min.css`, scoped)),
		...mergedHelpers.map((name) => getCssModule(url, `./helpers/${name}.min.css`, scoped)),
		...mergedElements.map((name) => getCssModule(url, `./elements/${name}.min.css`, scoped))
	];
	const jsModules = [
		...mergedSettings.filter(hasJs).map((name) => getJsModule(url, `./settings/${name}.min.js`)),
		...mergedHelpers.filter(hasJs).map((name) => getJsModule(url, `./helpers/${name}.min.js`)),
		...mergedElements.filter(hasJs).map((name) => getJsModule(url, `./elements/${name}.min.js`))
	];
	const requests = [];
	for (let module of cssModules) {
		_urls[module] = _urls[module] || fetch(module).then((response) => response.ok ? response.text() : "").catch(() => "");
		requests.push(_urls[module]);
	}
	for (let module of jsModules) {
		_urls[module] = _urls[module] || import(
			/* @vite-ignore */
			module
);
		requests.push(_urls[module]);
	}
	const responses = (await Promise.allSettled(requests)).filter((response) => !!response.value && typeof response.value == "string").map((response) => response.value);
	let styleElement = document.getElementById(_id);
	if (styleElement) {
		styleElement.textContent = responses.join("\n");
		return styleElement.textContent;
	}
	styleElement = document.createElement("style");
	styleElement.id = _id;
	styleElement.textContent = responses.join("\n");
	const scriptElement = getScriptElement();
	if (scriptElement) scriptElement.insertAdjacentElement("afterend", styleElement);
	else document.head.appendChild(styleElement);
	return styleElement.textContent;
}
async function importModulesFromQueryString(queryString) {
	const params = new URLSearchParams(queryString);
	const urlObject = new URL(_url$1);
	if (params.has("settings")) urlObject.searchParams.set("settings", params.get("settings") || "");
	if (params.has("elements")) urlObject.searchParams.set("elements", params.get("elements") || "");
	if (params.has("helpers")) urlObject.searchParams.set("helpers", params.get("helpers") || "");
	if (params.has("scoped")) urlObject.searchParams.set("scoped", params.get("scoped") || "");
	return importModulesFromUrl(urlObject.href);
}
//#endregion
//#region src/cdn/loader.ts
var _url = import.meta.url;
var _context = globalThis;
var _timeoutMutation;
var _mutation;
function onMutation() {
	if (_timeoutMutation) clearTimeout(_timeoutMutation);
	_timeoutMutation = setTimeout(async () => await _ui(), 180);
}
async function run(from, to, options, e) {
	if (!to) {
		to = query(from.getAttribute("data-ui"));
		if (!to) {
			from.classList.toggle("active");
			return;
		}
	}
	updateAllClickable(from);
	if (hasTag(to, "dialog")) {
		requestAnimationFrame(() => globals_default().dialog?.updateDialog(from, to));
		return;
	}
	if (hasTag(to, "menu")) {
		requestAnimationFrame(() => globals_default().menu?.updateMenu(from, to, e));
		return;
	}
	if (hasClass(to, "snackbar")) {
		requestAnimationFrame(() => globals_default().snackbar?.updateSnackbar(to, options));
		return;
	}
	if (hasClass(to, "page")) {
		requestAnimationFrame(() => globals_default().page?.updatePage(to));
		return;
	}
	if (hasClass(to, "active")) {
		removeClass(from, "active");
		removeClass(to, "active");
		return;
	}
	addClass(to, "active");
}
function setup() {
	if (_context.ui || _mutation || !_context.MutationObserver) return;
	_mutation = new MutationObserver(onMutation);
	_mutation.observe(document.body, {
		childList: true,
		subtree: true
	});
	onMutation();
}
function onClickDataUi(e) {
	const from = e.target.closest("[data-ui]");
	if (from) run(from, null, null, e);
}
function onKeydownDataUi(e) {
	const from = e.target.closest("[data-ui]");
	if (from && hasTag(from, "a") && !from.getAttribute("href") && e.key === "Enter") run(from, null, null, e);
}
function updateAllDataUis() {
	const body = document.body;
	if (!body) return;
	onWeak(body, "click", onClickDataUi);
	onWeak(body, "keydown", onKeydownDataUi);
}
function _ui(selector, options) {
	if (selector) {
		if (selector === "setup") {
			setup();
			return;
		}
		if (selector === "guid") return guid();
		if (selector === "mode") return globals_default().theme?.updateMode(options);
		if (selector === "theme") return globals_default().theme?.updateTheme(options);
		if (selector === "import") {
			importModulesFromQueryString(options);
			return;
		}
		const to = query(selector);
		if (!to) return;
		run(to, to, options);
	}
	updateAllDataUis();
	globals_default().field?.updateAllFields();
	globals_default().ripple?.updateAllRipples();
	globals_default().slider?.updateAllSliders();
	globals_default().progress?.updateAllProgress();
}
function start() {
	if (_context.ui) return;
	const body = _context.document?.body;
	if (body && !body.classList.contains("dark") && !body.classList.contains("light")) globals_default().theme?.updateMode("auto");
	setup();
	_context.ui = _ui;
}
importModulesFromUrl(_url);
start();
var ui = _context.ui;
globals_default().ui = ui;
//#endregion
export { ui as default, ui };
