async function cargarHabilidades(language) {
    try {
        const response = await fetch('data/habilidades.json');
        const data = await response.json();

        const content = data[language];
        const sectionHabilidades = document.getElementById('habilidades');
        
        // Título de la sección
        sectionHabilidades.innerHTML = `
            <p class="uppercase text-red-500 font-bold">${content.sectionTitle}</p>
            <h2 class="text-xl md:text-6xl font-bold mb-4 translatable animate-fadeIn" data-es="${data.es.subtitle}" data-en="${data.en.subtitle}">
                ${content.subtitle}
            </h2>
        `;

        // Contenedor de todas las categorías
        const contenedorCategorias = document.createElement('div');
        contenedorCategorias.className = 'w-full space-y-12';

        // Iterar por las categorías
        Object.entries(content.categories).forEach(([categoria, habilidades]) => {
            // Contenedor de cada categoría
            const categoriaContainer = document.createElement('div');
            categoriaContainer.className = 'mb-8';

            // Título de la categoría
            const tituloCategoria = document.createElement('h3');
            tituloCategoria.className = 'text-2xl font-bold text-white mb-12 uppercase';
            tituloCategoria.textContent = categoria === 'conocimientos' ? 
                (language === 'es' ? 'Conocimientos' : 'Knowledge') : 
                categoria === 'habilidadesDuras' ? 
                (language === 'es' ? 'Habilidades Duras' : 'Hard Skills') : 
                (language === 'es' ? 'Habilidades Blandas' : 'Soft Skills');
            categoriaContainer.appendChild(tituloCategoria);

            // Grid para las habilidades dentro de la categoría
            const gridHabilidades = document.createElement('div');
            gridHabilidades.className = 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12';

            // Crear las tarjetas de habilidades
            habilidades.forEach(habilidad => {
                const card = document.createElement('div');
                card.className = 'p-4 relative border-2 border-gray-800 rounded-lg bg-gradient-to-r from-gray-800 via-black to-gray-800 transition-all duration-300 hover:scale-105 hover:shadow-lg';

                const icono = `
                    <div class="w-16 h-16 absolute -top-10 left-1/2 transform -translate-x-1/2 flex items-center justify-center border-4 border-red-500 rounded-full bg-gradient-to-br from-red-500 to-red-800">
                        <i class="fa-solid fa-star text-white text-2xl"></i>
                    </div>
                `;

                const contenidoCard = `
                    <p class="mt-12 font-semibold text-white text-xl translatable" data-es="${habilidad.title}" data-en="${habilidad.title}">
                        ${habilidad.title}
                    </p>
                    <p class="text-white translatable" data-es="${habilidad.description}" data-en="${habilidad.description}">
                        ${habilidad.description}
                    </p>
                    <div class="w-full h-4 mt-4 border-2 border-gray-600 rounded-lg">
                        <div class="h-full bg-red-500 rounded-lg" style="width: ${habilidad.progress}%;"></div>
                    </div>
                `;

                card.innerHTML = icono + contenidoCard;
                gridHabilidades.appendChild(card);
            });

            // Agregar el grid al contenedor de la categoría
            categoriaContainer.appendChild(gridHabilidades);

            // Agregar la categoría completa al contenedor principal
            contenedorCategorias.appendChild(categoriaContainer);
        });

        // Añadir todas las categorías a la sección
        sectionHabilidades.appendChild(contenedorCategorias);

    } catch (error) {
        console.error('Error al cargar los datos:', error);
    }
}
