// Metodos que hacepta el calculo de la funcion de Riemann
export const methods = {
  1: "left",
  2: "right",
  3: "middle",
  4: "lower",
  5: "upper",
  6: "random",
  7: "simpson",
  8: "trapezoidal"
};

// Funcion que emite una alerta
export function alertOptions(values) {
  var mensaje = "Campos faltantes:\n";

  values.forEach(value => {
    mensaje += `${value} no puede estar vacio.\n`;
  });

  alert(mensaje);
}
