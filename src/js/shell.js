import Navigo from 'Navigo'
import Network from './config/Network.config'
import { XHR, Loader } from './utils/Loader'

const Net = new Network()
const Request = new XHR()
const LazyLoader = new Loader()

window.trs = window.trs || {}

window.trs.config = window.trs.config || {
  network: Net.endpoint(),
}

window.trs.exports = window.trs.exports || {
  Navigo,
  XHR,
  LazyLoader,
}

const appRoute = new window.trs.exports.Navigo(`${Net.endpoint()}`, true)
const loadRouterInit = () => {
	appRoute.on({
		'auth/': () => {
			Request.request({ method: 'GET', url: 'modules/auth/index.html' }).then((res) => {
				document.getElementById('main-container').innerHTML = res
				document.querySelector('initial-page').classList.add('hide')

				LazyLoader.load(['js/modules/auth/auth.js'], { async: true })
			})
		},
	}).resolve()
}

loadRouterInit()
document.addEventListener('deviceready', loadRouterInit)
