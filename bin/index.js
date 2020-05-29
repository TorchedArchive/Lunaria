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
const fs = require("fs")
const commands = []

fs.readdirSync(__dirname + "/../commands/").filter(c => c.endsWith('.js')).forEach(c => {commands.push(c.slice(0, -3))})
process.stdout.write("-> ");
process.stdin.on('data', d => {
	const argv = d.toString().trim().split(" ")
	try {
		if(commands.includes(argv[0])) {
			require(`../commands/${argv[0]}.js`).run(argv)
			process.stdout.write("\n-> ")
		} else {
			process.stdout.write(execSync(argv.join(" ")))
			process.stdout.write("\n-> ");
		}
	} catch(err) {
		process.stdout.write("\n[E] -> ");
	}
});