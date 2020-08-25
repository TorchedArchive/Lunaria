const userinfo = require('os').userInfo();
const path = require('path');

class LunariaPathHandle {
	static handle(p) {
		p = p.replace(userinfo.homedir, '~');
		p = p.replace(path.parse(userinfo.homedir).root, '/');

		return p;
	}

	static reverseHandle(p) {
		p = p.replace('~', userinfo.homedir);
		p = p.replace('/', path.parse(userinfo.homedir).root, p);

		return p;
	}
}

module.exports = LunariaPathHandle;
