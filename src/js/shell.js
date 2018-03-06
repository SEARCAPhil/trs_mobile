import Navigo from 'Navigo'
import Network from './config/Network.config'
import PopupES from './utils/PopupEs/PopupEs'
import { XHR, Loader } from './utils/Loader'
import Credentials from './services/Auth/Credentials'


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

window.trs.default.checkLoginInstance = (opt = {}) => {
	if (!window.trs.config.token) {
		window.location.hash = '/auth'
	}
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


// for dropdown
window.trs.default.dropdown = (className) => {
	window.trs.default.modal = window.trs.default.modal || {}
	const targ = document.querySelectorAll(`.${className}`)
	targ.forEach((el, index) => {
		if(el.classList.contains('data-bind-dropdown')) return 0
		el.addEventListener('click', (e) => {
			e.preventDefault()
			// target ID
			const targEl = el.getAttribute('data-device-dropdown')

			// get ID
			// Holds the ID to be sent to the server
			window.trs.default.modal.resources =  el.getAttribute('data-resources')
			window.trs.default.modal.element = el

			// dropdown section
			let target = document.getElementById(targEl)

			let a = new Promise((resolve, reject) => {
				//close all open dropdpwn
				document.querySelectorAll('.dropdown-section').forEach((el2, index2) => {
					if (el2.classList.contains('open') && el2!=target)  el2.classList.remove('open') 
					resolve()
				})
			}).then(() => {
				
				target.classList.toggle('open')

				// prevent adding new listeners
				el.classList.add('data-bind-dropdown')
			})
		})
	})
}

window.trs.default.breakpoints = () => {

	const xsBreakPoint = document.getElementById('xs-breakpoint')
	const smBreakPoint = document.getElementById('sm-breakpoint')
	const mdBreakPoint = document.getElementById('md-breakpoint')

	const smDisplay = smBreakPoint ? window.getComputedStyle(smBreakPoint).getPropertyValue('display') : 'block'
	const mdDisplay = mdBreakPoint ? window.getComputedStyle(mdBreakPoint).getPropertyValue('display') : 'block'
	const xsDisplay = xsBreakPoint ? window.getComputedStyle(xsBreakPoint).getPropertyValue('display') : 'block'


	return {
		xs: xsDisplay,
		sm: smDisplay,
		md: mdDisplay,
	}
}


const revealSidebar = (e) => {
	e.preventDefault()
	let target = document.querySelector('.sidebar')

	// hide / show sidebar
	if (target.classList.contains('reveal')) {
		target.classList.add('hide')
		target.classList.remove('reveal')
	}else{
		target.classList.add('reveal')
		target.classList.remove('hide')
	}
}

const activateMenu = (id) => {
	const el = document.querySelectorAll('.main-menu-list-item')
	el.forEach((el, index) => {
		if(id != el.getAttribute('id')) {
			el.classList.remove('active')
		}else{
			el.classList.add('active')
		}
	})
}

const hideSidebarOnclick = () => {
	// hide when click for mobile display
	const brPoints = window.trs.default.breakpoints()
	const sidebar = document.querySelector('.sidebar')
	if ((brPoints.xs == 'block' || brPoints.md == 'block') && sidebar) {
		sidebar.classList.remove('reveal')
	} 

}



const appRoute = new window.trs.exports.Navigo(`${Net.endpoint()}`, true)
const mainContainer = document.getElementById('main-container')
const changeDisplay = window.trs.default.changeDisplay


const loadIndexPage = () => {
	// load index page
	const url = 'modules/index/index.html'

	if (window.trs.loadedScript.indexOf(url) != -1 ) {
		// empty response
		return new Promise((resolve, reject) => { resolve() })
	}

	return Request.request({ method: 'GET', url }).then((res) => {
		
		window.trs.loadedScript.push(url)
		mainContainer.innerHTML = res
		document.querySelector('initial-page').classList.add('hide')

		// sidebar
		let handle = document.querySelectorAll('.navbar-main-menu')

		handle.forEach((val, index) => {
			val.addEventListener('click', revealSidebar)
		})
	})
	
}

const loadHome = () => {
	const mainSection = document.getElementById('home-section')
	mainSection.innerHTML = `<section style="padding-top:70px;" class="col col-lg-10 col-sm-12 col-xs-12 offset-lg-1">
		<center class="col-lg-6 col-md-6 col-sm-8 offset-lg-3 offset-md-3 offset-sm-2">
			<div class="col-lg-12 col-md-12 col-sm-12"><br/><br/>
				<img src="img/backpack.png" alt="trs welcome" async="" width="200px">
				<h4><br>Travel Services Management System</h4>
				<p><small>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</small></p>
				<p>
					<a href="#/gasoline/forms/registration">
						<button class="btn btn-danger">GETTING STARTED</button>
					</a>
				</p>
			</div>
		</center>
	</section>`

	document.querySelector('loading-page').classList.add('hide')
}

const loadGasolineListSection = () => {
	const gasolineListSection  = document.getElementById('gasoline-list-section')
	const curMonth = new Date().getMonth()
	const curYear = new Date().getFullYear()
	let monthDiv = ''

	for (let x = curMonth; x >= 0; x--) {
		monthDiv += `<div class="row gasoline">
						<div class="col-12 month-header">
							<div style="background: #dc3545;width: 100px;color:  #fff;text-align:  center;border-radius: 3px;">
								<span class=""> <small>${window.trs.config.months[x]}  ${curYear}</small> </span>
							</div>
						</div>
						<div class="col col-lg-12" id="gasoline-month-section-${x+1}"></div>
					</div>`
	}

	gasolineListSection.innerHTML = `
		<style>
			.gasoline{
				
				padding-top:5px;
				padding-bottom:5px;
			}
			.gasoline > .month-header{
				padding-top:10px;
			}
			.gasoline > .month-header h5{
				font-size:12px;
			}
			.gasoline.with-margin{
				margin-top:-20px;
			}
		</style>
		<div style="padding-top:50px;">
				<div id="gasoline-list-container"></div>
		</div>
		
				`
	document.getElementById('gasoline-list-container').innerHTML = monthDiv	
}


const loadRouterInit = () => {
	appRoute.on({
		'auth/': () => {
			// load login page
			Request.request({ method: 'GET', url: 'modules/auth/index.html' }).then((res) => {
				mainContainer.innerHTML = res
				document.querySelector('initial-page').classList.add('hide')

				// clear session
				window.localStorage.clear()
				window.sessionStorage.clear()
				LazyLoader.load(['js/components/auth/auth.js'], { async: true })
			})
		},
		'home/': () => {
			// check token
			window.trs.default.checkLoginInstance()
			// hide sidebar for small and medium devices
			hideSidebarOnclick()
			//activate link in sidebar
			activateMenu('home_menu')
			
	
			loadIndexPage().then(e => {
					loadHome()	
					changeDisplay(['#gasoline-info-registration', '#gasoline-info-section', '#gasoline-info-section-empty', '#gasoline-info', '#gasoline-section'],'hide')
					changeDisplay(['#home-section'],'block')
			})	
		},
		'gasoline/': () => {
			// check token
			window.trs.default.checkLoginInstance()
			// hide sidebar for small and medium devices
			hideSidebarOnclick()

			activateMenu('gasoline_menu')
			changeDisplay(['#gasoline-info-section'], 'none')
			changeDisplay(['#gasoline-info-section-empty'], 'block')

			LazyLoader.load(['js/routers/info.js'], { async: true, once: true })
			changeDisplay(['#home-section','#gasoline-registration-section'],'hide')
			changeDisplay(['#gasoline-section','#gasoline-list-section'],'block')
			loadIndexPage().then(e => {
				activateMenu('gasoline_menu')
				const gasolineListSection  = document.querySelector('.month-header')
				// do not proceed if list is already present in DOM
				if(!gasolineListSection) {
					loadGasolineListSection()
				}
				

			})	
		},
		'gasoline/:id/info': (params) => {
			// check token
			window.trs.default.checkLoginInstance()

			window.trs.default.current.gasoline = window.trs.default.current.gasoline  || {}
			window.trs.default.current.gasoline.id = params.id
			const listSample = document.querySelectorAll('.gasoline-data-section')

			// hide sidebar for small and medium devices
			hideSidebarOnclick()

			// show list once
			// this will prevent repainting of DOM
			if (!listSample[0]) {
				LazyLoader.load(['js/routers/info.js'], { async: true, once: true })
				loadIndexPage().then(e => {
					loadGasolineListSection()
					// change display
					changeDisplay(['#gasoline-info-section', '#gasoline-list-section'], 'block')
					changeDisplay(['#gasoline-info-section-empty', '#gasoline-registration-section'], 'none')
				})	
			}

			changeDisplay(['#gasoline-info-section', '#gasoline-list-section'], 'block')
			changeDisplay(['#gasoline-info-section-empty', '#gasoline-registration-section'], 'none')
			


		},
		'gasoline/forms/registration': () => {
			// check token
			window.trs.default.checkLoginInstance()

			// hide sidebar for small and medium devices
			hideSidebarOnclick()

			loadIndexPage().then(e => {
				const gasolineSection = document.getElementById('gasoline-registration-section')
				// load gasoline registration page
				Request.request({ method: 'GET', url: 'modules/gasoline/forms/registration/registration.html' }).then((res) => {
					// clear info settings
					window.trs.default.current.gasoline = {}

					gasolineSection.innerHTML = res
					changeDisplay(['initial-page', '#home-section', '#gasoline-info-section', '#gasoline-info', '#gasoline-info-section-empty', '#gasoline-list-section'],'hide')
					changeDisplay(['#gasoline-section', '#gasoline-registration-section', '#gasoline-section'],'block')

					 LazyLoader.load(['js/components/gasoline/forms/registration/registration.js'], { async: true })

					//change name
					const name = document.getElementById('gasoline-form-info-name')
					const date = document.getElementById('gasoline-form-info-date')
					const nDate = new Date()

					name.innerHTML = window.trs.config.credentials.profile_name
					date.innerHTML = `<small>${window.trs.config.months[nDate.getMonth()]} ${nDate.getUTCDate()}, ${nDate.getUTCFullYear()}&emsp;</small>`
				})
			})
				
		},
		'gasoline/forms/registration/:id/update': (params) => {
			// check token
			window.trs.default.checkLoginInstance()

			// hide sidebar for small and medium devices
			hideSidebarOnclick()

			loadIndexPage().then(e => {
				const gasolineSection = document.getElementById('gasoline-registration-section')
				// load gasoline registration page
				Request.request({ method: 'GET', url: 'modules/gasoline/forms/registration/registration.html' }).then((res) => {
					gasolineSection.innerHTML = res
					changeDisplay(['initial-page', '#gasoline-info-section', '#gasoline-info', '#gasoline-info-section-empty', '#gasoline-list-section'],'hide')
					changeDisplay(['#gasoline-section', '#gasoline-registration-section', '#gasoline-section'],'block')

					 LazyLoader.load(['js/components/gasoline/forms/registration/registration.js'], { async: true })

					//change name
					const name = document.getElementById('gasoline-form-info-name')
					const date = document.getElementById('gasoline-form-info-date')
					const nDate = new Date()

					name.innerHTML = window.trs.config.credentials.profile_name
					date.innerHTML = `<small>${window.trs.config.months[nDate.getMonth()]} ${nDate.getUTCDate()}, ${nDate.getUTCFullYear()}&emsp;</small>`


				})

				// expire link once refreshed
				if (!window.trs.default.current.gasoline.id) window.location.hash = `/gasoline/${params.id}/info`
			})
				
		}
	}).resolve()
}

loadRouterInit()
document.addEventListener('deviceready', loadRouterInit)
