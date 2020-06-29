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

const userinfo = require("os").userInfo()
const path = require("path")

class Path {
	static handle(p) {
		p = this._shortenHomeDir(p)
		p = this._shortenRootDir(p)

		return p;
	}

	static reverseHandle(p) {
		p = this.findAndReplace("~", userinfo.homedir, p)
		p = this.findAndReplace("/", path.parse(userinfo.homedir).root, p)

		return p;
	}

	static findAndReplace(find, replace, subject) {
		while (subject.includes(find)) {
			subject = subject.replace(find, replace);
		}

		return subject;
	}

	static _shortenHomeDir(p) {
		return this.findAndReplace(userinfo.homedir, "~", p)
	}

	static _shortenRootDir(p) {
		return this.findAndReplace(path.parse(userinfo.homedir).root, "/", p)
	}
}

module.exports = Path;