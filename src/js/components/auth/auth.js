import Authentication from '../../services/Auth/Auth'

const xhr = new window.trs.exports.XHR()
const Auth = new Authentication(xhr)

const showLoginError = () => {
	const htm = `<br/>
		<span class="text-danger text-center" style="border:1px solid orangered;padding:10px;">Invalid Username or password. Please try again</span><br/>
	`
	// error
	document.querySelector('.login-status').innerHTML = htm
}

const login = (e) => {
	e.preventDefault()

	// fields
	const usernameField = document.getElementById('username')
	const passwordField = document.getElementById('password')

	// login
	Auth.login(usernameField.value, passwordField.value).then((json) => {
		let data = {}

		try {
			// mock data
			data = {
				username: usernameField.value,
				name: 'John Doe Jr.',
				token: 'customTokenHereFromAPI',
				uid: 1,
				id: 1,
			}
		} catch (error) {
			showLoginError()
		}
		// success
		if (data.id) {
			window.location.hash = '#/home'
		}
	})
}

window.addEventListener('DOMContentLoaded', () => {
	document.querySelector('form[name="auth-form"]').addEventListener('submit', login)
})

