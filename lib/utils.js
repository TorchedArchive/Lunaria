const ansiplace = require('ansiplace');
const fs = require('fs');
const os = require('os');
const package = require('../package.json');
const path = require('./Path.js');
const VariableTag = require('variabletag');

const vt = new VariableTag({
	tags: {
		'username': os.userInfo().username,
		'hostname': os.hostname(),
		'cwd': path.handle(process.cwd()),
		'cwf': path.handle(process.cwd()).split('\\')[path.handle(process.cwd()).split('\\').length - 1],
		'ver': package.version
	}
});

class LunariaUtils {
	static _config = false; // Where we will store the config for access instead of constantly reading the file.
	static _prompt = false; // Same as above but for our prompt.

	static get prompt() {
		if (this._prompt) return this._prompt;

		const formatted = vt.format(this.config().prompt);
		return ansiplace(formatted);
	}

	static displayMOTD() {
		const motd = this.config().motd;
		if (!motd || motd === '') return;

		const formatted = vt.format(motd);
		return console.log(ansiplace(formatted));
	}

	static refreshConfig() {
		return this.config(true);
	}

	static refreshPrompt() {
		const formatted = vt.format(this.config().prompt);
		this._prompt = ansiplace(formatted);
	}

	static config(recache) {
		if (this._config && !recache) return this._config;
		if (fs.existsSync(`${os.userInfo().homedir}/Lunaria/conf.json`)) {
			try {
				const config = JSON.parse(fs.readFileSync(`${os.userInfo().homedir}/Lunaria/conf.json`));
				this._config = config;
				return config;
			} catch (_) {
				try {
					const config = JSON.parse(fs.readFileSync(`${__dirname}/../baseConfig.json`));
					this._config = {
						error: true,
						...config
					};
					return this._config;
				} catch (__) {
					throw new Error('Your config is invalid, and the base config has been changed to also be invalid. Fix the "baseConfig.json" or your own.');
				}
			}
		} else {
			return false;
		}
	}
}

module.exports = LunariaUtils;
