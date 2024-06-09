import type { Base, BaseProps } from '@/entities/base/Base';
import { createBase } from '@/entities/base/Base';
import moveFeature from '@/features/move';

type ProjectileBase = Base & {
  damage: number;
  moveSpeed: number;
  move: () => void;
};

type ProjectileBaseProps = BaseProps & {
  damage: number;
  moveSpeed: number;
};

const createProjectileBase = ({ damage, moveSpeed, x, y }: ProjectileBaseProps): ProjectileBase => {
  const base = createBase({ name: 'projectile', x, y });
  const projectile = {
    damage,
    ...moveFeature<Base>({
      entity: base,
      moveSpeed,
    }),
  };

  return projectile;
};

export default createProjectileBase;
export type { ProjectileBase, ProjectileBaseProps };
