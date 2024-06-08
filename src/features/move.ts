import { IBase } from '@/entities/base/Base';

interface IMove extends IBase {
  moveSpeed: number;
  move: (moveSpeed: number) => void;
}

function moveFeature<T extends IBase>({ entity, moveSpeed }: { entity: T; moveSpeed: number }): T & IMove {
  return {
    ...entity,
    moveSpeed,
    move(moveSpeed: number) {
      console.log('Moving at speed:', moveSpeed);
      throw new Error('Not implemented');
    },
  };
}

export default moveFeature;
