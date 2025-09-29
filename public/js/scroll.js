// Existing pagination state assumed:
const pageSize = 100;
let currentPage = 0;
let currentSort = 'date'; // 'date' or 'popularity'
let loading = false;
let hasMore = true;
let io = null;

const timeBtn = document.getElementById('btn-sort-time');
const popBtn = document.getElementById('btn-sort-pop');

function updateSortButtons() {
    const isDate = currentSort === 'date';
    document.getElementById('btn-sort-time')?.classList.toggle('active', isDate);
    document.getElementById('btn-sort-time')?.setAttribute('aria-pressed', String(isDate));
    document.getElementById('btn-sort-pop')?.classList.toggle('active', !isDate);
    document.getElementById('btn-sort-pop')?.setAttribute('aria-pressed', String(!isDate));
}

function setSort(sort) {
    if (loading) return;
    if (currentSort === sort) return;
    currentSort = sort;

    // Visual/ARIA state
    const isDate = sort === 'date';
    timeBtn?.classList.toggle('active', isDate);
    popBtn?.classList.toggle('active', !isDate);
    timeBtn?.setAttribute('aria-pressed', String(isDate));
    popBtn?.setAttribute('aria-pressed', String(!isDate));


    // Reset and load first page in new order
    loadPostsIntoTable(true);

    // Optional: scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Server fetch for a single page
async function fetchPosts(sort = currentSort, page = currentPage, limit = pageSize) {
    const res = await fetch(`/api/posts?sort=${encodeURIComponent(sort)}&page=${page}&limit=${limit}`);
    if (!res.ok) throw new Error('Failed to load posts');
    // Expected shape: { posts, hasMore, total, currentPage, totalPages, limit }
    return await res.json();
}

timeBtn?.addEventListener('click', () => setSort('date'));
popBtn?.addEventListener('click', () => setSort('popularity'));

// Keep your fetchPosts as it already sends ?sort=...&page=...&limit=...
// Ensure loadPostsIntoTable re-observes sentinel when resetting:
async function loadPostsIntoTable(initial = false) {
    if (loading || (!hasMore && !initial)) return;
    loading = true;
    try {
        if (initial) {
            document.getElementById('posts').innerHTML = '';
            currentPage = 0;
            hasMore = true;

            // Reconnect observer on reset so infinite scroll works after sorting
            if (io && sentinel) io.unobserve(sentinel);
            if (sentinel) {
                io = new IntersectionObserver(entries => {
                    if (entries[0].isIntersecting) loadPostsIntoTable(false);
                }, { rootMargin: '400px' });
                io.observe(sentinel);
            }
        }

        const { posts, hasMore: more } = await fetchPosts(currentSort, currentPage, pageSize);
        posts.forEach(post => add(post.id, post.author, post.created_at, post.content, post.popularity));
        hasMore = more;
        currentPage += 1;


        if (!hasMore && io && sentinel) io.unobserve(sentinel);
    } catch (e) {
        console.error(e);
    } finally {
        loading = false;
    }
}

const sentinel = document.getElementById('sentinel');
if (sentinel) {
    const io = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting) {
            loadPostsIntoTable(false);
        }
    }, { rootMargin: '400px' });
    io.observe(sentinel);
}

window.addEventListener('DOMContentLoaded', () => {
    updateSortButtons();
    loadPostsIntoTable(true);
});

async function add(jokeId, author, created_at, text, rating) {
    // 1. Megkeressük a fő konténert
    const postsContainer = document.getElementById('posts');

    // 2. Létrehozzuk a <div class="post"> elemet
    const postDiv = document.createElement('div');
    postDiv.classList.add('post');

    // NEW: stable id and dataset from DB id
    postDiv.id = `post-${jokeId}`;
    postDiv.dataset.jokeId = String(jokeId);

    // 3. Létrehozzuk a <div class="header"> elemet
    const headerDiv = document.createElement('div');
    headerDiv.classList.add('header');

    // 4. Létrehozzuk a <div class="author"> elemet
    const authorDiv = document.createElement('div');
    authorDiv.classList.add('author');

    // 5. Létrehozzuk a <div class="author-name"> elemet
    const authorNameDiv = document.createElement('div');
    authorNameDiv.classList.add('author-name');
    authorNameDiv.textContent = author;

    // 6. Létrehozzuk a <div class="time-of-post"> elemet
    const timeOfPostDiv = document.createElement('div');
    timeOfPostDiv.classList.add('time-of-post');

    const dateObj = new Date(created_at);
    const year = dateObj.getUTCFullYear();
    const month = dateObj.getUTCMonth() + 1;
    const day = dateObj.getUTCDate();
    const hours = dateObj.getUTCHours();
    const min = dateObj.getUTCMinutes();
    const sec = dateObj.getUTCSeconds();
    const pad = (num) => String(num).padStart(2, '0');

    const formattedDate = `${year}-${pad(month)}-${pad(day)} ${pad(hours)}:${pad(min)}:${pad(sec)}`;
    timeOfPostDiv.textContent = formattedDate;

    // 7. Létrehozzuk a <button class="btn-delete"> elemet
    const deleteButton = document.createElement('button');
    deleteButton.classList.add('btn-delete');
    deleteButton.textContent = 'delete';
    deleteButton.addEventListener('click', () => {
        deletePost(jokeId);
        window.scrollTo(0, 0); // Scroll to top
        loadPostsIntoTable(true);
    });

    // 8. Létrehozzuk a <div class="joke"> elemet
    const jokeDiv = document.createElement('div');
    jokeDiv.classList.add('joke');

    // 9. Létrehozzuk a <div class="rating"> elemet
    const ratingDiv = document.createElement('div');
    ratingDiv.classList.add('rating');

    // 10. Létrehozzuk a lájk gombot (fel)
    // Create buttons as before
    const upButton = document.createElement('button');
    upButton.type = 'button';
    upButton.classList.add('rate-btn', 'rate-btn--up'); // .rate-btn enables the delegated handler
    upButton.setAttribute('aria-label', 'Like');
    upButton.dataset.jokeId = String(jokeId);
    upButton.dataset.value = '1';
    upButton.innerHTML = '<img src="up.svg" width="20" height="20" alt="" aria-hidden="true">';


    // 11. Létrehozzuk a <div class="rating-value"> elemet
    const ratingValueDiv = document.createElement('div');
    ratingValueDiv.classList.add('rating-value');
    ratingValueDiv.textContent = rating;

    // 12. Létrehozzuk a diszlájk gombot (le)
    const downButton = document.createElement('button');
    downButton.type = 'button';
    downButton.classList.add('rate-btn', 'rate-btn--down');
    downButton.setAttribute('aria-label', 'Dislike');
    downButton.dataset.jokeId = String(jokeId);
    downButton.dataset.value = '-1';
    downButton.innerHTML = '<img src="down.svg" width="20" height="20" alt="" aria-hidden="true">';

    // 13. Létrehozzuk a <p class="joke-text"> elemet
    const jokeTextarea = document.createElement('p');
    jokeTextarea.classList.add('joke-text');
    jokeTextarea.textContent = text;

    // --- ÖSSZEFŰZÉS (Hierarchia felépítése) ---
    // author-name és time-of-post az author-ba
    authorDiv.appendChild(authorNameDiv);
    authorDiv.appendChild(timeOfPostDiv);

    // author és btn-delete a header-be
    headerDiv.appendChild(authorDiv);
    headerDiv.appendChild(deleteButton);

    // lájk gomb, rating-value, diszlájk gomb a rating-be
    ratingDiv.appendChild(upButton);
    ratingDiv.appendChild(ratingValueDiv);
    ratingDiv.appendChild(downButton);

    // rating és textarea a joke-ba
    jokeDiv.appendChild(ratingDiv);
    jokeDiv.appendChild(jokeTextarea);

    // header és joke a post-ba
    postDiv.appendChild(headerDiv);
    postDiv.appendChild(jokeDiv);

    // A kész post a posts konténerbe
    postsContainer.appendChild(postDiv);
}