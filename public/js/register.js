async function registerNewUser(e) {
	e.preventDefault();
	const uname = document.getElementById('username');
	const passwd = document.getElementById('password');
	const passwd_again = document.getElementById('new_Password');

	if (uname.value === '' || passwd.value === '' || passwd_again === '') {
		return alert('Neither field can be empty!');
	}
	if (/\s/.test(uname.value) || /\s/.test(passwd.value) || /\s/.test(passwd_again.value)) {
		return alert('Neither field can contain whitespace character(s)!');
	}
	if (passwd.value != passwd_again.value) {
		return alert('The two password must match!');
	}

	const res = await fetch('/api/register', {
		method: 'post',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ uname: uname.value, passwd: passwd.value }),
	});

	if (res.ok) {
		console.log('User added!');
		document.location.href = 'login.html';
	} else {
		const errorData = await res.json();

		if (res.status === 409) {
			alert(errorData.message);
		} else {
			alert('Failed to add new user!');
		}
	}
}
