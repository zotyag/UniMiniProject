async function ratePost(jokeId, value) {
	try {
		const res = await fetch('/api/rate', {
			method: 'post',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ jokeId: jokeId, value: value }),
		});

		const data = await res.json();
		if (res.ok) {
			console.log(data.message);
		} else {
			alert('Error: ' + data.message);
		}
	} catch (err) {
		console.log('Request failed: ', err);
		alert('Network error');
	}
}
