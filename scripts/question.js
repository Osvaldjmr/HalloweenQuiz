// Variables globales
let preguntas = [];
let preguntaActual = 0;
let puntuacion = 0;

// Elementos del DOM
const contenedorPregunta = document.getElementById("pregunta");
const contenedorOpciones = document.getElementById("contenedor-opciones");
const botonFinalizar = document.getElementById("boton-finalizar");

// Obtener preguntas desde la API
const obtenerPreguntas = async () => {
    try {
        const response = await fetch('https://opentdb.com/api.php?amount=10&type=multiple');
        const data = await response.json();
        return data.results.map(p => ({
            texto: p.question,
            opciones: [...p.incorrect_answers, p.correct_answer].sort(() => Math.random() - 0.5),
            correcta: p.correct_answer,
        }));
    } catch (error) {
        console.error('Error al obtener preguntas:', error);
        return [];
    }
};

// Cargar la pregunta actual
const cargarPregunta = () => {
    if (preguntaActual >= preguntas.length) {
        // Mostrar el botón de finalizar
        botonFinalizar.style.display = 'block';
        return;
    }

    const pregunta = preguntas[preguntaActual];
    contenedorPregunta.textContent = pregunta.texto;
    contenedorOpciones.innerHTML = "";

    pregunta.opciones.forEach(opcion => {
        const boton = document.createElement('button');
        boton.textContent = opcion;
        boton.classList.add('opcion');
        boton.addEventListener('click', () => seleccionarOpcion(opcion));
        contenedorOpciones.appendChild(boton);
    });
};

// Validar la respuesta seleccionada
const seleccionarOpcion = (opcion) => {
    const pregunta = preguntas[preguntaActual];
    if (opcion === pregunta.correcta) {
        puntuacion++;
    }
    preguntaActual++;
    cargarPregunta();
};

// Guardar resultados en Local Storage
const guardarResultados = () => {
    const resultados = JSON.parse(localStorage.getItem('resultados')) || [];
    resultados.push({
        fecha: new Date().toISOString().split('T')[0],
        puntuacion,
    });
    localStorage.setItem('resultados', JSON.stringify(resultados));
};

// Redirigir a la página de resultados
botonFinalizar.addEventListener('click', () => {
    guardarResultados();
    window.location.href = "results.html";
});

// Iniciar el Quiz
(async () => {
    preguntas = await obtenerPreguntas();
    cargarPregunta();
})();
