import { Application, Assets } from 'pixi.js';
import { createGrid } from './grid';
import './style.css';
import { createLevel } from './level';
import createRegularZombie from './entities/zombies/RegularZombie';
import type { Base } from './entities/base';
import createPixiRenderer from './renderer';

const app = new Application();

async function setup() {
  await app.init({ width: 800, height: 600 });
  document.body.appendChild(app.canvas);
  app.ticker.maxFPS = 60;
}

async function preload() {
  const assets = [
    {
      alias: 'peashooter',
      src: './src/assets/Peashooter.png',
    },
    {
      alias: 'regularZombie',
      src: './src/assets/RegularZombie.png',
    },
  ];

  await Assets.load(assets);
}

const grid = createGrid<Base>({
  rowsNumber: 3,
  columnsNumber: 3,
  screenHeight: 600,
  screenWidth: 800,
  gameHeight: 1000 * 60,
  gameWidth: 1000 * 800,
});
console.log(grid);

const renderer = createPixiRenderer<Base>(app);
(async () => {
  await preload();
  await setup();

  const level = createLevel({ grid, renderer });

  // const peashooterSprite = new Sprite(Assets.get('peashooter'));
  // const regularZombieSprite = new Sprite(Assets.get('regularZombie'));

  level.grid.rows[0][level.grid.rows.length - 1];
  level.addZombie(
    'regularZombie',
    createRegularZombie({
      name: 'Regular Zombie',
      health: 100,
      attackSpeed: 1,
      damage: 10,
      x: 0,
      y: 0,
    }),
    level.grid.rows[0][level.grid.rows.length - 1],
  );

  app.ticker.add(() => {
    level.performLoop();
  });
})();
