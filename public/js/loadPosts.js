async function loadPosts(sortOption) {
	// const res = await fetch(`/api/posts?sort=${sortOption}`);
	const res = await fetch('/api/posts');

	const posts = await res.json();

	if (res.ok) console.log('Posts loaded!');
	else {
		const errorData = await res.json();

		alert(errorData.message);
	}

	return posts;
}
