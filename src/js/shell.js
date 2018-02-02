import Navigo from 'Navigo'
import Network from './config/Network.config.js'
import {XHR} from './utils/Loader.js'

const Net = new Network()
const Request = new XHR()


//config for export
window.trs = window.trs || {}

window.trs.config = window.trs.config || {
	network: Net.endpoint()
}

window.trs.exports = window.trs.exports || {
	Navigo: Navigo,
	XHR: XHR
}

const appRoute=new window.trs.exports.Navigo(`${Net.endpoint()}`,true)

//router
appRoute.on({
	'auth/':()=>{
	
		Request.request({method:'GET',url:'modules/automobile/index.html'}).then(res=>{

		})
	}
}).resolve()

