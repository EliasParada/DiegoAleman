async function cargarTestimonios(language) {
    try {
      const response = await fetch('data/testimonios.json');
      const data = await response.json();
  
      const content = data[language];
      const sectionTestimonios = document.getElementById('testimonios');
  
      // Título de la sección
      sectionTestimonios.innerHTML = `
        <div class="text-center">
          <p class="text-sm uppercase text-red-400 font-bold">${content.sectionTitle}</p>
          <h2 class="text-4xl font-bold mb-4">${content.subtitle}</h2>
          <p class="text-gray-400 max-w-2xl mx-auto">${content.description}</p>
        </div>
      `;
  
      // Contenedor de testimonios
      const gridTestimonios = document.createElement('div');
      gridTestimonios.className = 'mt-12 grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto';
  
      // Renderizar cada testimonio
      content.testimonials.forEach(testimonial => {
        const stars = Array(testimonial.rating)
          .fill('<i class="fa-solid fa-star text-yellow-400"></i>')
          .join('');
  
        const card = document.createElement('div');
        card.className = 'bg-gray-800 rounded-lg p-6 shadow-lg';
  
        card.innerHTML = `
          <p class="text-gray-300">${testimonial.text}</p>
          <div class="flex items-center mt-6">
            <img src="${testimonial.avatar}" alt="${testimonial.name}" class="w-12 h-12 rounded-full">
            <div class="ml-4">
              <h3 class="text-lg font-bold text-white">${testimonial.name}</h3>
              <p class="text-sm text-gray-400">${testimonial.position}</p>
              <div class="flex items-center mt-2">${stars}</div>
            </div>
          </div>
        `;
  
        gridTestimonios.appendChild(card);
      });
  
      sectionTestimonios.appendChild(gridTestimonios);
    } catch (error) {
      console.error('Error al cargar los testimonios:', error);
    }
  }
  
  // Llama a la función con el idioma por defecto
  cargarTestimonios('es');
  