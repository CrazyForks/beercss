//#region src/cdn/globals.ts
var _context = globalThis;
_context.__BeerCssGlobals__ = _context.__BeerCssGlobals__ || {};
var globals_default = () => {
	return _context.__BeerCssGlobals__;
};
new URL(import.meta.url);
var _emptyNodeList = [];
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
function off(element, name, callback, useCapture = true) {
	if (element?.removeEventListener) element.removeEventListener(name, callback, useCapture);
}
function blurActiveElement() {
	document.activeElement?.blur();
}
//#endregion
//#region src/cdn/elements/menu.ts
var _timeoutMenu;
function onClickDocument(e) {
	off(document.body, "click", onClickDocument);
	const body = e.target;
	const menus = queryAll("menu.active");
	for (let i = 0; i < menus.length; i++) updateMenu(body, menus[i], e);
}
function focusOnMenuOrInput(menu) {
	setTimeout(() => {
		const input = query(".field > input", menu);
		if (input) input.focus();
		else menu.focus();
	}, 90);
}
function updateMenu(from, menu, e) {
	if (_timeoutMenu) clearTimeout(_timeoutMenu);
	_timeoutMenu = setTimeout(() => {
		on(document.body, "click", onClickDocument);
		if (!hasTag(document.activeElement, "input")) blurActiveElement();
		const isActive = hasClass(menu, "active");
		const isEvent = e?.target === from;
		const isChild = !!from.closest("menu");
		if (!isActive && isChild || isActive && isEvent) {
			removeClass(menu, "active");
			return;
		}
		removeClass(queryAll("menu.active"), "active");
		addClass(menu, "active");
		focusOnMenuOrInput(menu);
	}, 90);
}
globals_default().menu = { updateMenu };
//#endregion
export { updateMenu };
