async function cargarInicio(language) {
    try {
        const response = await fetch('data/inicio.json');
        const data = await response.json();

        const content = data[language];
        const sectionInicio = document.getElementById('inicio');
        
        sectionInicio.innerHTML = '';

        const contenedorTexto = document.createElement('div');
        contenedorTexto.className = 'space-y-6 flex flex-col md:space-y-12 items-start justify-center py-4 z-20 w-3/5';

        const titleElement = document.createElement('h1');
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
        buttonElement.className = 'nav-link bg-gradient-to-br from-red-500 from-50% to-red-800 to-80% text-white px-12 py-4 rounded-lg translatable cursor-pointer text-xl md:text-xl';
        buttonElement.href = "#contacto";
        buttonElement.innerText = content.actionCall;
        buttonElement.setAttribute('data-en', data['en'].actionCall);
        buttonElement.setAttribute('data-es', data['es'].actionCall);

        const contenedorImagen = document.createElement('div');
        contenedorImagen.className = 'absolute w-2/3 md:w-2/5 lg:w-2/6 max-h-full bottom-0 right-0 flex justify-end items-center flex-col -z-10';

        const imagen = document.createElement('img');
        imagen.src = 'img/logo.png';
        imagen.alt = 'Diego Alexander Alemán Castro';

        contenedorTexto.appendChild(titleElement);
        contenedorTexto.appendChild(subtitleElement);
        contenedorTexto.appendChild(buttonElement);

        contenedorImagen.appendChild(imagen);

        sectionInicio.appendChild(contenedorImagen);
        sectionInicio.appendChild(contenedorTexto);
    } catch (error) {
        console.error('Error al cargar los datos:', error);
    }
}