"use strict";

// preload.js
const electron = require('electron');
const path = require('path');
// add global variables to your web page
function initRendererNodejs(){
	global.isElectron = true;
	global.ipcRenderer = electron.ipcRenderer;
	global.remote = electron.remote;
	global.projectDirectory = __dirname;
	global.projectRoot = __dirname;
	if (global.projectRoot.split(path.sep).pop() === "app.asar"){
		global.projectRoot = path.resolve(path.join(global.projectRoot, "../../"));
	}
	// also OK
	//window.isElectron = true;
	//window.ipcRenderer = ipcRenderer;
	//window.remote = electron.remote;
}

initRendererNodejs();