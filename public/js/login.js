async function login(e) {
	e.preventDefault();
	const uname = document.getElementById('login-username');
	const passwd = document.getElementById('login-password');

	const res = await fetch('/api/login', {
		method: 'post',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ uname: uname.value, passwd: passwd.value }),
	});
	if (res.ok) {
		console.log('Successfully logged in!');
		document.location.href = 'index.html';
	} else {
		const errorData = await res.json();

		alert(errorData.message);
	}
}

async function logout() {
	const res = await fetch('/api/logout', {
		method: 'post',
		headers: { 'Content-Type': 'application/json' },
	});
	if (res.ok) console.log('Successfully logged out!');
	else {
		const errorData = await res.json();

		alert(errorData.message);
	}
}
