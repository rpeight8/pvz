import { Application, Sprite, Assets } from 'pixi.js';
import createGrid from './grid/Grid';

import './style.css';

const app = new Application();

await app.init({ width: 800, height: 600 });

document.body.appendChild(app.canvas);

await Assets.load('./src/assets/Peashooter.png');

const peashooter = new Sprite(Assets.get('./src/assets/Peashooter.png'));

const grid = createGrid({
  rows: 3,
  columns: 3,
  screenHeight: 600,
  screenWidth: 800,
  gameHeight: 1000,
  gameWidth: 2000,
});
console.log(grid);

app.stage.addChild(peashooter);
