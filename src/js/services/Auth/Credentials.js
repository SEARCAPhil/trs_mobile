export default class {
	constructor () {}
	get () {
		try {
			return JSON.parse(window.localStorage.getItem('credentials'))		
		}catch(e) {
			return {}
		}
		
	}

	getToken () {
		try {
			return window.localStorage.getItem('token')		
		}catch(e) {
			return {}
		}
		
	}
}