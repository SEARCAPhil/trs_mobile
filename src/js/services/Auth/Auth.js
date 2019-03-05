const Sha1 = require('sha1')

export default class {
	constructor () {
		this.xhr = new window.trs.exports.XHR()
		this.config = window.trs.config.network
	}
	info (username) {
		this.username = username
		this.xhr.request({ url: `${this.config}/test` }).then((e) => {
			this.profile = e
		}).catch((error) => {
			this.authError = error
		})
	}
	login (username, password) {

		let data = {
			username,
			password: Sha1(password)
		}
		
		return this.xhr.request({ url: `${this.config}auth/`, method: 'POST', body:JSON.stringify(data) })
	}
	store (credential) {
		window.localStorage.setItem('credentials',JSON.stringify(credential))
		window.localStorage.setItem('token',credential.token)
	}

	getCredentials () {
		return window.localStorage.setItem('credentials')	
	}
}