async function createPost(e) {
	e.preventDefault();
	const content = document.getElementById('post-msg-box');
	var length = 'long';
	if (content.value.length <= 250) {
		length = 'short';
	} else if (content.value.length <= 1800) {
		length = 'medium';
	} else {
		length = 'long';
	}

	const res = await fetch('/api/new_post', {
		method: 'post',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ content: content.value, length: length }),
	});

	if (res.ok) console.log('New post added!');
	else {
		const errorData = await res.json();

		alert(errorData.message);
	}

	return res;
}
