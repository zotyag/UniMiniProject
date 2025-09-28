// ratePost.js (optional enhancement)
async function ratePost(jokeId, value) {
	try {
		const res = await fetch('/api/rate', {
			method: 'post',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ jokeId, value }),
		});
		const data = await res.json();

		//asd
		// const response = await fetch('/api/posts/' + jokeId);

		// // Itt még csak egy Response objektumod van
		// console.log(await response.json().post.content);

		// // Itt viszont már a szerver által visszaküldött JSON-t kapod
		// const data1 = await response.json();
		// console.log(data1.post.id);

		const get_rated_post = await fetch('/api/posts/' + jokeId);
		const rated_post = await get_rated_post.json();
		console.log(rated_post.post.popularity);

		const newValue = rated_post.post.popularity;
		const ratingElement = document.querySelector(`#post-${jokeId} .rating-value`);
		ratingElement.textContent = newValue;

		if (res.ok) {
			console.log(data.message);
			return data; // allow callers to use response (e.g., updated score)
		} else {
			throw new Error(data.message || 'Rating failed');
		}
	} catch (err) {
		console.log('Request failed: ', err);
		alert('Network error');
		throw err;
	}
}
