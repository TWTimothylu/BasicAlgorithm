document.addEventListener('DOMContentLoaded', () => {
    const mainContent = document.getElementById('main-content');
    const links = document.querySelectorAll('.nav-link');
    const menuToggle = document.getElementById('menu-toggle');
    const sidebar = document.querySelector('aside');

    // Mobile Menu Toggle
    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            sidebar.classList.toggle('open');
        });
    }

    // Default load (optional: load the first link or a Welcome page)
    // loadPage('content/intro.html'); 

    links.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();

            // Highlight active link
            links.forEach(l => l.classList.remove('active'));
            link.classList.add('active');

            // Handle sub-menus display
            document.querySelectorAll('.sub-menu').forEach(menu => menu.style.display = 'none');
            if (link.nextElementSibling && link.nextElementSibling.classList.contains('sub-menu')) {
                link.nextElementSibling.style.display = 'block';
            }
            if (link.closest('.sub-menu')) {
                link.closest('.sub-menu').style.display = 'block';
                // Keep parent link active-looking if desired, but default active styles apply to the sub-link
            }

            const url = link.getAttribute('href');
            if (url && url !== '#') {
                loadPage(url);
            }

            // Close sidebar on mobile after click
            if (window.innerWidth <= 768) {
                sidebar.classList.remove('open');
            }
        });
    });

    async function loadPage(url) {
        try {
            mainContent.innerHTML = '<div style="text-align:center; margin-top: 2rem; color: var(--text-secondary)">Loading...</div>';

            const response = await fetch(url);
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

            const html = await response.text();

            // 1. Inject HTML
            mainContent.innerHTML = html;

            // 2. Execute Scripts (Crucial for Animations)
            // innerHTML does not execute <script> tags for security reasons.
            // We must manually recreate and append them.
            const scripts = mainContent.getElementsByTagName('script');
            const scriptsToRun = [];

            // Extract scripts first (live collection issues if we modify DOM while iterating)
            for (let i = 0; i < scripts.length; i++) {
                scriptsToRun.push(scripts[i]);
            }

            scriptsToRun.forEach(oldScript => {
                const newScript = document.createElement('script');

                // Copy attributes (src, type, etc.)
                Array.from(oldScript.attributes).forEach(attr => {
                    newScript.setAttribute(attr.name, attr.value);
                });

                // Copy content
                newScript.textContent = oldScript.textContent;

                // Replace old script with new one to trigger execution
                oldScript.parentNode.replaceChild(newScript, oldScript);
            });

            // 3. Trigger MathJax to render new content
            if (window.MathJax) {
                await MathJax.typesetPromise();
            }

            // 4. Trigger Prism to highlight new code blocks
            if (window.Prism) {
                Prism.highlightAll();
            }

        } catch (error) {
            console.error('Error loading page:', error);
            mainContent.innerHTML = `
                <div class="content-area">
                    <h1>Error Loading Content</h1>
                    <p>Could not load the requested page: <code>${url}</code></p>
                    <p>Make sure the file exists and you are running this on a local server (not just opening index.html directly).</p>
                </div>
            `;
        }
    }
});
