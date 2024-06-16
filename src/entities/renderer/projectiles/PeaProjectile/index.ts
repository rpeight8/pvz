import type { PeaProjectile, PeaProjectileProps } from '@/entities/common/projectiles/PeaProjectile';
import createPeaProjectile from '@/entities/common/projectiles/PeaProjectile';
import { RendererAddon } from '@/renderer';

type PeaProjectileRenderer = RendererAddon & PeaProjectile;
type PeaProjectileRendererProps = PeaProjectileProps & {
  texture?: string;
};

const createPeaProjectileRenderer = ({
  texture = 'pea',
  ...props
}: PeaProjectileRendererProps): PeaProjectileRenderer => {
  const peaProjectile = createPeaProjectile({
    ...props,
  });
  return {
    ...peaProjectile,
    texture,
  };
};

export default createPeaProjectileRenderer;
export type { PeaProjectileRenderer, PeaProjectileRendererProps };
