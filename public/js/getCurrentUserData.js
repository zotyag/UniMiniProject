async function getCurrentUserData() {
	const res = await fetch('/api/currentUserData');

	const data = await res.json();

	console.log(data);

	if (res.ok) {
		console.log(data.message);
	} else {
		alert('Error: ' + data.message);
	}
}
