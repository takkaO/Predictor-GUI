"use strict";

const ipcRenderer = window.ipcRenderer;
const remote = window.remote;

const path = remote.require("path");
const Store = remote.require('electron-store');
const store = new Store();

const command = document.getElementById("command");
const predictor = document.getElementById("predictor");
const model = document.getElementById("model");
const save_btn = document.getElementById("save_btn");
const reset_btn = document.getElementById("reset_btn");
const predictor_path_btn = document.getElementById("predictor_path");
const model_path_btn = document.getElementById("model_path");


predictor_path_btn.addEventListener("click", function () {
	const input = document.createElement('input');
	input.type = 'file';
	input.accept = '.py, .exe';
	input.onchange = function (event) {
		predictor.value = event.target.files[0].path;
	};
	input.click();
});

model_path_btn.addEventListener("click", function () {
	const input = document.createElement('input');
	input.type = 'file';
	input.accept = '.*';
	input.onchange = function (event) {
		model.value = event.target.files[0].path;
	};
	input.click();
});

reset_btn.addEventListener("click", function () {
	store.set("command", "py");
	store.set("predictor", path.join(window.projectRoot, "/STPN/predictor.py"));
	store.set("model", path.join(window.projectRoot, "/STPN/stpn.h5"));
	window.close();
});

save_btn.addEventListener("click", function () {
	store.set("command", command.value);
	store.set("predictor", predictor.value);
	store.set("model", model.value);
	window.close();
});

window.addEventListener("load", function () {
	if (window.isElectron) {
		command.value = store.get("command");
		predictor.value = store.get("predictor");
		model.value = store.get("model");
	}
});
