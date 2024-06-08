import { ITakeDamage } from './takeDamage';

interface IAttack {
  damage: number;
  attackSpeed: number;
  attack: (target: ITakeDamage) => void;
}

function attackFeature<T>({
  entity,
  damage,
  attackSpeed,
}: {
  entity: T;
  damage: number;
  attackSpeed: number;
}): T & IAttack {
  return {
    ...entity,
    damage,
    attackSpeed,
    attack(target: ITakeDamage) {
      target.takeDamage(this.damage);
    },
  };
}

export default attackFeature;
