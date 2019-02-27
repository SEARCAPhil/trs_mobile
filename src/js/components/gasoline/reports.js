import Directory from '../../services/Directory/Directory'

const form = document.querySelector('form[name="gasoline-report-form"]')

const getVehicle = () => {
	return new Promise((resolve, reject) => {
		let Dir = new Directory()
		Dir.getVehicle().then(json => {
			let data = JSON.parse(json)

			let vehicle = document.querySelector('form[name="gasoline-report-form"] select[name="vehicle"]')
			let html = `<option value='all'>Select (ALL)</option>`

			for(let x = 0; x < data.length; x++) {
				html += `<option value="${data[x].automobile_id}">${data[x].manufacturer} <b>${data[x].plate_no}</b></option>`
			}

			vehicle.innerHTML = html

			resolve()

		})
	})
}

const getDrivers = () => {
	return new Promise((resolve, reject) => {
		let Dir = new Directory()
		Dir.getDrivers().then(json => {
			let data = JSON.parse(json)

			let driver = document.querySelector('form[name="gasoline-report-form"] select[name="driver"]')
			let html = `<option value='all'>Select (ALL)</option>`

			for(let x = 0; x < data.length; x++) {
				html += `<option value="${data[x].id}">${data[x].profile_name}</option>`
			}

			driver.innerHTML = html
			resolve()
		})
	})
}

const getGasolineStations = () => {
	return new Promise((resolve, reject) => {
		let Dir = new Directory()
		Dir.getGasolineStations().then(json => {
			let data = JSON.parse(json)

			let driver = document.querySelector('form[name="gasoline-report-form"] select[name="station"]')
			let html = `<option value='all'>Select Station</option>`

			for(let x = 0; x < data.length; x++) {
				html += `<option value="${data[x].station}">${data[x].station}</option>`
			}

			driver.innerHTML = html
			resolve()
		})
	})
}


const printGasolineExpenses = (e) => {
	e.preventDefault()

	const fromField = document.querySelector('form[name="gasoline-report-form"] input[name="from"]')
	const toField = document.querySelector('form[name="gasoline-report-form"] input[name="to"]')
	const vehicleField = document.querySelector('form[name="gasoline-report-form"] select[name="vehicle"]')
	const driverField = document.querySelector('form[name="gasoline-report-form"] select[name="driver"]')
	const stationField = document.querySelector('form[name="gasoline-report-form"] select[name="station"]')

	let errorCount = []

	// from
	if (fromField.value.length < 1) {
		fromField.classList.add('error')
		errorCount.push(fromField)
	} else {
		fromField.classList.remove('error')
		errorCount.pop()
	}

	// to
	if (toField.value.length < 1) {
		errorCount.push(toField)
		toField.classList.add('error')
		
	} else {
		errorCount.pop()
		toField.classList.remove('error')
		
	}

	// open PDF in new Window
	setTimeout(() => {
		if (errorCount.length === 0) {
			if(typeof(cordova) != 'undefined') {
				cordova.InAppBrowser.open(window.trs.config.network + 'gasoline/reports/monthly_expenses.php?from=' + fromField.value + '&to=' + toField.value + '&vehicle=' + vehicleField.value + '&driver=' + driverField.value + '&token=' + window.trs.config.token + '&station=' + stationField.value, '_system', 'location=yes');
			} else {
				window.open(`${window.trs.config.network}gasoline/reports/monthly_expenses.php?from=${fromField.value}&to=${toField.value}&vehicle=${vehicleField.value}&driver=${driverField.value}&token=${window.trs.config.token}&station=${stationField.value}`)
			}
		}
	},10)



}

form.addEventListener('submit', printGasolineExpenses)
getVehicle()
getDrivers()
getGasolineStations()