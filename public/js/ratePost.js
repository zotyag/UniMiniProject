// ratePost.js (optional enhancement)
async function ratePost(jokeId, value) {
	try {
		const res = await fetch('/api/rate', {
			method: 'post',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ jokeId, value }),
		});
		const data = await res.json();

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
		alert('You have to be logged in!');
		throw err;
	}
}
