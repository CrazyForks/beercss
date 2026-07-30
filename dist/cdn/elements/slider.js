//#region src/cdn/globals.ts
var _context = globalThis;
_context.__BeerCssGlobals__ = _context.__BeerCssGlobals__ || {};
var globals_default = () => {
	return _context.__BeerCssGlobals__;
};
new URL(import.meta.url);
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
function off(element, name, callback, useCapture = true) {
	if (element?.removeEventListener) element.removeEventListener(name, callback, useCapture);
}
function parent(element) {
	return element?.parentElement;
}
function rootSizeInPixels() {
	const rootElement = query(".beer") || document.documentElement;
	const size = getComputedStyle(rootElement).getPropertyValue("--size") || "16px";
	if (size.includes("%")) return parseInt(size) * 16 / 100;
	if (size.includes("em")) return parseInt(size) * 16;
	return parseInt(size);
}
//#endregion
//#region src/cdn/elements/slider.ts
function onInputDocument(e) {
	const input = e.target;
	if (!hasTag(input, "input") && !hasTag(input, "select")) return;
	if (input.type === "range") {
		input.focus();
		updateRange(input);
	} else updateAllRanges();
}
function onChangeInput(e) {
	if (!window.matchMedia("(pointer: coarse)").matches) return;
	e.target.blur();
}
function updateAllRanges() {
	const body = document.body;
	const ranges = queryAll(".slider > input[type=range]");
	if (!ranges.length) off(body, "input", onInputDocument, false);
	else on(body, "input", onInputDocument, false);
	for (let i = 0; i < ranges.length; i++) updateRange(ranges[i]);
}
function updateRange(input) {
	onWeak(input, "change", onChangeInput);
	const label = parent(input);
	const bar = query("span", label);
	const inputs = queryAll("input", label);
	if (!inputs.length || !bar) return;
	const rootSize = rootSizeInPixels();
	const thumb = hasClass(label, "max") ? 0 : .25 * rootSize * 100 / inputs[0].offsetWidth;
	const percents = [];
	const values = [];
	for (let i = 0, n = inputs.length; i < n; i++) {
		const min = parseFloat(inputs[i].min) || 0;
		const max = parseFloat(inputs[i].max) || 100;
		const value = parseFloat(inputs[i].value) || 0;
		const percent = (value - min) * 100 / (max - min);
		const fix = thumb / 2 - thumb * percent / 100;
		percents.push(percent + fix);
		values.push(value);
	}
	let percent = percents[0];
	let start = 0;
	let end = 100 - start - percent;
	let value1 = values[0];
	let value2 = values[1] || 0;
	if (inputs.length > 1) {
		percent = Math.abs(percents[1] - percents[0]);
		start = percents[1] > percents[0] ? percents[0] : percents[1];
		end = 100 - start - percent;
		if (value2 > value1) {
			value1 = values[1] || 0;
			value2 = values[0];
		}
	}
	requestAnimationFrame(() => label.style.cssText = `--_start: ${start}%; --_end: ${end}%; --_value1: '${value1}'; --_value2: '${value2}';`);
}
function updateAllSliders() {
	updateAllRanges();
}
globals_default().slider = { updateAllSliders };
//#endregion
export { updateAllSliders };
