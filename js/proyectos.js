async function cargarProyectos(language) {
  try {
      const response = await fetch('data/proyectos.json');
      const data = await response.json();

      const content = data[language];
      const sectionProyectos = document.getElementById('proyectos');

      // Título de la sección
      sectionProyectos.innerHTML = `
          <p class="uppercase text-red-500 font-bold translatable" data-es="${data.es.sectionTitle}" data-en="${data.en.sectionTitle}">
              ${content.sectionTitle}
          </p>
          <h2 class="text-xl md:text-6xl font-bold mb-8 text-white translatable" data-es="${data.es.subtitle}" data-en="${data.en.subtitle}">
              ${content.subtitle}
          </h2>
      `;

      // Contenedor de proyectos
      const gridProyectos = document.createElement('div');
      gridProyectos.className = 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full';

      // Renderizar cada proyecto
      content.projects.forEach((project, index) => {
          const card = document.createElement('div');
          card.className = 'relative border-2 border-red-800 rounded-lg bg-gradient-to-r from-gray-800 via-black to-gray-800 p-4 shadow-lg hover:shadow-red-500 transition-shadow duration-300';

          card.innerHTML = `
              <div class="w-full h-40 overflow-hidden rounded-md">
                  <img src="${project.image}" alt="${project.title}" class="w-full h-full object-cover">
              </div>
              <div class="mt-4">
                  <h3 class="text-xl font-bold text-white translatable" data-es="${project.title}" data-en="${data.en.projects[index].title}">
                      ${project.title}
                  </h3>
                  <p class="text-gray-400 text-sm mt-2 translatable" data-es="${project.description}" data-en="${data.en.projects[index].description}">
                      ${project.description}
                  </p>
                  <button onclick="openModalProyectos(${index}, '${language}')" class="mt-4 bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded flex items-center gap-2">
                      <i class="fa-solid fa-eye"></i> Ver más
                  </button>
              </div>
          `;

          gridProyectos.appendChild(card);
      });

      sectionProyectos.appendChild(gridProyectos);
  } catch (error) {
      console.error('Error al cargar los proyectos:', error);
  }
}

// Modal
function openModalProyectos(index, language) {
    fetch('data/proyectos.json')
        .then(response => response.json())
        .then(data => {
            const project = data[language].projects[index];

            if (!project) {
                console.error('Proyecto no encontrado:', index, language);
                return;
            }

            const modal = document.getElementById('modal-proyecto');

            modal.innerHTML = `
                <div class="fixed inset-0 bg-black bg-opacity-75 z-50 flex justify-center items-center">
                    <div class="bg-gray-900 text-white max-w-3xl w-full p-6 rounded-lg relative overflow-scroll" style="max-height: 90vh;">
                        <button onclick="closeModal()" class="absolute top-4 right-4 bg-red-600 hover:bg-red-700 text-white rounded-full p-2 z-10">
                            <i class="fa-solid fa-times"></i>
                        </button>
                        <div class="swiper-container w-full h-64">
                            <div class="swiper-wrapper">
                                ${project.carousel
                                    .map(image => `<div class="swiper-slide"><img src="${image}" alt="Project Image" class="w-full h-full object-cover rounded-md"></div>`)
                                    .join('')}
                            </div>
                            <div class="swiper-button-next text-red-600"></div>
                            <div class="swiper-button-prev text-red-600"></div>
                        </div>
                        <div class="mt-6">
                            <h3 class="text-2xl font-bold text-white">${project.title}</h3>
                            <p class="text-gray-400 mt-4">${project.details}</p>
                            <a href="${project.link}" target="_blank" class="mt-4 inline-block text-red-500 underline">
                                Ver documentación
                            </a>
                            <div class="mt-6 grid grid-cols-2 gap-4">
                                ${project.gallery
                                    .map(image => `<img src="${image}" alt="Gallery Image" class="w-full h-32 object-cover rounded-md">`)
                                    .join('')}
                            </div>
                        </div>
                    </div>
                </div>
            `;

            modal.classList.remove('hidden');

            // Inicializar Swiper
            new Swiper('.swiper-container', {
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                },
                loop: true,
            });

            console.log('Modal abierto con el proyecto:', project);
        })
        .catch(error => {
            console.error('Error al cargar el modal:', error);
        });
}

function closeModal() {
  const modal = document.getElementById('modal-proyecto');
  modal.classList.add('hidden');
}
