const { remote, BrowserWindow } = require('electron');
var mainWindow = BrowserWindow.getFocusedWindow();
var spawn = require("child_process").spawn;


const pythonUtils = {
	testout: function () {
		console.log("Hello OK");
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