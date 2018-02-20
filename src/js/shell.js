import Navigo from 'Navigo'
import Network from './config/Network.config'
import { XHR, Loader } from './utils/Loader'

const Net = new Network()
const Request = new XHR()
const LazyLoader = new Loader()

window.trs = window.trs || {}
window.trs.default = window.trs.default || {}
window.trs.config = window.trs.config || {
  network: Net.endpoint(),
}

window.trs.exports = window.trs.exports || {
  Navigo,
  XHR,
  LazyLoader,
}

window.trs.default.changeDisplay=(selector=[],display="block")=>{
	selector.forEach((val,index)=>{

		var el=document.querySelector(val)
		if(el){
			console.log(el)
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
const mainContainer = document.getElementById('main-container')
const changeDisplay=window.trs.default.changeDisplay


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
	const mainSection = document.getElementById('home-section')
	mainSection.innerHTML = `<section style="padding-top:70px;" class="col col-lg-10 col-sm-12 col-xs-12 offset-lg-1">
		<center class="col-lg-6 col-md-6 col-sm-8 offset-lg-3 offset-md-3 offset-sm-2">
			<div class="col-lg-12 col-md-12 col-sm-12"><br/><br/>
				<img src="img/bellboy.jpg" alt="bms welcome" async="" width="200px">
				<h4><br>Travel Services Management System</h4>
				<p><small>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</small></p></div>
		</center>
	</section>`
}

const loadGasolineListSection = () => {
	const gasolineListSection  = document.getElementById('gasoline-list-section')
	gasolineListSection.innerHTML = `
		<style>
			.gasoline{
				border-bottom:1px solid #ccc;
			}
		</style>
		<div style="padding-top:50px;">
			<div class="row">

					<div class="col-lg-12">
					<br/>
						<small> Filter <i class="material-icons md-18">date_range</i> 2018 </small>
						<hr/>
					</div>

					<div class="col-lg-4 col-sm-4">
						<div style="float:left;width:30px;height:30px;background:#EB5757;text-align:center;border-radius:50%;color:#fff;"><a href="#/gasoline/forms/registration" style="color:#fff;">+</a></div>
					</div>
					
				
			</div><br/>
				<div id="gasoline-list-container">
					<h5 class="text-muted">January</h5>
					<div class="row gasoline">
						<div class="col">
							<p>
								<b>PHP 1,300</b><br/>
								<small>
									50 Liters<br/>
									January 2, 2018&emsp;10:30AM
								</small>
							</p>
						</div>
					</div>

					<div class="row gasoline">
						<div class="col">
							<p>
								<b>PHP 1,300</b><br/>
								<small>
									50 Liters<br/>
									January 2, 2018&emsp;10:30AM
								</small>
							</p>
						</div>
					</div>


					<div class="row gasoline">
						<div class="col">
							<p>
								<b>PHP 1,300</b><br/>
								<small>
									50 Liters<br/>
									January 2, 2018&emsp;10:30AM
								</small>
							</p>
						</div>
					</div>

					<br/><br/>
					<h5 class="text-muted">January</h5>
					<div class="row gasoline">
						<div class="col">
							<p>
								<b>PHP 1,300</b><br/>
								<small>
									50 Liters<br/>
									January 2, 2018&emsp;10:30AM
								</small>
							</p>
						</div>
					</div>

					<div class="row gasoline">
						<div class="col">
							<p>
								<b>PHP 1,300</b><br/>
								<small>
									50 Liters<br/>
									January 2, 2018&emsp;10:30AM
								</small>
							</p>
						</div>
					</div>


					<div class="row gasoline">
						<div class="col">
							<p>
								<b>PHP 1,300</b><br/>
								<small>
									50 Liters<br/>
									January 2, 2018&emsp;10:30AM
								</small>
							</p>
						</div>
					</div>


				</div>
		</div>
		
				`	
}

const loadGasolineInfo = () => {
	let html = ` <div style="padding-top:100px;">
                    <div style="float: left;width: 40px;height: 40px;border-radius: 50%;background: #ccc;margin-right: 10px;overflow: hidden;">
                        <img src="img/user.png" width="100%">
                    </div>
                    <span><b>Van Alen S. Limbaco</b></span><br/>
                    <span class="text-muted"><small>February 7, 2018&emsp;5:00AM</small></span>
                    <hr/>
                    <span class="float-right">
                        <button class="btn btn-default btn-sm">edit</button>
                        <button class="btn btn-danger btn-sm">remove</button> 
                    </span>
                    
                    <br/>
                    <br/>
                    <h5>PHP 1000.00</h5>
                    <small>
                        <p><b>50 Liters</b></p>
                        <p>January 2, 2018 10:30AM</p>
                        <p>Caltex Los Banos Laguna</p>
                        <p><i class="material-icons md-12">account_circle</i>Jojo Aranzaso</p><br/>
                        <p><b>Receipt</b><br/>
                            <b>abcd-045-5678</b>
                        </p>
                        <p><b>Date encoded</b><br/>
                            <b>2/9/2018</b>
                        </p>
                        <p><b>Last Updated</b><br/>
                            <b>2/9/2018</b>
                        </p>
                    </small>
                </div>`
    document.getElementById('gasoline-info-section').innerHTML = html
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
				changeDisplay(['#gasoline-info-registration', '#gasoline-info-section', '#gasoline-info', '#gasoline-section'],'hide')
			})	
		},
		'gasoline/': () => {
			loadIndexPage().then(e => {
				loadGasolineListSection()
			})	
		},
		'gasoline/:id/info': (params) => {
			loadIndexPage().then(e => {
				loadGasolineListSection()
				loadGasolineInfo()
			})	
		},
		'gasoline/forms/registration': () => {
			
			loadIndexPage().then(e => {
				const gasolineSection = document.getElementById('gasoline-registration-section')
				// load gasoline registration page
				Request.request({ method: 'GET', url: 'modules/gasoline/forms/registration/registration.html' }).then((res) => {
					gasolineSection.innerHTML = res
					changeDisplay(['initial-page', '#gasoline-info-section', '#gasoline-info', '#gasoline-list-section'],'hide')
					changeDisplay(['#gasoline-section', '#gasoline-registration-section', '#gasoline-section'],'block')

					 LazyLoader.load(['js/components/gasoline/forms/registration/registration.js'], { async: true })
				})
			})
				
		}
	}).resolve()
}

loadRouterInit()
document.addEventListener('deviceready', loadRouterInit)
