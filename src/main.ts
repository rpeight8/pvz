import { Application, Assets, Graphics } from 'pixi.js';
import { createGrid } from './grid';
import './style.css';
import { createLevel, SPAWN_ALIGNMENT } from './level';
import type { Base } from './entities/common/base';
import createPixiRenderer, { RendererWrapped } from './renderer';
import createRegularZombieRenderer from './entities/renderer/zombies/RegularZombie';
import createPeashooterPlantRenderer, { PeashooterPlantRenderer } from './entities/renderer/plants/PeashooterPlant';
const app = new Application();

async function setup() {
  await app.init({ width: 800, height: 600 });
  document.body.appendChild(app.canvas);
  app.ticker.maxFPS = 60;
}
globalThis.__PIXI_APP__ = app;

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
    {
      alias: 'pea',
      src: './src/assets/Pea.png',
    },
  ];

  await Assets.load(assets);
}

const grid = createGrid<RendererWrapped<Base>>({
  rowsNumber: 6,
  columnsNumber: 8,
  screenHeight: 600,
  screenWidth: 800,
  gameHeight: 1000 * 60,
  gameWidth: 1000 * 800,
});

const renderer = createPixiRenderer<RendererWrapped<Base>>(app);
(async () => {
  await preload();
  await setup();

  const level = createLevel({ grid, renderer });

  // drawGrid
  const graphics = new Graphics();
  level.grid.rows.forEach((row) => {
    row.forEach((cell) => {
      // Set the fill color (optional)
      graphics.stroke();

      // Draw a rectangle
      graphics.rect(cell.x, cell.y, cell.screenWidth, cell.screenHeight);

      // End the fill (optional)

      // Add the Graphics Object to the Stage
      app.stage.addChild(graphics);
    });
  });

  // const peashooterSprite = new Sprite(Assets.get('peashooter'));
  // const regularZombieSprite = new Sprite(Assets.get('regularZombie'));
  // regularZombieSprite.x = 399;
  // regularZombieSprite.y = 100;
  // app.stage.addChild(regularZombieSprite);

  // spawn 100 zombies in random cells
  // for (let i = 0; i < 100; i++) {
  //   const randomRow = Math.floor(Math.random() * grid.rows.length);
  //   const randomColumn = Math.floor(Math.random() * grid.rows[randomRow].length);
  //   level.addZombie({
  //     texture: 'regularZombie',
  //     entity: createRegularZombie({
  //       name: 'Regular Zombie',
  //       health: 100,
  //       attackSpeed: 1,
  //       damage: 10,
  //       x: 0,
  //       y: 0,
  //     }),
  //     cell: grid.rows[randomRow][randomColumn],
  //     alignment: SPAWN_ALIGNMENT.CENTER,
  //   });
  // }

  for (let i = 0; i < 1; i++) {
    level.addZombie({
      entity: createRegularZombieRenderer({
        name: 'Regular Zombie',
        health: 100,
        attackSpeed: 1,
        damage: 10,
        x: 0,
        y: 0,
      }),
      cell: grid.rows[0][5],
      alignment: SPAWN_ALIGNMENT.RIGHT_BOTTOM,
    });
  }

  level.addPlant({
    entity: createPeashooterPlantRenderer({
      name: 'Peashooter',
      health: 100,
      shootDamage: 10,
      x: 0,
      y: 0,
    }),
    cell: grid.rows[0][1],
    alignment: SPAWN_ALIGNMENT.BOTTOM_LEFT,
  });

  // level.addZombie(
  //   'regularZombie',
  //   createRegularZombie({
  //     name: 'Regular Zombie',
  //     health: 100,
  //     attackSpeed: 1,
  //     damage: 10,
  //     x: 0,
  //     y: 0,
  //   }),
  //   level.grid.rows[0][level.grid.rows.length - 1],
  // );
  let fpsCounter = 0;
  app.ticker.add(() => {
    level.performLoop(fpsCounter);
    fpsCounter++;
    if (fpsCounter === Number.MAX_SAFE_INTEGER) {
      fpsCounter = 0;
    }
  });
})();
