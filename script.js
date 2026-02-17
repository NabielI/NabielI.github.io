// Typing Animation
const typedTextElement = document.getElementById('typed-text');
const textsToType = ['Designer', 'Developer', 'Creative', 'Problem Solver'];
let textIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 150;

function type() {
    const currentText = textsToType[textIndex];
    
    if (isDeleting) {
        typedTextElement.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 100;
    } else {
        typedTextElement.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 150;
    }
    
    if (!isDeleting && charIndex === currentText.length) {
        isDeleting = true;
        typingSpeed = 2000; // Pause at end
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % textsToType.length;
        typingSpeed = 500; // Pause before next word
    }
    
    setTimeout(type, typingSpeed);
}

// Start typing animation when page loads
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(type, 1000);
});

// Toggle Mobile Menu
function toggleMobileMenu() {
    const menu = document.getElementById('mobileMenu');
    menu.classList.toggle('hidden');
}

// Tab Switching for Work Section
function switchTab(tabName) {
    // Hide all tab contents
    document.querySelectorAll('.tab-content').forEach(content => {
        content.classList.add('hidden');
    });
    
    // Remove active class from all buttons
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active', 'bg-gradient-to-r', 'from-orange-500', 'to-orange-600', 'text-white', 'shadow-lg', 'shadow-orange-500/30');
        btn.classList.add('bg-slate-900', 'border', 'border-slate-800', 'text-slate-300');
    });
    
    // Show selected tab content
    const selectedContent = document.getElementById(`${tabName}-content`);
    if (selectedContent) {
        selectedContent.classList.remove('hidden');
    }
    
    // Add active class to clicked button
    event.target.classList.remove('bg-slate-900', 'border', 'border-slate-800', 'text-slate-300');
    event.target.classList.add('active', 'bg-gradient-to-r', 'from-orange-500', 'to-orange-600', 'text-white', 'shadow-lg', 'shadow-orange-500/30');
}

// Handle Contact Form Submit
function handleSubmit(event) {
    event.preventDefault();
    const form = event.target;
    const button = form.querySelector('button[type="submit"]');
    const originalText = button.innerHTML;
    
    // Show loading state
    button.innerHTML = `
        <svg class="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        Sending...
    `;
    button.disabled = true;
    
    // Simulate sending (replace with actual API call)
    setTimeout(() => {
        button.innerHTML = `
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
            </svg>
            Message Sent!
        `;
        
        setTimeout(() => {
            button.innerHTML = originalText;
            button.disabled = false;
            form.reset();
            alert('Thank you for reaching out! I\'ll get back to you soon.');
        }, 2000);
    }, 1500);
}

// Download CV Function
function downloadCV() {
    // Alert user about CV download
    alert('CV download will start soon. Please make sure you have your CV file ready to link here.');
    
    // In production, replace with actual CV file link:
    // window.location.href = 'path/to/your/cv.pdf';
    
    // Or use fetch to download:
    // fetch('path/to/your/cv.pdf')
    //     .then(response => response.blob())
    //     .then(blob => {
    //         const url = window.URL.createObjectURL(blob);
    //         const a = document.createElement('a');
    //         a.href = url;
    //         a.download = 'Nabiel_Ischak_CV.pdf';
    //         document.body.appendChild(a);
    //         a.click();
    //         window.URL.revokeObjectURL(url);
    //         document.body.removeChild(a);
    //     });
}

// Smooth Scroll for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80; // Account for fixed nav
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
            // Close mobile menu if open
            document.getElementById('mobileMenu').classList.add('hidden');
        }
    });
});

// Active Nav Link on Scroll + Parallax Effect
let lastScrollPosition = 0;
const nav = document.querySelector('nav');

window.addEventListener('scroll', () => {
    const currentScrollPosition = window.pageYOffset;
    
    // Hide/show nav on scroll
    if (currentScrollPosition > lastScrollPosition && currentScrollPosition > 100) {
        nav.style.transform = 'translateY(-100%)';
    } else {
        nav.style.transform = 'translateY(0)';
    }
    lastScrollPosition = currentScrollPosition;
    
    // Update active nav link
    let current = '';
    const sections = document.querySelectorAll('section[id]');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 120;
        const sectionHeight = section.clientHeight;
        if (currentScrollPosition >= sectionTop && currentScrollPosition < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });

    document.querySelectorAll('nav a[href^="#"]').forEach(link => {
        link.classList.remove('text-orange-500', 'active');
        link.classList.add('text-slate-300');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.remove('text-slate-300');
            link.classList.add('text-orange-500', 'active');
        }
    });
    
    // Parallax Effect
    const parallaxElements = document.querySelectorAll('.parallax-element');
    parallaxElements.forEach(element => {
        const speed = element.dataset.speed || 2;
        const yPos = -(currentScrollPosition * speed / 100);
        element.style.transform = `translateY(${yPos}px)`;
    });
});

// Add transition to nav
nav.style.transition = 'transform 0.3s ease';

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
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
    // Animate project cards and skill cards on scroll
    const elementsToAnimate = document.querySelectorAll('.group');
    elementsToAnimate.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(el);
    });
});
