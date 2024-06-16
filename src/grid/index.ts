type Cell<E> = {
  zombies: E[];
  plants: E[];
  projectiles: E[];
  gameWidth: number;
  gameHeight: number;
  screenWidth: number;
  screenHeight: number;
  gameX: number;
  gameY: number;
  getGameX: () => number;
  getGameY: () => number;
};

type Row<C> = C[];

type Grid<E> = {
  rows: Row<Cell<E>>[];
  rowsNumber: number;
  columnsNumber: number;
  screenHeight: number;
  screenWidth: number;
  gameHeight: number;
  gameWidth: number;
  getCellByGameCoordinates: (x: number, y: number) => Cell<E>;
  getCellByScreenCoordinates: (x: number, y: number) => Cell<E>;
  getRowByGameCoordinates: (y: number) => Row<Cell<E>>;
  getRowByScreenCoordinates: (y: number) => Row<Cell<E>>;
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

function getCellByGameCoordinates<E>(this: Grid<E>, x: number, y: number): Cell<E> {
  const col = Math.floor(x / (this.gameWidth / this.columnsNumber));
  const row = Math.floor(y / (this.gameHeight / this.rowsNumber));

  return this.rows[row][col];
}

function getCellByScreenCoordinates<E>(this: Grid<E>, x: number, y: number): Cell<E> {
  const col = Math.floor(x / (this.screenWidth / this.columnsNumber));
  const row = Math.floor(y / (this.screenHeight / this.rowsNumber));

  return this.rows[row][col];
}

function getRowByGameCoordinates<E>(this: Grid<E>, y: number): Row<Cell<E>> {
  const row = Math.floor(y / (this.gameHeight / this.rowsNumber));

  return this.rows[row];
}

function getRowByScreenCoordinates<E>(this: Grid<E>, y: number): Row<Cell<E>> {
  const row = Math.floor(y / (this.screenHeight / this.rowsNumber));

  return this.rows[row];
}

function screenPositionToGamePosition<E>(this: Grid<E>, x: number, y: number): [number, number] {
  const gameX = x / this.widthRatio;
  const gameY = y / this.heightRatio;

  return [gameX, gameY];
}

function gamePositionToScreenPosition<E>(this: Grid<E>, x: number, y: number): [number, number] {
  const screenX = x * this.widthRatio;
  const screenY = y * this.heightRatio;

  return [screenX, screenY];
}

const createGrid = <E>({
  rowsNumber,
  columnsNumber,
  screenHeight,
  screenWidth,
  gameHeight,
  gameWidth,
}: CreateGridProps): Grid<E> => {
  const cellScreenWidth = Math.floor(screenWidth / columnsNumber);
  const cellScreenHeight = Math.floor(screenHeight / rowsNumber);
  const cellGameWidth = Math.floor(gameWidth / columnsNumber);
  const cellGameHeight = Math.floor(gameHeight / rowsNumber);

  const widthRation = screenWidth / gameWidth;
  const heightRation = screenHeight / gameHeight;

  const rows = Array.from({ length: rowsNumber }, (_, iRow: number) =>
    Array.from({ length: columnsNumber }, (_, iCell: number): Cell<E> => {
      return {
        zombies: [],
        plants: [],
        projectiles: [],
        gameWidth: cellGameWidth,
        gameHeight: cellGameHeight,
        screenWidth: cellScreenWidth,
        screenHeight: cellScreenHeight,
        gameX: iCell * cellGameWidth,
        gameY: iRow * cellGameHeight,
        x: iCell * cellScreenWidth,
        y: iRow * cellScreenHeight,
        getGameX() {
          return this.gameX;
        },
        getGameY() {
          return this.gameY;
        },
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

export { createGrid, SPAWN_ALIGNMENT };
export type { Grid, Cell, Row, CreateGridProps };
