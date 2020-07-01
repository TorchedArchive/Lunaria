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
const os = require("os")
const Path = require("../src/Path.js")

exports.run = (args) => {
	if(!args[1]) return process.chdir(os.userInfo().homedir)
	const file = args.slice(1).join(" ")
	if(fs.existsSync(Path.reverseHandle(file))) {
		try {
			const contents = fs.readFileSync(Path.reverseHandle(file))
			console.log(contents.toString())
		} catch(err) {
			switch(err.code) {
				case "EISDIR":
					process.stdout.write("cat: argument entered was a directory\n")
				break;

				default:
					process.stdout.write(`cat: other error occurred:\n${err}\n`)
				break;
			}
		}
	} else {
		process.stdout.write("cat: file does not exist\n")
	}
}
