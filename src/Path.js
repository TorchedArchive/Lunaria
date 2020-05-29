const userinfo = require("os").userInfo()
const path = require("path")

class Path {
	static handle(p) {
		p = this.findAndReplace(userinfo.homedir, "~", p)
        p = this.findAndReplace(path.parse(userinfo.homedir).root, "\\", p)

        return p;
	}

	static reverseHandle(p) {
		p = this.findAndReplace("~", userinfo.homedir, p)
        p = this.findAndReplace("\\", path.parse(userinfo.homedir).root, p)

        return p;
	}

	static findAndReplace(find, replace, subject) {
        while (subject.includes(find)) {
            subject = subject.replace(find, replace);
        }

        return subject;
    }
}

module.exports = Path;