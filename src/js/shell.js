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
const mainContainer = document.getElementById('main-container')


const loadIndexPage = () => {
	// load index page
	return Request.request({ method: 'GET', url: 'modules/index/index.html' }).then((res) => {
		mainContainer.innerHTML = res
		document.querySelector('initial-page').classList.add('hide')

		LazyLoader.load(['js/components/auth/auth.js'], { async: true })
		document.querySelector('initial-page').classList.add('hide')
	})
	
}

const loadHome = () => {
	const mainSection = document.getElementById('main-section')
	mainSection.innerHTML = `<section style="padding-top:70px;" class="col col-lg-10 col-sm-12 col-xs-12 offset-lg-2">
		<center class="col-lg-8 col-md-6 col-sm-8 offset-lg-2 offset-md-3 offset-sm-2">
			<div class="col-lg-12 col-md-12 col-sm-12">
				<img src="img/combi.png" alt="bms welcome" async="" width="300px">
				<h4><br>Travel Services Management System</h4>
				<p><small>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</small></p></div>
		</center>
	</section>`
}

const loadRouterInit = () => {
	appRoute.on({
		'auth/': () => {
			// load login page
			Request.request({ method: 'GET', url: 'modules/auth/index.html' }).then((res) => {
				mainContainer.innerHTML = res
				document.querySelector('initial-page').classList.add('hide')

				LazyLoader.load(['js/components/auth/auth.js'], { async: true })
			})
		},
		'home/': () => {
			loadIndexPage().then(e => {
				loadHome()	
			})
				
		}
	}).resolve()
}

loadRouterInit()
document.addEventListener('deviceready', loadRouterInit)
