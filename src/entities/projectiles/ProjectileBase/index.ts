import { createBase } from '@/entities/base/Base';
import type { Base, BaseProps } from '@/entities/base/Base';
import moveFeature from '@/features/move';

type ProjectileBase = Base & {
  move: () => void;
  getMoveSpeed: () => number;
  getNextTickX: () => number;
};

type ProjectileBaseProps = BaseProps & {
  damage: number;
  moveSpeed: number;
};

const createProjectileBase = ({ moveSpeed, x, y, name }: ProjectileBaseProps): ProjectileBase => {
  const base = createBase({ name, x, y });
  const projectile = {
    ...base,
    ...moveFeature({
      getX: base.getX,
      setX: base.setX,
      moveSpeed,
    }),
  };

  return projectile;
};

export default createProjectileBase;
export type { ProjectileBase, ProjectileBaseProps };
