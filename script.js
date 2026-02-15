function toggleMobileMenu() {
    const menu = document.getElementById('mobileMenu');
    menu.classList.toggle('hidden');
}

function filterProjects(category, event) {
    const projects = document.querySelectorAll('.project-item');
    const buttons = document.querySelectorAll('.filter-btn');

    buttons.forEach(btn => {
        btn.classList.remove('gradient-bg', 'text-white');
        btn.classList.add('bg-slate-700', 'text-slate-300');
    });

    if (event) {
        event.target.classList.remove('bg-slate-700', 'text-slate-300');
        event.target.classList.add('gradient-bg', 'text-white');
    }

    projects.forEach(project => {
        if (category === 'all' || project.classList.contains(category)) {
            project.style.display = 'block';
        } else {
            project.style.display = 'none';
        }
    });
}

function handleSubmit(event) {
    event.preventDefault();
    const form = event.target;
    alert("Message sent! Thank you for reaching out. I'll get back to you soon.");
    form.reset();
}

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
            const mobileMenu = document.getElementById('mobileMenu');
            if (mobileMenu) {
                mobileMenu.classList.add('hidden');
            }
        }
    });
});
