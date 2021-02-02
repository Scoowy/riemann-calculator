import { GraphRiemman, getRiemannSum } from "./riemann.js";
import { GraphIntegral } from "./integral.js";
import { methods, alertOptions } from "./utils.js";

const btnGraph = document.getElementById("btnGraph");
btnGraph.addEventListener("click", graphBoards);

// Variables globales
var f, n, a, b, dir;

// Funcion que acciona la graficacion de los dos ejemplos
function graphBoards(ev) {
  var valid = false;
  var invalids = [];

  ev.preventDefault();

  // Obtnener los valores del formulario
  const form = document.getElementById("formOptions");
  f = form["inputVarF"].value;
  n = form["inputVarN"].value;
  a = form["inputVarA"].value;
  b = form["inputVarB"].value;

  const method = form["method"];

  dir = methods[method.options[method.selectedIndex].value];

  // Se comprueba si exite una funcion a graficar
  if (f === "") {
    invalids.push("f");
    alertOptions(invalids);
  } else {
    valid = true;
  }

  // En el caso de ser valido se ejecuta
  if (valid) {
    console.log(f, n, a, b, dir);
    const riemann = graficaRiemann();
    riemann.board.on("update", evt => {
      // console.log("Se actualizo");
      graficaIntegral(riemann);
    });
    graficaIntegral(riemann);
  }
}

function graficaRiemann() {
  const riemann = new GraphRiemman("jsgbox", f, n, a, b);
  const c = riemann.plot();
  riemann.plotRiemann(dir);

  return riemann;
}

function graficaIntegral(riemann) {
  const integral = new GraphIntegral(
    "jsgboxIntegral",
    riemann.f,
    riemann.a,
    riemann.b
  );

  const c = integral.plot();
  integral.plotIntegral(riemann, c);
}
