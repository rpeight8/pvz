import type { IZombie } from '@/entities/zombies/Zombie/Zombie';

interface ICell {
  zombies: IZombie[];
  plants: unknown[];
  projectiles: unknown[];
  screenX: number;
  screenY: number;
  gameX: number;
  gameY: number;
  gameWidth: number;
  gameHeight: number;
  screenWidth: number;
  screenHeight: number;
}

interface IGrid {
  rows: number;
  columns: number;
  grid: ICell[][];
  screenHeight: number;
  screenWidth: number;
  gameHeight: number;
  gameWidth: number;
}

interface CreateGridProps {
  rows: number;
  columns: number;
  screenHeight: number;
  screenWidth: number;
  gameHeight: number;
  gameWidth: number;
}

const createGrid = ({ rows, columns, screenHeight, screenWidth, gameHeight, gameWidth }: CreateGridProps): IGrid => {
  const cellScreenWidth = Math.floor(screenWidth / columns);
  const cellScreenHeight = Math.floor(screenHeight / rows);
  const cellGameWidth = Math.floor(gameWidth / columns);
  const cellgameHeight = Math.floor(gameHeight / rows);

  const grid = Array.from({ length: rows }, (_, iR) =>
    Array.from({ length: columns }, (_, iC) => {
      return {
        zombies: [],
        plants: [],
        projectiles: [],
        screenX: iC * cellScreenWidth,
        screenY: iR * cellScreenHeight,
        gameX: iC * cellGameWidth,
        gameY: iR * cellgameHeight,
        gameWidth: cellGameWidth,
        gameHeight: cellgameHeight,
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
  };
};

export default createGrid;
