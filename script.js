document.addEventListener('DOMContentLoaded', () => {

    // --- Mock Data for Portfolio ---
    const portfolioProjects = [
      { id: 1, title: 'Neubau Einfamilienhaus', location: 'Berlin-Zehlendorf', category: 'Neubau', imageUrl: 'https://images.unsplash.com/photo-1572949645841-094f3a9c4c94?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
      { id: 2, title: 'Altbausanierung & Modernisierung', location: 'Potsdam', category: 'Sanierung', imageUrl: 'https://images.unsplash.com/photo-1600585152915-d208bec867a1?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
      { id: 3, title: 'Gewerbehalle Rohbau', location: 'Brandenburg', category: 'Rohbau', imageUrl: 'https://images.unsplash.com/photo-1517999349371-c43520457b23?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
      { id: 4, title: 'Schlüsselfertiges Stadthaus', location: 'Berlin-Mitte', category: 'Neubau', imageUrl: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
      { id: 5, title: 'Dachgeschossausbau', location: 'Berlin-Kreuzberg', category: 'Sanierung', imageUrl: 'https://images.unsplash.com/photo-1560185007-c5ca9d2c014d?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
      { id: 6, title: 'Fundamentarbeiten Bürogebäude', location: 'Oranienburg', category: 'Rohbau', imageUrl: 'https://images.unsplash.com/photo-1556912173-356c5a4a4d18?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
    ];

    // --- Header & Mobile Menu ---
    const header = document.getElementById('header');
    const menuBtn = document.getElementById('menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const menuOpenIcon = document.getElementById('menu-open-icon');
    const menuCloseIcon = document.getElementById('menu-close-icon');
    const navLinks = document.querySelectorAll('.nav-link');

    // Sticky header on scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 10) {
            header.classList.add('bg-white/95', 'shadow-md', 'backdrop-blur-sm');
        } else {
            header.classList.remove('bg-white/95', 'shadow-md', 'backdrop-blur-sm');
        }
    });

    // Toggle mobile menu
    menuBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
        menuOpenIcon.classList.toggle('hidden');
        menuCloseIcon.classList.toggle('hidden');
        // Also add background to header when menu is open
        if (!mobileMenu.classList.contains('hidden')) {
             header.classList.add('bg-white/95', 'shadow-md', 'backdrop-blur-sm');
        } else if (window.scrollY <= 10) {
             header.classList.remove('bg-white/95', 'shadow-md', 'backdrop-blur-sm');
        }
    });

    // Smooth scroll for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth' });
                // Close mobile menu after click
                if (!mobileMenu.classList.contains('hidden')) {
                    mobileMenu.classList.add('hidden');
                    menuOpenIcon.classList.remove('hidden');
                    menuCloseIcon.classList.add('hidden');
                }
            }
        });
    });

    // --- On-Scroll Animations ---
    const animatedSections = document.querySelectorAll('.animated-section');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    animatedSections.forEach(section => {
        observer.observe(section);
    });

    // --- Portfolio & Lightbox ---
    const portfolioGrid = document.getElementById('portfolio-grid');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxTitle = document.getElementById('lightbox-title');
    const lightboxLocation = document.getElementById('lightbox-location');
    const lightboxClose = document.getElementById('lightbox-close');
    const lightboxPrev = document.getElementById('lightbox-prev');
    const lightboxNext = document.getElementById('lightbox-next');
    let currentIndex = 0;

    // Populate portfolio grid
    portfolioProjects.forEach((project, index) => {
        const projectEl = document.createElement('div');
        projectEl.className = 'group relative overflow-hidden rounded-lg shadow-lg cursor-pointer';
        projectEl.innerHTML = `
            <img src="${project.imageUrl}" alt="${project.title}" class="w-full h-72 object-cover group-hover:scale-110 transition-transform duration-500">
            <div class="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
            <div class="absolute bottom-0 left-0 p-6 text-white">
                <h3 class="text-xl font-bold">${project.title}</h3>
                <p class="text-sm opacity-80">${project.location}</p>
            </div>
        `;
        projectEl.addEventListener('click', () => openLightbox(index));
        portfolioGrid.appendChild(projectEl);
    });

    function updateLightboxContent(index) {
        const project = portfolioProjects[index];
        lightboxImg.src = project.imageUrl;
        lightboxImg.alt = project.title;
        lightboxTitle.textContent = project.title;
        lightboxLocation.textContent = project.location;
    }

    function openLightbox(index) {
        currentIndex = index;
        updateLightboxContent(index);
        lightbox.classList.remove('hidden');
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
    }

    function closeLightbox() {
        lightbox.classList.add('hidden');
        document.body.style.overflow = ''; // Restore scrolling
    }

    function showNext() {
        currentIndex = (currentIndex + 1) % portfolioProjects.length;
        updateLightboxContent(currentIndex);
    }

    function showPrev() {
        currentIndex = (currentIndex - 1 + portfolioProjects.length) % portfolioProjects.length;
        updateLightboxContent(currentIndex);
    }

    // Event Listeners for lightbox
    lightboxClose.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });
    lightboxNext.addEventListener('click', showNext);
    lightboxPrev.addEventListener('click', showPrev);

    // Keyboard navigation for lightbox
    document.addEventListener('keydown', (e) => {
        if (lightbox.classList.contains('hidden')) return;
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowRight') showNext();
        if (e.key === 'ArrowLeft') showPrev();
    });

    // --- Contact Form ---
    const contactForm = document.getElementById('contact-form');
    const submitBtn = document.getElementById('submit-btn');
    const submitStatus = document.getElementById('submit-status');

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        submitBtn.disabled = true;
        submitBtn.textContent = 'Wird gesendet...';
        
        // Simulate API call
        setTimeout(() => {
            submitStatus.textContent = 'Vielen Dank! Ihre Nachricht wurde erfolgreich versendet.';
            submitStatus.classList.add('text-green-400');
            contactForm.reset();
            submitBtn.disabled = false;
            submitBtn.textContent = 'Nachricht senden';

            setTimeout(() => {
                submitStatus.textContent = '';
            }, 5000);
        }, 2000);
    });
});
