import generateId from '@utils/idGenerator';

interface IBase {
  id: string;
  name: string;
  x: number;
  y: number;
}

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
export type { IBase };
