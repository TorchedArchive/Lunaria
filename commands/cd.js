const fs = require("fs")
const Path = require("../src/Path.js")

exports.run = (args) => {
	if(!args[1]) return;
	const dir = args.slice(1).join(" ")
	if(fs.existsSync(Path.reverseHandle(dir))) {
		process.chdir(Path.reverseHandle(dir))
	} else {
		process.stdout.write("That directory does not exist.\n")
	}
}