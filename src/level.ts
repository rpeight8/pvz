type Cell<Z extends ZombieEntity, P extends PlantEntity, PR extends ProjectileEntity> = {
  zombies: Z[];
  plants: P[];
  projectiles: PR[];
};

type Row<C> = C[];

type Grid<Z extends ZombieEntity, P extends PlantEntity, PR extends ProjectileEntity> = {
  cells: Cell<Z, P, PR>[][];
  getCellByGameCoordinates: (x: number, y: number) => Cell<Z, P, PR>;
  getCellByScreenCoordinates: (x: number, y: number) => Cell<Z, P, PR>;
  getRowByGameCoordinates: (y: number) => Row<Cell<Z, P, PR>>;
  getRowByScreenCoordinates: (y: number) => Row<Cell<Z, P, PR>>;
};

type BaseEntity =
  | {
      getId: () => string;
      getName: () => string;
      getX: () => number;
      getY: () => number;
    }
  | {
      getId: () => string;
      getName: () => string;
      getX: () => number;
      getY: () => number;
      move: () => void;
      getSpeed: () => number;
    };

type ZombieEntity = BaseEntity & {
  health: number;
  damage: number;
  attackSpeed: number;
  attack: (target: PlantEntity) => void;
  takeDamage: (damage: number) => void;
};

type PlantEntity = BaseEntity & {
  health: number;
  damage: number;
  attackSpeed: number;
  attack: (target: ZombieEntity) => void;
  takeDamage: (damage: number) => void;
};

type ProjectileEntity = BaseEntity & {
  damage: number;
};

type Entities<Z extends ZombieEntity, P extends PlantEntity, PR extends ProjectileEntity> = {
  zombies: Z[];
  plants: P[];
  projectiles: PR[];
};

type Level<Z extends ZombieEntity, P extends PlantEntity, PR extends ProjectileEntity> = {
  grid: Grid<Z, P, PR>;
  entities: Entities<Z, P, PR>;
  performLoop: (this: Level<Z, P, PR>) => void;
  addZombie: (this: Level<Z, P, PR>, zombie: Z, cell: Cell<Z, P, PR>) => void;
  addPlant: (this: Level<Z, P, PR>, plant: P, cell: Cell<Z, P, PR>) => void;
  addProjectile: (this: Level<Z, P, PR>, projectile: PR, cell: Cell<Z, P, PR>) => void;
  removeZombie: (this: Level<Z, P, PR>, zombie: Z) => void;
  removePlant: (this: Level<Z, P, PR>, plant: P) => void;
  removeProjectile: (this: Level<Z, P, PR>, projectile: PR) => void;
  checkRowProjectileCollision: (this: Level<Z, P, PR>, row: Row<Cell<Z, P, PR>>) => void;
  checkProjectilesCollision: (this: Level<Z, P, PR>) => void;
};

type LevelProps<Z extends ZombieEntity, P extends PlantEntity, PR extends ProjectileEntity> = {
  grid: Grid<Z, P, PR>;
};

function addZombie<Z extends ZombieEntity, P extends PlantEntity, PR extends ProjectileEntity>(
  this: Level<Z, P, PR>,
  zombie: Z,
  cell: Cell<Z, P, PR>,
) {
  this.entities.zombies.push(zombie);
  cell.zombies.push(zombie);
}

function addPlant<Z extends ZombieEntity, P extends PlantEntity, PR extends ProjectileEntity>(
  this: Level<Z, P, PR>,
  plant: P,
  cell: Cell<Z, P, PR>,
) {
  this.entities.plants.push(plant);
  cell.plants.push(plant);
}

function addProjectile<Z extends ZombieEntity, P extends PlantEntity, PR extends ProjectileEntity>(
  this: Level<Z, P, PR>,
  projectile: PR,
  cell: Cell<Z, P, PR>,
) {
  this.entities.projectiles.push(projectile);
  cell.projectiles.push(projectile);
}

function removeZombie<Z extends ZombieEntity, P extends PlantEntity, PR extends ProjectileEntity>(
  this: Level<Z, P, PR>,
  zombie: Z,
) {
  const index = this.entities.zombies.indexOf(zombie);
  if (index > -1) {
    this.entities.zombies.splice(index, 1);
    this.grid.getCellByGameCoordinates(zombie.getX(), zombie.getY()).zombies.splice(index, 1);
  }
}

function removePlant<Z extends ZombieEntity, P extends PlantEntity, PR extends ProjectileEntity>(
  this: Level<Z, P, PR>,
  plant: P,
) {
  const index = this.entities.plants.indexOf(plant);
  if (index > -1) {
    this.entities.plants.splice(index, 1);
    this.grid.getCellByGameCoordinates(plant.getX(), plant.getY()).plants.splice(index, 1);
  }
}

function removeProjectile<Z extends ZombieEntity, P extends PlantEntity, PR extends ProjectileEntity>(
  this: Level<Z, P, PR>,
  projectile: PR,
) {
  const index = this.entities.projectiles.indexOf(projectile);
  if (index > -1) {
    this.entities.projectiles.splice(index, 1);
    this.grid.getCellByGameCoordinates(projectile.getX(), projectile.getY()).projectiles.splice(index, 1);
  }
}

function checkRowProjectileCollision<Z extends ZombieEntity, P extends PlantEntity, PR extends ProjectileEntity>(
  this: Level<Z, P, PR>,
  row: Row<Cell<Z, P, PR>>,
) {
  let bZombie = false;
  let bProjectile = false;

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
          for (const zombie of cell.zombies) {
            const projectileX = projectile.getX();
            const zombieX = zombie.getX();

            if (projectileX > zombieX) {
              break;
            }

            if (projectileX === zombieX) {
              zombie.takeDamage(projectile.damage);
              if (zombie.health <= 0) {
                this.removeZombie(zombie);
              }
              this.removeProjectile(projectile);
              break;
            }

            const nextProjectileX = projectile.getX() + projectile.getSpeed();
            const nextZombieX = zombie.getX() + zombie.getSpeed();

            if (projectile.getX() + projectile.getSpeed() >= zombie.getX()) {
              zombie.takeDamage(projectile.damage);
              if (zombie.health <= 0) {
                this.removeZombie(zombie);
              }
              this.removeProjectile(projectile);
            }
          }
        }
      }
    }
  }
}

function checkProjectilesCollision<Z extends ZombieEntity, P extends PlantEntity, PR extends ProjectileEntity>(
  this: Level<Z, P, PR>,
) {
  for (const row of this.grid.cells) {
    this.checkRowProjectileCollision(row);
  }
}

function performLoop<Z extends ZombieEntity, P extends PlantEntity, PR extends ProjectileEntity>(
  this: Level<Z, P, PR>,
) {
  this.checkProjectilesCollision();

  for (const zombie of this.entities.zombies) {
    if (zombie.move) {
      console.log(`${zombie.move()}:${zombie.getId()} moves`);
      zombie.move();
    }
  }

  for (const plant of this.entities.plants) {
    if (plant.attack) {
      console.log(`${plant.getName()}:${plant.getId()} attack`);
    }
  }

  for (const projectile of this.entities.projectiles) {
    if (projectile.move) {
      console.log(`${projectile.getName()}:${projectile.getId()} moves`);
      projectile.move();
    }
  }
}

function createLevel<Z extends ZombieEntity, P extends PlantEntity, PR extends ProjectileEntity>({
  grid,
}: LevelProps<Z, P, PR>): Level<Z, P, PR> {
  const entities: Entities<Z, P, PR> = {
    zombies: [],
    plants: [],
    projectiles: [],
  };

  return {
    grid,
    entities,
    performLoop,
    addZombie,
    addPlant,
    addProjectile,
    removeZombie,
    removePlant,
    removeProjectile,
    checkRowProjectileCollision,
    checkProjectilesCollision,
  };
}

export { createLevel };
export type { Level, Grid, Entities, Cell, LevelProps };
