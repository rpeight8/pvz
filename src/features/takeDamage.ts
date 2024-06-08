interface ITakeDamage {
  health: number;
  takeDamage: (damage: number) => void;
}

function takeDamageFeature<T>({ health, entity }: { health: number; entity: T }): T & ITakeDamage {
  return {
    ...entity,
    health,
    takeDamage(damage: number) {
      if (this.health) {
        this.health -= damage;
      }
    },
  };
}

export default takeDamageFeature;
export type { ITakeDamage };
