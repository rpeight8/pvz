import type { PlantBase } from '@/entities/plants/PlantBase';
import createPlantBase from '@/entities/plants/PlantBase';

type PeashooterPlant = PlantBase & {
  // no additional properties
};

type PeashooterPlantProps = {
  name: string;
  health: number;
  damage: number;
  attackSpeed: number;
  x: number;
  y: number;
};

const createPeashooterPlant = ({ name, health, damage, attackSpeed, x, y }: PeashooterPlantProps): PeashooterPlant => {
  const plant = createPlantBase({ name, health, damage, attackSpeed, x, y });

  return plant;
};

export default createPeashooterPlant;
export type { PeashooterPlant, PeashooterPlantProps };
