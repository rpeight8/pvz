import generateId from '@utils/idGenerator';

interface IBase {
  id: string;
  name: string;
  screenX: number;
  screenY: number;
  gameX: number;
  gameY: number;
}

interface BaseProps {
  name: string;
  screenX: number;
  screenY: number;
  gameX: number;
  gameY: number;
}

const createBase = ({ name, screenX, screenY, gameX, gameY }: BaseProps): IBase => ({
  id: generateId(),
  name,
  screenX,
  screenY,
  gameX,
  gameY,
});

export default createBase;
export type { IBase };
