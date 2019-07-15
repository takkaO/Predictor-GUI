"use strict";

const { app, BrowserWindow, ipcMain } = require("electron");

var mainWindow = null;
var preferenceWindow = null;

ipcMain.on("create_preference_window", function(){
	if (preferenceWindow === null){
		createPreferenceWindow();
	}
});

function createPreferenceWindow(){
	preferenceWindow = new BrowserWindow({
		width: 500,
		height: 350,
		parent: mainWindow,
		modal: true,
		webPreferences: { 
			nodeIntegration: false,   // レンダ側でもNodejsのAPIを使用するか否か
			contextIsolation: false,  // レンダとメインのglobal（window）を分離するか否か
			preload: __dirname + "/preload.js",
		}
	});

	preferenceWindow.loadFile(__dirname + "/src/preference.html");
	//preferenceWindow.webContents.openDevTools();

	preferenceWindow.on('closed', function () {
		preferenceWindow = null;
	});
};

function createWindow() {
	mainWindow = new BrowserWindow({
		width: 800,
		height: 600,
		webPreferences: { 
			nodeIntegration: false,   // レンダ側でもNodejsのAPIを使用するか否か
			contextIsolation: false,  // レンダとメインのglobal（window）を分離するか否か
			preload: __dirname + "/preload.js",
		}
	});

	//mainWindow.webContents.loadURL("file://" + __dirname + "/index.html");
	mainWindow.loadFile("index.html");
	// Dev tool を自動起動
	mainWindow.webContents.openDevTools();
	

	mainWindow.on('closed', function () {
		mainWindow = null;
	});
};


app.on('window-all-closed', function () {
	if (process.platform !== 'darwin') {
		app.quit();
	}
});

app.on("ready", createWindow);


app.on('activate', function () {
	if (mainWindow === null) {
		createWindow();
	}
});