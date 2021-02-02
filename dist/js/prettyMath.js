const expr = document.getElementById("inputVarF");
const pretty = document.getElementById("pretty");
const btnGraph = document.getElementById("btnGraph");

let parenthesis = "keep";
let implicit = "hide";

const mj = function (tex) {
  return MathJax.tex2svg(tex, { em: 16, ex: 6, display: true });
};

// initialize with an example expression
expr.value = "Math.sin(x)";
pretty.innerHTML = "";
pretty.appendChild(
  mj(math.parse(expr.value).toTex({ parenthesis: parenthesis }))
);

expr.oninput = function () {
  let node = null;

  try {
    // parse the expression
    node = math.parse(expr.value);

    // console.log("Correcto", node);
    btnGraph.classList.remove("disabled");
  } catch (err) {
    // console.log("Error", node);
    btnGraph.classList.add("disabled");
  }

  try {
    // export the expression to LaTeX
    const latex = node
      ? node.toTex({ parenthesis: parenthesis, implicit: implicit })
      : "";
    console.log("LaTeX expression:", latex);

    // display and re-render the expression
    MathJax.typesetClear();
    pretty.innerHTML = "";
    pretty.appendChild(mj(latex));
  } catch (err) {}
};
