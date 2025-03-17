document.addEventListener('DOMContentLoaded', function() {
    // Header scroll effect
    const header = document.querySelector('.header');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.05)';
        }
    });

    // Screenshot slider functionality
    const slider = document.querySelector('.screenshots-slider');
    const prevBtn = document.querySelector('.slider-controls .prev');
    const nextBtn = document.querySelector('.slider-controls .next');
    const screenshots = document.querySelectorAll('.screenshot');
    const screenshotWidth = screenshots[0].offsetWidth + 32; // Width + margin

    // Scroll to next/previous screenshot
    prevBtn.addEventListener('click', function() {
        slider.scrollBy({
            left: -screenshotWidth,
            behavior: 'smooth'
        });
    });

    nextBtn.addEventListener('click', function() {
        slider.scrollBy({
            left: screenshotWidth,
            behavior: 'smooth'
        });
    });

    // Smooth scrolling for nav links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerHeight = header.offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
                
                window.scrollTo({
                    top: targetPosition - headerHeight,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Form submission
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const nameInput = this.querySelector('input[type="text"]');
            const emailInput = this.querySelector('input[type="email"]');
            const messageInput = this.querySelector('textarea');
            
            // Simple validation
            if (!nameInput.value || !emailInput.value || !messageInput.value) {
                alert('يرجى ملء جميع الحقول');
                return;
            }
            
            // Here you would typically send the form data to a server
            // For now, we'll just show a success message
            alert('تم إرسال رسالتك بنجاح! سنتواصل معك قريباً.');
            
            // Reset form
            contactForm.reset();
        });
    }

    // Animate elements when they come into view
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.feature-card, .testimonial-card, .screenshot');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight - 100) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };

    // Set initial state for animated elements
    document.querySelectorAll('.feature-card, .testimonial-card, .screenshot').forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });

    // Run on page load and scroll
    animateOnScroll();
    window.addEventListener('scroll', animateOnScroll);
});