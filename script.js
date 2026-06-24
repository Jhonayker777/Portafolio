/**
 * ============================================
 * PORTAFOLIO - JAVASCRIPT COMPLETO
 * ============================================
 */

document.addEventListener('DOMContentLoaded', function () {
    'use strict';

    // ==========================================
    // MENÚ HAMBURGUESA
    // ==========================================
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', function (e) {
            e.stopPropagation();
            navLinks.classList.toggle('active');
            const icon = this.querySelector('i');
            if (icon) {
                icon.classList.toggle('fa-bars');
                icon.classList.toggle('fa-times');
            }
        });

        document.querySelectorAll('.nav-links a').forEach(function (link) {
            link.addEventListener('click', function () {
                navLinks.classList.remove('active');
                const icon = menuToggle.querySelector('i');
                if (icon) {
                    icon.classList.add('fa-bars');
                    icon.classList.remove('fa-times');
                }
            });
        });

        document.addEventListener('click', function (e) {
            if (navLinks.classList.contains('active') &&
                !navLinks.contains(e.target) &&
                !menuToggle.contains(e.target)) {
                navLinks.classList.remove('active');
                const icon = menuToggle.querySelector('i');
                if (icon) {
                    icon.classList.add('fa-bars');
                    icon.classList.remove('fa-times');
                }
            }
        });
    }

    // ==========================================
    // NAVEGACIÓN ACTIVA
    // ==========================================
    const sections = document.querySelectorAll('section[id]');
    const navLinksAll = document.querySelectorAll('.nav-links a');

    function updateActiveLink() {
        const scrollY = window.scrollY + 120;
        sections.forEach(function (section) {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                navLinksAll.forEach(function (link) {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#' + sectionId) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', updateActiveLink);
    window.addEventListener('load', updateActiveLink);
    // ==========================================
    // ANIMACIÓN DE BARRAS DE HABILIDADES (CORREGIDA)
    // ==========================================

    let skillsAnimated = false;

    function animateSkillBars() {
        // Si ya se animaron, no hacer nada
        if (skillsAnimated) {
            console.log('⏭️ Barras ya animadas, omitiendo...');
            return;
        }

        console.log('🔄 Animando barras de habilidades...');

        const skillBars = document.querySelectorAll('.skill-progress');

        if (!skillBars.length) {
            console.warn('⚠️ No se encontraron barras de habilidades');
            return;
        }

        console.log('✅ Encontradas ' + skillBars.length + ' barras');

        let animatedCount = 0;

        skillBars.forEach(function (bar, index) {
            // 🔥 LEER EL PORCENTAJE DEL HTML (style="width: XX%")
            let targetWidth = bar.style.width;

            // Si no tiene width en el HTML, usar valores predeterminados según índice
            if (!targetWidth || targetWidth === '' || targetWidth === '0%') {
                // Asignar según el índice (para que no se vean iguales)
                const defaultPercentages = ['75%', '60%', '55%', '45%', '85%', '70%', '35%', '60%'];
                targetWidth = defaultPercentages[index] || '50%';
                bar.style.width = targetWidth;
                console.log(`📊 Barra ${index} sin width, asignando ${targetWidth}`);
            }

            console.log(`📊 Barra ${index}: ${bar.parentElement.parentElement.querySelector('.skill-name')?.textContent || index} → ${targetWidth}`);

            // Resetear a 0
            bar.style.width = '0%';
            bar.style.transition = 'none';

            // Animar con delay progresivo
            setTimeout(function () {
                bar.style.transition = 'width 1.2s cubic-bezier(0.4, 0, 0.2, 1)';
                bar.style.width = targetWidth;
                animatedCount++;

                if (animatedCount === skillBars.length) {
                    console.log('✅ Todas las barras animadas correctamente');
                    skillsAnimated = true;
                }
            }, 200 + (index * 100));
        });
    }

    // Función que verifica si la sección es visible
    function checkAndAnimateSkills() {
        if (skillsAnimated) return;

        const skillsSection = document.querySelector('#skills');
        if (!skillsSection) {
            console.warn('⚠️ No se encontró la sección #skills');
            return;
        }

        const rect = skillsSection.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        const isVisible = rect.top < windowHeight - 50 && rect.bottom > 50;

        if (isVisible) {
            console.log('✅ Sección visible, animando barras...');
            animateSkillBars();
        }
    }

    // ===== EVENTOS =====
    window.addEventListener('load', function () {
        console.log('📄 Página cargada');
        setTimeout(checkAndAnimateSkills, 500);
        setTimeout(checkAndAnimateSkills, 1500);
    });

    window.addEventListener('scroll', function () {
        checkAndAnimateSkills();
    });

    // ===== FUNCIONES PARA PRUEBAS =====
    window.animateSkillBars = animateSkillBars;
    window.resetSkillBars = function () {
        console.log('🔄 Resetando barras...');
        skillsAnimated = false;
        document.querySelectorAll('.skill-progress').forEach(function (bar) {
            bar.style.width = '0%';
            bar.style.transition = 'none';
        });
        console.log('✅ Barras reseteadas. Haz scroll para volver a animar.');
    };

    window.showPercentages = function () {
        console.log('📊 PORCENTAJES ACTUALES:');
        document.querySelectorAll('.skill-progress').forEach(function (bar, i) {
            const name = bar.parentElement.parentElement.querySelector('.skill-name')?.textContent || i;
            console.log(`  ${name}: ${bar.style.width}`);
        });
    };


    // ==========================================
    // VALIDACIÓN DE FORMULARIO
    // ==========================================
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const nameInput = document.getElementById('name');
            const emailInput = document.getElementById('email');
            const messageInput = document.getElementById('message');

            let isValid = true;
            if (!nameInput || nameInput.value.trim().length < 2) {
                isValid = false;
                if (nameInput) nameInput.style.borderColor = '#e74c3c';
            } else if (nameInput) {
                nameInput.style.borderColor = '#27ae60';
            }

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailInput || !emailRegex.test(emailInput.value.trim())) {
                isValid = false;
                if (emailInput) emailInput.style.borderColor = '#e74c3c';
            } else if (emailInput) {
                emailInput.style.borderColor = '#27ae60';
            }

            if (!messageInput || messageInput.value.trim().length < 10) {
                isValid = false;
                if (messageInput) messageInput.style.borderColor = '#e74c3c';
            } else if (messageInput) {
                messageInput.style.borderColor = '#27ae60';
            }

            if (!isValid) {
                showToast('⚠️ Por favor, completa todos los campos correctamente.', 'error');
                return;
            }

            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn ? submitBtn.innerHTML : '';
            if (submitBtn) {
                submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
                submitBtn.disabled = true;
            }

            setTimeout(function () {
                if (submitBtn) {
                    submitBtn.innerHTML = '<i class="fas fa-check"></i> Enviado con éxito';
                    submitBtn.style.background = '#27ae60';
                }
                showToast('✅ ¡Mensaje enviado con éxito! Me pondré en contacto contigo.', 'success');
                contactForm.reset();
                if (nameInput) nameInput.style.borderColor = '#e2e8f0';
                if (emailInput) emailInput.style.borderColor = '#e2e8f0';
                if (messageInput) messageInput.style.borderColor = '#e2e8f0';
                setTimeout(function () {
                    if (submitBtn) {
                        submitBtn.innerHTML = originalText;
                        submitBtn.disabled = false;
                        submitBtn.style.background = '';
                    }
                }, 3000);
            }, 2000);
        });

        document.querySelectorAll('.contact-form input, .contact-form textarea').forEach(function (input) {
            input.addEventListener('input', function () {
                if (this.style.borderColor === '#e74c3c' || this.style.borderColor === '#27ae60') {
                    this.style.borderColor = '#e2e8f0';
                }
            });
        });
    }

    // ==========================================
    // SISTEMA DE TOASTS
    // ==========================================
    function showToast(message, type) {
        const existingToasts = document.querySelectorAll('.toast-notification');
        existingToasts.forEach(function (toast) { toast.remove(); });

        const toast = document.createElement('div');
        toast.className = 'toast-notification ' + (type === 'error' ? 'toast-error' : 'toast-success');
        toast.textContent = message;

        Object.assign(toast.style, {
            position: 'fixed',
            bottom: '30px',
            right: '30px',
            padding: '16px 24px',
            borderRadius: '12px',
            color: 'white',
            fontWeight: '600',
            fontSize: '0.95rem',
            maxWidth: '400px',
            zIndex: '9999',
            boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
            animation: 'slideInUp 0.4s ease',
            backgroundColor: type === 'error' ? '#e74c3c' : '#27ae60'
        });

        document.body.appendChild(toast);
        setTimeout(function () {
            toast.style.animation = 'slideOutDown 0.4s ease';
            setTimeout(function () { toast.remove(); }, 400);
        }, 4000);
    }

    // ==========================================
    // BOTÓN VOLVER ARRIBA
    // ==========================================
    const scrollTopBtn = document.createElement('button');
    scrollTopBtn.innerHTML = '<i class="fas fa-chevron-up"></i>';
    scrollTopBtn.className = 'scroll-top-btn';
    Object.assign(scrollTopBtn.style, {
        position: 'fixed',
        bottom: '30px',
        left: '30px',
        width: '50px',
        height: '50px',
        borderRadius: '50%',
        backgroundColor: '#2563eb',
        color: 'white',
        border: 'none',
        fontSize: '1.2rem',
        cursor: 'pointer',
        boxShadow: '0 4px 16px rgba(37, 99, 235, 0.4)',
        zIndex: '999',
        transition: 'all 0.3s ease',
        opacity: '0',
        transform: 'scale(0)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    });
    document.body.appendChild(scrollTopBtn);

    window.addEventListener('scroll', function () {
        if (window.scrollY > 400) {
            scrollTopBtn.style.opacity = '1';
            scrollTopBtn.style.transform = 'scale(1)';
        } else {
            scrollTopBtn.style.opacity = '0';
            scrollTopBtn.style.transform = 'scale(0)';
        }
    });

    scrollTopBtn.addEventListener('click', function () {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // ==========================================
    // MODO OSCURO
    // ==========================================
    const darkModeBtn = document.createElement('button');
    darkModeBtn.innerHTML = '<i class="fas fa-moon"></i>';
    darkModeBtn.className = 'dark-mode-btn';
    Object.assign(darkModeBtn.style, {
        position: 'fixed',
        top: '85px',
        right: '30px',
        width: '44px',
        height: '44px',
        borderRadius: '50%',
        backgroundColor: 'white',
        color: '#1a202c',
        border: '1px solid #e2e8f0',
        fontSize: '1.1rem',
        cursor: 'pointer',
        boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
        zIndex: '999',
        transition: 'all 0.3s ease',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    });
    document.body.appendChild(darkModeBtn);

    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
        darkModeBtn.innerHTML = '<i class="fas fa-sun"></i>';
        darkModeBtn.style.backgroundColor = '#1a202c';
        darkModeBtn.style.color = 'white';
        darkModeBtn.style.borderColor = '#2d3748';
    }

    darkModeBtn.addEventListener('click', function () {
        document.body.classList.toggle('dark-mode');
        if (document.body.classList.contains('dark-mode')) {
            this.innerHTML = '<i class="fas fa-sun"></i>';
            this.style.backgroundColor = '#1a202c';
            this.style.color = 'white';
            this.style.borderColor = '#2d3748';
            localStorage.setItem('theme', 'dark');
        } else {
            this.innerHTML = '<i class="fas fa-moon"></i>';
            this.style.backgroundColor = 'white';
            this.style.color = '#1a202c';
            this.style.borderColor = '#e2e8f0';
            localStorage.setItem('theme', 'light');
        }
    });

    // ==========================================
    // ANIMACIÓN AL SCROLL (INTERSECTION OBSERVER)
    // ==========================================
    const animatedElements = document.querySelectorAll('.project-card, .about-card, .skill-item, .contact-item');
    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry, index) {
            if (entry.isIntersecting) {
                setTimeout(function () {
                    entry.target.classList.add('visible');
                }, index * 100);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    animatedElements.forEach(function (el) {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease';
        observer.observe(el);
    });

    // ==========================================
    // FILTROS + CARGAR MÁS (NUEVO)
    // ==========================================
    function setupFilters() {
        const filterBtns = document.querySelectorAll('.filter-btn');
        const projectCards = document.querySelectorAll('.project-card');
        if (!filterBtns.length || !projectCards.length) return;

        filterBtns.forEach(function (btn) {
            btn.addEventListener('click', function () {
                filterBtns.forEach(function (b) { b.classList.remove('active'); });
                this.classList.add('active');

                const filter = this.getAttribute('data-filter');
                projectCards.forEach(function (card) {
                    const category = card.getAttribute('data-category');
                    if (filter === 'all' || category === filter) {
                        card.classList.remove('hidden');
                    } else {
                        card.classList.add('hidden');
                    }
                });

                // Resetear "Cargar más"
                const loadMoreBtn = document.getElementById('loadMoreBtn');
                if (loadMoreBtn) {
                    const visibleCards = document.querySelectorAll('.project-card:not(.hidden)');
                    visibleCards.forEach(function (card, index) {
                        card.style.display = index < 3 ? 'flex' : 'none';
                    });
                    const remaining = visibleCards.length - 3;
                    if (remaining > 0) {
                        loadMoreBtn.style.display = 'inline-flex';
                        loadMoreBtn.innerHTML = `<i class="fas fa-plus-circle"></i> Cargar más (${remaining} restantes)`;
                        loadMoreBtn.disabled = false;
                        loadMoreBtn.style.opacity = '1';
                    } else {
                        loadMoreBtn.style.display = 'none';
                    }
                }
            });
        });
    }

    function setupLoadMore() {
        const loadMoreBtn = document.getElementById('loadMoreBtn');
        if (!loadMoreBtn) return;

        let currentCount = 3;

        function updateVisibleProjects() {
            const visibleCards = document.querySelectorAll('.project-card:not(.hidden)');
            const totalVisible = visibleCards.length;

            visibleCards.forEach(function (card, index) {
                card.style.display = index < currentCount ? 'flex' : 'none';
            });

            const remaining = totalVisible - currentCount;
            if (remaining <= 0) {
                loadMoreBtn.style.display = 'none';
            } else {
                loadMoreBtn.style.display = 'inline-flex';
                loadMoreBtn.innerHTML = `<i class="fas fa-plus-circle"></i> Cargar más (${remaining} restantes)`;
                loadMoreBtn.disabled = false;
                loadMoreBtn.style.opacity = '1';
            }
        }

        setTimeout(updateVisibleProjects, 100);

        loadMoreBtn.addEventListener('click', function () {
            const visibleCards = document.querySelectorAll('.project-card:not(.hidden)');
            const totalVisible = visibleCards.length;
            const nextCount = Math.min(currentCount + 3, totalVisible);

            visibleCards.forEach(function (card, index) {
                if (index < nextCount && index >= currentCount) {
                    card.style.display = 'flex';
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    setTimeout(function () {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 100);
                }
            });

            currentCount = nextCount;
            const remaining = totalVisible - currentCount;
            if (remaining <= 0) {
                this.innerHTML = '<i class="fas fa-check"></i> Todos los proyectos cargados';
                this.disabled = true;
                this.style.opacity = '0.6';
                this.style.cursor = 'not-allowed';
            } else {
                this.innerHTML = `<i class="fas fa-plus-circle"></i> Cargar más (${remaining} restantes)`;
            }
        });

        document.querySelectorAll('.filter-btn').forEach(function (btn) {
            btn.addEventListener('click', function () {
                currentCount = 3;
                setTimeout(updateVisibleProjects, 150);
            });
        });
    }

    setupFilters();
    setupLoadMore();

    // ==========================================
    // ANIMACIONES DEL ESTILO (para .visible)
    // ==========================================
    const animationStyles = document.createElement('style');
    animationStyles.textContent = `
        .project-card.visible,
        .about-card.visible,
        .skill-item.visible,
        .contact-item.visible {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
        
        @keyframes slideInUp {
            from { transform: translateY(30px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
        }
        @keyframes slideOutDown {
            from { transform: translateY(0); opacity: 1; }
            to { transform: translateY(30px); opacity: 0; }
        }
    `;
    document.head.appendChild(animationStyles);

    // ==========================================
    // MENSAJE EN CONSOLA
    // ==========================================
    console.log('%c💻 Jhonayker Quintero - Portafolio', 'font-size: 20px; font-weight: bold;');
    console.log('%c📧 ¿Interesado en contratarme? Contáctame:', 'font-size: 14px;');
    console.log('%c🔗 GitHub: https://github.com/Jhonayker777', 'font-size: 14px;');
    console.log('%c👨‍💻 Desarrollador Java en formación', 'font-size: 14px; color: #2563eb;');
    console.log('%c✨ ¡Gracias por visitar mi portafolio!', 'font-size: 16px; font-weight: bold; color: #2563eb;');
    console.log('✅ JavaScript cargado correctamente');
}); 