type Cell<Z, P, PR> = {
  zombies: Z[];
  plants: P[];
  projectiles: PR[];
  gameWidth: number;
  gameHeight: number;
  screenWidth: number;
  screenHeight: number;
};

type Row<C> = C[];

type Grid<Z, P, PR> = {
  rows: Row<Cell<Z, P, PR>>[];
  rowsNumber: number;
  columnsNumber: number;
  screenHeight: number;
  screenWidth: number;
  gameHeight: number;
  gameWidth: number;
  getCellByGameCoordinates: (x: number, y: number) => Cell<Z, P, PR>;
  getCellByScreenCoordinates: (x: number, y: number) => Cell<Z, P, PR>;
  getRowByGameCoordinates: (y: number) => Row<Cell<Z, P, PR>>;
  getRowByScreenCoordinates: (y: number) => Row<Cell<Z, P, PR>>;
  screenPositionToGamePosition: (x: number, y: number) => [number, number];
  gamePositionToScreenPosition: (x: number, y: number) => [number, number];
  heightRatio: number;
  widthRatio: number;
};

type CreateGridProps = {
  rowsNumber: number;
  columnsNumber: number;
  screenHeight: number;
  screenWidth: number;
  gameHeight: number;
  gameWidth: number;
};

function getCellByGameCoordinates<Z, P, PR>(this: Grid<Z, P, PR>, x: number, y: number): Cell<Z, P, PR> {
  const col = Math.floor(x / (this.gameWidth / this.columnsNumber));
  const row = Math.floor(y / (this.gameHeight / this.rowsNumber));

  return this.rows[row][col];
}

function getCellByScreenCoordinates<Z, P, PR>(this: Grid<Z, P, PR>, x: number, y: number): Cell<Z, P, PR> {
  const col = Math.floor(x / (this.screenWidth / this.columnsNumber));
  const row = Math.floor(y / (this.screenHeight / this.rowsNumber));

  return this.rows[row][col];
}

function getRowByGameCoordinates<Z, P, PR>(this: Grid<Z, P, PR>, y: number): Row<Cell<Z, P, PR>> {
  const row = Math.floor(y / (this.gameHeight / this.rowsNumber));

  return this.rows[row];
}

function getRowByScreenCoordinates<Z, P, PR>(this: Grid<Z, P, PR>, y: number): Row<Cell<Z, P, PR>> {
  const row = Math.floor(y / (this.screenHeight / this.rowsNumber));

  return this.rows[row];
}

function screenPositionToGamePosition<Z, P, PR>(this: Grid<Z, P, PR>, x: number, y: number): [number, number] {
  const gameX = x / this.widthRatio;
  const gameY = y / this.heightRatio;

  return [gameX, gameY];
}

function gamePositionToScreenPosition<Z, P, PR>(this: Grid<Z, P, PR>, x: number, y: number): [number, number] {
  const screenX = x * this.widthRatio;
  const screenY = y * this.heightRatio;

  return [screenX, screenY];
}

const createGrid = <Z, P, PR>({
  rowsNumber,
  columnsNumber,
  screenHeight,
  screenWidth,
  gameHeight,
  gameWidth,
}: CreateGridProps): Grid<Z, P, PR> => {
  const cellScreenWidth = Math.floor(screenWidth / columnsNumber);
  const cellScreenHeight = Math.floor(screenHeight / rowsNumber);
  const cellGameWidth = Math.floor(gameWidth / columnsNumber);
  const cellGameHeight = Math.floor(gameHeight / rowsNumber);

  const widthRation = screenWidth / gameWidth;
  const heightRation = screenHeight / gameHeight;

  const rows = Array.from({ length: rowsNumber }, () =>
    Array.from({ length: columnsNumber }, (): Cell<Z, P, PR> => {
      return {
        zombies: [],
        plants: [],
        projectiles: [],
        gameWidth: cellGameWidth,
        gameHeight: cellGameHeight,
        screenWidth: cellScreenWidth,
        screenHeight: cellScreenHeight,
      };
    }),
  );

  return {
    rows,
    rowsNumber,
    columnsNumber,
    screenHeight,
    screenWidth,
    gameHeight,
    gameWidth,
    heightRatio: heightRation,
    widthRatio: widthRation,
    getCellByGameCoordinates,
    getCellByScreenCoordinates,
    getRowByGameCoordinates,
    getRowByScreenCoordinates,
    screenPositionToGamePosition,
    gamePositionToScreenPosition,
  };
};

export { createGrid };
export type { Grid, Cell, CreateGridProps };
