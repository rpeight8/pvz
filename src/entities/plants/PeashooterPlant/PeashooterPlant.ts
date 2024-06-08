import type { IPlantBase } from '@/entities/plants/PlantBase/PlantBase';
import createPlantBase from '@/entities/plants/PlantBase/PlantBase';

interface IPeashooterPlant extends IPlantBase {
  // no additional properties
}

interface IPeashooterPlantProps {
  name: string;
  health: number;
  damage: number;
  attackSpeed: number;
  x: number;
  y: number;
}

const createPeashooterPlant = ({
  name,
  health,
  damage,
  attackSpeed,
  x,
  y,
}: IPeashooterPlantProps): IPeashooterPlant => {
  const plant = createPlantBase({ name, health, damage, attackSpeed, x, y });

  return plant;
};

export default createPeashooterPlant;
