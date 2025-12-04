/* ============================================
   Portfolio Personal - JavaScript
   GitHub API Integration & Interactions
   ============================================ */

// ============================================
// Navigation & Scroll Effects
// ============================================
const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('navToggle');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

// Navbar scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile navigation toggle
navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Smooth scroll with offset for fixed navbar
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ============================================
// Scroll Animations
// ============================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for scroll animations
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.skill-category, .project-card, .contact-item, .quality-item');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// ============================================
// GitHub API Integration
// ============================================
const githubUsernameInput = document.getElementById('githubUsername');
const loadProjectsBtn = document.getElementById('loadProjects');
const projectsGrid = document.getElementById('projectsGrid');
const projectsLoading = document.getElementById('projectsLoading');
const projectsError = document.getElementById('projectsError');
const projectsEmpty = document.getElementById('projectsEmpty');

// GitHub API configuration
const GITHUB_API_BASE = 'https://api.github.com';
const MAX_REPOS = 12; // Maximum number of repositories to display

// Load projects from GitHub
async function loadGitHubProjects(username) {
    if (!username || username.trim() === '') {
        showError('Por favor, ingresa un nombre de usuario de GitHub válido.');
        return;
    }

    // Hide all states
    hideAllStates();
    projectsLoading.style.display = 'block';

    try {
        // Fetch user's public repositories
        const response = await fetch(`${GITHUB_API_BASE}/users/${username}/repos?sort=updated&per_page=${MAX_REPOS}`);
        
        if (!response.ok) {
            if (response.status === 404) {
                throw new Error(`Usuario "${username}" no encontrado en GitHub.`);
            } else if (response.status === 403) {
                throw new Error('Límite de solicitudes de API alcanzado. Intenta de nuevo más tarde.');
            } else {
                throw new Error('Error al cargar los repositorios. Por favor, intenta de nuevo.');
            }
        }

        const repos = await response.json();

        if (repos.length === 0) {
            showError(`El usuario "${username}" no tiene repositorios públicos.`);
            return;
        }

        // Display repositories
        displayProjects(repos);
        
        // Save username to localStorage for convenience
        localStorage.setItem('githubUsername', username);

    } catch (error) {
        console.error('Error fetching GitHub projects:', error);
        showError(error.message);
    } finally {
        projectsLoading.style.display = 'none';
    }
}

// Display projects in the grid
function displayProjects(repos) {
    hideAllStates();
    projectsGrid.style.display = 'grid';
    projectsGrid.innerHTML = '';

    repos.forEach(repo => {
        const projectCard = createProjectCard(repo);
        projectsGrid.appendChild(projectCard);
    });

    // Trigger scroll animations for new cards
    const cards = projectsGrid.querySelectorAll('.project-card');
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, 100);
    });
}

// Create a project card element
function createProjectCard(repo) {
    const card = document.createElement('div');
    card.className = 'project-card';
    
    const description = repo.description || 'Sin descripción disponible';
    const language = repo.language || 'N/A';
    const stars = repo.stargazers_count || 0;
    const forks = repo.forks_count || 0;
    
    card.innerHTML = `
        <div class="project-header">
            <h3 class="project-name">${escapeHtml(repo.name)}</h3>
        </div>
        <p class="project-description">${escapeHtml(description)}</p>
        <div class="project-meta">
            ${language !== 'N/A' ? `<span class="project-language">${escapeHtml(language)}</span>` : ''}
            ${stars > 0 ? `<span class="project-stat">⭐ ${stars}</span>` : ''}
            ${forks > 0 ? `<span class="project-stat">🔀 ${forks}</span>` : ''}
        </div>
        <a href="${repo.html_url}" target="_blank" rel="noopener noreferrer" class="project-link">
            Ver en GitHub →
        </a>
    `;
    
    return card;
}

// Helper function to escape HTML and prevent XSS
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Show error message
function showError(message) {
    hideAllStates();
    projectsError.style.display = 'block';
    projectsError.querySelector('.error-message').textContent = message;
}

// Hide all project states
function hideAllStates() {
    projectsLoading.style.display = 'none';
    projectsError.style.display = 'none';
    projectsEmpty.style.display = 'none';
    projectsGrid.style.display = 'none';
}

// Event listeners for loading projects
loadProjectsBtn.addEventListener('click', () => {
    const username = githubUsernameInput.value.trim();
    loadGitHubProjects(username);
});

githubUsernameInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        const username = githubUsernameInput.value.trim();
        loadGitHubProjects(username);
    }
});

// Load saved username from localStorage on page load
document.addEventListener('DOMContentLoaded', () => {
    const savedUsername = localStorage.getItem('githubUsername');
    if (savedUsername) {
        githubUsernameInput.value = savedUsername;
        // Optionally auto-load projects
        // loadGitHubProjects(savedUsername);
    }
});

// ============================================
// Dynamic Year in Footer
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    const footerYear = document.querySelector('.footer p');
    if (footerYear) {
        const currentYear = new Date().getFullYear();
        footerYear.innerHTML = footerYear.innerHTML.replace('2024', currentYear);
    }
});

// ============================================
// Active Nav Link Highlighting
// ============================================
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const scrollY = window.scrollY;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLinks.forEach(link => link.classList.remove('active'));
            if (navLink) {
                navLink.classList.add('active');
            }
        }
    });
}

window.addEventListener('scroll', updateActiveNavLink);
document.addEventListener('DOMContentLoaded', updateActiveNavLink);

// ============================================
// Performance: Debounce scroll events
// ============================================
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debounce to scroll-heavy functions
const debouncedScrollHandler = debounce(() => {
    updateActiveNavLink();
}, 100);

window.addEventListener('scroll', debouncedScrollHandler);

// ============================================
// Accessibility: Focus management
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    // Skip to main content link (optional enhancement)
    const skipLink = document.createElement('a');
    skipLink.href = '#home';
    skipLink.className = 'skip-to-content';
    skipLink.textContent = 'Saltar al contenido principal';
    skipLink.style.cssText = `
        position: absolute;
        top: -40px;
        left: 0;
        background: var(--primary-color);
        color: white;
        padding: 8px 16px;
        text-decoration: none;
        z-index: 10000;
    `;
    skipLink.addEventListener('focus', () => {
        skipLink.style.top = '0';
    });
    skipLink.addEventListener('blur', () => {
        skipLink.style.top = '-40px';
    });
    document.body.insertBefore(skipLink, document.body.firstChild);
});

// ============================================
// Console Easter Egg (Optional fun addition)
// ============================================
console.log('%c¡Hola Developer! 👋', 'color: #667eea; font-size: 20px; font-weight: bold;');
console.log('%c¿Te gusta este portfolio? Revisa el código fuente en GitHub!', 'color: #764ba2; font-size: 14px;');
console.log('%cHecho con ❤️ y JavaScript vanilla', 'color: #4facfe; font-size: 12px;');
