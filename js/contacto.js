async function cargarContacto(language) {
    try {
      const response = await fetch('data/contacto.json');
      const data = await response.json();
      const content = data[language];
  
      // Renderizar formulario
      const formulario = document.getElementById('formulario');
      formulario.innerHTML = `
        <h3 class="text-lg font-bold mb-4">${content.form.title}</h3>
        <div class="mb-4">
          <label for="name" class="block text-gray-400">${content.form.fields.name.label}</label>
          <input type="text" id="name" name="nombre" class="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded text-gray-400" placeholder="${content.form.fields.name.placeholder}" required>
        </div>
        <div class="mb-4">
          <label for="email" class="block text-gray-400">${content.form.fields.email.label}</label>
          <input type="email" id="email" name="correo" class="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded text-gray-400" placeholder="${content.form.fields.email.placeholder}" required>
        </div>
        <div class="mb-4">
          <label for="subject" class="block text-gray-400">${content.form.fields.subject.label}</label>
          <input type="text" id="subject" name="sujeto" class="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded text-gray-400" placeholder="${content.form.fields.subject.placeholder}" required>
        </div>
        <div class="mb-4">
          <label for="message" class="block text-gray-400">${content.form.fields.message.label}</label>
          <textarea id="message" name="mensaje" class="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded text-gray-400" rows="4" placeholder="${content.form.fields.message.placeholder}" required></textarea>
        </div>
        <button type="submit" class="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition">${content.form.fields.submit}</button>
      `;
  
      // Información general
      const generalInfo = document.querySelector('.general-info');
      generalInfo.innerHTML = `
        <h2 class="text-2xl font-bold">${content.generalInfo.title}</h2>
        <p class="text-gray-400">${content.generalInfo.description}</p>
        <div class="flex space-x-4">
          <a href="${content.generalInfo.socials.linkedin}" class="text-gray-400 hover:text-red-500">
            <i class="fab fa-linkedin"></i>
          </a>
        </div>
      `;
  
      // Información de contacto
      const contactInfo = document.querySelector('.contact-info');
      contactInfo.innerHTML = `
        <h3 class="text-lg font-bold mb-4">${content.contactInfo.title}</h3>
        <ul class="space-y-2">
          ${content.contactInfo.details.map(detail => `
            <li class="flex items-center space-x-2">
              <i class="${detail.icon} text-red-500"></i>
              <span>${detail.text}</span>
            </li>
          `).join('')}
        </ul>
      `;
    } catch (error) {
      console.error('Error al cargar la sección de contacto:', error);
    }
  }
  
  // Llama a la función con el idioma por defecto
  cargarContacto('es');
  