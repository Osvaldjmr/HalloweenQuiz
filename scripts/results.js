// Leer los resultados desde Local Storage
const cargarResultados = () => {
    try {
        return JSON.parse(localStorage.getItem('resultados')) || [];
    } catch (error) {
        console.error('Error al cargar resultados:', error);
        return [];
    }
};

// Dibujar la gráfica
const dibujarGrafica = (resultados) => {
    const canvas = document.getElementById('grafica-resultados');
    if (!canvas || resultados.length === 0) {
        console.log('No hay resultados para mostrar.');
        return;
    }

    const ctx = canvas.getContext('2d');
    const margen = 50;
    const maxPuntuacion = 10; // Escala máxima para las puntuaciones
    const espacioX = (canvas.width - 2 * margen) / resultados.length;
    const espacioY = (canvas.height - 2 * margen) / maxPuntuacion;

    // Estilo de la gráfica
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = 'black';
    ctx.fillStyle = 'red';
    ctx.font = '12px Arial';

    // Dibujar ejes
    ctx.beginPath();
    ctx.moveTo(margen, canvas.height - margen); // Eje Y
    ctx.lineTo(margen, margen);
    ctx.moveTo(margen, canvas.height - margen); // Eje X
    ctx.lineTo(canvas.width - margen, canvas.height - margen);
    ctx.stroke();

    // Etiquetas en los ejes
    ctx.fillText('0', margen - 10, canvas.height - margen + 10);
    ctx.fillText(maxPuntuacion, margen - 20, margen);

    // Dibujar puntos y líneas
    resultados.forEach((resultado, index) => {
        const x = margen + espacioX * index;
        const y = canvas.height - margen - resultado.puntuacion * espacioY;

        // Dibujar punto
        ctx.beginPath();
        ctx.arc(x, y, 5, 0, Math.PI * 2);
        ctx.fill();

        // Etiqueta de fecha
        ctx.fillText(resultado.fecha, x - 20, canvas.height - margen + 20);

        // Conectar puntos con líneas
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

// Botón para volver al inicio
document.getElementById('volver-inicio')?.addEventListener('click', () => {
    window.location.href = "home.html";
});

// Inicializar la página
window.onload = () => {
    const resultados = cargarResultados();
    dibujarGrafica(resultados);
};
