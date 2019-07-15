"use strict";

const ipcRenderer = window.ipcRenderer;
const remote = window.remote;

const Store = remote.require('electron-store');
const store = new Store();

const command = document.getElementById("command");
const predictor = document.getElementById("predictor");
const model = document.getElementById("model");


window.addEventListener("close", function () {
	store.set("command", command.value);
	store.set("predictor", predictor.value);
	store.set("model", model.value);
});

window.addEventListener("load", function () {
	if (window.isElectron) {
			command.value = store.get("command");
			predictor.value = store.get("predictor");
			model.value = store.get("model");
	}
});
