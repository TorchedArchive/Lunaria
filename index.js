#! /usr/bin/env node
/*
    Kanna, a small and light terminal shell for Windows.
    Copyright (C) 2020 Terminalfreaks

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <https://www.gnu.org/licenses/>.
*/

const { execSync } = require("child_process")
const readline = require("readline")
const fs = require("fs")
const utils = require("./src/utils.js")
const Path = require("./src/Path.js")
let commands = []

if(!utils.config) {
	fs.appendFileSync(`${require("os").userInfo().homedir}\\.kannaconf.json`, JSON.stringify(require("./baseConfig.json"), null, 4))
} else if(utils.config.error) {
	process.stdout.write("Your config was invalid. Check it for syntax errors.\nUsing default/base config.\n\n")
}

// Put available commands in an array.
fs.readdirSync(__dirname + "/commands/").filter(c => c.endsWith('.js')).forEach(c => {commands.push(c.slice(0, -3))})

completer = (line) => {
	line = line.split(" ").slice(line.split(" ").length - 1).join(" ")
	const currAddedDir = (line.indexOf("\\") != - 1) ? line.substring(0, line.lastIndexOf("\\") + 1) : "";
	const currAddingDir = line.substr(line.lastIndexOf("\\") + 1);
	const path = `${line.match(/^(~|\/)/) ? Path.reverseHandle(line.split("\\")[0]) : process.cwd()}\\${line.match(/^(~|\/)/) ? currAddedDir.slice(1) : currAddedDir}`;
	let completions = []
	try {
		completions = fs.readdirSync(path, { withFileTypes: true }).map(d => d.name)
	} catch(e) {}
	const hits = completions.filter(function(c) { return c.indexOf(currAddingDir) === 0});

	let strike = [];
	if (hits.length === 1) strike.push(currAddedDir + hits[0] + "\\");

	return (strike.length) ? [strike, line] : [hits.length ? hits : completions, line];
}

const ci = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  completer: completer
})

// Function to draw the prompt
prompt = () => {
	ci.setPrompt(utils.prompt)
	ci.prompt()
}

// Shows the MOTD and draws the prompt initially.
utils.displayMOTD()
prompt()

// Runs a command when Enter/Return is pressed.
ci.on("line", (input) => {
	const argv = input.split(" ")
	if(!commands.includes(argv[0])) {
		try {
			execSync(input.replace("#", ""), {
				stdio: "inherit"
			})
		} catch(err) {
			if(err.status !== 1) console.log(err.message)
		}
	} else {
		const shortargs = argv.join("").split("-").slice(1).join("").split("")
		const longargs = argv.join("").split("--").slice(1).map(t => t.trim().split(" "))
		let options = {}
		for(let i = 0; i < longargs.length; i++) {
			options[longargs[i][0]] = longargs[i][1]
			
			if(!longargs[i][1]) options[longargs[i][0]] = true
			if(longargs[i].length > 2) options[longargs[i][0]] = longargs[i].slice(1)
		}
		require(`./commands/${argv[0]}.js`).run(argv.filter(a => !a.startsWith("-") && !a.startsWith("--")), shortargs, options)
	}
	prompt()
})



ci.on("SIGINT", () => {
	if(!utils.config.askOnExit) {
		ci.close()
	} else {
		console.log("")
		ci.question("Are you sure that you want to exit? ", (ans) => {
			if(ans.match(/^y(es)?$/i)) return ci.close()
			prompt()
		})
	}
});

ci.on("close", () => {
	console.log("Goodbye!")
	process.exit(0)
});