//array de preguntas de prueba
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

//Eleementos DOM
const contenedorPregunta = document.getElementById("contenedor-pregunta");
const contenedorOpciones = document.getElementById("contenedor-opciones");
const botonSubmit = document.getElementById("boton-submit");

//Function cargamos la pregunta
const cargarPregunta = () => {
    //Obtenemos la pregunta actual
    const pregunta = preguntas[preguntaActual];
    //Mostramos la pregunta en el DOM
    contenedorPregunta.textContent = pregunta.texto;

    //limpiamos opciones anterioes
    contenedorOpciones.innerHTML = "";

    //generamos opciones
    preguntas.opciones.forEach(opcion => {
        const botonOpcion = document.createElement("button");
        botonOpcion.textContent = opcion;
        botonOpcion.classList.add('opcion');
        botonOpcion.addEventListener('click', () => seleccionarOpcion());
        contenedorOpciones.appendChild(botonOpcion);
    });
};

//Funcion selecionamos una opcion
const seleccionarOpcion = () => {
    const pregunta = preguntas[preguntaActual];
    if (opcion === pregunta.correcta) {
        alert("¡Correcto!");
    } else {
        alert("¡Incorrecto!");
    }
    avanzarPregunta();
};

//funcion para avanzar la pregunta 
const avanzarPregunta = () => {
    preguntaActual++;
    if (preguntaActual < preguntas.length) {
        //slide effectaso
        contenedorPregunta.style.opacity = 0;
        contenedorOpciones.style.opacity = 0;

setTimeout(() =>{
cargarPregunta();
conten


})

    }

}