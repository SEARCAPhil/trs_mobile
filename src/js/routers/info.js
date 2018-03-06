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
		token: 'abc',
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

	<div class="offset-lg-1 col-8" style="margin-top:70px;">
		
		<small>
		 		<a href="#/gasoline" style="color:#ffb80c">
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
                    		<li class="nav-item text-center" style="width:50px;display:none;"><a href="#">Logs</a></li>
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

                    <h5>PHP ${opt.amount}</h5>
                    <small>
                        <p><b>${opt.liters} Liters</b></p>
                        <p><b><span class="text-muted"># TR Number : </span> ${opt.tr_number}</b></p>
                        <p><i class="material-icons md-12 text-muted">date_range</i> <span class="text-muted">Date : </span> ${opt.date}</p>
                        <p><i class="material-icons md-12 text-muted">location_on</i> <span class="text-muted">Location : </span>  ${opt.station}</p>
                        <p><i class="material-icons md-12 text-muted">account_circle</i>  <span class="text-muted">Driver : </span>  ${opt.driver ? opt.driver  : 'N/A' }</p><br/>

                        <hr/>

                        <p><b>Receipt</b><br/>
                            ${opt.receipt}
                        </p>
                        <p><b>Date encoded</b><br/>
                           ${opt.encoded}
                        </p>
                    </small>
                </div>`
    document.getElementById('gasoline-info-section').innerHTML = html

    setTimeout(function() {
		// dropdown
		window.trs.default.dropdown('device-dropdown')
		// enable popup
		window.trs.default.PopupInstance = new window.trs.exports.PopupES()
		//enable removal
		bindLoadRemoveGasolineModal()

	}, 1000);
}

const appendGasoline = (data, index) => {
	const targ = document.getElementById(`gasoline-month-section-${data.received_month}`)
	let html = document.createElement('div')

	html.classList.add('row', 'gasoline')
	html.id = `gasoline-${data.id}`

	if (index > 0) {
		html.classList.add('with-margin')
	}else{
		targ. innerHTML = ''
	}

	html .innerHTML = `
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
	`
	targ.append(html)


}
const loadGasoline = () => {
	// creating new instance allows us to create non cancellable request
	const GasList = new Gasoline()
	GasList.list({page: 1, token: window.trs.config.token, month: 2, year: 2018}).then((json) => {
		const data = JSON.parse(json)
		if (data.data) {

			for (let i = 0; i < data.data.length; i++) {
				appendGasoline(data.data[i], i)
			}
		}
	})
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
			loadGasoline()
		},
		'gasoline/:id/info': (params) => {
			const brPoints = window.trs.default.breakpoints()

			if (brPoints.sm == 'block' || brPoints.md == 'block' || brPoints.xs == 'block') {
				changeDisplay(['#gasoline-list-section'], 'none')
				changeDisplay(['#gasoline-registration-section'], 'block')
			}


			Gas.info({id: params.id, token: window.trs.config.token}).then((json) => {
				const data = JSON.parse(json)

				if (data.data) {
					const d = data.data[0]
					loadGasolineInfo({
						id: d.id,
						tr_number: d.tr_number,
						name: d.profile_name,
						date: d.date_created,
						receipt: d.receipt,
						station: d.station,
						amount: d.amount,
						liters: d.liters,
						encoded: `${d.received_day}/${d.received_month}/${d.received_year}`,
						driver: d.driver[0].profile_name,
					})
				}
				
			})

			const listSample = document.querySelectorAll('.gasoline-data-section')
			if (!listSample[0]) {
				loadGasoline(params)
			}

			loadPopupCSS()
		}
	}).resolve()
}

loadRouterInit()
document.addEventListener('deviceready', loadRouterInit)
