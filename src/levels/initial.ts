import { createLoop } from '@/loop';
import { createLevel } from '@/level';
import { createGrid } from '@/grid/Grid';
import { createEntityManager } from '@/entityManager';
import type { IZombieBase } from '@/entities/zombies/ZombieBase';
import type { IPlantBase } from '@/entities/plants/PlantBase/PlantBase';
import type { IProjectileBase } from '@/entities/projectiles/ProjectileBase';

function initLevel({ screenHeight, screenWidth }: { screenHeight: number; screenWidth: number }) {
  const level = createLevel<IZombieBase, IPlantBase, IProjectileBase>({
    loop: createLoop(),
    grid: createGrid({
      rows: 3,
      columns: 3,
      screenHeight,
      screenWidth,
      gameHeight: 1000,
      gameWidth: 2000,
    }),
    entityManager: createEntityManager(),
  });

  return level;
}
