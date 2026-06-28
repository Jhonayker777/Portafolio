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


    // ============================================
    // ANIMACIÓN DE BARRAS DE HABILIDADES 
    // ============================================

    let skillsAnimated = false;

    // ============================================
    // PORCENTAJES REALES DE CADA HABILIDAD
    // ============================================
    const SKILL_PERCENTAGES = {
        'Java': 10,
        'Spring Boot': 5,
        'Python': 75,
        'JavaScript': 50,
        'HTML5': 85,
        'CSS3': 80,
        'MySQL': 55,
        'Git & GitHub': 80
    };

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

        let animatedCount = 0;

        skillBars.forEach(function (bar, index) {
            // Obtener el nombre de la habilidad
            const skillItem = bar.closest('.skill-item');
            const skillName = skillItem ? skillItem.querySelector('.skill-name')?.textContent : '';

            // Buscar el porcentaje real en el objeto
            let targetWidth = SKILL_PERCENTAGES[skillName] || 50;

            // Si el HTML tiene width, usarlo
            const htmlWidth = bar.style.width;
            if (htmlWidth && htmlWidth !== '' && htmlWidth !== '0%') {
                targetWidth = parseInt(htmlWidth);
            }

            // Asegurar que el porcentaje esté entre 0 y 100
            if (targetWidth < 0 || targetWidth > 100 || isNaN(targetWidth)) {
                targetWidth = 50;
            }

            const targetWidthStr = targetWidth + '%';

            console.log(`📊 Barra ${index}: ${skillName || 'Skill'} → ${targetWidthStr}`);

            // Resetear a 0
            bar.style.width = '0%';
            bar.style.transition = 'none';
            bar.style.visibility = 'visible';

            // Animar con delay progresivo
            setTimeout(function () {
                bar.style.transition = 'width 1.2s cubic-bezier(0.4, 0, 0.2, 1)';
                bar.style.width = targetWidthStr;
                animatedCount++;

                if (animatedCount === skillBars.length) {
                    console.log('✅ Todas las barras animadas correctamente');
                    skillsAnimated = true;

                    // Guardar en localStorage
                    try {
                        localStorage.setItem('skillsAnimated', 'true');
                        localStorage.setItem('skillsData', JSON.stringify({
                            timestamp: Date.now(),
                            widths: Array.from(skillBars).map(b => b.style.width)
                        }));
                    } catch (e) { }
                }
            }, 200 + (index * 100));
        });
    }

    function checkAndAnimateSkills() {
        if (skillsAnimated) {
            return;
        }

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
        } else {
            console.log('⏳ Sección no visible, esperando scroll...');
        }
    }

    function resetSkillBars() {
        console.log('🔄 Resetando barras...');
        skillsAnimated = false;

        // Resetear todas las barras a 0%
        document.querySelectorAll('.skill-progress').forEach(function (bar) {
            bar.style.width = '0%';
            bar.style.transition = 'none';
        });

        // Eliminar localStorage
        try {
            localStorage.removeItem('skillsAnimated');
            localStorage.removeItem('skillsData');
        } catch (e) { }

        console.log('✅ Barras reseteadas. Haz scroll para volver a animar.');
        console.log('💡 Para ver los porcentajes escribe: showSkillPercentages()');
    }

    function showSkillPercentages() {
        console.log('📊 PORCENTAJES ACTUALES:');
        console.log('┌─────────────────────────────────────────────┐');

        document.querySelectorAll('.skill-progress').forEach(function (bar, i) {
            const skillItem = bar.closest('.skill-item');
            const name = skillItem ? skillItem.querySelector('.skill-name')?.textContent || 'Skill ' + i : 'Skill ' + i;
            const width = bar.style.width || '0%';
            const expected = SKILL_PERCENTAGES[name] || '?';
            const status = width === expected + '%' ? '✅' : '⚠️';

            console.log(`│ ${status} ${name.padEnd(20)} → ${width.padEnd(6)} (Esperado: ${expected}%)`);
        });

        console.log('└─────────────────────────────────────────────┘');
        console.log(`📌 skillsAnimated: ${skillsAnimated}`);
        console.log(`📌 localStorage: ${localStorage.getItem('skillsAnimated')}`);
    }

    function fixSkillBars() {
        console.log('🔧 Forzando porcentajes correctos...');

        document.querySelectorAll('.skill-progress').forEach(function (bar) {
            const skillItem = bar.closest('.skill-item');
            const skillName = skillItem ? skillItem.querySelector('.skill-name')?.textContent : '';
            const target = SKILL_PERCENTAGES[skillName] || 50;

            bar.style.width = target + '%';
            bar.style.transition = 'none';

            console.log(`✅ ${skillName}: ${target}%`);
        });

        skillsAnimated = true;
        try {
            localStorage.setItem('skillsAnimated', 'true');
        } catch (e) { }

        console.log('✅ Barras corregidas correctamente');
    }

    // ============================================
    // INICIALIZACIÓN
    // ============================================

    document.addEventListener('DOMContentLoaded', function () {
        console.log('📄 Página cargada, verificando estado de barras...');

        // Verificar localStorage
        try {
            if (localStorage.getItem('skillsAnimated') === 'true') {
                skillsAnimated = true;
                console.log('✅ Barras ya estaban animadas (localStorage)');

                // Asegurar que las barras tengan sus porcentajes correctos
                const savedData = localStorage.getItem('skillsData');
                if (savedData) {
                    try {
                        const data = JSON.parse(savedData);
                        const bars = document.querySelectorAll('.skill-progress');
                        bars.forEach(function (bar, i) {
                            if (data.widths && data.widths[i]) {
                                bar.style.width = data.widths[i];
                                bar.style.transition = 'none';
                            }
                        });
                        console.log('✅ Barras restauradas desde localStorage');
                    } catch (e) { }
                } else {
                    // Si no hay datos guardados, usar los porcentajes correctos
                    fixSkillBars();
                }
            }
        } catch (e) { }

        // Intentar animar después de 500ms
        setTimeout(function () {
            checkAndAnimateSkills();
        }, 500);

        // Reintento después de 1.5s
        setTimeout(function () {
            checkAndAnimateSkills();
        }, 1500);

        // Último intento después de 3s
        setTimeout(function () {
            checkAndAnimateSkills();
        }, 3000);
    });

    // Evento scroll
    window.addEventListener('scroll', function () {
        checkAndAnimateSkills();
    });

    // Evento resize
    window.addEventListener('resize', function () {
        checkAndAnimateSkills();
    });

    // ============================================
    // FUNCIONES GLOBALES PARA PRUEBAS
    // ============================================

    window.animateSkillBars = animateSkillBars;
    window.resetSkillBars = resetSkillBars;
    window.showSkillPercentages = showSkillPercentages;
    window.fixSkillBars = fixSkillBars;
    window.checkAndAnimateSkills = checkAndAnimateSkills;

    console.log('✅ Sistema de animación de barras inicializado');
    console.log('💡 Comandos disponibles:');
    console.log('  showSkillPercentages()  → Ver porcentajes actuales');
    console.log('  resetSkillBars()        → Resetear barras a 0%');
    console.log('  fixSkillBars()          → Forzar porcentajes correctos');
    console.log('  animateSkillBars()      → Animar barras manualmente');

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

    // ============================================
    // FILTROS + CARGAR MÁS (VERSIÓN FUNCIONAL)
    // ============================================

    let currentFilter = 'all';
    let currentCount = 3;
    let visibleProjects = [];

    function setupFilters() {
        const filterBtns = document.querySelectorAll('.filter-btn');
        const projectCards = document.querySelectorAll('.project-card');
        const projectsContainer = document.getElementById('projectsContainer');

        if (!filterBtns.length || !projectCards.length) {
            console.warn('⚠️ No se encontraron filtros o proyectos');
            return;
        }

        // Eliminar mensaje vacío existente si lo hay
        const oldEmpty = document.getElementById('emptyMessage');
        if (oldEmpty) oldEmpty.remove();

        // Crear mensaje "No hay proyectos"
        const emptyMessage = document.createElement('div');
        emptyMessage.id = 'emptyMessage';
        emptyMessage.className = 'empty-message';
        emptyMessage.style.cssText = `
        grid-column: 1 / -1;
        text-align: center;
        padding: 60px 20px;
        display: none;
    `;
        emptyMessage.innerHTML = `
        <div style="font-size: 4rem; margin-bottom: 16px;">🔍</div>
        <h3 style="color: #1a202c; margin-bottom: 8px;">No hay proyectos en esta categoría</h3>
        <p style="color: #94a3b8;">Prueba con otra categoría o vuelve a "Todos"</p>
    `;
        projectsContainer.appendChild(emptyMessage);

        // Evento para cada botón de filtro
        filterBtns.forEach(function (btn) {
            btn.addEventListener('click', function (e) {
                e.preventDefault();

                // Actualizar botón activo
                filterBtns.forEach(function (b) { b.classList.remove('active'); });
                this.classList.add('active');

                // Obtener filtro
                currentFilter = this.getAttribute('data-filter');


                // Filtrar proyectos
                filterProjects(currentFilter);
            });
        });

        // Inicializar con "Todos"
        filterProjects('all');
    }

    function filterProjects(filter) {
        const projectCards = document.querySelectorAll('.project-card');
        const loadMoreBtn = document.getElementById('loadMoreBtn');
        const emptyMessage = document.getElementById('emptyMessage');

        // Resetear proyectos visibles
        visibleProjects = [];

        // Filtrar proyectos
        projectCards.forEach(function (card) {
            const category = card.getAttribute('data-category');
            const matches = filter === 'all' || category === filter;

            if (matches) {
                card.classList.remove('hidden');
                card.style.display = 'flex'; // Asegurar que sea visible
                visibleProjects.push(card);
            } else {
                card.classList.add('hidden');
                card.style.display = 'none';
            }
        });



        // Mostrar/ocultar mensaje vacío
        if (visibleProjects.length === 0) {
            if (emptyMessage) emptyMessage.style.display = 'block';
            if (loadMoreBtn) loadMoreBtn.style.display = 'none';
        } else {
            if (emptyMessage) emptyMessage.style.display = 'none';
        }

        // Resetear contador
        currentCount = 3;

        // Mostrar primeros 3 proyectos
        visibleProjects.forEach(function (card, index) {
            if (index < 3) {
                card.style.display = 'flex';
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            } else {
                card.style.display = 'none';
            }
        });

        // Actualizar botón "Cargar más"
        if (loadMoreBtn) {
            const remaining = visibleProjects.length - 3;
            if (remaining > 0 && visibleProjects.length > 0) {
                loadMoreBtn.style.display = 'inline-flex';
                loadMoreBtn.innerHTML = `<i class="fas fa-plus-circle"></i> Cargar más (${remaining} restantes)`;
                loadMoreBtn.disabled = false;
                loadMoreBtn.style.opacity = '1';
                loadMoreBtn.style.cursor = 'pointer';
            } else {
                loadMoreBtn.style.display = 'none';
            }
        }

        // Actualizar contador
        updateProjectCounter(visibleProjects.length, filter);
    }

    function setupLoadMore() {
        const loadMoreBtn = document.getElementById('loadMoreBtn');
        if (!loadMoreBtn) {
            console.warn('⚠️ No se encontró el botón "Cargar más"');
            return;
        }

        // Remover eventos anteriores (evitar duplicados)
        const newBtn = loadMoreBtn.cloneNode(true);
        loadMoreBtn.parentNode.replaceChild(newBtn, loadMoreBtn);

        newBtn.addEventListener('click', function () {
            if (visibleProjects.length === 0) return;

            const remaining = visibleProjects.length - currentCount;
            const nextCount = Math.min(currentCount + 3, visibleProjects.length);

            // Mostrar siguientes proyectos
            visibleProjects.forEach(function (card, index) {
                if (index >= currentCount && index < nextCount) {
                    card.style.display = 'flex';
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    setTimeout(function () {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 100 * (index - currentCount + 1));
                }
            });

            currentCount = nextCount;

            // Actualizar botón
            const remainingNow = visibleProjects.length - currentCount;
            if (remainingNow <= 0) {
                this.innerHTML = '<i class="fas fa-check"></i> Todos los proyectos cargados';
                this.disabled = true;
                this.style.opacity = '0.6';
                this.style.cursor = 'not-allowed';
            } else {
                this.innerHTML = `<i class="fas fa-plus-circle"></i> Cargar más (${remainingNow} restantes)`;
            }
        });
    }

    function updateProjectCounter(count, filter) {
        let counterElement = document.querySelector('.project-counter');

        if (!counterElement) {
            counterElement = document.createElement('div');
            counterElement.className = 'project-counter';
            counterElement.style.cssText = `
            text-align: center;
            margin-bottom: 20px;
            font-size: 0.95rem;
            color: #94a3b8;
            font-weight: 500;
        `;
            const filterContainer = document.querySelector('.filter-container');
            if (filterContainer) {
                filterContainer.parentNode.insertBefore(counterElement, filterContainer.nextSibling);
            }
        }

        if (count > 0) {
            const filterName = filter === 'all' ? 'todos los proyectos' : `"${filter}"`;
            counterElement.textContent = `📂 Mostrando ${count} proyecto${count > 1 ? 's' : ''} de ${filterName}`;
            counterElement.style.display = 'block';
        } else {
            counterElement.textContent = '';
            counterElement.style.display = 'none';
        }
    }

    // ============================================
    // EMAIL DE CONTACTO
    // ============================================

    // ============================================
// ENVÍO DE FORMULARIO CON EMAILJS - VERSIÓN MEJORADA
// ============================================

(function setupContactForm() {
    const contactForm = document.querySelector('.contact-form');
    
    if (!contactForm) {
        console.warn('⚠️ Formulario de contacto no encontrado');
        return;
    }

    // Inicializar EmailJS con tu clave pública
    emailjs.init('5WM24YOxTnuKwZo82');

    contactForm.addEventListener('submit', function(event) {
        event.preventDefault();

        // Obtener elementos
        const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('email');
        const messageInput = document.getElementById('message');
        const submitBtn = this.querySelector('button[type="submit"]');

        // Validar campos
        let isValid = true;

        if (!nameInput || nameInput.value.trim().length < 2) {
            isValid = false;
            if (nameInput) nameInput.style.borderColor = '#e74c3c';
            showToast('⚠️ Por favor, ingresa tu nombre completo', 'error');
        } else if (nameInput) {
            nameInput.style.borderColor = '#27ae60';
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailInput || !emailRegex.test(emailInput.value.trim())) {
            isValid = false;
            if (emailInput) emailInput.style.borderColor = '#e74c3c';
            showToast('⚠️ Por favor, ingresa un correo válido', 'error');
        } else if (emailInput) {
            emailInput.style.borderColor = '#27ae60';
        }

        if (!messageInput || messageInput.value.trim().length < 10) {
            isValid = false;
            if (messageInput) messageInput.style.borderColor = '#e74c3c';
            showToast('⚠️ Por favor, escribe un mensaje de al menos 10 caracteres', 'error');
        } else if (messageInput) {
            messageInput.style.borderColor = '#27ae60';
        }

        if (!isValid) return;

        // Preparar parámetros para EmailJS
        const params = {
            name: nameInput.value.trim(),
            email: emailInput.value.trim(),
            message: messageInput.value.trim(),
            time: new Date().toLocaleString('es-ES', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit'
            }),
            page_url: window.location.href
        };

        // Deshabilitar botón y mostrar loading
        if (submitBtn) {
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
            submitBtn.disabled = true;

            // Enviar correo
            emailjs.send('service_ve13ywu', 'template_3yy65gv', params)
                .then(function(response) {
                    console.log('✅ Correo enviado con éxito!', response);
                    showToast('✅ ¡Mensaje enviado con éxito! Te responderé pronto.', 'success');
                    contactForm.reset();
                    
                    // Restaurar colores de bordes
                    if (nameInput) nameInput.style.borderColor = '#e2e8f0';
                    if (emailInput) emailInput.style.borderColor = '#e2e8f0';
                    if (messageInput) messageInput.style.borderColor = '#e2e8f0';
                })
                .catch(function(error) {
                    console.error('❌ Error al enviar:', error);
                    showToast('❌ Hubo un error. Por favor, inténtalo de nuevo.', 'error');
                })
                .finally(function() {
                    // Restaurar botón
                    if (submitBtn) {
                        submitBtn.innerHTML = originalText;
                        submitBtn.disabled = false;
                    }
                });
        }
    });

    // Resetear bordes al escribir
    document.querySelectorAll('.contact-form input, .contact-form textarea').forEach(function(input) {
        input.addEventListener('input', function() {
            if (this.style.borderColor === '#e74c3c' || this.style.borderColor === '#27ae60') {
                this.style.borderColor = '#e2e8f0';
            }
        });
    });

    console.log('✅ Formulario de contacto inicializado con EmailJS');
})();

    // ============================================
    // INICIALIZAR
    // ============================================

    // Ejecutar cuando el DOM esté listo
    document.addEventListener('DOMContentLoaded', function () {
        console.log('🚀 Inicializando filtros...');
        setupFilters();
        setupLoadMore();
    });

    // También ejecutar si el DOM ya está cargado
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function () {
            setupFilters();
            setupLoadMore();
        });
    } else {
        setupFilters();
        setupLoadMore();
    }

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