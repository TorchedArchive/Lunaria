const fs = require("fs")
const Path = require("../src/Path.js")

exports.run = (args) => {
	if(!args[1]) return;
	if(fs.existsSync(Path.reverseHandle(args[1]))) {
		process.chdir(Path.reverseHandle(args[1]))
	} else {
		process.stdout.write("That directory does not exist.\n")
	}
}