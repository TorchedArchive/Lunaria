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
const chalk = require("chalk")
const config = require("../config.json")
const Path = require("./Path.js")

class KannaUtils {
  static getPrompt() {
    const vals = {
      "%username%": os.userInfo().username,
      "%hostname%": os.hostname(),
      "%cwf%": Path.handle(process.cwd()).split("\\").join("\\\\")
    }
    let str = config.prompt
    for(let key in vals) {
        str = str.replace(key, vals[key])
    }
    return eval('chalk`'+str+'`')
  }
}

module.exports = KannaUtils;