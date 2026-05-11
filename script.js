document.addEventListener('DOMContentLoaded', () => {
    // Navbar Scroll Effect
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Smooth Scroll for Nav Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const target = document.querySelector(targetId);
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Contact Form Handling
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const submitBtn = contactForm.querySelector('button');
            const originalText = submitBtn.innerText;
            
            submitBtn.innerText = 'Envoi en cours...';
            submitBtn.disabled = true;

            // Simulate form submission
            setTimeout(() => {
                alert('Merci ! Votre message a été envoyé avec succès. Nous vous recontacterons sous peu.');
                contactForm.reset();
                submitBtn.innerText = originalText;
                submitBtn.disabled = false;
            }, 1500);
        });
    }

    // Modal Logic Refactored
    window.openModal = (modalId) => {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    };

    window.closeModal = () => {
        document.querySelectorAll('.modal-overlay').forEach(modal => {
            modal.classList.remove('active');
        });
        document.body.style.overflow = 'auto';
    };

    // Event Listeners for About Modal
    const heroAboutBtn = document.querySelector('.hero-btns .btn-secondary');
    const navAboutTrigger = document.getElementById('nav-about-trigger');
    const aboutTrigger = document.getElementById('about-trigger');
    
    if (heroAboutBtn) heroAboutBtn.addEventListener('click', (e) => { e.preventDefault(); openModal('about-modal'); });
    if (navAboutTrigger) navAboutTrigger.addEventListener('click', (e) => { e.preventDefault(); openModal('about-modal'); });
    if (aboutTrigger) aboutTrigger.addEventListener('click', () => openModal('about-modal'));

    // Event Listeners for Metal Modal
    const metalTrigger = document.getElementById('metal-trigger');
    if (metalTrigger) metalTrigger.addEventListener('click', () => openModal('metal-modal'));

    // Event Listeners for Civil Modal
    const civilTrigger = document.getElementById('civil-trigger');
    if (civilTrigger) civilTrigger.addEventListener('click', () => openModal('civil-modal'));

    // Event Listeners for Maintenance Modal
    const maintenanceTrigger = document.getElementById('maintenance-trigger');
    if (maintenanceTrigger) maintenanceTrigger.addEventListener('click', () => openModal('maintenance-modal'));

    // Event Listeners for Piscine Olympique Modal
    const piscineTrigger = document.getElementById('piscine-trigger');
    if (piscineTrigger) piscineTrigger.addEventListener('click', () => openModal('piscine-modal'));

    // Event Listeners for Commercial Modal
    const commercialTrigger = document.getElementById('commercial-trigger');
    if (commercialTrigger) commercialTrigger.addEventListener('click', () => openModal('commercial-modal'));

    // Event Listener for Access Modal
    const navAccessTrigger = document.getElementById('nav-access-trigger');
    if (navAccessTrigger) navAccessTrigger.addEventListener('click', (e) => {
        e.preventDefault();
        openModal('access-modal');
    });

    // Event Listener for Conseils Technique Modal
    const conseilsTrigger = document.getElementById('conseils-trigger');
    if (conseilsTrigger) conseilsTrigger.addEventListener('click', () => openModal('conseils-modal'));

    // Global Close Logic
    document.querySelectorAll('.modal-close').forEach(btn => {
        btn.addEventListener('click', closeModal);
    });

    window.addEventListener('click', (e) => {
        if (e.target.classList.contains('modal-overlay')) {
            closeModal();
        }
    });

    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeModal();
        }
    });

    // Scroll Reveal Animation (Simple version)
    const revealOnScroll = () => {
        const elements = document.querySelectorAll('.service-card, .why-item, .project-card, .news-card');
        elements.forEach(el => {
            const rect = el.getBoundingClientRect();
            const isVisible = rect.top < window.innerHeight - 100;
            if (isVisible) {
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            }
        });
    };

    // Initialize animation styles
    const animatedElements = document.querySelectorAll('.service-card, .why-item, .project-card, .news-card');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease-out';
    });

    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Run once on load

    // ===== SAFEX SLIDESHOW MODAL =====
    const safexImages = [
        'safex_detail_1.jpg',
        'safex_detail_2.jpg',
        'safex_detail_3.jpg',
        'safex_detail_4.jpg',
        'safex_interior.jpg'
    ];

    let safexCurrentSlide = 0;
    let safexTimer = null;

    const safexBg = document.getElementById('safex-slideshow-bg');
    const safexIndicatorsEl = document.getElementById('safex-indicators');
    const safexPrevBtn = document.getElementById('safex-prev');
    const safexNextBtn = document.getElementById('safex-next');

    function showSafexSlide(index) {
        safexCurrentSlide = ((index % safexImages.length) + safexImages.length) % safexImages.length;
        if (safexBg) {
            safexBg.style.backgroundImage = "url('" + safexImages[safexCurrentSlide] + "')";
        }
        if (safexIndicatorsEl) {
            safexIndicatorsEl.querySelectorAll('.slide-dot').forEach(function(dot, i) {
                dot.classList.toggle('active', i === safexCurrentSlide);
            });
        }
    }

    function resetSafexTimer() {
        if (safexTimer) clearInterval(safexTimer);
        safexTimer = setInterval(function() {
            showSafexSlide(safexCurrentSlide + 1);
        }, 4000);
    }

    function initSafexSlideshow() {
        if (!safexBg || !safexIndicatorsEl) return;
        safexIndicatorsEl.innerHTML = '';
        safexImages.forEach(function(_, i) {
            var dot = document.createElement('button');
            dot.classList.add('slide-dot');
            if (i === 0) dot.classList.add('active');
            dot.addEventListener('click', function() {
                showSafexSlide(i);
                resetSafexTimer();
            });
            safexIndicatorsEl.appendChild(dot);
        });
        showSafexSlide(0);
        resetSafexTimer();
    }

    if (safexPrevBtn) safexPrevBtn.addEventListener('click', function() {
        showSafexSlide(safexCurrentSlide - 1);
        resetSafexTimer();
    });
    if (safexNextBtn) safexNextBtn.addEventListener('click', function() {
        showSafexSlide(safexCurrentSlide + 1);
        resetSafexTimer();
    });

    // SAFEX trigger
    var safexTrigger = document.getElementById('safex-trigger');
    if (safexTrigger) {
        safexTrigger.addEventListener('click', function() {
            openModal('safex-modal');
            initSafexSlideshow();
        });
    }

    // Stop timer on close
    document.querySelectorAll('#safex-modal .modal-close').forEach(function(btn) {
        btn.addEventListener('click', function() {
            if (safexTimer) { clearInterval(safexTimer); safexTimer = null; }
        });
    });
    window.addEventListener('click', function(e) {
        if (e.target === document.getElementById('safex-modal')) {
            if (safexTimer) { clearInterval(safexTimer); safexTimer = null; }
        }
    });

    // ===== KHARROUBA SLIDESHOW MODAL =====
    const kharroubaImages = [
        'kharrouba_1.jpg',
        'kharrouba_2.jpg',
        'kharrouba_3.jpg',
        'kharrouba_4.jpg'
    ];

    let kharroubaCurrentSlide = 0;
    let kharroubaTimer = null;

    const kharroubaBg = document.getElementById('kharrouba-slideshow-bg');
    const kharroubaIndicatorsEl = document.getElementById('kharrouba-indicators');
    const kharroubaPrevBtn = document.getElementById('kharrouba-prev');
    const kharroubaNextBtn = document.getElementById('kharrouba-next');

    function showKharroubaSlide(index) {
        kharroubaCurrentSlide = ((index % kharroubaImages.length) + kharroubaImages.length) % kharroubaImages.length;
        if (kharroubaBg) {
            kharroubaBg.style.backgroundImage = "url('" + kharroubaImages[kharroubaCurrentSlide] + "')";
        }
        if (kharroubaIndicatorsEl) {
            kharroubaIndicatorsEl.querySelectorAll('.slide-dot').forEach(function(dot, i) {
                dot.classList.toggle('active', i === kharroubaCurrentSlide);
            });
        }
    }

    function resetKharroubaTimer() {
        if (kharroubaTimer) clearInterval(kharroubaTimer);
        kharroubaTimer = setInterval(function() {
            showKharroubaSlide(kharroubaCurrentSlide + 1);
        }, 4000);
    }

    function initKharroubaSlideshow() {
        if (!kharroubaBg || !kharroubaIndicatorsEl) return;
        kharroubaIndicatorsEl.innerHTML = '';
        kharroubaImages.forEach(function(_, i) {
            var dot = document.createElement('button');
            dot.classList.add('slide-dot');
            if (i === 0) dot.classList.add('active');
            dot.addEventListener('click', function() {
                showKharroubaSlide(i);
                resetKharroubaTimer();
            });
            kharroubaIndicatorsEl.appendChild(dot);
        });
        showKharroubaSlide(0);
        resetKharroubaTimer();
    }

    if (kharroubaPrevBtn) kharroubaPrevBtn.addEventListener('click', function() {
        showKharroubaSlide(kharroubaCurrentSlide - 1);
        resetKharroubaTimer();
    });
    if (kharroubaNextBtn) kharroubaNextBtn.addEventListener('click', function() {
        showKharroubaSlide(kharroubaCurrentSlide + 1);
        resetKharroubaTimer();
    });

    // Kharrouba trigger
    var kharroubaTrigger = document.getElementById('kharrouba-trigger');
    if (kharroubaTrigger) {
        kharroubaTrigger.addEventListener('click', function() {
            openModal('kharrouba-modal');
            initKharroubaSlideshow();
        });
    }

    // Stop timer on close
    document.querySelectorAll('#kharrouba-modal .modal-close').forEach(function(btn) {
        btn.addEventListener('click', function() {
            if (kharroubaTimer) { clearInterval(kharroubaTimer); kharroubaTimer = null; }
        });
    });
    window.addEventListener('click', function(e) {
        if (e.target === document.getElementById('kharrouba-modal')) {
            if (kharroubaTimer) { clearInterval(kharroubaTimer); kharroubaTimer = null; }
        }
    });

    // ===== INNOVATION SLIDESHOW MODAL =====
    const innovationImages = [
        'innovation_1.jpg',
        'innovation_2.jpg',
        'innovation_3.jpg',
        'innovation_4.jpg'
    ];

    let innovationCurrentSlide = 0;
    let innovationTimer = null;

    const innovationBg = document.getElementById('innovation-slideshow-bg');
    const innovationIndicatorsEl = document.getElementById('innovation-indicators');
    const innovationPrevBtn = document.getElementById('innovation-prev');
    const innovationNextBtn = document.getElementById('innovation-next');

    function showInnovationSlide(index) {
        innovationCurrentSlide = ((index % innovationImages.length) + innovationImages.length) % innovationImages.length;
        if (innovationBg) {
            innovationBg.style.backgroundImage = "url('" + innovationImages[innovationCurrentSlide] + "')";
        }
        if (innovationIndicatorsEl) {
            innovationIndicatorsEl.querySelectorAll('.slide-dot').forEach(function(dot, i) {
                dot.classList.toggle('active', i === innovationCurrentSlide);
            });
        }
    }

    function resetInnovationTimer() {
        if (innovationTimer) clearInterval(innovationTimer);
        innovationTimer = setInterval(function() {
            showInnovationSlide(innovationCurrentSlide + 1);
        }, 4000);
    }

    window.initInnovationSlideshow = function() {
        if (!innovationBg || !innovationIndicatorsEl) return;
        innovationIndicatorsEl.innerHTML = '';
        innovationImages.forEach(function(_, i) {
            var dot = document.createElement('button');
            dot.classList.add('slide-dot');
            if (i === 0) dot.classList.add('active');
            dot.addEventListener('click', function() {
                showInnovationSlide(i);
                resetInnovationTimer();
            });
            innovationIndicatorsEl.appendChild(dot);
        });
        showInnovationSlide(0);
        resetInnovationTimer();
    }

    if (innovationPrevBtn) innovationPrevBtn.addEventListener('click', function() {
        showInnovationSlide(innovationCurrentSlide - 1);
        resetInnovationTimer();
    });
    if (innovationNextBtn) innovationNextBtn.addEventListener('click', function() {
        showInnovationSlide(innovationCurrentSlide + 1);
        resetInnovationTimer();
    });

    // Innovation trigger
    var innovationTrigger = document.getElementById('innovation-trigger');
    if (innovationTrigger) {
        innovationTrigger.addEventListener('click', function() {
            openModal('innovation-modal');
            initInnovationSlideshow();
        });
    }

    // Stop innovation timer on close
    document.querySelectorAll('#innovation-modal .modal-close').forEach(function(btn) {
        btn.addEventListener('click', function() {
            if (innovationTimer) { clearInterval(innovationTimer); innovationTimer = null; }
        });
    });
    window.addEventListener('click', function(e) {
        if (e.target === document.getElementById('innovation-modal')) {
            if (innovationTimer) { clearInterval(innovationTimer); innovationTimer = null; }
        }
    });
});
