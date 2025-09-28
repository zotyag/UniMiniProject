(function () {
    const TRIGGER_ID = 'new_post';

    function ensureComposeUI() {
        let overlay = document.getElementById('compose-overlay');
        if (overlay) return { open, close };

        overlay = document.createElement('div');
        overlay.id = 'compose-overlay';
        Object.assign(overlay.style, {
            position: 'fixed',
            inset: '0',
            background: 'rgba(0,0,0,0.7)',
            display: 'none',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: '10000'
        });

        const modal = document.createElement('div');
        Object.assign(modal.style, {
            width: 'min(600px, 92vw)',
            background: '#fff',
            borderRadius: '10px',
            padding: '16px',
            boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px'
        });

        const title = document.createElement('h3');
        title.textContent = 'Write a new post';

        const form = document.createElement('form');
        form.id = 'compose-form';

        const textarea = document.createElement('textarea');
        textarea.id = 'post-msg-box'; // required by createPost
        textarea.setAttribute('rows', '8');
        textarea.setAttribute('maxlength', '4000');
        textarea.placeholder = 'Type your post...';
        Object.assign(textarea.style, {
            width: '100%',
            resize: 'vertical',
            fontSize: '16px',
            lineHeight: '1.4',
            padding: '10px',
            boxSizing: 'border-box'
        });

        const error = document.createElement('div');
        Object.assign(error.style, {
            color: '#b00020',
            fontSize: '14px',
            display: 'none'
        });

        const buttons = document.createElement('div');
        Object.assign(buttons.style, {
            display: 'flex',
            gap: '8px',
            justifyContent: 'flex-end'
        });

        const cancelBtn = document.createElement('button');
        cancelBtn.type = 'button';
        cancelBtn.textContent = 'Cancel';
        Object.assign(cancelBtn.style, {
            border: 'none',
            padding: '8px 14px',
            borderRadius: '6px',
            cursor: 'pointer',
            margin: '8px'
        });

        const postBtn = document.createElement('button');
        postBtn.type = 'submit';
        postBtn.textContent = 'Post';
        Object.assign(postBtn.style, {
            background: '#1a73e8',
            color: '#fff',
            border: 'none',
            padding: '8px 14px',
            borderRadius: '6px',
            cursor: 'pointer',
            margin: '8px'
        });

        buttons.appendChild(cancelBtn);
        buttons.appendChild(postBtn);
        form.appendChild(textarea);
        form.appendChild(error);
        form.appendChild(buttons);
        modal.appendChild(title);
        modal.appendChild(form);
        overlay.appendChild(modal);
        document.body.appendChild(overlay);

        function open() {
            textarea.value = '';
            error.style.display = 'none';
            overlay.style.display = 'flex';
            document.body.style.overflow = 'hidden';
            setTimeout(() => textarea.focus(), 0);
        }

        function close() {
            overlay.style.display = 'none';
            document.body.style.overflow = '';
        }

        overlay.addEventListener('click', (e) => { if (e.target === overlay) close(); });
        cancelBtn.addEventListener('click', close);
        window.addEventListener('keydown', (e) => {
            if (overlay.style.display !== 'none' && e.key === 'Escape') close();
        });

        form.addEventListener('submit', async (e) => {
            e.preventDefault();            // keep modal in control
            error.style.display = 'none';
            postBtn.disabled = true;

            // Delegate to existing createPost which reads #post-msg-box and POSTs /api/new_post
            const res = await createPost(e).catch(() => null);

            postBtn.disabled = false;

            if (res && res.ok) {
                // Optional: reload first page to reflect current sort
                if (typeof loadPostsIntoTable === 'function') {
                    loadPostsIntoTable(true);
                }
                close();
            } else {
                error.textContent = 'Failed to publish. Please try again.';
                error.style.display = 'block';
            }
        });

        return { open, close };
    }

    function wireCompose() {
        const trigger = document.getElementById(TRIGGER_ID);
        if (!trigger) return;
        const ui = ensureComposeUI();
        trigger.addEventListener('click', (e) => {
            e.preventDefault();
            ui.open();
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', wireCompose);
    } else {
        wireCompose();
    }
})();
