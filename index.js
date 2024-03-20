import { initializeApp } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-analytics.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-auth.js";
import { getDatabase, ref, push } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-database.js";

const firebaseConfig = {
    apiKey: "AIzaSyDXvCPeur2xWtbKePZ-qmq53BdM8pLxLZg",
    authDomain: "sorteoweb-a8600.firebaseapp.com",
    projectId: "sorteoweb-a8600",
    storageBucket: "sorteoweb-a8600.appspot.com",
    messagingSenderId: "181610596912",
    appId: "1:181610596912:web:31ceacd64fa81c06d4fbf5",
    measurementId: "G-1REX4DS4FH"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Referencia a la base de datos
const database = getDatabase();

// Esperar a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function () {
    // Obtener referencia al formulario
    const registrationForm = document.getElementById('registrationForm');

    // Agregar evento de envío al formulario
    registrationForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevenir el comportamiento predeterminado del formulario
        
        // Obtener los valores del formulario
        const nombre = document.getElementById('nombre').value;
        const correo = document.getElementById('correo').value;
        const telefono = document.getElementById('telefono').value;
        const boletos = document.getElementById('boletos').value;
        const metodoPago = document.getElementById('metodoPago').value;
        
        // Crear un nuevo registro en la base de datos
        push(ref(database, 'Participantes'), {
            nombre: nombre,
            correo: correo,
            telefono: telefono,
            boletos: boletos,
            metodoPago: metodoPago
        })
        .then(() => {
            // Limpiar el formulario después de enviar los datos
            registrationForm.reset();
            alert('¡Registro exitoso!');
        })
        .catch(error => {
            console.error('Error al enviar los datos:', error);
            alert('Hubo un error al registrar. Por favor, intenta nuevamente.');
        });
    });
});



//FIN DE FIREBASE//
document.addEventListener('DOMContentLoaded', function () {
    const slider = document.getElementById('slider');
    const slides = slider.querySelectorAll('.slide');
    const prevButton = document.querySelector('.prev');
    const nextButton = document.querySelector('.next');

    let currentIndex = 0;

    function showSlide(index) {
        slides.forEach((slide, i) => {
            if (i === index) {
                slide.style.display = 'block';
            } else {
                slide.style.display = 'none';
            }
        });
    }

    function prevSlide() {
        currentIndex--;
        if (currentIndex < 0) {
            currentIndex = slides.length - 1;
        }
        showSlide(currentIndex);
    }

    function nextSlide() {
        currentIndex++;
        if (currentIndex >= slides.length) {
            currentIndex = 0;
        }
        showSlide(currentIndex);
    }

    // Mostrar la primera imagen al cargar la página
    showSlide(currentIndex);

    // Agregar eventos a los botones de flecha
    prevButton.addEventListener('click', prevSlide);
    nextButton.addEventListener('click', nextSlide);
});

//CONTADOR//

// Fecha objetivo: Lunes 8 de abril de este año
const fechaObjetivo = new Date('2024-04-08T00:00:00');

function actualizarContador() {
    const ahora = new Date().getTime();
    const diferencia = fechaObjetivo - ahora;

    // Calculando días, horas, minutos y segundos
    const dias = Math.floor(diferencia / (1000 * 60 * 60 * 24));
    const horas = Math.floor((diferencia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutos = Math.floor((diferencia % (1000 * 60 * 60)) / (1000 * 60));
    const segundos = Math.floor((diferencia % (1000 * 60)) / 1000);

    // Actualizar los círculos con los nuevos valores
    document.getElementById('daysText').innerText = dias;
    document.getElementById('hoursText').innerText = horas;
    document.getElementById('minutesText').innerText = minutos;
    document.getElementById('secondsText').innerText = segundos;

    // Verificar si alcanzamos la fecha objetivo
    if (diferencia <= 0) {
        clearInterval(intervalo); // Detener el contador
    }
}

// Actualizar el contador cada segundo
const intervalo = setInterval(actualizarContador, 1000);

// Ejecutar la función para que el contador se actualice inmediatamente
actualizarContador();

