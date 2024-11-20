// resultados inicializados en LS si no exsiten

const initResultados = () => {
    if (!localStorage.getItem('resultados')) {
        localStorage.setItem('resultados', JSON.stringify([]));
    }
};

//resultados guardados pa leer
const cargarResultados = () => {
    const resultados = JSON.parse(localStorage.getItem('resultados')) || [];
    console.log("Resultados cargados:", resultados);
    return resultados;
};

//funcion de inicializacion llamar
initResultados();
const resultados = cargarResultados();

//Mensjae si no hay resultados
if (resultados.length === 0) {
    console.log("Aún no hay resultados para mostrar")
};

//F para format datos de la grafica
const prepararDatosParaGrafica = () => {
    const resultados = JSON.parse(localStorage.getItem('resultados')) || [];

    if (resultados.length === 0) {
        console.log("No hay resultados para graficar.");
        return { fechas: [], puntuaciones: [] };

    }

    //fechas y puntuaciones
    const fechas = resultados.map(resultado => resultado.fecha);
    const puntuaciones = resultados.map(resultado => resultado.puntuacion);

    console.log("Fechas:", fechas);
    console.log("Puntuaciones:", puntuaciones);

    return { fechas, puntuaciones };

};

//llamar a la funcion para verificar sin funciona
const datosGrafica = prepararDatosParaGrafica();

const ejemploResultados = [
    { fecha: "2024-11-18", puntuacion: 10 },
    { fecha: "2024-11-19", puntuacion: 9 }
];
localStorage.setItem('resultados', JSON.stringify(ejemploResultados));

document.getElementById('grafica-resultados');
const canvas = document.getElementById('grafica-resultados');
const ctx = canvas.getContext('2d');

const { fechas, puntuaciones } = datosGrafica; // datos extraidos

//margenes y dimensiones
const margenIzquierdo = 50;
const espacioX = (canvas.width - 100) / fechas.length;// resta 100 px de margen a cada lado, ancho util dividido entre el numero de fechas
const maxPuntuacion = 10; // maximo valor de puntuacion
const espacioY = (canvas.height - 100) / maxPuntuacion;

//config estilos
ctx.strokeStyle = 'black';// color de los ejes
ctx.fillStyle = 'red';// color de los puntos


//dibujar ejes
ctx.beginPath();//inicio del trazo
//eje vertical(Y)
ctx.moveTo(50, canvas.height - 50);//lapiz a 50 50, punto inicial del Y
ctx.lineTo(50, 50);//dibuja linea al pinto 50 50, punto final del eje Y

//eje horizontal(X)
ctx.moveTo(50, canvas.height - 50);//punto inicial del eje x
ctx.lineTo(canvas.width - 50, canvas.height - 50);//punto final del eje X


ctx.fillText("0", 30, canvas.height - 50); // etiqueta en el eje Y
ctx.fillText("2024-11-8", 60, canvas.height - 30); // etiquet en el eje x
ctx.fillText("1", 30, canvas.height - 90); // etiqueta en el eje Y
ctx.fillText("2024-11-8", 140, canvas.height - 30);

console.log("Fechas:", fechas);
console.log("Puntuaciones:", puntuaciones);

ctx.stroke(); //aplica el trazo en canvas

//dibujar puntitos
fechas.forEach((fecha, index) => {
    const x = margenIzquierdo + espacioX * index; // calcular la posicion x para cada fecha, index= indice actual en el loop 
    const y = canvas.height - 50 - puntuaciones[index] * espacioY; // calcular la posicion y para cada fecha, index= indice actual en el loop
    console.log(`Fecha: ${fecha}, Posición X: ${x}`);

    //dibujar punto
    ctx.beginPath();
    ctx.arc(x, y, 5, 0, Math.PI * 2); // dibujar un círculo en la posición x, y con radio 5
    ctx.fill();//rellena el punto

    //etiquet debajo dle punto
    ctx.fillText(fecha, x - 15, canvas.height - 30);//fecha como etiqueta
});

/* if (fechas.length === 0) {
    ctx.clearRect(0, 0, canvas.width, canvas.height); //para limpiar el canvas
    ctx.fillStyle = 'black';
    ctx.font = '16px Arial';
    ctx.fillText("No hay resultados que mostrar", canvas.width / 2 - 100, canvas.height / 2);
}
 */

