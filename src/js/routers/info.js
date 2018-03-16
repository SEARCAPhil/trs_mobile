import Navigo from 'Navigo'
import Network from '../config/Network.config'
import { XHR, Loader } from '../utils/Loader'
import Credentials from '../services/Auth/Credentials'
import Gasoline from '../services/Gasoline/Gasoline'

const Net = new Network()
const Request = new XHR()
const LazyLoader = new Loader()
const Cred = new Credentials()
const Gas = new Gasoline()


const appRoute = new window.trs.exports.Navigo(`${Net.endpoint()}`, true)
const mainContainer = document.getElementById('main-container')
const changeDisplay=window.trs.default.changeDisplay

// remove goline
const removeGasoline = () => {
	let data = {
		id : window.trs.default.modal.resources,
		action: 'remove',
		token: window.trs.config.token,
	}

	Gas.remove(data).then((res) => {
		if(res == 1) {
			window.trs.default.PopupInstance.closeAll()
			// remove from list
			document.getElementById(`gasoline-${data.id}`).remove()	
			// hide info
			window.trs.default.changeDisplay(['#gasoline-info-section'], 'none')
			window.trs.default.changeDisplay(['#gasoline-info-section-empty'], 'block')
		}
	})
}

//remove gasoline modal
const loadRemoveGasolineModal = () => {
		
	const URL='modules/modal/remove.html'

	return Request.request({method:'GET',url:URL}).then(res=>{
		let modalTarget=document.getElementById('modal-info-body')
		modalTarget.innerHTML=res

		setTimeout(()=>{
			//remove cancel
			document.getElementById('modal-dialog-close-button').addEventListener('click',()=>{
				window.trs.default.PopupInstance.closeAll()
			})
			//copy methods
			
			document.getElementById('modal-dialog-remove-button').addEventListener('click',removeGasoline)
		})
	}).catch(e=>{})

}

const bindLoadRemoveGasolineModal = () => {
	const el = document.querySelector('.remove-info-modal')
	el.addEventListener('click', loadRemoveGasolineModal)
}


const loadGasolineInfo = (opt = {}) => {
	let html = `
	<!--dialog-->
	<dialog id="trs-info-modal" data-popup="fade">
		<div class="content">
			<!--close button-->
			<a href="#" data-popup-toggle="close">x</a>
			<div class="header"></div>
			<div class="body" id="modal-info-body"></div>
		</div>	
	</dialog>

	<style>
	.gasoline-history-list {
		padding:5px;
		border-bottom:1px solid rgba(200,200,200,0.4);
		padding-top:10px;
		padding-left:15px;
		margin-left:4px;
		margin-bottom:10px;
	}

	.gasoline-history-list(last-child) {
		border:none;
	}

	</style>

	<div class="offset-lg-1 col-8" style="margin-top:70px;">
		
		<small>
		 		<a href="#/gasoline" onclick="window.history.go(-1); return false;">
					<i class="material-icons md-18" style="width:24px">keyboard_backspace</i>
				</a>
				<i class="material-icons md-18">local_gas_station</i>	Gasoline <span class="text-muted">&gt; Info</span>
		</small>
	</div>
	 <div style="background:#fff;padding:15px;border-radius:5px;margin-bottom:100px;" class="offset-lg-1 col-12 col-lg-8">
                    <div style="float: left;width: 60px;height: 60px;border-radius: 50%;background: #ccc;margin-right: 10px;overflow: hidden;">
                        <img src="img/user.png" width="100%">
                    </div>
                    <h5>${opt.name}</h5>
                    <span class="text-muted"><small>${opt.date}</small></span>
                    <hr/>
                    <!--<span class="float-right">
                        <button class="btn btn-default btn-sm">edit</button>
                        <button class="btn btn-danger btn-sm">remove</button> 
                    </span>-->

                    <p>
                    	<ul class="nav">
                    		<li class="nav-item text-center" style="border-bottom:2px solid green; width:50px;"><a href="#/gasoline/${opt.id}/info">Info</a></li>
                    		<li class="nav-item text-center" style="width:50px;display:none;"><a href="#/gasoline/${opt.id}/logs">Logs</a></li>
                    		<li class="nav-item text-center" style="width:50px;position:relative;">
                    			<i class="material-icons md-18 device-dropdown" data-device-dropdown="dropdown-${opt.id}" data-resources="${opt.id}">expand_more</i>
                    			<div class="dropdown-section float-right" id="dropdown-${opt.id}" style="left:0px;">
									<ul class="list-group list-group-flush">
										<li class="list-group-item"><a href="#/gasoline/forms/registration/${opt.id}/update">Update</a></li>
										<li class="list-group-item"><a data-target="#trs-info-modal" data-popup-toggle="open" href="#" class="remove-info-modal">Remove</a></li>
									<ul>
								</div>
                    		</li>
                    	</ul>
                    </p>

                    <div class="col" id="info-tab">

                    	<h5>PHP ${opt.amount}</h5>
	                    <small>
	                        <p><span class="badge badge-dark">${opt.liters} Liters</span></p>
	                        <p><b><span class="text-muted"># Trip Ticket Number : </span> ${opt.tt_number}</b></p>
	                        <p><i class="material-icons text-muted">date_range</i> <span class="text-muted">Date : </span> ${opt.date}</p>
	                        <p><i class="material-icons text-muted">location_on</i> <span class="text-muted">Location : </span>  ${opt.station}</p>
	                        <p><i class="material-icons text-muted">account_circle</i>  <span class="text-muted">Driver : </span>  ${opt.driver ? opt.driver  : 'N/A' }</p>
	                        <br/>

	                        <hr/>

	                        <p><b>Receipt</b><br/>
	                            ${opt.receipt}
	                        </p>
	                        <p><b>Date Issued</b><br/>
	                           ${opt.encoded}
	                        </p>
	                    </small>
	                </div>

	                <hr/>
	                <div class="col" id="history-tab">
	                	<p>
	                		
	                		<a href="#" style="border-bottom:2px solid green;"><i class="material-icons md-18 text-muted">history</i> History</a>
	                	</p>

	                	<div class="row" id="gasoline-history-list-section">


		                </div>

	                </div>
                </div>`
    document.getElementById('gasoline-info-section').innerHTML = html

    setTimeout(function() {
		// dropdown
		window.trs.default.dropdown('device-dropdown')
		// enable popup
		window.trs.default.PopupInstance = new window.trs.exports.PopupES()
		//enable removal
		bindLoadRemoveGasolineModal()

		// history
		appendGasolineHistory(opt.history)

	}, 600);
}

const appendGasolineHistory = (data) => {
	const targ = document.getElementById('gasoline-history-list-section')

	for (let x = 0; x < data.length; x++) {
		let html = `
	    	<div class="col-12" class="gasoline-history-list">

	    		<div style="float: left;width: 30px;height: 30px;border-radius: 50%;background: #009688;color:#fff;margin-right: 10px;overflow: hidden;text-align:center;font-weight:bold;">
					${data[x].profile_name.charAt(0)}
				</div>

				<span>${data[x].profile_name}</span>
	    		<small>
	    			<p class="text-muted">${data[x].message} on ${data[x].date_created}</p>
	    		</small>
	    	</div>
		`

		targ.innerHTML += html
	}

}

let previousListDate = ''
const appendGasoline = (data, index) => {
	const targ = document.getElementById(`gasoline-month-section-${data.received_month}`)
	const day = `${data.received_year}-${data.received_month}-${data.received_day}`
	const dayName = new Date(day).toLocaleDateString('en-us', { weekday: 'long' })

	let dateHeader = ''
	let html = document.createElement('div')

	html.classList.add('row', 'gasoline')
	html.id = `gasoline-${data.id}`

	if (index > 0) {
		
	}else{
		targ. innerHTML = ''
	}

	
	/*html .innerHTML = `
			<div class="col gasoline-data-section">
					<h5 style="possition:relative;">
						<div style="float:left;width:10px;height:10px;background:#4c4c4c;border-radius:50%;margin-top:5px;margin-right:5px;"></div> 
						<a href="#/gasoline/${data.id}/info">PHP ${data.amount}</a>
					</h5>

					<div style="padding:5px;border-left:3px solid #4c4c4c;margin-top:-20px;padding-top:10px;padding-leftt:15px;margin-left:4px;padding-bottom:20px;">
						<small>
							${data.liters || 0} Liters<br/>
							${data.station} <br/>
							<small>
								<span class="text-muted"><i class="material-icons md-12">date_range</i> ${data.received_month}/${data.received_day}/${data.received_year}</span><br/>
			                    <span class="text-muted"><i class="material-icons md-12">person_pin</i> ${data.profile_name}</span>
			                </small>

						</small>
					</div>
		</div>
	`*/

	if (previousListDate != day) {
		// sho margin
		if (index > 0) {
			html.classList.add('with-margin')
		}
		// header
		dateHeader = `
			<div class="d-flex align-items-stretch row"  style="border-bottom:1px solid rgba(200,200,200,0.4);padding-top:15px;padding-bottom:15px;background:#fdfdfd;">
				<div class="col-2 col-sm-1 col-lg-1 text-center">
					<h4>${data.received_day}</h4>
				</div>	
				<div class="col">
					<small style="color:#607D8B;">
						${dayName} <br/>
						${window.trs.config.months[data.received_month-1]} ${data.received_year}
					</small>
				</div>
			</div>
		`
	}

	html .innerHTML = `
			<div class="col gasoline-data-section" style="border-bottom:1px solid rgba(200,200,200,0.4);padding-bottom:15px;">
					${dateHeader}
					<div class="d-flex align-items-stretch row" style="padding-top:10px;">
						<div class="col-2 col-sm-1 col-lg-2 text-center">
							<div style="float: left;width: 35px;height: 35px;border-radius: 50%;background: #009688;color:#fff;margin-right: 10px;overflow: hidden;text-align:center;font-weight:bold;">
								<small>${data.profile_name.substr(0,2).toUpperCase()}	</small>
							</div>
							
						</div>	
						<div class="col row">
							<!--<h5 style="position:relative;">
								<a href="#/gasoline/${data.id}/info" style="color:#F44336;">PHP ${data.amount}</a>
							</h5>-->


								<span class="col-8">
									<small>
										<b>${data.profile_name}</b>
									</small>
								</span>

								<span class="col-4" style="color:#818181;">
									<small>
										<div class="col d-none d-sm-block text-right">
											<a href="#/gasoline/${data.id}/info" style="color:#F44336;">PHP ${data.amount}</a>
										</div>

										<div class="d-block d-sm-none">
											<a href="#/gasoline/${data.id}/info" style="color:#F44336;">PHP ${data.amount}</a>
										</div>

									</small>
								</span>

								<div class="col-12">
									<small>
										<b>Liters :</b> <span class="badge badge-dark">${data.liters || 0}</span><br/>
										<b>Trip Ticket# : </b>${data.tt_number}<br/>
										<b> <i class="material-icons md-12">location_on</i> </b>${data.station}
									</small>
								</div>

						</div>
					</div>
			</div>
	`
	targ.append(html)

	// save current date of new data
	previousListDate = day


}

const appendGasolineUnpaid = (data, index) => {
	const targ = document.getElementById(`gasoline-list-container-unpaid`)
	let html = document.createElement('div')

	html.classList.add('row', 'gasoline')
	html.id = `gasoline-${data.id}`

	if (index > 0) {
		html.classList.add('with-margin')
	}else{
		targ. innerHTML = ''
	}

	html .innerHTML = `
			<div class="col gasoline-data-section" style="border-bottom:1px solid rgba(200,200,200,0.4);padding:10px 10px;">
					<h5 style="position:relative;">
						<a href="#/gasoline/${data.id}/info" style="color:#F44336;">PHP ${data.amount}</a>
					</h5>
					<div class="col row">
						<small>
							<b>Trip Ticket# : </b>${data.tt_number}<br/>
							<b>Date  encoded : </b>${data.date_created}<br/>
							<b> <i class="material-icons md-12">location_on</i> </b>${data.station}
						</small>
					</div>
			</div>
	`
	targ.append(html)


}

const loadGasolineAll = (opt = {}) => {

	return new Promise((resolve, reject) => {
		// creating new instance allows us to create non cancellable request
		const GasList = new Gasoline()
		GasList.list({page: opt.page, token: window.trs.config.token, month: opt.month, year: opt.year}).then((json) => {
			const data = JSON.parse(json)
			if (data.data) {

				for (let i = 0; i < data.data.length; i++) {
					appendGasoline(data.data[i], i)
				}

				// if no response in the very first request
				if (opt.page ===1 && data.data.length < 1) {
					const targ = document.getElementById(`gasoline-month-section-${opt.month}`)
					targ.innerHTML = '<br/><h6 class="text-muted">No record for this month</h6>'
				}
			}else{

			}

			resolve(data)
		})
	})

}


const loadGasolineUnpaid = () => {
	return new Promise((resolve, reject) => {
		// creating new instance allows us to create non cancellable request
		const GasList = new Gasoline()
		GasList.filter({page: 1, token: window.trs.config.token, filter: 'unpaid'}).then((json) => {
			const data = JSON.parse(json)
			if (data.data) {

				for (let i = 0; i < data.data.length; i++) {
					appendGasolineUnpaid(data.data[i], i)
				}
			}

			resolve(data)
		})
	})
}

const loadDataMonthly = (e) => {
	const month = parseInt(e.target.getAttribute('data-month'))
	const year = parseInt(e.target.getAttribute('data-year'))

	if (month && year) {

		// show spinner
		document.querySelector('loading-page').classList.remove('hide')

		loadGasolineAll({
			page: 1,
			month: month,
			year: year,
		}).then(() => {
			// hide spinner
			document.querySelector('loading-page').classList.add('hide')	
		})

	}
}




const loadPopupCSS = () => {
	let css = document.createElement('link')
	css.rel = 'stylesheet'
	css.type = 'text/css'
	css.href = 'js/utils/PopupES/popup-es.css'
	document.body.append(css)
}

const loadRouterInit = () => {
	appRoute.on({
		'gasoline/': () => {
			// show spinner
			document.querySelector('loading-page').classList.remove('hide')
			// set title
			document.getElementById('title-brand').textContent = ' Gasoline'

			const d = new Date()
			loadGasolineAll({
				page: 1,
				month: d.getMonth() + 1,
				year: d.getFullYear(),
			}).then(() => {
				// show spinner
				document.querySelector('loading-page').classList.add('hide')
			})

			// bind click on every month
			setTimeout(() => {
				document.querySelectorAll('.month-header').forEach((el,index) => {
					if (index > 0 ) el.addEventListener('click', loadDataMonthly, { once: true, })
				})

				//refresh btn
				document.querySelectorAll('.refresh-month-btn').forEach((el,index) => {
					el.addEventListener('click', loadDataMonthly)
				})

			},100)

		},
		'gasoline/unpaid': () => {
			changeDisplay(['#gasoline-list-container'], 'none')
			changeDisplay(['#gasoline-list-container-unpaid'], 'block')

			// show spinner
			document.querySelector('loading-page').classList.remove('hide')

			loadGasolineUnpaid().then(() => {
				// hide spinner
				document.querySelector('loading-page').classList.add('hide')
			})
		},
		'gasoline/:id/info': (params) => {
			const brPoints = window.trs.default.breakpoints()
			
			if (brPoints.sm == 'block' || brPoints.md == 'block' || brPoints.xs == 'block') {
				changeDisplay(['#gasoline-list-section'], 'none')
				changeDisplay(['#gasoline-registration-section'], 'block')
			}

			// show spinner
			document.querySelector('loading-page').classList.remove('hide')

			// set title
			document.getElementById('title-brand').textContent = ' Details'


			Gas.info({id: params.id, token: window.trs.config.token}).then((json) => {
				const data = JSON.parse(json)

				if (data.data) {
					const d = data.data[0]
					loadGasolineInfo({
						id: d.id,
						tt_number: d.tt_number,
						name: d.profile_name,
						date: d.date_created,
						receipt: d.receipt,
						station: d.station,
						amount: d.amount,
						liters: d.liters,
						encoded: `${d.received_day}/${d.received_month}/${d.received_year}`,
						day: `${d.received_day}`,
						month: `${d.received_month}`,
						year: `${d.received_year}`,
						driver: d.driver[0] ? d.driver[0].profile_name : '',
						history: d.history ? d.history : [],
					})

					document.querySelectorAll('.gasoline').forEach((el, index) => {
						el.classList.remove('active')
						if(el.id == `gasoline-${params.id}`) {
							el.classList.add('active')	
						}
					})

					setTimeout(() => {
						const target = document.getElementById(`gasoline-${params.id}`)
						if (target)	document.getElementById(`gasoline-${params.id}`).classList.add('active')
					},300)

				}

				// show spinner
				document.querySelector('loading-page').classList.add('hide')
				
			})

			// no data in the list
			const listSample = document.querySelectorAll('.gasoline-data-section')
			if (!listSample[0]) {
				const d = new Date()
				loadGasolineAll({
					page: 1,
					month: d.getMonth() + 1,
					year: d.getFullYear(),
				})
			}else{
				document.getElementById(`gasoline-${params.id}`).classList.add('active')
			}

			loadPopupCSS()

		}
	}).resolve()
}

loadRouterInit()
document.addEventListener('deviceready', loadRouterInit)
