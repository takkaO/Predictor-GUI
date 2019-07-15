"use strict";

const ipcRenderer = window.ipcRenderer;
const remote = window.remote;

var python = remote.require("./src/py.js");
const hoge = document.getElementById("test_btn");

const Store = remote.require('electron-store');
const store = new Store();

function initializePreferenceFile(){
	var cmd = store.get('command');
	if (cmd !== undefined){
		return;
	}

	store.set("command", "py");
	store.set("predictor", "");
	store.set("model", "");
};

ipcRenderer.on("py_return", function (evt, msg) {
	console.log(msg)
});


hoge.addEventListener("click", function(){
	//python.exec("./src/predictor.py")
	ipcRenderer.send("create_preference_window");
});

window.addEventListener("load", function () {
	if (window.isElectron) {
		console.log("OK");
		//store.set("command", "py");
		initializePreferenceFile();
		//store.clear();
	}
});
