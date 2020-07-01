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

const os = require("os")
const fs = require("fs")
const Package = require("../package.json")
const Path = require("./Path.js")

class KannaUtils {
	static _config = false; // Where we will store the config for access instead of constantly reading the file.
	static _prompt = false; // Same as above but for our prompt.
	static get prompt() {
		if(this._prompt) return this._prompt
		let str = this.config.prompt
		for(let key in this.vars) {
			str = str.replace(new RegExp(key, "g"), this.vars[key])
		}
    	return str
	}

	static displayMOTD() {
		let motd = this.config.motd
		if(!motd || motd === "") return;
		for(let key in this.vars) {
			motd = motd.replace(new RegExp(key, "g"), this.vars[key])
		}
		return console.log(motd + this.vars["{reset}"])
	}

	static refreshConfig() {
		try {
			const config = JSON.parse(fs.readFileSync(`${os.userInfo().homedir}\\.kannaconf.json`))
			this._config = config
			return true
		} catch(err) {
			try {
				const config = JSON.parse(fs.readFileSync(`${__dirname}\\..\\baseConfig.json`))
				this._config = {
					error: true,
					...config
				}
				return {error: true}
			} catch(_) {
				throw new Error("Your config is invalid, and the base config has been changed to also be invalid. Fix the \"baseConfig.json\" or your own.")
			}
		}
	}

	static refreshPrompt() {
		let prompt = this.config.prompt
		for(let key in this.vars) {
			prompt = prompt.replace(new RegExp(key, "g"), this.vars[key])
		}
		this._prompt = prompt
		return true
	}

	static get config() {
		if(this._config) return this._config;
		if(fs.existsSync(`${os.userInfo().homedir}\\.kannaconf.json`)) {
			try {
				const config = JSON.parse(fs.readFileSync(`${os.userInfo().homedir}\\.kannaconf.json`))
				this._config = config
				return config
			} catch(err) {
				try {
					const config = JSON.parse(fs.readFileSync(`${__dirname}\\..\\baseConfig.json`))
					this._config = {
						error: true,
						...config
					}
					return this._config
				} catch(_) {
					throw new Error("Your config is invalid, and the base config has been changed to also be invalid. Fix the \"baseConfig.json\" or your own.")
				}
			}
		} else {
			return false;
		}
	}

	static get vars() {
		return {
			"%username%": os.userInfo().username,
			"%hostname%": os.hostname(),
			"%cwd%": Path.handle(process.cwd()),
			"%cwf%": Path.handle(process.cwd()).split("\\")[Path.handle(process.cwd()).split("\\").length - 1],
			"%ver%": Package.version,
			"{reset}": "\u001b[0m",
			"{bold}": "\u001b[1m",
			"{italic}": "\u001b[3m",
			"{underline}": "\u001b[4m",
			"{strike}|{strikethrough}": "\u001b[9m",
			"{black}": "\u001b[30m",
			"{red}": "\u001b[31m",
			"{green}": "\u001b[32m",
			"{yellow}": "\u001b[33m",
			"{blue}": "\u001b[34m",
			"{magenta}": "\u001b[35m",
			"{cyan}": "\u001b[36m",
			"{white}": "\u001b[37m"
		}
	}
}

module.exports = KannaUtils;