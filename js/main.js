// Theme toggle
const toggle = document.getElementById('theme-toggle');
const icon = toggle.querySelector('.theme-icon');
const saved = localStorage.getItem('theme');
if (saved) document.documentElement.setAttribute('data-theme', saved);
updateIcon();

toggle.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
    updateIcon();
});

function updateIcon() {
    const dark = document.documentElement.getAttribute('data-theme') === 'dark';
    icon.textContent = dark ? '\u2600' : '\u263E';
}

// Mobile menu
const hamburger = document.getElementById('hamburger');
const navLinks = document.querySelector('.nav__links');
hamburger.addEventListener('click', () => navLinks.classList.toggle('active'));
navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => navLinks.classList.remove('active')));

// Copy-to-clipboard for code blocks
document.querySelectorAll('.code-block__copy').forEach(button => {
    button.addEventListener('click', async () => {
        const code = button.closest('.code-block').querySelector('code');
        const original = button.textContent;
        try {
            await navigator.clipboard.writeText(code.innerText);
            button.textContent = 'Copied';
        } catch (err) {
            button.textContent = 'Press Ctrl+C';
            const range = document.createRange();
            range.selectNodeContents(code);
            const selection = window.getSelection();
            selection.removeAllRanges();
            selection.addRange(range);
        }
        setTimeout(() => { button.textContent = original; }, 1800);
    });
});

// Scroll fade-in
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
