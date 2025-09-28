// ratePost.js (optional enhancement)
async function ratePost(jokeId, value) {
  try {
    const res = await fetch('/api/rate', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ jokeId, value }),
    });
    const data = await res.json();
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