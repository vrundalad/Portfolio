document.addEventListener('DOMContentLoaded', () => {
    // 1. Smooth Scroll for Navigation Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if(targetId === '#') return;
            const targetElement = document.querySelector(targetId);
            if(targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // 2. Magnetic Button Effect
    const magneticBtns = document.querySelectorAll('.btn-magnetic');
    
    magneticBtns.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = (e.clientX - rect.left) - rect.width / 2;
            const y = (e.clientY - rect.top) - rect.height / 2;
            
            // Adjust the multiplier for stronger/weaker effect
            btn.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
        });
        
        btn.addEventListener('mouseleave', () => {
            btn.style.transform = 'translate(0px, 0px)';
        });
    });

    // 3. Scroll Reveal Animation using Intersection Observer
    const revealElements = document.querySelectorAll('.reveal');
    
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if(entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Counter animation
                const counters = entry.target.querySelectorAll('.counter');
                counters.forEach(counter => {
                    if (!counter.classList.contains('counted')) {
                        counter.classList.add('counted');
                        const target = +counter.getAttribute('data-target');
                        let count = 0;
                        const duration = 1500; // ms
                        const increment = target / (duration / 16); // ~60fps
                        
                        const updateCount = () => {
                            count += increment;
                            if (count < target) {
                                counter.innerText = Math.ceil(count);
                                requestAnimationFrame(updateCount);
                            } else {
                                counter.innerText = target;
                            }
                        };
                        updateCount();
                    }
                });
            }
        });
    }, {
        root: null,
        threshold: 0.15, // Trigger when 15% of the element is visible
        rootMargin: "0px 0px -50px 0px"
    });

    revealElements.forEach(el => revealObserver.observe(el));

    // 4. Glow Hover Effect on Bento Cards (Mouse tracking for radial gradient)
    const cards = document.querySelectorAll('.bento-card');
    
    cards.forEach(card => {
        const glow = card.querySelector('.glow-effect');
        if(!glow) return;

        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            // Center the glow effect on the cursor
            glow.style.left = `${x - 100}px`;
            glow.style.top = `${y - 100}px`;
        });
    });

    // 5. Sticky Navbar visual change on scroll
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
            navbar.style.background = '';
            navbar.style.borderBottom = '';
        } else {
            navbar.classList.remove('scrolled');
            navbar.style.background = '';
            navbar.style.borderBottom = '';
        }
    });

    // 6. Theme Toggle Logic
    const themeToggle = document.getElementById('theme-toggle');
    const rootHtml = document.documentElement;
    
    const savedTheme = localStorage.getItem('theme') || 'dark';
    rootHtml.setAttribute('data-theme', savedTheme);
    
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const currentTheme = rootHtml.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            rootHtml.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
        });
    }

    // 7. Scrollspy Logic
    const sections = document.querySelectorAll('section, header');
    const navLinks = document.querySelectorAll('.nav-link');
    
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === current) {
                link.classList.add('active');
            }
        });
    });

    // 8. 3D Tilt Effect for Hero Elements
    const tiltCards = document.querySelectorAll('.tilt-card');
    
    tiltCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = ((y - centerY) / centerY) * -10; // Max 10 deg
            const rotateY = ((x - centerX) / centerX) * 10;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
        });
    });

    // 9. Timeline Spine Progress
    const timelineSpine = document.getElementById('spine-progress');
    const timelineSection = document.getElementById('experience');
    
    if (timelineSpine && timelineSection) {
        window.addEventListener('scroll', () => {
            const rect = timelineSection.getBoundingClientRect();
            const windowCenter = window.innerHeight / 2;
            const scrollDistance = windowCenter - rect.top;
            const totalDistance = rect.height;
            
            if (scrollDistance > 0) {
                let percentage = (scrollDistance / totalDistance) * 100;
                percentage = Math.max(0, Math.min(100, percentage));
                timelineSpine.style.height = `${percentage}%`;
            } else {
                timelineSpine.style.height = '0%';
            }
        });
    }

    // 10. Timeline Node Reveal
    const timelineNodes = document.querySelectorAll('.timeline-node');
    const nodeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { rootMargin: '0px 0px -100px 0px' });
    
    // 11. Case Study Accordion & Nav Sync
    const accordions = document.querySelectorAll('.blueprint-accordion');
    const blueprintNavLinks = document.querySelectorAll('.blueprint-nav a');

    accordions.forEach(acc => {
        const trigger = acc.querySelector('.accordion-trigger');
        if (trigger) {
            trigger.addEventListener('click', () => {
                // Toggle current
                acc.classList.toggle('expanded');
                
                // Optional: Close others (uncomment if you only want one open at a time)
                // accordions.forEach(other => {
                //     if (other !== acc) other.classList.remove('expanded');
                // });
            });
        }
    });

    // Smooth scroll for nav links and activate accordion
    blueprintNavLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const targetAcc = document.getElementById(targetId);
            
            if (targetAcc) {
                // Expand it if not expanded
                if (!targetAcc.classList.contains('expanded')) {
                    targetAcc.classList.add('expanded');
                }
                
                // Scroll into view
                const yOffset = -100; // offset for sticky header
                const y = targetAcc.getBoundingClientRect().top + window.pageYOffset + yOffset;
                window.scrollTo({top: y, behavior: 'smooth'});
            }
        });
    });

    // Update active nav link on scroll
    window.addEventListener('scroll', () => {
        let current = '';
        accordions.forEach(acc => {
            const rect = acc.getBoundingClientRect();
            // If the accordion is mostly in the top half of the screen
            if (rect.top <= (window.innerHeight / 2) && rect.bottom >= 100) {
                current = acc.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === current) {
                link.classList.add('active');
            }
        });
    });

    // 12. Design & Artifact Showcase (Filtering & Lightbox)
    const filterPills = document.querySelectorAll('.filter-pill');
    const artifactCards = document.querySelectorAll('.artifact-card');
    
    // Taxonomy Filtering
    filterPills.forEach(pill => {
        pill.addEventListener('click', () => {
            // Active State
            filterPills.forEach(p => p.classList.remove('active'));
            pill.classList.add('active');
            
            const filter = pill.getAttribute('data-filter');
            
            artifactCards.forEach(card => {
                // Ensure position is relative for grid layout when shown
                card.style.position = 'relative'; 
                if (filter === 'all' || card.getAttribute('data-category') === filter) {
                    card.classList.remove('hidden');
                    // Reset inline position when visible
                    setTimeout(() => { card.style.position = ''; }, 50);
                } else {
                    card.classList.add('hidden');
                }
            });
        });
    });

    // Lightbox Modal Engine
    const lightboxModal = document.getElementById('lightbox-modal');
    const lightboxImage = document.getElementById('lightbox-image');
    const lightboxClose = document.querySelector('.lightbox-close');
    const lightboxBackdrop = document.querySelector('.lightbox-backdrop');
    const lightboxPrev = document.querySelector('.lightbox-prev');
    const lightboxNext = document.querySelector('.lightbox-next');
    
    let currentImageIndex = 0;
    // We only want to cycle through visible images based on the active filter
    let visibleCards = [];

    const updateVisibleCards = () => {
        visibleCards = Array.from(artifactCards).filter(card => !card.classList.contains('hidden'));
    };

    const openLightbox = (index) => {
        updateVisibleCards();
        currentImageIndex = index;
        const imgUrl = visibleCards[currentImageIndex].getAttribute('data-image');
        lightboxImage.src = imgUrl;
        lightboxModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    };

    const closeLightbox = () => {
        lightboxModal.classList.remove('active');
        document.body.style.overflow = '';
    };

    const nextImage = () => {
        currentImageIndex = (currentImageIndex + 1) % visibleCards.length;
        lightboxImage.src = visibleCards[currentImageIndex].getAttribute('data-image');
    };

    const prevImage = () => {
        currentImageIndex = (currentImageIndex - 1 + visibleCards.length) % visibleCards.length;
        lightboxImage.src = visibleCards[currentImageIndex].getAttribute('data-image');
    };

    // Attach click events to all cards
    artifactCards.forEach(card => {
        const visual = card.querySelector('.artifact-visual');
        if (visual) {
            visual.addEventListener('click', () => {
                updateVisibleCards();
                const index = visibleCards.indexOf(card);
                if (index > -1) openLightbox(index);
            });
        }
    });

    if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
    if (lightboxBackdrop) lightboxBackdrop.addEventListener('click', closeLightbox);
    if (lightboxNext) lightboxNext.addEventListener('click', nextImage);
    if (lightboxPrev) lightboxPrev.addEventListener('click', prevImage);

    // Keyboard bindings for Modal
    document.addEventListener('keydown', (e) => {
        if (!lightboxModal || !lightboxModal.classList.contains('active')) return;
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowRight') nextImage();
        if (e.key === 'ArrowLeft') prevImage();
    });

    // 13. Contact Form & Inbound Communications
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        const emailInput = document.getElementById('email');
        const submitBtn = contactForm.querySelector('.btn-submit');
        const successState = document.getElementById('success-state');
        
        // Basic Regex Validation for Email
        const isValidEmail = (email) => {
            return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
        };

        emailInput.addEventListener('input', () => {
            if (emailInput.value && !isValidEmail(emailInput.value)) {
                emailInput.classList.add('invalid');
            } else {
                emailInput.classList.remove('invalid');
            }
        });

        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            if (!isValidEmail(emailInput.value)) {
                emailInput.classList.add('invalid');
                return;
            }

            // Simulate Network Request
            submitBtn.classList.add('loading');
            submitBtn.disabled = true;

            setTimeout(() => {
                submitBtn.classList.remove('loading');
                submitBtn.disabled = false;
                
                // Show Success State
                contactForm.style.opacity = '0';
                contactForm.style.pointerEvents = 'none';
                successState.classList.remove('hidden');
            }, 1500);
        });
    }

});

// Global Function for Copy to Clipboard (Vector 1)
window.copyEmail = function(element) {
    const email = element.getAttribute('data-email');
    navigator.clipboard.writeText(email).then(() => {
        const actionSpan = element.querySelector('.vector-action');
        const originalText = actionSpan.innerText;
        actionSpan.innerText = 'Copied!';
        actionSpan.style.color = 'var(--c-cyan)';
        
        setTimeout(() => {
            actionSpan.innerText = originalText;
            actionSpan.style.color = '';
        }, 2000);
    }).catch(err => {
        console.error('Failed to copy text: ', err);
    });
};

// Global Function to Reset Form State
window.resetForm = function() {
    const contactForm = document.getElementById('contact-form');
    const successState = document.getElementById('success-state');
    if (contactForm && successState) {
        contactForm.reset();
        successState.classList.add('hidden');
        contactForm.style.opacity = '1';
        contactForm.style.pointerEvents = 'auto';
    }
};

// Global Functions for Project Detail Modal
window.openProjectModal = function(projectId) {
    const modal = document.getElementById('project-detail-modal');
    const modalBody = document.getElementById('project-modal-body');
    const projectData = document.getElementById('project-data-' + projectId);
    
    if (modal && modalBody && projectData) {
        modalBody.innerHTML = projectData.innerHTML;
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
};

window.closeProjectModal = function() {
    const modal = document.getElementById('project-detail-modal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
};

// Close modal when clicking outside content
document.addEventListener('DOMContentLoaded', () => {
    const projectModal = document.getElementById('project-detail-modal');
    if (projectModal) {
        projectModal.addEventListener('click', (e) => {
            if (e.target === projectModal) {
                closeProjectModal();
            }
        });
    }
});
