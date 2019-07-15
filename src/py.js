const { remote, BrowserWindow } = require('electron');
var mainWindow = BrowserWindow.getFocusedWindow();
var spawn = require("child_process").spawn;

var script_key = null;

const pythonUtils = {
	testout: function () {
		console.log("Hello OK");
	},

	check_script: function(){
		var python = spawn("python3", ["./python.py"]);
		python.stdout.on('data', function (data) {
			data = (new TextDecoder).decode(data);
			mainWindow.webContents.send("py_return", data);
		});

		python.stderr.on('data', function(data){
			data = (new TextDecoder).decode(data);
			mainWindow.webContents.send("py_return", data);
		});
	},

	exec: function (fpath) {
		var python = spawn("py", [fpath, "C:/Users/csel-pc05/Desktop/dataset/Barkhorn/Barkhorn0.jpg"]);
		python.stdout.on('data', function (data) {
			data = (new TextDecoder).decode(data);
			mainWindow.webContents.send("py_return", data);
		});

		python.stderr.on('data', function(data){
			data = (new TextDecoder).decode(data);
			mainWindow.webContents.send("py_return", data);
		});
	}
};

module.exports = pythonUtils;