import generateId from '@utils/idGenerator';
import type IBase from './IBase';

interface BaseProps {
  name: string;
  x: number;
  y: number;
}

const createBase = ({ name, x, y }: BaseProps): IBase => ({
  id: generateId(),
  name,
  x,
  y,
});

export default createBase;
