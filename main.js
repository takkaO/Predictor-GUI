"use strict";

const { app, Menu, BrowserWindow, ipcMain } = require("electron");

var mainWindow = null;
var preferenceWindow = null;

function createPreferenceWindow(){
	preferenceWindow = new BrowserWindow({
		width: 500,
		height: 320,
		parent: mainWindow,
		modal: true,
		resizable: false,
		webPreferences: { 
			nodeIntegration: false,   // レンダ側でもNodejsのAPIを使用するか否か
			contextIsolation: false,  // レンダとメインのglobal（window）を分離するか否か
			preload: __dirname + "/preload.js",
		}
	});

	preferenceWindow.removeMenu();
	preferenceWindow.loadFile(__dirname + "/src/preference.html");
	//preferenceWindow.webContents.openDevTools();

	preferenceWindow.on('closed', function () {
		preferenceWindow = null;
	});
};

function createWindow() {
	mainWindow = new BrowserWindow({
		width: 420,
		height: 550,
		webPreferences: { 
			nodeIntegration: false,   // レンダ側でもNodejsのAPIを使用するか否か
			contextIsolation: false,  // レンダとメインのglobal（window）を分離するか否か
			preload: __dirname + "/preload.js",
		}
	});

	// カスタムメニューを作成
	const template = [
		{
			label: "Files",
			submenu: [{
				label: "Preference",
				click(){
					if (preferenceWindow === null) {
						createPreferenceWindow();
					}
				}
			}]
		},
		{
			label: "View",
			submenu: [
				{ role: 'reload'},
				{ role: 'toggledevtools' }
			]
		}
	];
	const menu = Menu.buildFromTemplate(template);
	Menu.setApplicationMenu(menu);
	

	mainWindow.loadFile("index.html");
	// Dev tool を自動起動
	//mainWindow.webContents.openDevTools();
	

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