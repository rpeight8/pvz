import { Application, Assets, Sprite } from 'pixi.js';

type createSpriteByEntityProps<E> = {
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

type Renderer<S, E extends RendererAddon> = {
  createSpriteByEntity: (props: createSpriteByEntityProps<E>) => S;
  removeSpriteByEntity: (sprite: S, entity: E) => void;
  updateSpritePosition: (props: updateSpritePosition<S>) => void;
  updateMainSpritePositionByEntity: (props: updateMainSpritePositionByEntityProps<E>) => void;
  removeAllSprites: () => void;
  removeAllSpritesByEntity: (entity: E) => void;
};

type RendererAddon = {
  texture: string;
};

const createPixiRenderer = <E extends RendererAddon>(app: Application): Renderer<Sprite, E> => {
  const sprites = new Map<
    E,
    {
      main?: Sprite;
      dependent: Set<Sprite>;
    }
  >();

  const createSpriteByEntity = ({ entity, x, y }: createSpriteByEntityProps<E>): Sprite => {
    const sprite = new Sprite(Assets.get(entity.texture));
    if (!sprites.has(entity)) {
      sprites.set(entity, {
        main: undefined,
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

  const updateSpritePosition = ({ sprite, x, y }: updateSpritePosition<Sprite>): void => {
    sprite.x = x;
    sprite.y = y;
  };

  const updateMainSpritePositionByEntity = ({ entity, x, y }: updateMainSpritePositionByEntityProps<E>): void => {
    const entitySprites = sprites.get(entity);
    if (!entitySprites || !entitySprites.main) return;

    entitySprites.main.x = x;
    entitySprites.main.y = y;
  };

  const removeSpriteByEntity = (sprite: Sprite, entity: E): void => {
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
export type { Renderer, createSpriteByEntityProps, RendererAddon };
