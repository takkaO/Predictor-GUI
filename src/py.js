const { remote, BrowserWindow } = require('electron');
var mainWindow = BrowserWindow.getFocusedWindow();
var spawn = require("child_process").spawn;

const pythonUtils = {
	testout: function () {
		console.log("Hello OK");
	},

	exec: function (cmd, predictor, model, target_path) {
		var py = spawn(cmd, [predictor, model, target_path]);
		py.stdout.on('data', function (data) {
			data = (new TextDecoder).decode(data);
			mainWindow.webContents.send("py_return", data);
		});

		py.stderr.on('data', function(data){
			data = (new TextDecoder).decode(data);
			mainWindow.webContents.send("py_error", data);
		});
	}
};

module.exports = pythonUtils;