
export default class {
	constructor(opt = {}) {
		this.xhr = opt.XHR || new window.trs.exports.XHR() 
		this.conf = window.trs.config.network || opt.network
		this.url = `${this.conf}automobile/gasoline.php`
	}

	add(opt) {
		return this.xhr.request({ url: this.url, method: 'POST',body:JSON.stringify(opt) })
	}

	info(opt) {
		return this.xhr.request({ url: this.url+`?id=${opt.id}&token=${opt.token}`, method: 'GET' })
	}

	list(opt) {
		return this.xhr.request({ url: this.url+`?page=${opt.page}&token=${opt.token}&month=${opt.month}`, method: 'GET' })
	}

	remove(opt) {
		return this.xhr.request({ url: this.url, method: 'POST',body:JSON.stringify(opt) })
	}
}
