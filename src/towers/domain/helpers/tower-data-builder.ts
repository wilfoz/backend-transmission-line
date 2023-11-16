import { faker } from '@faker-js/faker';
import { TowerProps } from '../entities/towers.entity';
import { CoordinatesVO } from '../entities/coordinates-vo';

type Props = {
  code?: number;
  tower?: string;
  type?: string;
  coordinates?: CoordinatesVO;
  distance?: number;
  height?: number;
  weight?: number;
  type_of_foundation_A?: string;
  type_of_foundation_B?: string;
  type_of_foundation_C?: string;
  type_of_foundation_D?: string;
  type_of_foundation_MC?: string;
  embargo?: string;
  createdAt?: Date;
};

export function towerDataBuilder(props: Props): TowerProps {
  return {
    code: props.code ?? faker.number.int({ max: 800 }),
    tower: props.tower ?? '0/1',
    type: props.type ?? 'AT',
    coordinates:
      props.coordinates ??
      CoordinatesVO.create({ latitude: '111', longitude: '1111' }),
    distance:
      props.distance ??
      faker.number.float({ min: 1, max: 100, precision: 0.001 }),
    height:
      props.height ??
      faker.number.float({ min: 1, max: 100, precision: 0.001 }),
    weight:
      props.weight ??
      faker.number.float({ min: 1, max: 100, precision: 0.001 }),
    type_of_foundation_A: props.type_of_foundation_A ?? 'T',
    type_of_foundation_B: props.type_of_foundation_B ?? 'T',
    type_of_foundation_C: props.type_of_foundation_C ?? 'T',
    type_of_foundation_D: props.type_of_foundation_D ?? 'T',
    type_of_foundation_MC: props.type_of_foundation_MC ?? 'T',
    embargo: 'RELEASE',
    createdAt: props.createdAt ?? new Date(),
  };
}
