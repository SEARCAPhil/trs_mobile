
export default class {
	constructor(opt = {}) {
		this.xhr = new window.trs.exports.XHR() || opt.XHR
		this.conf = window.trs.config.network || opt.network
		this.url = `${this.conf}automobile/gasoline.php`
	}

	add(opt) {
		return this.xhr.request({ url: this.url, method: 'POST',body:JSON.stringify(opt) })
	}
}
