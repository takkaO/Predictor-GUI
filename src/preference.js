"use strict";

const ipcRenderer = window.ipcRenderer;
const remote = window.remote;

const Store = remote.require('electron-store');
const store = new Store();




window.addEventListener("load", function () {
	if (window.isElectron) {
		console.log("OK");
		console.log(store.get('script'))
	}
});
