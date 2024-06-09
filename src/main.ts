import { Application, Sprite, Assets } from 'pixi.js';
import { createGrid } from './grid/Grid';
import './style.css';
import { createLevel } from './level';
import type { RegularZombie } from './entities/zombies/RegularZombie';
import type { PeashooterPlant } from './entities/plants/PeashooterPlant';
import type { PeaProjectile } from './entities/projectiles/PeaProjectile';
import createRegularZombie from './entities/zombies/RegularZombie';

const app = new Application();

async function setup() {
  await app.init({ width: 800, height: 600 });
  document.body.appendChild(app.canvas);
  app.ticker.maxFPS = 1;
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

const grid = createGrid<RegularZombie, PeashooterPlant<PeaProjectile>, PeaProjectile>({
  rowsNumber: 3,
  columnsNumber: 3,
  screenHeight: 600,
  screenWidth: 800,
  gameHeight: 1000,
  gameWidth: 2000,
});
console.log(grid);

(async () => {
  await preload();
  await setup();

  const level = createLevel({ grid });

  const peashooterSprite = new Sprite(Assets.get('peashooter'));
  const regularZombieSprite = new Sprite(Assets.get('regularZombie'));

  regularZombieSprite.x = 200;
  regularZombieSprite.y = 100;

  peashooterSprite.x = 100;
  peashooterSprite.y = 100;

  app.stage.addChild(peashooterSprite);
  app.stage.addChild(regularZombieSprite);

  app.ticker.add(() => {});
})();
