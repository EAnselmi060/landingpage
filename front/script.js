
const loader = document.querySelector("#loader");

// Función para mostrar y ocultar el loader
function toggleLoader(show) {
    if (show) {
        loader.style.display = "block"; // Muestra el loader
    } else {
        loader.style.display = "none"; // Oculta el loader
    }
}


// Form validation
document.addEventListener('DOMContentLoaded', function() {
    const forms = document.querySelectorAll('.needs-validation');

    Array.from(forms).forEach(form => {
        form.addEventListener('submit', event => {
            if (!form.checkValidity()) {
                event.preventDefault();
                event.stopPropagation();
            }
            form.classList.add('was-validated');
        }, false);
    });
});


document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector('.needs-validation');

    form.addEventListener("submit", async (event) => {
        event.preventDefault(); // Prevenir el envío por defecto del formulario

        // Capturar valores de los campos
        const name = form.querySelector("input[placeholder='Nombre']").value.trim();
        const email = form.querySelector("input[placeholder='Email']").value.trim();
        const messageContent = form.querySelector("textarea[placeholder='Mensaje']").value.trim();

        // Validar campos
        if (!name || !email || !messageContent) {
            alert("Por favor, completa todos los campos.");
            return;
        }

        // Crear objeto mensaje
        const message = {
            name,
            email,
            message: messageContent,
        };

        try {
            // Mostrar loader antes de la solicitud
            toggleLoader(true);

            // Llamar a la función sendMessage
            let res = await sendMessage(message);

            // Manejar la respuesta
            if (!res.error) {
                alert("Mensaje enviado con éxito.");
            } else {
                alert("Hubo un error: " + res.error);
            }
        } catch (error) {
            console.error("Error durante el envío del mensaje:", error);
            alert("Hubo un problema al procesar la solicitud.");
        } finally {
            // Ocultar loader después de la solicitud
            toggleLoader(false);

            // Opcional: Reiniciar el formulario después del envío
            form.reset();
        }
        
    });
});


const sendMessage = async (message) => {

    try {
      const data = message;//{ "joke": "This is a test joke" };
      const url = "/.netlify/functions/jokes";

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      return result;

    } catch (error) {
      console.error(error);
      throw new Error("Error en la solicitud: " + response.statusText);
    }
    
    
    
};



//-----------------
// Initialize AOS
AOS.init({
    duration: 800,
    offset: 100,
    once: true
  });
  
  // Smooth scroll for navigation links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      document.querySelector(this.getAttribute('href')).scrollIntoView({
        behavior: 'smooth'
      });
    });
  });
  
  // Navbar background on scroll
  const navbar = document.querySelector('.navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.style.background = 'rgba(15, 23, 42, 0.95)';
    } else {
      navbar.style.background = 'rgba(15, 23, 42, 0.8)';
    }
  });
  
  /*
  // Form submission animation
  const form = document.querySelector('.contact-form');

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const button = form.querySelector('button');

    //-------------------------


    //----------------------

    button.textContent = 'Enviando...';
    // Simulate form submission
    setTimeout(() => {
      button.textContent = '¡Mensaje Enviado!';
      form.reset();
      setTimeout(() => {
        button.textContent = 'Enviar Mensaje';
      }, 2000);
    }, 1500);
  });
  */