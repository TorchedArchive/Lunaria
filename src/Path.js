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

	static _shortenHomeDir(p) {
		return this.findAndReplace(userinfo.homedir, "~", p)
	}

	static _shortenRootDir(p) {
		return this.findAndReplace(path.parse(userinfo.homedir).root, "/", p)
	}

	static findAndReplace(find, replace, subject) {
        while (subject.includes(find)) {
            subject = subject.replace(find, replace);
        }

        return subject;
    }
}

module.exports = Path;