document.addEventListener('DOMContentLoaded', () => {
    // Mobile menu toggle
    const nav = document.querySelector('nav');
    // Create mobile menu button
    const mobileMenuBtn = document.createElement('button');
    mobileMenuBtn.innerHTML = '&#9776;'; // Hamburger icon
    mobileMenuBtn.classList.add('mobile-menu-btn');
    mobileMenuBtn.setAttribute('aria-label', 'Open menu');
    nav.insertBefore(mobileMenuBtn, nav.firstChild);

    const navUl = nav.querySelector('ul');
    mobileMenuBtn.addEventListener('click', () => {
        navUl.classList.toggle('open');
        mobileMenuBtn.setAttribute('aria-expanded', 
            navUl.classList.contains('open'));
    });

    // Close mobile menu when clicking a link
    navUl.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navUl.classList.remove('open');
            mobileMenuBtn.setAttribute('aria-expanded', 'false');
        });
    });

    // Active nav link on scroll
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('nav a');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop - 100) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Cursor follower effect
    const cursorFollower = document.querySelector('.cursor-follower');
    const cursorFollowerBlur = document.querySelector('.cursor-follower-blur');
    
    if (cursorFollower && cursorFollowerBlur) {
        document.addEventListener('mousemove', (e) => {
            cursorFollower.style.left = e.clientX + 'px';
            cursorFollower.style.top = e.clientY + 'px';
            
            cursorFollowerBlur.style.left = e.clientX + 'px';
            cursorFollowerBlur.style.top = e.clientY + 'px';
        });
        
        // Hide cursor followers when leaving window
        document.addEventListener('mouseleave', () => {
            cursorFollower.style.opacity = '0';
            cursorFollowerBlur.style.opacity = '0';
        });
        
        document.addEventListener('mouseenter', () => {
            cursorFollower.style.opacity = '1';
            cursorFollowerBlur.style.opacity = '1';
        });
    }

    // Add glitch effect to section titles on hover
    const sectionTitles = document.querySelectorAll('.section-title h2');
    sectionTitles.forEach(title => {
        title.setAttribute('data-text', title.textContent);
        title.classList.add('glitch');
    });

    // Add subtle 3D tilt effect to cards on mousemove
    const tiltElements = document.querySelectorAll('.timeline-item, .skill-category, .project-card');
    tiltElements.forEach(element => {
        element.addEventListener('mousemove', (e) => {
            const rect = element.getBoundingClientRect();
            const x = e.clientX - rect.left; // x position within the element
            const y = e.clientY - rect.top; // y position within the element
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = ((y - centerY) / centerY) * 5; // Max 5deg tilt
            const rotateY = ((centerX - x) / centerX) * 5; // Max 5deg tilt
            
            element.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translate3d(0, 0, 0)`;
        });
        
        element.addEventListener('mouseleave', () => {
            element.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translate3d(0, 0, 0)';
        });
    });

    // Add typing effect to header text
    const headerText = document.querySelector('header p');
    if (headerText) {
        const originalText = headerText.textContent;
        headerText.textContent = '';
        let i = 0;
        
        function typeText() {
            if (i < originalText.length) {
                headerText.textContent += originalText.charAt(i);
                i++;
                setTimeout(typeText, 50);
            }
        }
        
        setTimeout(typeText, 500);
    }

    // Add floating animation to decorative elements
    const floatingElements = document.querySelectorAll('.section::before');
    floatingElements.forEach(el => {
        el.style.animation = 'float 6s ease-in-out infinite';
    });
    
    // Add keyframes for float animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-20px); }
        }
    `;
    document.head.appendChild(style);
});