import type Zombie from './IZombie'

interface ZombieProps {
  name: string
  health: number
  damage: number
  moveSpeed: number
  attackSpeed: number
}

const createZombie = ({
  name,
  health,
  damage,
  moveSpeed,
  attackSpeed,
}: ZombieProps): Zombie => ({
  id: Math.random(),
  name,
  health,
  damage,
  moveSpeed,
  attackSpeed,

  attack: () => {
    console.log(`${name} attacks!`)
  },
  move: () => {
    console.log(`${name} moves!`)
  },
  takeDamage: (incomeDamage: number) => {
    console.log(`${name} takes ${incomeDamage} damage!`)
  },
})

export default createZombie
