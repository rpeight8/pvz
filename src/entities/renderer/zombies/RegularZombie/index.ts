import type { RegularZombie, RegularZombieProps } from '@/entities/common/zombies/RegularZombie';
import createRegularZombie from '@/entities/common/zombies/RegularZombie';
import type { RendererAddon } from '@/renderer';

type RegularZombieRenderer = RendererAddon & RegularZombie;
type RegularZombieRendererProps = RegularZombieProps & {
  texture?: string;
};

const createRegularZombieRenderer = ({
  texture = 'regularZombie',
  ...props
}: RegularZombieRendererProps): RegularZombieRenderer => {
  const regularZombie = createRegularZombie({
    ...props,
  });

  return {
    ...regularZombie,
    texture,
  };
};

export default createRegularZombieRenderer;
export type { RegularZombieRenderer, RegularZombieRendererProps };
