const fs = require("fs")

exports.run = (args) => {
	if(!args[1]) return;
	if(fs.existsSync(args[1])) {
		process.chdir(args[1])
	} else {
		process.stdout.write("That directory does not exist.\n")
	}
}