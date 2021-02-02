export class GraphRiemman {
  constructor(el, varF, varN, varA, varB) {
    this.board = JXG.JSXGraph.initBoard(el, {
      axis: true,
      boundingbox: [-8, 6, 8, -6]
    });

    this.n = this.board.create(
      "slider",
      [
        [1, 4],
        [5, 4],
        [1, varN, 500]
      ],
      { name: "n", snapWidth: 1 }
    );

    this.a = this.board.create(
      "slider",
      [
        [1, 3],
        [5, 3],
        [-10, varA, 10]
      ],
      { name: "a" }
    );

    this.b = this.board.create(
      "slider",
      [
        [1, 2],
        [5, 2],
        [-10, varB, 10]
      ],
      { name: "b" }
    );

    // this.f = function (x) {
    //   return eval(varF);
    // };

    this.f = new Function("x", `return ${varF};`);
  }

  plot() {
    var F = this.f;
    var A = this.a;
    var B = this.b;

    return this.board.create("functiongraph", [
      F,
      function () {
        return A.Value();
      },
      function () {
        return B.Value();
      }
    ]);
  }

  valueRiemann(dir) {
    var F = this.f;
    var N = this.n;
    var A = this.a;
    var B = this.b;

    this.board.create(
      "text",
      [
        -6,
        -3,
        function () {
          return (
            "Suma=" +
            JXG.Math.Numerics.riemann(
              F,
              N.Value(),
              dir,
              A.Value(),
              B.Value()
            )[2].toFixed(4)
          );
        }
      ],
      { fontSize: 20 }
    );
  }

  plotRiemann(dir = "left") {
    var F = this.f;
    var N = this.n;
    var A = this.a;
    var B = this.b;

    this.board.create(
      "riemannsum",
      [
        F,
        function () {
          return N.Value();
        },
        function () {
          return dir;
        },
        function () {
          return A.Value();
        },
        function () {
          return B.Value();
        }
      ],
      { fillColor: "#ffff00", fillOpacity: 0.4 }
    );

    this.valueRiemann(dir);
  }
}

export function getRiemannSum(graph, dir = "left") {
  return JXG.Math.Numerics.riemann(
    graph.f,
    graph.n.Value(),
    dir,
    graph.a.Value(),
    graph.b.Value()
  )[2].toFixed(4);
}
