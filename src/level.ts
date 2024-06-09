type Cell<Z extends ZombieEntity, P extends PlantEntity, PR extends ProjectileEntity> = {
  zombies: Z[];
  plants: P[];
  projectiles: PR[];
};

type Row<C> = C[];

type Grid<Z extends ZombieEntity, P extends PlantEntity, PR extends ProjectileEntity> = {
  rows: Row<Cell<Z, P, PR>>[];
  getCellByGameCoordinates: (x: number, y: number) => Cell<Z, P, PR>;
  getCellByScreenCoordinates: (x: number, y: number) => Cell<Z, P, PR>;
  getRowByGameCoordinates: (y: number) => Row<Cell<Z, P, PR>>;
  getRowByScreenCoordinates: (y: number) => Row<Cell<Z, P, PR>>;
};

type BaseEntity = {
  getId: () => string;
  getName: () => string;
  getX: () => number;
  getY: () => number;
};

type ZombieEntity = BaseEntity & {
  attack: (target: PlantEntity) => void;
  takeDamage: (damage: number) => void;
  move: () => void;
  getMoveSpeed: () => number;
  getHealth: () => number;
  setHealth: (health: number) => void;
  getAttackSpeed: () => number;
  getDamage: () => number;
  getNextTickX: () => number;
};

type PlantEntity = BaseEntity & {
  attack?: (target: ZombieEntity) => void;
  takeDamage: (damage: number) => void;
  getHealth: () => number;
  setHealth: (health: number) => void;
  getShootRate: () => number;
};

type ProjectileEntity = BaseEntity & {
  move: () => void;
  getMoveSpeed: () => number;
  getDamage: () => number;
  getNextTickX: () => number;
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
  level: Level<Z, P, PR>,
  row: Row<Cell<Z, P, PR>>,
) {
  let bZombie = false;
  let bProjectile = false;

  const zombiesToBeRemoved = new Set<Z>();
  const projectilesToBeRemoved = new Set<PR>();

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
          if (projectilesToBeRemoved.has(projectile)) continue;
          for (const zombie of cell.zombies) {
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

            const nextProjectileX = projectile.getNextTickX();
            const nextZombieX = zombie.getNextTickX();

            if (nextProjectileX >= nextZombieX) {
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

function checkProjectilesCollision<Z extends ZombieEntity, P extends PlantEntity, PR extends ProjectileEntity>(
  level: Level<Z, P, PR>,
) {
  for (const row of level.grid.rows) {
    checkRowProjectileCollision(level, row);
  }
}

function moveEntities<Z extends ZombieEntity, P extends PlantEntity, PR extends ProjectileEntity>(
  level: Level<Z, P, PR>,
) {
  const zombiesToBeRemoved = new Set<Z>();
  const projectilesToBeRemoved = new Set<PR>();

  for (const zombie of level.entities.zombies) {
    const nextX = zombie.getNextTickX();
    const nextCell = level.grid.getCellByGameCoordinates(nextX, zombie.getY());
    const cell = level.grid.getCellByGameCoordinates(zombie.getX(), zombie.getY());

    if (!cell) {
      zombiesToBeRemoved.add(zombie);
      continue;
    }

    if (!nextCell) {
      zombiesToBeRemoved.add(zombie);
      continue;
    }

    if (nextCell !== cell) {
      const index = cell.zombies.indexOf(zombie);
      if (index > -1) {
        cell.zombies.splice(index, 1);
        nextCell.zombies.push(zombie);
      }
      continue;
    }

    const index = cell.zombies.indexOf(zombie);
    if (index > -1) {
      cell.zombies.splice(index, 1);
      nextCell.zombies.push(zombie);
    }
  }

  for (const projectile of level.entities.projectiles) {
    const nextX = projectile.getNextTickX();
    const nextCell = level.grid.getCellByGameCoordinates(nextX, projectile.getY());
    const cell = level.grid.getCellByGameCoordinates(projectile.getX(), projectile.getY());

    if (!cell) {
      projectilesToBeRemoved.add(projectile);
      continue;
    }

    if (!nextCell) {
      projectilesToBeRemoved.add(projectile);
      continue;
    }

    if (nextCell !== cell) {
      const index = cell.projectiles.indexOf(projectile);
      if (index > -1) {
        cell.projectiles.splice(index, 1);
        nextCell.projectiles.push(projectile);
      }
      continue;
    }

    const index = cell.projectiles.indexOf(projectile);
    if (index > -1) {
      cell.projectiles.splice(index, 1);
      nextCell.projectiles.push(projectile);
    }
  }

  for (const zombie of zombiesToBeRemoved) {
    level.removeZombie(zombie);
  }

  for (const projectile of projectilesToBeRemoved) {
    level.removeProjectile(projectile);
  }
}

function performLoop<Z extends ZombieEntity, P extends PlantEntity, PR extends ProjectileEntity>(
  this: Level<Z, P, PR>,
) {
  checkProjectilesCollision(this);
  moveEntities(this);

  for (const zombie of this.entities.zombies) {
    if (zombie.move) {
      console.log(`${zombie.move()}:${zombie.getId()} moves`);
      zombie.move();
    }
  }

  for (const plant of this.entities.plants) {
    // if (plant.attack) {
    console.log(`${plant.getName()}:${plant.getId()} attack`);
    // }
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
  };
}

export { createLevel };
export type { Level, Grid, Entities, Cell, LevelProps };
