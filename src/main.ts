import { Application, Sprite, Assets } from 'pixi.js';
import generateId from '@utils/idGenerator';
import './style.css';

const app = new Application();
console.log(generateId());

await app.init({ width: 800, height: 600 });

document.body.appendChild(app.canvas);

await Assets.load('./src/assets/Peashooter.png');

const peashooter = new Sprite(Assets.get('./src/assets/Peashooter.png'));

app.stage.addChild(peashooter);
