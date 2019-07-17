"use strict";

const ipcRenderer = window.ipcRenderer;
const remote = window.remote;

var python = remote.require("./src/py.js");
var path = remote.require("path");
const predict_btn = document.getElementById("predict_btn");
const canvas = document.getElementById("canvas");
const dropzone = document.getElementById("dropzone");
const result = document.getElementById("result");
const loading = document.getElementById("loading");

const Store = remote.require('electron-store');
const store = new Store();

function initializePreferenceFile(){
	var cmd = store.get('command');
	if (cmd !== undefined){
		store.set("predictor", path.join(window.projectRoot, "/STPN/predictor.py"));
		store.set("model", path.join(window.projectRoot, "/STPN/stpn.h5"));
		return;
	}

	store.set("command", "py");
};

var target_path = null;

dropzone.addEventListener("dragover", function (evt) {
	// dropイベントのために必要
	evt.preventDefault();
});

dropzone.addEventListener("drop", function(evt){
	var info = evt.dataTransfer.files;
	//console.log(info);
	if (info.length < 1){
		// invalid file num
		return;
	}
	var fpath = info[0].path;
	
	//check file extention
	var ext = fpath.split('.').pop().toLocaleLowerCase();
	if (["jpg", "png", "jpeg", "bmp"].indexOf(ext) === -1) {
		return;
	}

	// TODO: check img width and height
	// HERE
	
	canvas.src = fpath;
	target_path = fpath;
	predict_btn.disabled = false;
});

ipcRenderer.on("py_return", function (evt, msg) {
	//console.log(decodeURI(msg));
	loading.style.display = "none";
	result.style.display = "block";

	result.innerHTML = decodeURI(msg);
	predict_btn.disabled = false;
});

ipcRenderer.on("py_error", function (evt, msg) {
	//console.log(msg);
	result.innerHTML = "Error";
	predict_btn.disabled = false;
});

predict_btn.addEventListener("click", function(){
	predict_btn.disabled = true;
	result.innerHTML = "";
	result.style.display = "none";
	loading.style.display = "block";
	var cmd = store.get("command");
	var predictor = store.get("predictor");
	var model = store.get("model");

	if (predictor.split('.').pop() !== "py"){
		// TODO: check!!
		cmd = "./";
	}

	python.exec(cmd, predictor, model, target_path);
});

window.addEventListener("load", function () {
	if (window.isElectron) {
		predict_btn.disabled = true;
		loading.style.display = "none";
		result.style.display = "none";
		initializePreferenceFile();
	}
});
