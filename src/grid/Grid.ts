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
  rows: number;
  columns: number;
  grid: Row<Cell<Z, P, PR>>[];
  screenHeight: number;
  screenWidth: number;
  gameHeight: number;
  gameWidth: number;
  getCellByGameCoordinates: (x: number, y: number) => Cell<Z, P, PR>;
  getCellByScreenCoordinates: (x: number, y: number) => Cell<Z, P, PR>;
  screenPositionToGamePosition: (x: number, y: number) => [number, number];
  gamePositionToScreenPosition: (x: number, y: number) => [number, number];
  heightRatio: number;
  widthRatio: number;
};

type CreateGridProps = {
  rows: number;
  columns: number;
  screenHeight: number;
  screenWidth: number;
  gameHeight: number;
  gameWidth: number;
};

function getCellByGameCoordinates<Z, P, PR>(this: Grid<Z, P, PR>, x: number, y: number): Cell<Z, P, PR> {
  const col = Math.floor(x / (this.gameWidth / this.columns));
  const row = Math.floor(y / (this.gameHeight / this.rows));

  return this.grid[row][col];
}

function getCellByScreenCoordinates<Z, P, PR>(this: Grid<Z, P, PR>, x: number, y: number): Cell<Z, P, PR> {
  const col = Math.floor(x / (this.screenWidth / this.columns));
  const row = Math.floor(y / (this.screenHeight / this.rows));

  return this.grid[row][col];
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
  rows,
  columns,
  screenHeight,
  screenWidth,
  gameHeight,
  gameWidth,
}: CreateGridProps): Grid<Z, P, PR> => {
  const cellScreenWidth = Math.floor(screenWidth / columns);
  const cellScreenHeight = Math.floor(screenHeight / rows);
  const cellGameWidth = Math.floor(gameWidth / columns);
  const cellGameHeight = Math.floor(gameHeight / rows);

  const widthRation = screenWidth / gameWidth;
  const heightRation = screenHeight / gameHeight;

  const grid = Array.from({ length: rows }, () =>
    Array.from({ length: columns }, (): Cell<Z, P, PR> => {
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
    columns,
    screenHeight,
    screenWidth,
    gameHeight,
    gameWidth,
    grid,
    heightRatio: heightRation,
    widthRatio: widthRation,
    getCellByGameCoordinates,
    getCellByScreenCoordinates,
    screenPositionToGamePosition,
    gamePositionToScreenPosition,
  };
};

export { createGrid };
export type { Grid, Cell, CreateGridProps };
