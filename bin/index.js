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
let commands = []

// Put available commands in an array.
fs.readdirSync(__dirname + "/commands/").filter(c => c.endsWith('.js')).forEach(c => {commands.push(c.slice(0, -3))})
const ci = readline.createInterface({
  input: process.stdin,
  output: process.stdout
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

// Draw the prompt initially.
prompt()