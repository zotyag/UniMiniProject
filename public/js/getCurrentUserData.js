async function getCurrentUserData() {
	try {
		const res = await fetch('/api/currentUserData');

		const data = await res.json();

		if (res.ok) {
			// console.log(data.message);
		} else {
			alert('Error: ' + data.message);
		}

		return data;
	} catch (err) {
		return err;
	}
}
