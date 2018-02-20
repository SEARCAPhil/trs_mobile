
export default class {
	constructor(opt = {}) {
		this.xhr = new window.trs.exports.XHR() || opt.XHR
		this.conf = window.trs.config.network || opt.network
		this.url = `${this.conf}automobile/vehicle.php`
	}

	getVehicle() {
		return this.xhr.request({ url: this.url, method: 'GET' })
	}
	getDrivers() {
		return this.xhr.request({ url: `${this.conf}automobile/drivers.php`, method: 'GET' })
	}
}
