// Theme Toggle
const themeToggle = document.getElementById('theme-toggle');
const mobileThemeToggle = document.getElementById('mobile-theme-toggle');
const icon = themeToggle.querySelector('i');
const mobileIcon = mobileThemeToggle.querySelector('i');
const body = document.body;
        
// Check for saved theme preference or respect OS setting
const savedTheme = localStorage.getItem('theme');
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        
if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
    body.classList.add('dark-mode');
    icon.classList.remove('fa-moon');
    icon.classList.add('fa-sun');
    mobileIcon.classList.remove('fa-moon');
    mobileIcon.classList.add('fa-sun');
    themeToggle.querySelector('span').textContent = 'Light';
    mobileThemeToggle.querySelector('span').textContent = 'Light Mode';
}
        
function toggleTheme() {
    body.classList.toggle('dark-mode');
    const isDark = body.classList.contains('dark-mode');
            
    if (isDark) {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
        mobileIcon.classList.remove('fa-moon');
        mobileIcon.classList.add('fa-sun');
        themeToggle.querySelector('span').textContent = 'Light';
        mobileThemeToggle.querySelector('span').textContent = 'Light Mode';
        localStorage.setItem('theme', 'dark');
    } else {
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
        mobileIcon.classList.remove('fa-sun');
        mobileIcon.classList.add('fa-moon');
        themeToggle.querySelector('span').textContent = 'Dark';
        mobileThemeToggle.querySelector('span').textContent = 'Dark Mode';
        localStorage.setItem('theme', 'light');
    }
}
        
themeToggle.addEventListener('click', toggleTheme);
mobileThemeToggle.addEventListener('click', toggleTheme);
        
// Mobile Menu Toggle
document.getElementById('mobile-menu-button').addEventListener('click', function() {
    const menu = document.getElementById('mobile-menu');
    menu.classList.toggle('hidden');
});

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            window.scrollTo({
                top: target.offsetTop - 100,
                behavior: 'smooth'
            });
            // Close mobile menu if open
            document.getElementById('mobile-menu').classList.add('hidden');
        }
    });
});

// Contact Form Submission
document.getElementById('contact-form').addEventListener('submit', function(e) {
    e.preventDefault();
            
    // Simple validation
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
            
    if (name && email) {
        // Show success message with neumorphism style
        const button = this.querySelector('button[type="submit"]');
        const originalText = button.innerHTML;
        button.innerHTML = '<span>Sending...</span>';
        button.disabled = true;
                
        setTimeout(() => {
            button.innerHTML = '<span>Sent! ✓</span>';
            setTimeout(() => {
                button.innerHTML = originalText;
                button.disabled = false;
                this.reset();
            }, 2000);
        }, 1500);
    }
});

// Animation on Scroll
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Add initial styles for animations
document.querySelectorAll('.slide-up, .fade-in').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
});

document.querySelectorAll('.slide-up, .fade-in').forEach(item => {
    observer.observe(item);
});

// Skill Bar Animation
const skillSection = document.querySelector('#skills');
const skillsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            document.querySelectorAll('.skill-fill').forEach(bar => {
                const width = bar.style.width;
                bar.style.width = '0';
                setTimeout(() => {
                    bar.style.width = width;
                }, 300);
            });
            skillsObserver.unobserve(entry.target);
        }
    });
}, observerOptions);
        
skillsObserver.observe(skillSection);