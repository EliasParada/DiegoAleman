async function cargarSobreMi(language) {
    try {
        const response = await fetch('data/sobremi.json');
        const data = await response.json();

        const content = data[language];
        const sectionSobreMi = document.getElementById('sobre-mi');

        sectionSobreMi.innerHTML = '';

        // // Contenedor de la imagen
        // const contenedorImagen = document.createElement('div');
        // contenedorImagen.className = 'w-2/3 md:w-2/5 lg:w-2/6 flex justify-end items-center flex-col';

        // const imagen = document.createElement('img');
        // imagen.src = 'img/profile/me.webp';
        // imagen.alt = 'Diego Alexander Alemán Castro';
        // contenedorImagen.appendChild(imagen);

        // Contenedor del texto
        const contenedorTexto = document.createElement('div');
        contenedorTexto.className = 'space-y-6 flex flex-col md:space-y-12 items-center m-auto justify-center py-4 z-20 w-3/5';

        const sobreMiLabel = document.createElement('p');
        sobreMiLabel.className = 'uppercase text-red-500 font-bold';
        sobreMiLabel.innerText = language === 'es' ? 'SOBRE MI' : 'ABOUT ME';

        const titleElement = document.createElement('h2');
        titleElement.className = 'text-xl md:text-6xl font-bold mb-4 text-left translatable animate-fadeIn';
        titleElement.innerHTML = content.title;
        titleElement.setAttribute('data-en', data['en'].title);
        titleElement.setAttribute('data-es', data['es'].title);

        const subtitleElement = document.createElement('p');
        subtitleElement.className = 'text-lg md:text-xl mb-4 text-left translatable animate-fadeInDelay';
        subtitleElement.innerText = content.subtitle;
        subtitleElement.setAttribute('data-en', data['en'].subtitle);
        subtitleElement.setAttribute('data-es', data['es'].subtitle);

        const buttonElement = document.createElement('a');
        buttonElement.className = 'bg-gradient-to-br from-red-500 from-50% to-red-800 to-80% text-white px-12 py-4 rounded-lg translatable cursor-pointer text-xl md:text-xl';
        buttonElement.href = content.cvLink;
        buttonElement.innerText = content.cvText;
        buttonElement.setAttribute('data-en', data['en'].cvText);
        buttonElement.setAttribute('data-es', data['es'].cvText);

        // Agregar elementos al contenedor de texto
        contenedorTexto.appendChild(sobreMiLabel);
        contenedorTexto.appendChild(titleElement);
        contenedorTexto.appendChild(subtitleElement);
        contenedorTexto.appendChild(buttonElement);

        // Agregar contenedores a la sección
        // sectionSobreMi.appendChild(contenedorImagen);
        sectionSobreMi.appendChild(contenedorTexto);
    } catch (error) {
        console.error('Error al cargar los datos de la sección "Sobre mí":', error);
    }
}
