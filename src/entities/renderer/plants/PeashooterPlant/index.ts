import createPeashooterPlant from '@/entities/common/plants/PeashooterPlant';
import type { PeashooterPlant, PeashooterPlantProps } from '@/entities/common/plants/PeashooterPlant';
import type { RendererAddon } from '@/renderer';
import createPeaProjectileRenderer from '@/entities/renderer/projectiles/PeaProjectile';

type PeashooterPlantRenderer = RendererAddon &
  PeashooterPlant & {
    //
  };

type PeashooterPlantRendererProps = PeashooterPlantProps & {
  texture?: string;
};

const createPeashooterPlantRenderer = ({
  texture = 'peashooter',
  ...props
}: PeashooterPlantRendererProps): PeashooterPlantRenderer => {
  const peashooterPlant = createPeashooterPlant({
    ...props,
  });

  return {
    ...peashooterPlant,
    projectileBuilder: createPeaProjectileRenderer,
    texture,
  };
};

export default createPeashooterPlantRenderer;
export type { PeashooterPlantRenderer, PeashooterPlantRendererProps };
