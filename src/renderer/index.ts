import * as PIXI from 'pixi.js';

type createSpriteByEntityProps<E> = {
  texture: string;
  entity: E;
  x: number;
  y: number;
};

type updateSpritePosition<S> = {
  sprite: S;
  x: number;
  y: number;
};

type updateMainSpritePositionByEntityProps<E> = {
  entity: E;
  x: number;
  y: number;
};

type Renderer<S, E> = {
  createSpriteByEntity: (props: createSpriteByEntityProps<E>) => S;
  removeSpriteByEntity: (sprite: S, entity: E) => void;
  updateSpritePosition: (props: updateSpritePosition<S>) => void;
  updateMainSpritePositionByEntity: (props: updateMainSpritePositionByEntityProps<E>) => void;
  removeAllSprites: () => void;
  removeAllSpritesByEntity: (entity: E) => void;
};

const createPixiRenderer = <E>(app: PIXI.Application): Renderer<PIXI.Sprite, E> => {
  const sprites = new Map<
    E,
    {
      main?: PIXI.Sprite;
      dependent: Set<PIXI.Sprite>;
    }
  >();

  const createSpriteByEntity = ({ texture, entity, x, y }: createSpriteByEntityProps<E>): PIXI.Sprite => {
    const sprite = new PIXI.Sprite(PIXI.Assets.get(texture));
    if (!sprites.has(entity)) {
      sprites.set(entity, {
        main: sprite,
        dependent: new Set(),
      });
    }

    const entitySprites = sprites.get(entity);
    if (!entitySprites) return sprite;

    entitySprites.main = sprite;

    sprite.x = x;
    sprite.y = y;
    app.stage.addChild(sprite);
    return sprite;
  };

  const updateSpritePosition = ({ sprite, x, y }: updateSpritePosition<PIXI.Sprite>): void => {
    sprite.x = x;
    sprite.y = y;
  };

  const updateMainSpritePositionByEntity = ({ entity, x, y }: updateMainSpritePositionByEntityProps<E>): void => {
    const entitySprites = sprites.get(entity);
    if (!entitySprites || !entitySprites.main) return;

    entitySprites.main.x = x;
    entitySprites.main.y = y;
  };

  const removeSpriteByEntity = (sprite: PIXI.Sprite, entity: E): void => {
    const entitySprites = sprites.get(entity);
    if (!entitySprites) return;

    if (entitySprites.main === sprite) {
      app.stage.removeChild(sprite);
      entitySprites.main = undefined;
      return;
    }

    if (!entitySprites.dependent.has(sprite)) return;

    entitySprites.dependent.delete(sprite);
    app.stage.removeChild(sprite);
  };

  const removeAllSprites = (): void => {
    sprites.forEach((entitySprites) => {
      if (entitySprites.main) {
        app.stage.removeChild(entitySprites.main);
        entitySprites.main = undefined;
      }

      entitySprites.dependent.forEach((sprite) => {
        app.stage.removeChild(sprite);
      });

      entitySprites.dependent.clear();
    });

    sprites.clear();
  };

  const removeAllSpritesByEntity = (entity: E): void => {
    const entitySprites = sprites.get(entity);
    if (!entitySprites) return;

    if (entitySprites.main) {
      app.stage.removeChild(entitySprites.main);
      entitySprites.main = undefined;
    }

    entitySprites.dependent.forEach((sprite) => {
      app.stage.removeChild(sprite);
    });

    entitySprites.dependent.clear();
  };

  return {
    createSpriteByEntity,
    updateSpritePosition,
    updateMainSpritePositionByEntity,
    removeSpriteByEntity,
    removeAllSprites,
    removeAllSpritesByEntity,
  };
};

export default createPixiRenderer;
export type { Renderer, createSpriteByEntityProps };
