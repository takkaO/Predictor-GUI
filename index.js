"use strict";

const ipcRenderer = window.ipcRenderer;
const remote = window.remote;
//var spawn = remote.require("child_process").spawn;
//var python = spawn("py", ['./test.py'])

var python = remote.require("./py.js")
const hoge = document.getElementById("test_btn")


ipcRenderer.on("py_return", function (evt, msg) {
	console.log(msg)
});



hoge.addEventListener("click", function(){
	python.exec("./test.py")
});

window.addEventListener("load", function () {
	if (window.isElectron) {
		console.log("OK");
		
	}
});
