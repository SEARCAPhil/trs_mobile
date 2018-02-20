import Directory from '../../../../services/Directory/Directory'
import Gasoline from '../../../../services/Gasoline/Gasoline'


const showError = () => {
	let targ = document.getElementById('gasoline-form-status')
	targ.innerHTML = `<div class="text-center text-danger" style="border:1px solid orangered;padding:10px;background:#fefe;">Unable to save gasoline record. Please try again later</div>`
}

const showSuccess = () => {
	return new Promise((resolve, reject) => {
		let targ = document.getElementById('gasoline-form-status')
		targ.innerHTML = `<div class="text-center text-success" style="border:1px solid green;padding:10px;background:#f3fff6;"><i class="material-icons">check_circle</i> Saved successfully!</div>`
		resolve()
	})
}

const saveGasoline = (e) => {
	let trNumber=document.querySelector('form[name="gasoline-form"] input#tr_number')
	let amount=document.querySelector('form[name="gasoline-form"] input#amount')
	let liters=document.querySelector('form[name="gasoline-form"] input#liters')
	let receipt=document.querySelector('form[name="gasoline-form"] input#receipt')
	let dateReceived=document.querySelector('form[name="gasoline-form"] input#date_received')
	let station=document.querySelector('form[name="gasoline-form"] input#station')
	let driver=document.querySelector('form[name="gasoline-form"] select#driver')
	let vehicle=document.querySelector('form[name="gasoline-form"] select#vehicle')

	let errorCount = 0

	// tr number
	if(trNumber.value.length < 1 ) {
		errorCount++
		trNumber.classList.add('error')
		showError()
	}else{
		errorCount--
		trNumber.classList.remove('error')
	}

	// amount
	if(amount.value.length < 1 ) {
		errorCount++
		amount.classList.add('error')
		showError()
	}else{
		errorCount--
		amount.classList.remove('error')
	}

	// amount
	if(liters.value.length < 1 ) {
		errorCount++
		liters.classList.add('error')
		showError()
	}else{
		errorCount--
		liters.classList.remove('error')
	}

	// receipt number
	if(receipt.value.length < 1 ) {
		errorCount++
		receipt.classList.add('error')
		showError()
	}else{
		errorCount--
		receipt.classList.remove('error')
	}

	// date received
	if(dateReceived.value.length < 1 ) {
		errorCount++
		dateReceived.classList.add('error')
		showError()
	}else{
		errorCount--
		dateReceived.classList.remove('error')
	}

	// gasoline station
	if(station.value.length < 1 ) {
		errorCount++
		station.classList.add('error')
		showError()
	}else{
		errorCount--
		station.classList.remove('error')
	}

	//driver
	if(driver.value.length < 1 ) {
		errorCount++
		driver.classList.add('error')
		showError()
	}else{
		errorCount--
		driver.classList.remove('error')
	}

	// if no errors encountered
	if(errorCount > 0) return 0

	// disable button
	let btn = document.getElementById('gasoline-form-btn')
	btn.disabled = 'disabled'

	// save to db
	const Gas = new Gasoline()

	let data = {
		automobile_id: vehicle.value,
		amount: amount.value,
		liters: liters.value,
		receipt: receipt.value,
		station: station.value,
		driver_id: driver.value,
		date_received: dateReceived.value,
	}

	Gas.add(data).then(json => {
		let res = JSON.parse(json) 

		if (res.data) {
			showSuccess().then(() => {
				e.target.reset()
				btn.removeAttribute('disabled')
			})
		}
	})
		
}


const getVehicle = () => {
	let Dir = new Directory()
	Dir.getVehicle().then(json => {
		let data = JSON.parse(json)

		let vehicle = document.querySelector('form[name="gasoline-form"] select#vehicle')
		let html = `<option value=''>Select Vehicle</option>`

		for(let x = 0; x < data.length; x++) {
			html += `<option value="${data[x].id}">${data[x].manufacturer} <b>${data[x].plate_no}</b></option>`
		}

		vehicle.innerHTML = html

	})
}

const getDrivers = () => {
	let Dir = new Directory()
	Dir.getDrivers().then(json => {
		let data = JSON.parse(json)

		let driver = document.querySelector('form[name="gasoline-form"] select#driver')
		let html = `<option value=''>Select Driver</option>`

		for(let x = 0; x < data.length; x++) {
			html += `<option value="${data[x].id}">${data[x].profile_name}</option>`
		}

		driver.innerHTML = html

	})
}

getVehicle()
getDrivers()
document.querySelector('form[name="gasoline-form"]').addEventListener('submit', saveGasoline)