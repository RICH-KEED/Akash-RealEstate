/**
 * Luxury Estates - Main JavaScript File
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize mobile navigation
    initMobileNav();
    
    // Initialize property filtering
    initPropertyFilter();
    
    // Initialize gallery lightbox
    initLightbox();
    
    // Initialize featured property slider
    initFeaturedSlider();
    
    // Initialize search form advanced options
    initAdvancedSearch();
    
    // Animate elements on scroll
    initScrollAnimations();
    
    // Initialize property image gallery
    initPropertyGallery();
});

/**
 * Mobile navigation functionality
 */
function initMobileNav() {
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const nav = document.querySelector('nav ul');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            nav.classList.toggle('show');
            menuToggle.classList.toggle('active');
        });
    }
}

/**
 * Property filtering functionality
 */
function initPropertyFilter() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const propertyItems = document.querySelectorAll('.property-card');
    
    if (filterButtons.length && propertyItems.length) {
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Remove active class from all buttons
                filterButtons.forEach(btn => btn.classList.remove('active'));
                
                // Add active class to clicked button
                this.classList.add('active');
                
                const filter = this.getAttribute('data-filter');
                
                propertyItems.forEach(item => {
                    if (filter === 'all') {
                        item.style.display = 'block';
                    } else if (item.classList.contains(filter)) {
                        item.style.display = 'block';
                    } else {
                        item.style.display = 'none';
                    }
                });
            });
        });
    }
}

/**
 * Gallery lightbox functionality
 */
function initLightbox() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    const lightboxContainer = document.querySelector('.lightbox-container');
    
    if (galleryItems.length && lightboxContainer) {
        const lightboxImage = document.getElementById('lightbox-image');
        const lightboxCaption = document.querySelector('.lightbox-caption');
        const closeButton = document.querySelector('.lightbox-close');
        const prevButton = document.querySelector('.lightbox-prev');
        const nextButton = document.querySelector('.lightbox-next');
        
        let currentIndex = 0;
        
        // Open lightbox
        galleryItems.forEach((item, index) => {
            item.addEventListener('click', function() {
                currentIndex = index;
                const imageSrc = this.querySelector('img').getAttribute('src');
                const caption = this.querySelector('.overlay-content h3').textContent;
                
                lightboxImage.setAttribute('src', imageSrc);
                lightboxCaption.textContent = caption;
                lightboxContainer.style.display = 'flex';
                document.body.style.overflow = 'hidden';
            });
        });
        
        // Close lightbox
        closeButton.addEventListener('click', function() {
            lightboxContainer.style.display = 'none';
            document.body.style.overflow = 'auto';
        });
        
        // Navigate previous
        prevButton.addEventListener('click', function() {
            currentIndex = (currentIndex - 1 + galleryItems.length) % galleryItems.length;
            updateLightboxContent();
        });
        
        // Navigate next
        nextButton.addEventListener('click', function() {
            currentIndex = (currentIndex + 1) % galleryItems.length;
            updateLightboxContent();
        });
        
        // Update lightbox content
        function updateLightboxContent() {
            const item = galleryItems[currentIndex];
            const imageSrc = item.querySelector('img').getAttribute('src');
            const caption = item.querySelector('.overlay-content h3').textContent;
            
            lightboxImage.setAttribute('src', imageSrc);
            lightboxCaption.textContent = caption;
        }
        
        // Close lightbox on overlay click
        lightboxContainer.addEventListener('click', function(e) {
            if (e.target === lightboxContainer) {
                lightboxContainer.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });
        
        // Keyboard navigation
        document.addEventListener('keydown', function(e) {
            if (lightboxContainer.style.display === 'flex') {
                if (e.key === 'Escape') {
                    lightboxContainer.style.display = 'none';
                    document.body.style.overflow = 'auto';
                } else if (e.key === 'ArrowLeft') {
                    currentIndex = (currentIndex - 1 + galleryItems.length) % galleryItems.length;
                    updateLightboxContent();
                } else if (e.key === 'ArrowRight') {
                    currentIndex = (currentIndex + 1) % galleryItems.length;
                    updateLightboxContent();
                }
            }
        });
    }
}

/**
 * Featured property slider functionality
 */
function initFeaturedSlider() {
    const slider = document.querySelector('.featured-gallery-slider');
    
    if (slider) {
        const slides = slider.querySelectorAll('.featured-slide');
        const prevBtn = slider.querySelector('.prev-btn');
        const nextBtn = slider.querySelector('.next-btn');
        const dots = slider.querySelectorAll('.dot');
        
        let currentSlide = 0;
        
        // Hide all slides except the first one
        slides.forEach((slide, index) => {
            if (index !== 0) {
                slide.style.display = 'none';
            }
        });
        
        // Show a specific slide
        function showSlide(index) {
            slides.forEach(slide => slide.style.display = 'none');
            slides[index].style.display = 'block';
            
            // Update active dot
            dots.forEach(dot => dot.classList.remove('active'));
            dots[index].classList.add('active');
            
            currentSlide = index;
        }
        
        // Previous slide
        prevBtn.addEventListener('click', function() {
            currentSlide = (currentSlide - 1 + slides.length) % slides.length;
            showSlide(currentSlide);
        });
        
        // Next slide
        nextBtn.addEventListener('click', function() {
            currentSlide = (currentSlide + 1) % slides.length;
            showSlide(currentSlide);
        });
        
        // Dot navigation
        dots.forEach((dot, index) => {
            dot.addEventListener('click', function() {
                showSlide(index);
            });
        });
        
        // Auto slide every 5 seconds
        setInterval(function() {
            currentSlide = (currentSlide + 1) % slides.length;
            showSlide(currentSlide);
        }, 5000);
    }
}

/**
 * Advanced search options functionality
 */
function initAdvancedSearch() {
    const advancedToggle = document.querySelector('.advanced-toggle');
    const advancedOptions = document.querySelector('.advanced-options');
    
    if (advancedToggle && advancedOptions) {
        // Hide advanced options by default
        advancedOptions.style.display = 'none';
        
        // Toggle advanced options
        advancedToggle.addEventListener('click', function() {
            advancedToggle.classList.toggle('active');
            
            if (advancedOptions.style.display === 'none') {
                advancedOptions.style.display = 'block';
            } else {
                advancedOptions.style.display = 'none';
            }
        });
    }
}

/**
 * Scroll animations
 */
function initScrollAnimations() {
    const elements = document.querySelectorAll('.animate-fade-in');
    
    if (elements.length) {
        // Check if element is in viewport
        function isInViewport(el) {
            const rect = el.getBoundingClientRect();
            return (
                rect.top >= 0 &&
                rect.left >= 0 &&
                rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
                rect.right <= (window.innerWidth || document.documentElement.clientWidth)
            );
        }
        
        // Handle scroll
        function handleScroll() {
            elements.forEach(el => {
                if (isInViewport(el)) {
                    el.style.visibility = 'visible';
                    el.style.animation = 'fadeIn 0.8s ease forwards';
                }
            });
        }
        
        // Set elements initially hidden
        elements.forEach(el => {
            el.style.visibility = 'hidden';
        });
        
        // Check on scroll
        window.addEventListener('scroll', handleScroll);
        
        // Check on page load
        handleScroll();
    }
}

/**
 * Property details gallery functionality
 */
function initPropertyGallery() {
    const mainImage = document.querySelector('.main-image img');
    const thumbnails = document.querySelectorAll('.thumbnail');
    
    if (mainImage && thumbnails.length) {
        thumbnails.forEach(thumbnail => {
            thumbnail.addEventListener('click', function() {
                const imageSrc = this.getAttribute('src');
                mainImage.setAttribute('src', imageSrc);
                
                // Update active thumbnail
                thumbnails.forEach(thumb => thumb.classList.remove('active'));
                this.classList.add('active');
            });
        });
    }
}

/**
 * Initialize gallery filtering
 */
function initGalleryFilter() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    if (filterButtons.length && galleryItems.length) {
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Remove active class from all buttons
                filterButtons.forEach(btn => btn.classList.remove('active'));
                
                // Add active class to clicked button
                this.classList.add('active');
                
                const filter = this.getAttribute('data-filter');
                
                galleryItems.forEach(item => {
                    if (filter === 'all') {
                        item.style.display = 'block';
                    } else if (item.classList.contains(filter)) {
                        item.style.display = 'block';
                    } else {
                        item.style.display = 'none';
                    }
                });
            });
        });
    }
}

/**
 * Form validation
 */
function validateForm(formId) {
    const form = document.getElementById(formId);
    
    if (form) {
        form.addEventListener('submit', function(e) {
            let isValid = true;
            const requiredFields = form.querySelectorAll('[required]');
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.classList.add('error');
                } else {
                    field.classList.remove('error');
                }
            });
            
            // Email validation
            const emailField = form.querySelector('input[type="email"]');
            if (emailField && emailField.value.trim()) {
                const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailPattern.test(emailField.value)) {
                    isValid = false;
                    emailField.classList.add('error');
                }
            }
            
            if (!isValid) {
                e.preventDefault();
                alert('Please fill in all required fields correctly.');
            }
        });
    }
}

/**
 * Load more functionality for gallery
 */
function initLoadMore() {
    const loadMoreBtn = document.querySelector('.load-more-btn');
    const hiddenItems = document.querySelectorAll('.gallery-item.hidden');
    
    if (loadMoreBtn && hiddenItems.length) {
        let visibleItems = 6; // Initial visible items
        
        loadMoreBtn.addEventListener('click', function() {
            const itemsToShow = Array.from(hiddenItems).slice(0, 3);
            
            if (itemsToShow.length > 0) {
                itemsToShow.forEach(item => {
                    item.classList.remove('hidden');
                    visibleItems++;
                });
                
                if (visibleItems >= hiddenItems.length + 6) {
                    loadMoreBtn.style.display = 'none';
                }
            } else {
                loadMoreBtn.style.display = 'none';
            }
        });
    }
}

/**
 * Sticky header functionality
 */
function initStickyHeader() {
    const header = document.querySelector('header');
    const headerOffset = header.offsetTop;
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > headerOffset) {
            header.classList.add('sticky');
        } else {
            header.classList.remove('sticky');
        }
    });
}

// Call the additional initializations
document.addEventListener('DOMContentLoaded', function() {
    initGalleryFilter();
    initLoadMore();
    initStickyHeader();
    
    // Validate forms
    validateForm('contact-form');
    validateForm('property-inquiry-form');
    validateForm('newsletter-form');
});