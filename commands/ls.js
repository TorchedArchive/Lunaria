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
const fs = require("fs")
const Path = require("../src/Path.js")

exports.run = (args, shortargs, longargs) => {
	if(!args[1]) args[1] = "."

	const dir = args.slice(1).join(" ")
	if(!fs.existsSync(Path.reverseHandle(dir))) return process.stdout.write("ls: directory does not exist\n") 

	fs.readdirSync(Path.reverseHandle(dir), { withFileTypes: true }).filter(f => shortargs.includes("a") || longargs.all ? f : !f.name.startsWith(".")).forEach(f => {
		process.stdout.write(`${f.isDirectory() && (shortargs.includes("C") || longargs.color) ? "\u001b[34m" : "\u001b[0m"}${f.name}   `)
	})
	process.stdout.write("\n")
}