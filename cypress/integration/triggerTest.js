const Const = {
  GRID_SIZE: 5,
  RUNS: 100,
  OFFSET: { X: 100, Y: 20 }
};

context("Groups", () => {
  before(() => {
    cy.visit("http://localhost:8080/dist");
  });

  function move(coords, x, y) {
    cy.get(".outer")
      .first()
      .trigger("mousedown", Const.OFFSET.X, Const.OFFSET.Y, { which: 1 })
      .trigger("mousemove", Const.OFFSET.X + x, Const.OFFSET.Y + y, {
        which: 1,
        force: true
      })
      .trigger("mouseup", Const.OFFSET.X + x, Const.OFFSET.Y + y, {
        force: true
      });
    cy.get(".outer")
      .first()
      .then($grp => {
        let transform = $grp[0].style.transform;
        let myRegexp = /translate\(([0-9]*)px, ([0-9]*)px\)/;
        let match = myRegexp.exec(transform);

        let newCoords = { x: parseInt(match[1]), y: parseInt(match[2]) };
        expect(newCoords.x).to.eq(
          coords.x + x
        );
        expect(newCoords.y).to.eq(
          coords.y + y
        );
        return newCoords;
      });
  }

  it("Move div using header", () => {
    move({ x: 0, y: 0 }, 50, 35);
  });

  it("Move it a bit more", () => {
    move({ x: 50, y: 35 }, 200, 120);
  });
  it("Move it back", () => {
    move({ x: 250, y: 155 }, -10, -10);
  });
  it("Move it such that x and y are 0", () => {
    move({ x: 240, y: 145 }, -100, -20);
  });
});
