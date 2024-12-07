function updateMenu(lang) {
    return fetch('data/menu.json')
        .then(response => response.json())
        .then(config => {
            const secciones = config.secciones;
            const seccionesActivas = {};

            Object.keys(secciones).forEach(key => {
                const section = secciones[key];
                const sectionElement = document.getElementById(key);
                const navLinkElement = document.querySelector(`header .nav-link[href="#${key}"]`);

                if (!section.activo) {
                    if (sectionElement) sectionElement.remove();
                    if (navLinkElement) navLinkElement.remove();
                } else {
                    if (navLinkElement) {
                        navLinkElement.setAttribute('data-es', section.es);
                        navLinkElement.setAttribute('data-en', section.en);
                        navLinkElement.textContent = section[lang];
                    }
                    seccionesActivas[key] = true;
                }
            });

            const idiomaButton = document.getElementById('language-button');
            if (idiomaButton) {
                idiomaButton.textContent = config.otros.idioma[lang];
            }

            setupSmoothScroll();

            return seccionesActivas;
        })
        .catch(error => console.error('Error al cargar el archivo JSON:', error));
}

function setupSmoothScroll() {
	const sections = document.querySelectorAll('section');
	const navLinks = document.querySelectorAll('.nav-link');
	const actions = document.querySelectorAll('.action');

	let goTo = (target) => {
		const targetSection = document.getElementById(target);

		window.scrollTo({
			top: targetSection.offsetTop - document.querySelector('header').offsetHeight,
			behavior: 'smooth'
		});
	}

	navLinks.forEach(link => {
		link.addEventListener('click', function(e) {
			e.preventDefault();
			const targetId = this.getAttribute('href').substring(1);
			goTo(targetId)
		});
	});

	actions.forEach(btn => {
		btn.addEventListener('click', function(e) {
            console.log('AAA');
			const targetId = this.dataset.target.substring(1);
			goTo(targetId)
		});
	});

	window.addEventListener('scroll', function() {
		let current = '';
		sections.forEach(section => {
			const sectionTop = section.offsetTop - document.querySelector('header').offsetHeight;
			if (pageYOffset >= sectionTop - 10) {
				current = section.getAttribute('id');
			}
		});
		navLinks.forEach(link => {
			// hover:bg-gradient-to-br hover:from-red-500 hover:from-50% hover:to-red-800 hover:to-80%
			link.classList.remove('bg-gradient-to-br', 'from-red-500', 'from-50%', 'to-red-800', 'to-80%');
			if (link.getAttribute('href').substring(1) === current) {
				link.classList.add('bg-gradient-to-br', 'from-red-500', 'from-50%', 'to-red-800', 'to-80%');
			}
		});
	});
}