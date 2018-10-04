import Navigo from 'Navigo'
import Network from './config/Network.config'
import PopupES from './utils/PopupEs/PopupEs'
import { XHR, Loader } from './utils/Loader'
import Credentials from './services/Auth/Credentials'
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
	const el = document.querySelectorAll('.main-menu-list-item a')
	el.forEach((el, index) => {
		if(id != el.getAttribute('id')) {
			el.classList.remove('active')
		}else{
			el.classList.add('active')
		}
	})
}


const activateListMenu = (id) => {
	const el = document.querySelectorAll('.list-menu li a')

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

	return new Promise((resolve, reject) => {
		return Request.request({ method: 'GET', url }).then((res) => {
			
			window.trs.loadedScript.push(url)
			mainContainer.innerHTML = res
			document.querySelector('initial-page').classList.add('hide')

			// sidebar
			let handle = document.querySelectorAll('.navbar-main-menu')

			handle.forEach((val, index) => {
				val.addEventListener('click', revealSidebar)
			})

			resolve()
		})
	})
	
}

const loadHome = () => {
	const mainSection = document.getElementById('home-section')


	mainSection.innerHTML = `<section style="padding-top:70px;" class="col col-lg-10 col-sm-12 col-xs-12 offset-lg-1">
		<center class="col-lg-6 col-md-6 col-sm-8 offset-lg-3 offset-md-3 offset-sm-2">
			<div class="col-lg-12 col-md-12 col-sm-12"><br/><br/>
				<img src="img/bag.png" alt="trs welcome" async="true" width="130px" style="margin-top: 10vh;">
				<h4><br>Travel Services Management System</h4>
				<p><small>Monitor your travel using the clean, easy, and fast information system designed for the needs of SEARCA. Never missed your travel ever again!</small></p>
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
		monthDiv += `<div class="row">
						<div class="col-12 row month-header" data-month="${x+1}" data-year="${curYear}">
							<div class="col text-muted" style="width: 100px;border-radius: 3px;margin-left:10px;"  data-month="${x+1}" data-year="${curYear}">
									<small  data-month="${x+1}" data-year="${curYear}">
										<i class="material-icons md-12">date_range</i>	${window.trs.config.months[x]}  ${curYear} <i class="material-icons md-12">expand_more</i>
										 <a href="#" onclick="event.preventDefault();" class="text-muted float-right refresh-month-btn" data-month="${x+1}" data-year="${curYear}">
										 	<i class="material-icons md-18">refresh</i> Sync
										 </a>
									</small>
							</div>
						</div>
						<div class="col col-lg-12" id="gasoline-month-section-${x+1}"></div>
					</div>`
	}


	gasolineListSection.innerHTML = `
		<style>
			.gasoline{
				background:#fff;
			}
			.gasoline.with-margin{
				background:#fff;
				margin-top:25px;
			}
			#gasoline-list-section {
				
			}
			.gasoline.active{
				background:#607d8b0f;
			}
			.month-header{
				padding-top:10px;
				margin-bottom:10px;
			}
			.gasoline > .month-header h5{
				font-size:12px;
			}
			/*.gasoline.with-margin{
				margin-top:-20px;
			}*/
			#gasoline-list-header-container {
				
			}
			.list-menu {
				background:#fff;
			}
			.list-menu li a {
				border-bottom:2px solid #9E9E9E;
				color:#454545;
			}
			.list-menu li a.active {
				border-bottom:2px solid #009676;
				color: #009676;
			}


		    /* Extra Small Devices, Phones */ 
		    @media only screen and (max-width : 480px) {
		        .list-menu  {
		            background : #3c3c3c;
		        }
		        .list-menu li a, .list-menu li a.active {
		        		color:#fff;
		        }
				
		    }

		    /* Custom, iPhone Retina */ 
		    @media only screen and (max-width : 320px) {
		       .list-menu  {
		            background : #3c3c3c;
		        }
		        .list-menu li a, .list-menu li a.active {
		        		color:#fff;
		        }
		    }

		    /* Medium Devices, Desktops */
		    @media only screen and (max-width : 992px) {
		       .list-menu  {
		            background : #3c3c3c;
		        }
		        .list-menu li a, .list-menu li a.active {
		        		color:#fff;
		        }
		    }

		    /* Small Devices, Tablets */
		    @media only screen and (max-width : 768px) {
		        .list-menu  {
		            background : #3c3c3c;
		        }
		        .list-menu li a, .list-menu li a.active {
		        		color:#fff;
		        }
		    }




		</style>
		<div style="padding-top:50px;padding-bottom:50px;">
				<div id="gasoline-list-header-container">
					<ul class="nav list-menu row">
						<li class="nav-item col-6">
							<a href="#/gasoline/" class="nav-link active row" id="paid-gasoline"><i class="material-icons md-18">computer</i> All</a>
						</li>

						<li class="nav-item col-6"">
							<a href="#/gasoline/unpaid" class="nav-link row" id="unpaid-gasoline">Pending</a>
						</li>
					</ul>
				</div>
				<div id="gasoline-list-container"></div>
				<div id="gasoline-list-container-unpaid" class="hide"></div>
		</div>
		
				`
	document.getElementById('gasoline-list-container').innerHTML = monthDiv	

}


const loadGasolineSection = () => {
	// check token
	// window.trs.default.checkLoginInstance()
	// hide sidebar for small and medium devices
	hideSidebarOnclick()

	activateMenu('gasoline_menu')
	activateListMenu('paid-gasoline')

	changeDisplay(['#gasoline-info-section'], 'none')
	//changeDisplay(['#gasoline-info-section-empty'], 'block')

	LazyLoader.load(['js/routers/info.js'], { async: true, once: true })
	changeDisplay(['#home-section','#gasoline-registration-section', '#gasoline-reports-section', '#gasoline-list-container-unpaid'],'hide')
	changeDisplay(['#gasoline-section','#gasoline-list-section', '#gasoline-list-container'],'block')
	loadIndexPage().then(e => {
		activateMenu('gasoline_menu')
		const gasolineListSection  = document.querySelector('.month-header')
		// do not proceed if list is already present in DOM
		if(!gasolineListSection) {
			loadGasolineListSection()
		}

	}).catch((err) => {
		// show spinner
		document.querySelector('loading-page').classList.add('hide')
	})	
}


const loadRouterInit = () => {

	// cordova
	try {
		if (cordova) {
			window.open = cordova.InAppBrowser.open
		}
	} catch(err) {

	}

	// check token
    if (!window.trs.config.token) {
      window.location.hash = '/auth'
    }
   

	appRoute.on({
		'auth/': () => {
			changeDisplay(['#main-container'],'none')
			changeDisplay(['#main-auth-container'],'block')

			const mainAuthContainer = document.getElementById('main-auth-container')
			// load login page
			Request.request({ method: 'GET', url: 'modules/auth/index.html' }).then((res) => {
				mainAuthContainer.innerHTML = res
				document.querySelector('initial-page').classList.add('hide')

				LazyLoader.load(['js/components/auth/auth.js'], { async: true })
			})
		},
		'authO365/': () => {
			window.location.href = 'auth.html'

		},
		'signout/': () => {
			// clear session
			window.localStorage.clear()
			window.sessionStorage.clear()
			delete window.trs.config.token

			const loc = `${window.location.origin}${window.location.pathname}/auth.html`
			// window.location.hash = '/home'
			window.location.href = loc

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
					changeDisplay(['#main-auth-container', '#gasoline-info-registration', '#gasoline-info-section', '#gasoline-info-section-empty', '#gasoline-info', '#gasoline-section'],'hide')
					changeDisplay(['#home-section','#main-container'],'block')
			})	
		},
		'gasoline/': () => {
			// show spinner
			document.querySelector('loading-page').classList.remove('hide')
			activateMenu('gasoline')
			loadGasolineSection()
		},
		'gasoline/unpaid': () => {
			// show spinner
			document.querySelector('loading-page').classList.remove('hide')
			activateMenu('gasoline')
			loadGasolineSection()
			setTimeout(() => {
				activateListMenu('unpaid-gasoline')
			},500);
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
					changeDisplay(['#gasoline-info-section', '#gasoline-list-section', '#info-tab'], 'block')
					changeDisplay(['#gasoline-info-section-empty', '#gasoline-registration-section', '#gasoline-reports-section'], 'none')

					setTimeout(() => {
						activateListMenu('paid-gasoline')
					},400);

				})	
			}

			changeDisplay(['#gasoline-info-section', '#gasoline-list-section', '#info-tab'], 'block')
			changeDisplay(['#gasoline-info-section-empty', '#gasoline-registration-section'], 'none')

			
			


		},
		'gasoline/forms/registration': () => {
			// check token
			window.trs.default.checkLoginInstance()

			// hide sidebar for small and medium devices
			hideSidebarOnclick()

			activateMenu('form')

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
		'gasoline/reports': () => {
			// check token
			window.trs.default.checkLoginInstance()

			// hide sidebar for small and medium devices
			hideSidebarOnclick()

			activateMenu('report')

			loadIndexPage().then(e => {
				const gasolineSection = document.getElementById('gasoline-reports-section')
				// load gasoline registration page
				Request.request({ method: 'GET', url: 'modules/gasoline/reports.html' }).then((res) => {
					// clear info settings
					window.trs.default.current.gasoline = {}

					gasolineSection.innerHTML = res
					changeDisplay(['initial-page', '#home-section', '#gasoline-info-section', '#gasoline-info', '#gasoline-info-section-empty', '#gasoline-list-section', '#gasoline-registration-section'],'hide')
					changeDisplay(['#gasoline-section', '#gasoline-reports-section',],'block')

					 LazyLoader.load(['js/components/gasoline/reports.js'], { async: true })

				})
			})
				
		},
		'gasoline/forms/registration/:id/update': (params) => {
			// check token
			window.trs.default.checkLoginInstance()

			// hide sidebar for small and medium devices
			hideSidebarOnclick()

			// show spinner
			document.querySelector('loading-page').classList.remove('hide')

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


				}).catch((err) => {
					// hide spinner
					document.querySelector('loading-page').classList.add('hide')
				})

				// expire link once refreshed
				if (!window.trs.default.current.gasoline.id) window.location.hash = `/gasoline/${params.id}/info`
			})
				
		}
	}).resolve()
}

loadRouterInit()
document.addEventListener('deviceready', loadRouterInit)
