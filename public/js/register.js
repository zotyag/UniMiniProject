async function registerNewUser(e) {
	e.preventDefault();
	const uname = document.getElementById('username');
	const passwd = document.getElementById('password');

	const res = await fetch('/api/register', {
		method: 'post',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ uname: uname.value, passwd: passwd.value }),
	});

	if (res.ok) console.log('User added!');
	else {
		const errorData = await res.json();

		if (res.status === 409) {
			alert(errorData.message);
		} else {
			alert('Failed to add new user!');
		}
	}
}
