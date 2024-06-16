import type { Renderer } from './renderer';
import type { Base, Base as BaseEntity } from './entities/base';
import type { Grid, Cell, Row } from './grid';
import { isMoveable } from './features/move';
import { isAttackable } from './features/attack';
import { isDamageable } from './features/takeDamage';

type Entities<E extends Base> = {
  zombies: E[];
  plants: E[];
  projectiles: E[];
};

type Level<E extends Base> = {
  grid: Grid<E>;
  entities: Entities<E>;
  renderer: Renderer<any, BaseEntity>;
  performLoop: (this: Level<E>) => void;
  addZombie: (this: Level<E>, texture: string, zombie: E, cell: Cell<E>) => void;
  addPlant: (this: Level<E>, plant: E, cell: Cell<E>) => void;
  addProjectile: (this: Level<E>, projectile: E, cell: Cell<E>) => void;
  removeZombie: (this: Level<E>, zombie: E) => void;
  removePlant: (this: Level<E>, plant: E) => void;
  removeProjectile: (this: Level<E>, projectile: E) => void;
};

type LevelProps<E extends Base> = {
  grid: Grid<E>;
  renderer: Renderer<any, BaseEntity>;
};

function addZombie<E extends Base>(this: Level<E>, texture: string, zombie: E, cell: Cell<E>) {
  this.entities.zombies.push(zombie);
  cell.zombies.push(zombie);
  const gameX = cell.getGameX();
  const gameY = cell.getGameY();
  const [screenX, screenY] = this.grid.gamePositionToScreenPosition(gameX, gameY);
  zombie.setX(gameX);
  zombie.setY(gameY);
  this.renderer.createSpriteByEntity({
    entity: zombie,
    texture,
    x: screenX,
    y: screenY,
  });
}

function addPlant<E extends Base>(this: Level<E>, plant: E, cell: Cell<E>) {
  this.entities.plants.push(plant);
  cell.plants.push(plant);
}

function addProjectile<E extends Base>(this: Level<E>, projectile: E, cell: Cell<E>) {
  this.entities.projectiles.push(projectile);
  cell.projectiles.push(projectile);
}

function removeZombie<E extends Base>(this: Level<E>, zombie: E) {
  const index = this.entities.zombies.indexOf(zombie);
  if (index > -1) {
    this.entities.zombies.splice(index, 1);
    this.grid.getCellByGameCoordinates(zombie.getX(), zombie.getY()).zombies.splice(index, 1);
    this.renderer.removeAllSpritesByEntity(zombie);
  }
}

function removePlant<E extends Base>(this: Level<E>, plant: E) {
  const index = this.entities.plants.indexOf(plant);
  if (index > -1) {
    this.entities.plants.splice(index, 1);
    this.grid.getCellByGameCoordinates(plant.getX(), plant.getY()).plants.splice(index, 1);
  }
}

function removeProjectile<E extends Base>(this: Level<E>, projectile: E) {
  const index = this.entities.projectiles.indexOf(projectile);
  if (index > -1) {
    this.entities.projectiles.splice(index, 1);
    this.grid.getCellByGameCoordinates(projectile.getX(), projectile.getY()).projectiles.splice(index, 1);
  }
}

function checkRowProjectileCollision<E extends Base>(level: Level<E>, row: Row<Cell<E>>) {
  let bZombie = false;
  let bProjectile = false;

  const zombiesToBeRemoved = new Set<E>();
  const projectilesToBeRemoved = new Set<E>();

  for (const cell of row) {
    if (cell.zombies.length > 0) {
      bZombie = true;
    }
    if (cell.projectiles.length > 0) {
      bProjectile = true;
    }

    if (bZombie && bProjectile) {
      break;
    }
  }

  if (bZombie && bProjectile) {
    for (const cell of row) {
      if (cell.zombies.length > 0 && cell.projectiles.length > 0) {
        for (const projectile of cell.projectiles) {
          if (!isAttackable(projectile)) continue;
          if (!isMoveable(projectile)) continue;
          if (projectilesToBeRemoved.has(projectile)) continue;
          for (const zombie of cell.zombies) {
            if (!isDamageable(zombie)) continue;
            if (zombiesToBeRemoved.has(zombie)) continue;
            const projectileX = projectile.getX();
            const zombieX = zombie.getX();

            if (projectileX > zombieX) {
              continue;
            }

            if (projectileX === zombieX) {
              zombie.takeDamage(projectile.getDamage());
              if (zombie.getHealth() <= 0) {
                zombiesToBeRemoved.add(zombie);
              }
              projectilesToBeRemoved.add(projectile);
              break;
            }

            const [nextProjectileX, nextProjectileY] = projectile.getNextTickPosition();
            let nextZombieX = zombieX;
            let nextZombieY = zombie.getY();

            if (isMoveable(zombie)) {
              [nextZombieX, nextZombieY] = zombie.getNextTickPosition();
            }

            if (
              level.grid.getCellByGameCoordinates(nextProjectileX, nextProjectileY) ===
                level.grid.getCellByGameCoordinates(nextZombieX, nextZombieY) &&
              nextProjectileX >= nextZombieX
            ) {
              zombie.takeDamage(projectile.getDamage());
              if (zombie.getHealth() <= 0) {
                zombiesToBeRemoved.add(zombie);
              }
              projectilesToBeRemoved.add(projectile);
            }
          }
        }
      }
    }
  }

  for (const zombie of zombiesToBeRemoved) {
    level.removeZombie(zombie);
  }

  for (const projectile of projectilesToBeRemoved) {
    level.removeProjectile(projectile);
  }
}

function checkProjectilesCollision<E extends Base>(level: Level<E>) {
  for (const row of level.grid.rows) {
    checkRowProjectileCollision(level, row);
  }
}

function moveEntity<E extends Base>(
  entity: E,
  level: Level<E>,
  entitiesToBeRemoved: Set<E>,
  entityType: 'zombies' | 'projectiles',
) {
  if (!isMoveable(entity)) return;
  const oldX = entity.getX();
  const oldY = entity.getY();
  const oldCell = level.grid.getCellByGameCoordinates(oldX, oldY);
  if (!oldCell) {
    entitiesToBeRemoved.add(entity);
    return;
  }

  entity.move();

  const newCell = level.grid.getCellByGameCoordinates(entity.getX(), entity.getY());

  if (!newCell) {
    entitiesToBeRemoved.add(entity);
    // Reset the entity position to the old one in order to correctly remove it from the old cell
    entity.setX(oldX);
    entity.setY(oldY);
    return;
  }

  if (oldCell !== newCell) {
    const index = oldCell[entityType].indexOf(entity);
    if (index > -1) {
      oldCell[entityType].splice(index, 1);
      newCell[entityType].push(entity);
    }
    return;
  }

  const [screenX, screenY] = level.grid.gamePositionToScreenPosition(entity.getX(), entity.getY());
  level.renderer.updateMainSpritePositionByEntity({
    entity: entity,
    x: screenX,
    y: screenY,
  });
}

function moveEntities<E extends Base>(level: Level<E>) {
  const zombiesToBeRemoved = new Set<E>();
  const projectilesToBeRemoved = new Set<E>();

  for (const zombie of level.entities.zombies) {
    moveEntity(zombie, level, zombiesToBeRemoved, 'zombies');
  }

  for (const projectile of level.entities.projectiles) {
    moveEntity(projectile, level, projectilesToBeRemoved, 'projectiles');
  }

  for (const zombie of zombiesToBeRemoved) {
    level.removeZombie(zombie);
  }

  for (const projectile of projectilesToBeRemoved) {
    level.removeProjectile(projectile);
  }
}

function performLoop<E extends Base>(this: Level<E>) {
  checkProjectilesCollision(this);
  moveEntities(this);

  for (const plant of this.entities.plants) {
    // if (plant.attack) {
    console.log(`${plant.getName()}:${plant.getId()} attack`);
    // }
  }
}

function createLevel<E extends Base>({ grid, renderer }: LevelProps<E>): Level<E> {
  const entities: Entities<E> = {
    zombies: [],
    plants: [],
    projectiles: [],
  };

  return {
    grid,
    entities,
    renderer,
    performLoop,
    addZombie,
    addPlant,
    addProjectile,
    removeZombie,
    removePlant,
    removeProjectile,
  };
}

export { createLevel };
export type { Level, Grid, Entities, Cell, LevelProps };
