const Sha1 = require('sha1')

export default class {
	constructor(opt = {}) {
		this.xhr = new window.trs.exports.XHR() || opt.XHR
		this.conf = window.trs.config.network || opt.network
		this.url = `${this.conf}auth/auth.php`
	}

	login(username, password) {
		const data = {
			username,
			password: Sha1(password),
		}

		return this.xhr.request({ url: this.url, method: 'POST', body: JSON.stringify(data) })
	}
}
