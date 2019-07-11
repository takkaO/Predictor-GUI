"use strict";

const ipcRenderer = window.ipcRenderer;
const remote = window.remote;

window.addEventListener("load", function () {
	if (window.isElectron) {
		console.log("OK");
	}
});
