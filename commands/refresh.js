const fs = require("fs")
const utils = require("../src/utils.js")

exports.run = () => {
	utils.refreshConfig()
	utils.refreshPrompt()
	process.stdout.write("The config has been refreshed.\n")
}