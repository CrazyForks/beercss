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
function queryAll(selector, element) {
	try {
		return typeof selector === "string" ? (element ?? document).querySelectorAll(selector) : selector ?? _emptyNodeList;
	} catch {
		return _emptyNodeList;
	}
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
function blurActiveElement() {
	document.activeElement?.blur();
}
//#endregion
//#region src/cdn/elements/snackbar.ts
var _timeoutSnackbar;
function onClickSnackbar(e) {
	const snackbar = e.currentTarget;
	removeClass(snackbar, "active");
	if (_timeoutSnackbar) clearTimeout(_timeoutSnackbar);
}
function updateSnackbar(snackbar, milliseconds) {
	blurActiveElement();
	removeClass(queryAll(".snackbar.active"), "active");
	addClass(snackbar, "active");
	onWeak(snackbar, "click", onClickSnackbar);
	if (_timeoutSnackbar) clearTimeout(_timeoutSnackbar);
	if (milliseconds === -1) return;
	_timeoutSnackbar = setTimeout(() => {
		removeClass(snackbar, "active");
	}, milliseconds ?? 6e3);
}
globals_default().snackbar = { updateSnackbar };
//#endregion
export { updateSnackbar };
