// Inicializar resultados en Local Storage
const initResultados = () => {
    if (!localStorage.getItem('resultados')) {
        localStorage.setItem('resultados', JSON.stringify([]));
    }
};

// Cargar resultados
const cargarResultados = () => {
    try {
        return JSON.parse(localStorage.getItem('resultados')) || [];
    } catch (error) {
        console.error('Error al leer resultados del Local Storage', error);
        return [];
    }
};

// Dibujar gráfica en el canvas
const dibujarGrafica = (canvas, resultados) => {
    if (!canvas || resultados.length === 0) return;

    const ctx = canvas.getContext('2d');
    const margen = 50;
    const maxPuntuacion = 10;
    const espacioX = (canvas.width - 2 * margen) / resultados.length;
    const espacioY = (canvas.height - 2 * margen) / maxPuntuacion;

    // Dibujar ejes
    ctx.strokeStyle = 'black';
    ctx.beginPath();
    ctx.moveTo(margen, canvas.height - margen); // Eje Y
    ctx.lineTo(margen, margen);
    ctx.moveTo(margen, canvas.height - margen); // Eje X
    ctx.lineTo(canvas.width - margen, canvas.height - margen);
    ctx.stroke();

    // Etiquetas de ejes
    ctx.fillStyle = 'black';
    ctx.fillText('0', margen - 10, canvas.height - margen + 10);
    ctx.fillText(maxPuntuacion, margen - 20, margen);

    // Dibujar puntos y líneas
    ctx.fillStyle = 'red';
    resultados.forEach((resultado, index) => {
        const x = margen + espacioX * index;
        const y = canvas.height - margen - resultado.puntuacion * espacioY;

        ctx.beginPath();
        ctx.arc(x, y, 5, 0, Math.PI * 2);
        ctx.fill();

        if (index > 0) {
            const xPrev = margen + espacioX * (index - 1);
            const yPrev = canvas.height - margen - resultados[index - 1].puntuacion * espacioY;
            ctx.beginPath();
            ctx.moveTo(xPrev, yPrev);
            ctx.lineTo(x, y);
            ctx.stroke();
        }
    });
};

// Inicializar resultados y gráfica
window.onload = () => {
    initResultados();
    const resultados = cargarResultados();
    const canvas = document.getElementById('grafica-resultados');
    dibujarGrafica(canvas, resultados);
};
