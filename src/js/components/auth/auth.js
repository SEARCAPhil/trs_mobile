import Auth from '../../services/Auth/Auth'

/* function auth call */
const auth = new Auth()
const usernameField = document.getElementById('username')
const passwordField = document.getElementById('password')
const loginBtn = document.getElementById('loginBtn')
const loginForm = document.querySelector('form[name="login"]')
const loginStatus = document.getElementById('auth-status')

const getUsernameValue = (e) => {
	const val = e.target.value
	// toggle login button
	const btn = (val.length > 0) ? loginBtn.removeAttribute('disabled') : loginBtn.setAttribute('disabled', 'disabled')
	// on enter
	if(e.keyCode == 13) {
		if (val.length > 0) {
			passwordField.classList.remove('hide')
			passwordField.focus()
		} 
	}
}

const showLoginError = () => {
	loginStatus.innerHTML ='<div class="col-lg-12 text-danger text-center auth-error-section">Invalid username or password<br/>Please try again later<br/><div>'
	// hide loading
	document.querySelector('loading-page').classList.add('hide')
	loginBtn.removeAttribute('disabled')
}

const login = (e) => {
	e.preventDefault()

	// non empty value
	if (usernameField.value.length > 0 && passwordField.value.length > 0) {
		// loading
		document.querySelector('loading-page').classList.remove('hide')
		// disable
		loginBtn.setAttribute('disabled', 'disabled')
		// login
		auth.login(usernameField.value,passwordField.value).then(json => {
			let data = JSON.parse(json)

			if (data.token){
				// proceed
				auth.store(data)
				//save to config
				window.trs = window.trs || {}
				window.trs.config = window.trs.config || {}
				window.trs.config.token = data.token
				window.trs.config.credentials = data

				//home
				setTimeout(() => {
					const loc = `${window.location.origin}${window.location.pathname}#/home`
					// window.location.hash = '/home'
					window.location.href = loc
				},1000)

			}else{
				showLoginError()
			}
		}).catch((err) => {
			console.log(err)
			showLoginError()
		})	
	}
	
}

usernameField.addEventListener('keyup', getUsernameValue)
loginForm.addEventListener('submit', login)