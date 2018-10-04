import Navigo from 'navigo'
import Network from '../js/config/Network.config'
import PopupES from '../js/utils/PopupES/PopupES'
import { XHR, Loader } from '../js/utils/Loader'
import Credentials from '../js/services/Auth/Credentials'
const ScriptLoader = import('../utils/script-loader')


const Net = new Network()
const Request = new XHR()
const LazyLoader = new Loader()
const Cred = new Credentials()

window.trs = window.trs || {}
window.trs.loadedScript = window.trs.loadedScript || [] 
window.trs.default = window.trs.default || {}
window.trs.config = window.trs.config || {
  network: Net.endpoint(),
  credentials: Cred.get(),
  token: Cred.getToken(),
  months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
}

window.trs.exports = window.trs.exports || {
  Navigo,
  XHR,
  LazyLoader,
  PopupES,
}

window.trs.default.PopupInstance = {}
window.trs.default.current = {
	gasoline: {},
}


window.trs.default.changeDisplay=(selector=[],display="block")=>{
	selector.forEach((val,index)=>{

		let el=document.querySelector(val)
		if(el){
			if(display=='block'){
				el.classList.add('show')
				el.classList.remove('hide')
			}else{
				el.classList.add('hide')
				el.classList.remove('show')
			}
		} 
	})
}



const appRoute = new window.trs.exports.Navigo(`${Net.endpoint()}`, true)
const changeDisplay = window.trs.default.changeDisplay


const loadRouterInit = () => {

	// cordova
	try {
		if (cordova) {
			window.open = cordova.InAppBrowser.open
		}
	} catch(err) {

	}

	// check token
    if (window.trs.config.token) {
      //window.location = '/auth'
    }
   

	appRoute.on({
		'*': async () => {
			changeDisplay(['#main-container'],'none')
			changeDisplay(['#main-auth-container'],'block')

			const authSec = await import('../pages/authO365-section')
			const mainAuthContainer = document.getElementById('main-auth-container')
			mainAuthContainer.innerHTML = authSec.default
			// load MSAL
			ScriptLoader.then(loader => loader.default(mainAuthContainer))
			document.querySelector('initial-page').classList.add('hide')
		}
		
	}).resolve()
}

loadRouterInit()
document.addEventListener('deviceready', loadRouterInit)
