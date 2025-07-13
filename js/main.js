document.addEventListener('DOMContentLoaded', () => {
    // Setup Intersection Observer
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, observerOptions);

    // Apply animations to elements
    const setupAnimations = () => {
        // Animate header
        document.querySelector('header h1').classList.add('slide-in-left');
        document.querySelector('header p').classList.add('slide-in-right');

        // Animate intro section
        const intro = document.querySelector('.intro');
        intro.classList.add('fade-in');
        
        // Animate coin models with stagger effect
        document.querySelectorAll('.coin-model').forEach((coin, index) => {
            coin.classList.add('fade-in', 'stagger-animation');
            coin.style.setProperty('--order', index);
        });

        // Start observing all animated elements
        document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right')
            .forEach(el => observer.observe(el));
    };

    // Initialize model-viewer interactions
    const setupModelViewers = () => {
        document.querySelectorAll('model-viewer').forEach(viewer => {
            viewer.addEventListener('load', () => {
                viewer.style.opacity = '0';
                viewer.style.transition = 'opacity 0.5s ease-in';
                setTimeout(() => {
                    viewer.style.opacity = '1';
                }, 100);
            });

            // Add hover effect
            viewer.addEventListener('mouseenter', () => {
                viewer.setAttribute('camera-orbit', 
                    viewer.getAttribute('camera-orbit').replace(/\d+deg/, '45deg'));
            });

            viewer.addEventListener('mouseleave', () => {
                viewer.setAttribute('camera-orbit', 
                    viewer.getAttribute('camera-orbit').replace(/\d+deg/, '0deg'));
            });
        });
    };

    setupAnimations();
    setupModelViewers();
});