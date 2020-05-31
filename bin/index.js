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
const utils = require("../src/utils.js")
const Path = require("../src/Path.js")
let commands = []

const baseConfig = {
	prompt: "{bold}→ {green}%username%@%hostname%{reset} {bold}{blue}%cwd% λ{reset}{bold} ",
	motd: "{bold}Welcome {cyan}%username%{reset}{bold} to {cyan}KannaShell v%ver%!\n",
	askOnExit: true
}
if(!utils.config()) fs.appendFileSync(`${require("os").userInfo().homedir}\\.kannaconf.json`, JSON.stringify(baseConfig, null, 4))

// Put available commands in an array.
fs.readdirSync(__dirname + "/commands/").filter(c => c.endsWith('.js')).forEach(c => {commands.push(c.slice(0, -3))})

completer = (line) => {
	if(!line.includes("cd")) return;
	line = line.slice(3)
	const currAddedDir = (line.indexOf('\\') != - 1) ? line.substring(0, line.lastIndexOf('\\') + 1) : '';
	const currAddingDir = line.substr(line.lastIndexOf('\\') + 1);
	const path = `${line.match(/^(~|\/)/) ? Path.reverseHandle(line.split("\\")[0]) : process.cwd()}\\${line.match(/^(~|\/)/) ? currAddedDir.slice(1) : currAddedDir}`;
	const completions = fs.readdirSync(path, { withFileTypes: true }).filter(p => p.isDirectory()).map(d => d.name)
	const hits = completions.filter(function(c) { return c.indexOf(currAddingDir) === 0});

	let strike = [];
	if (hits.length === 1) strike.push(currAddedDir + hits[0] + '\\');

	return (strike.length) ? [strike, line] : [hits.length ? hits : completions, line];
}

const ci = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  completer: completer
})

// Function to draw the prompt
prompt = () => {
	ci.setPrompt(utils.getPrompt())
	ci.prompt()
}

// Runs a command when Enter/Return is pressed.
ci.on("line", (input) => {
	const argv = input.split(" ")
	if(!commands.includes(argv[0])) {
		try {
			execSync(input, {
				stdio: "inherit"
			})
		} catch(err) {
			console.log(err.message)
		}
	} else {
		require(`./commands/${argv[0]}.js`).run(argv)
	}
	prompt()
})

// Shows the MOTD and draws the prompt initially.
utils.displayMOTD()
prompt()

ci.on('SIGINT', () => {
	if(!utils.config().askOnExit) {
		ci.close()
	} else {
		console.log("")
		ci.question("Are you sure that you want to exit? ", (ans) => {
			if(ans.match(/^y(es)?$/i)) return ci.close()
			prompt()
		})
	}
});

ci.on('close', () => {
	console.log("Goodbye!")
	process.exit(0)
});