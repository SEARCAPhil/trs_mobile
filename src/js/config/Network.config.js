export default class Network{
	constructor(){
		this.protocol = 'http'
		this.host = 'localhost'
		this.port = null
		this.basename = 'trs_api/public/api'
	}

	endpoint(){
		return `${this.protocol}://${this.host}/${this.port?this.port+'/':''}${this.basename}/`
	}

}