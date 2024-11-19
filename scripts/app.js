// resultados inicializados en LS si no exsiten

const initResultados = () => {
    if (!localStorage.getItem('resultados')) {
        localStorage.setItem('resultados', JSON.stringify([]));
    }
};

//resultados guardados pa leer
const cargarResultados = () => {
    const resultados = JSON.parse(localStorage.getItem('resultados')) || [];
    console.log("Resultados cargados:".resultados);
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