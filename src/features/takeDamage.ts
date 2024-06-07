interface ITakeDamage {
  takeDamage: (damage: number) => void;
}

function takeDamageFeature<T extends ITakeDamage>(entity: T): T {
  return {
    ...entity,
    takeDamage: (damage: number) => {
      console.log(`${entity.name} takes ${damage} damage!`);
      entity.health -= damage;
    },
  };
}

export default takeDamageFeature;
