/**
 * Luxury Estates - Main JavaScript File
 * This file contains all the interactive functionality for the luxury real estate website
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initNavigation();
    initPropertyFilters();
    initGalleryLightbox();
    initGalleryFilters();
    initContactForm();
    initSliders();
    initScrollAnimations();
});

/**
 * Mobile Navigation Toggle
 */
function initNavigation() {
    // This will be implemented for responsive mobile menu
    const header = document.querySelector('header');
    
    // Add scroll event to make header sticky with shadow on scroll
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}

/**
 * Property Filters for the properties listing page
 */
function initPropertyFilters() {
    const propertyFilters = document.querySelector('.search-form');
    
    if (propertyFilters) {
        // Advanced filter toggle
        const advancedToggle = document.querySelector('.advanced-toggle');
        const advancedOptions = document.querySelector('.advanced-options');
        
        if (advancedToggle && advancedOptions) {
            advancedOptions.style.display = 'none';
            
            advancedToggle.addEventListener('click', function() {
                this.classList.toggle('active');
                
                if (advancedOptions.style.display === 'none') {
                    advancedOptions.style.display = 'block';
                } else {
                    advancedOptions.style.display = 'none';
                }
            });
        }
        
        // Handle form submission for property filters
        propertyFilters.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // In a real implementation, this would filter properties based on criteria
            // For now, we'll just show an alert
            alert('Property search feature will be implemented with backend integration.');
            
            // Scroll to properties section
            document.querySelector('.properties-grid').scrollIntoView({
                behavior: 'smooth'
            });
        });
    }
}

/**
 * Gallery Lightbox for property images
 */
function initGalleryLightbox() {
    const lightboxTriggers = document.querySelectorAll('.lightbox-trigger');
    const lightbox = document.querySelector('.lightbox-container');
    
    if (lightboxTriggers.length && lightbox) {
        const lightboxImage = document.getElementById('lightbox-image');
        const lightboxTitle = document.getElementById('lightbox-title');
        const lightboxDescription = document.getElementById('lightbox-description');
        const closeBtn = document.querySelector('.lightbox-close');
        const nextBtn = document.querySelector('.lightbox-next');
        const prevBtn = document.querySelector('.lightbox-prev');
        
        let currentIndex = 0;
        const galleryItems = document.querySelectorAll('.gallery-item');
        
        // Open lightbox when a gallery item is clicked
        lightboxTriggers.forEach((trigger, index) => {
            trigger.addEventListener('click', function(e) {
                e.preventDefault();
                currentIndex = index;
                
                const imgSrc = this.getAttribute('href');
                const imgTitle = this.closest('.gallery-item').querySelector('h3').textContent;
                const imgDesc = this.closest('.gallery-item').querySelector('p').textContent;
                
                lightboxImage.src = imgSrc;
                lightboxTitle.textContent = imgTitle;
                lightboxDescription.textContent = imgDesc;
                
                lightbox.style.display = 'flex';
                document.body.style.overflow = 'hidden'; // Prevent scrolling
            });
        });
        
        // Close lightbox
        closeBtn.addEventListener('click', function() {
            lightbox.style.display = 'none';
            document.body.style.overflow = 'auto'; // Re-enable scrolling
        });
        
        // Navigate to next image
        nextBtn.addEventListener('click', function() {
            currentIndex = (currentIndex + 1) % galleryItems.length;
            updateLightboxContent();
        });
        
        // Navigate to previous image
        prevBtn.addEventListener('click', function() {
            currentIndex = (currentIndex - 1 + galleryItems.length) % galleryItems.length;
            updateLightboxContent();
        });
        
        // Update lightbox content based on current index
        function updateLightboxContent() {
            const currentItem = galleryItems[currentIndex];
            const imgSrc = currentItem.querySelector('.lightbox-trigger').getAttribute('href');
            const imgTitle = currentItem.querySelector('h3').textContent;
            const imgDesc = currentItem.querySelector('p').textContent;
            
            lightboxImage.src = imgSrc;
            lightboxTitle.textContent = imgTitle;
            lightboxDescription.textContent = imgDesc;
        }
        
        // Close lightbox when clicking outside the image
        lightbox.addEventListener('click', function(e) {
            if (e.target === lightbox) {
                lightbox.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });
        
        // Keyboard navigation
        document.addEventListener('keydown', function(e) {
            if (lightbox.style.display === 'flex') {
                if (e.key === 'Escape') {
                    lightbox.style.display = 'none';
                    document.body.style.overflow = 'auto';
                } else if (e.key === 'ArrowRight') {
                    currentIndex = (currentIndex + 1) % galleryItems.length;
                    updateLightboxContent();
                } else if (e.key === 'ArrowLeft') {
                    currentIndex = (currentIndex - 1 + galleryItems.length) % galleryItems.length;
                    updateLightboxContent();
                }
            }
        });
    }
}

/**
 * Filter functionality for the gallery page
 */
function initGalleryFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    if (filterButtons.length) {
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Remove active class from all buttons
                filterButtons.forEach(btn => btn.classList.remove('active'));
                
                // Add active class to clicked button
                this.classList.add('active');
                
                // Get filter value
                const filterValue = this.getAttribute('data-filter');
                
                // Filter gallery items
                galleryItems.forEach(item => {
                    if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                        item.style.display = 'block';
                    } else {
                        item.style.display = 'none';
                    }
                });
            });
        });
    }
    
    // "Load More" button functionality for gallery
    const loadMoreBtn = document.querySelector('.gallery-load-more .btn');
    
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', function() {
            // In a real implementation, this would load more gallery items via AJAX
            // For now, we'll just show an alert
            alert('In a live implementation, this would load more properties from the server.');
        });
    }
}

/**
 * Contact Form Validation
 */
function initContactForm() {
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form inputs
            const nameInput = document.getElementById('name');
            const emailInput = document.getElementById('email');
            const messageInput = document.getElementById('message');
            
            // Simple validation
            let isValid = true;
            
            if (!nameInput.value.trim()) {
                markInvalid(nameInput, 'Please enter your name');
                isValid = false;
            } else {
                markValid(nameInput);
            }
            
            if (!emailInput.value.trim()) {
                markInvalid(emailInput, 'Please enter your email');
                isValid = false;
            } else if (!isValidEmail(emailInput.value)) {
                markInvalid(emailInput, 'Please enter a valid email address');
                isValid = false;
            } else {
                markValid(emailInput);
            }
            
            if (!messageInput.value.trim()) {
                markInvalid(messageInput, 'Please enter your message');
                isValid = false;
            } else {
                markValid(messageInput);
            }
            
            if (isValid) {
                // In a real implementation, this would submit the form to a server
                // For now, we'll just show a success message
                showFormSuccess();
            }
        });
        
        // Helper functions for form validation
        function markInvalid(input, message) {
            input.classList.add('invalid');
            const errorElement = document.createElement('div');
            errorElement.className = 'error-message';
            errorElement.textContent = message;
            
            // Remove any existing error messages
            const existingError = input.parentNode.querySelector('.error-message');
            if (existingError) {
                existingError.remove();
            }
            
            input.parentNode.appendChild(errorElement);
        }
        
        function markValid(input) {
            input.classList.remove('invalid');
            const existingError = input.parentNode.querySelector('.error-message');
            if (existingError) {
                existingError.remove();
            }
        }
        
        function isValidEmail(email) {
            const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(String(email).toLowerCase());
        }
        
        function showFormSuccess() {
            contactForm.innerHTML = '<div class="success-message">' +
                '<i class="fas fa-check-circle"></i>' +
                '<h3>Thank You!</h3>' +
                '<p>Your message has been sent successfully. We\'ll get back to you shortly.</p>' +
                '</div>';
        }
    }
    
    // Apply similar validation to other forms
    const testimonialForm = document.querySelector('.testimonial-form');
    const subscribeForm = document.querySelector('.subscribe-form');
    
    if (testimonialForm) {
        testimonialForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Thank you for your testimonial! After review, it will be published on our website.');
        });
    }
    
    if (subscribeForm) {
        subscribeForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const emailInput = this.querySelector('input[type="email"]');
            
            if (!emailInput.value.trim() || !isValidEmail(emailInput.value)) {
                alert('Please enter a valid email address.');
            } else {
                this.innerHTML = '<p class="success-message">Thank you for subscribing to our newsletter!</p>';
            }
        });
        
        function isValidEmail(email) {
            const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(String(email).toLowerCase());
        }
    }
}

/**
 * Image Sliders for featured properties and testimonials
 */
function initSliders() {
    // Featured properties slider
    const featuredSlider = document.querySelector('.featured-gallery-slider');
    
    if (featuredSlider) {
        const slides = featuredSlider.querySelectorAll('.featured-slide');
        const dots = featuredSlider.querySelectorAll('.dot');
        const prevBtn = featuredSlider.querySelector('.prev-btn');
        const nextBtn = featuredSlider.querySelector('.next-btn');
        
        let currentSlide = 0;
        
        // Hide all slides except the first one
        for (let i = 1; i < slides.length; i++) {
            slides[i].style.display = 'none';
        }
        
        // Next button click
        if (nextBtn) {
            nextBtn.addEventListener('click', function() {
                slides[currentSlide].style.display = 'none';
                dots[currentSlide].classList.remove('active');
                
                currentSlide = (currentSlide + 1) % slides.length;
                
                slides[currentSlide].style.display = 'block';
                dots[currentSlide].classList.add('active');
            });
        }
        
        // Previous button click
        if (prevBtn) {
            prevBtn.addEventListener('click', function() {
                slides[currentSlide].style.display = 'none';
                dots[currentSlide].classList.remove('active');
                
                currentSlide = (currentSlide - 1 + slides.length) % slides.length;
                
                slides[currentSlide].style.display = 'block';
                dots[currentSlide].classList.add('active');
            });
        }
        
        // Dot navigation
        dots.forEach((dot, index) => {
            dot.addEventListener('click', function() {
                slides[currentSlide].style.display = 'none';
                dots[currentSlide].classList.remove('active');
                
                currentSlide = index;
                
                slides[currentSlide].style.display = 'block';
                dots[currentSlide].classList.add('active');
            });
        });
    }
}

/**
 * Scroll animations for page elements
 */
function initScrollAnimations() {
    // Add fade-in animation to elements when they come into view
    const animateElements = document.querySelectorAll('.property-card, .service-card, .team-member, .blog-post, .testimonial-card');
    
    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-fade-in');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        
        animateElements.forEach(element => {
            observer.observe(element);
        });
    } else {
        // Fallback for browsers that don't support IntersectionObserver
        animateElements.forEach(element => {
            element.classList.add('animate-fade-in');
        });
    }
    
    // Smooth scroll for anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]:not([href="#"])');
    
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
}