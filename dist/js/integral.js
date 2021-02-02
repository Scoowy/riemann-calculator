export class GraphIntegral {
  constructor(el, varF) {
    this.board = JXG.JSXGraph.initBoard(el, {
      axis: true,
      boundingbox: [-8, 6, 8, -6]
    });

    this.f = varF;
  }

  plot() {
    var F = this.f;

    return this.board.create("functiongraph", [F]);
  }

  plotIntegral(riemann, c) {
    var A = riemann.a;
    var B = riemann.b;

    this.board.create("integral", [
      [
        function () {
          return A.Value();
        },
        function () {
          return B.Value();
        }
      ],
      c
    ]);
  }
}
