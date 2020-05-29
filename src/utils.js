const config = require("../config.json")
const os = require("os")

class KannaUtils {
	static getPrompt() {
		const vals = {
			"{username}": os.userInfo().username
		}
		for(let key in vals) {
  			return config.prompt.replace(new RegExp(key, "g"), vals[key])
		}
	}
}

module.exports = KannaUtils;