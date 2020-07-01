const fs = require("fs")
const utils = require("../src/utils.js")

exports.run = () => {
	if(utils.refreshConfig().error) {
		return process.stdout.write("refresh: fell back to base config since your own was invalid\ndo check your config for syntax errors\n")
	}
	utils.refreshPrompt()
	process.stdout.write("refresh: config has been refreshed\n")
}