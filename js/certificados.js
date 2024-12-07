async function cargarCertificaciones(language) {
    try {
        const response = await fetch('data/certificados.json');
        const data = await response.json();

        const content = data[language];
        const sectionCertificaciones = document.getElementById('certificaciones');
        
        // Título de la sección
        sectionCertificaciones.innerHTML = `
            <p class="uppercase text-red-500 font-bold">${content.sectionTitle}</p>
            <h2 class="text-xl md:text-6xl font-bold mb-4 translatable animate-fadeIn text-white" data-es="${data.es.subtitle}" data-en="${data.en.subtitle}">
                ${content.subtitle}
            </h2>
        `;

        // Contenedor de las certificaciones
        const contenedorCertificaciones = document.createElement('div');
        contenedorCertificaciones.className = 'flex flex-wrap mt-12 justify-center mx-auto w-full gap-8';

        // Renderizar cada certificación
        content.certifications.forEach(cert => {
            const card = document.createElement('div');
            card.className = 'w-1/4 p-6 relative border-2 border-red-700 rounded-lg bg-gradient-to-r from-gray-800 via-black to-gray-800 transition-transform duration-300 hover:scale-105 hover:shadow-lg';

            const icono = `
                <div class="w-16 h-16 absolute -top-10 left-1/2 transform -translate-x-1/2 flex items-center justify-center border-4 border-red-500 rounded-full bg-gradient-to-br from-red-500 to-red-800">
                    <i class="${cert.icon} text-white text-2xl"></i>
                </div>
            `;

            const imagen = `
                <img src="${cert.image}" alt="Certificación ${cert.title}" class="w-full h-32 object-cover rounded-lg mt-6">
            `;

            const contenidoCard = `
                <p class="mt-4 font-semibold text-white text-xl">${cert.title}</p>
                <p class="text-gray-300 mt-2">Emitida por: ${cert.issuer}</p>
                <p class="text-gray-400 text-sm mt-1">Obtención: ${cert.date}</p>
                ${cert.link ? `<a href="${cert.link}" target="_blank" class="text-red-500 hover:underline mt-4 block">Ver más</a>` : ''}
            `;

            card.innerHTML = icono + imagen + contenidoCard;
            contenedorCertificaciones.appendChild(card);
        });

        // Añadir las certificaciones a la sección
        sectionCertificaciones.appendChild(contenedorCertificaciones);

    } catch (error) {
        console.error('Error al cargar las certificaciones:', error);
    }
}
