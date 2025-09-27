async function changeRole(user_id, new_role) {
	const res = await fetch('/api/changeRole', {
		method: 'post',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ user_id: user_id, new_role: new_role }),
	});

	const data = await res.json();
	if (res.ok) {
		console.log(data.message);
	} else {
		alert('Error: ' + data.message);
	}
}
