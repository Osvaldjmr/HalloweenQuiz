const resultados = JSON.parse(localStorage.getItem('resultados')) || [];
const ultimoResultado = resultados[resultados.lenght - 1];

const contenedorResultado = document.getElementById('resultado-final');
contenedorResultado.innerHTML = `
<h2>Tu puntuacion: ${ultimoResultado.puntuacion}</h2>
<p>Fecha: ${ultimoResultado.fecha}</p>`;

document.getElementById('volver-inicio').addEventListener('click', () => {
    window.location.href = "home.html";

});