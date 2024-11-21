// Array de preguntas de prueba
const preguntas = [
    {
        texto: "¿Qué criatura es famosa por su aullido en Halloween?",
        opciones: ["Lobo", "Murciélago", "Fantasma", "Bruja"],
        correcta: "Lobo"
    },
    {
        texto: "¿Cuál es el origen del Halloween?",
        opciones: ["México", "Estados Unidos", "Irlanda", "Egipto"],
        correcta: "Irlanda"
    }
];

// Variables globales de pregunta
let preguntaActual = 0;

// Elementos del DOM
const contenedorPregunta = document.getElementById("pregunta");
const contenedorOpciones = document.getElementById("contenedor-opciones");

// Función para cargar la pregunta
const cargarPregunta = () => {
    // Obtenemos la pregunta actual
    const pregunta = preguntas[preguntaActual];

    // Mostramos la pregunta en el DOM
    contenedorPregunta.textContent = pregunta.texto;

    // Limpiamos opciones anteriores
    contenedorOpciones.innerHTML = "";

    // Generamos las opciones
    pregunta.opciones.forEach(opcion => {
        const botonOpcion = document.createElement("button");
        botonOpcion.textContent = opcion;
        botonOpcion.classList.add('opcion');
        botonOpcion.addEventListener('click', () => seleccionarOpcion(opcion)); // Pasar la opción seleccionada
        contenedorOpciones.appendChild(botonOpcion);
    });
};

// Función para seleccionar una opción
const seleccionarOpcion = (opcion) => {
    const pregunta = preguntas[preguntaActual];
    if (opcion === pregunta.correcta) {
        puntuacion++;
        alert("¡Correcto!");
    } else {
        alert("¡Incorrecto!");
    }
    avanzarPregunta();
};

// Función para avanzar a la siguiente pregunta
const avanzarPregunta = () => {
    preguntaActual++;
    if (preguntaActual < preguntas.length) {
        // Efecto de "slide"
        contenedorPregunta.style.opacity = 0;
        contenedorOpciones.style.opacity = 0;

        setTimeout(() => {
            cargarPregunta();
            contenedorPregunta.style.opacity = 1;
            contenedorOpciones.style.opacity = 1;
        }, 300); // Tiempo del efecto
    } else {
        alert("¡Fin de preguntas!");

    }
    let preguntaFinal = preguntaActual >= preguntas.length;

    if (preguntaFinal) {
        const resultadosGuardados = JSON.parse(localStorage.getItem('resultados')) || [];
        resultadosGuardados.push({
            fecha: new Date().toISOString().split('T')[0], //Fecha Actual)
            puntuacion
        });
        localStorage.setItem('resultados', JSON.stringify(resultadosGuardados));
        alert("!Fin del Quiz¡ Tu puntuacion: " + puntuacion);
        window.location.href = "results.html"; //Redirigimos a la pagina de resultado
    }
};

let puntuacion = 0;







// Iniciar el Quiz
cargarPregunta();
