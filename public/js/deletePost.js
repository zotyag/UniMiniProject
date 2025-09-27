async function deletePost(postId) {
	// if (!confirm('Are you sure you want to delete this post?')) return;

	try {
		const res = await fetch('/api/posts/' + postId, {
			method: 'DELETE',
		});

		const data = await res.json();
		if (res.ok) {
			console.log(data.message);
		} else {
			alert(data.message);
		}
	} catch (err) {
		console.error('Request failed', err);
		alert('Network error');
	}
}
