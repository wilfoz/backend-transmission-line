import { fa, faker } from '@faker-js/faker';
import { FoundationProps } from '../entities/foundation.entity';

type Props = {
  project?: string;
  revision?: string;
  description?: string;
  excavation_volume?: number;
  concrete_volume?: number;
  backfill_volume?: number;
  steel_volume?: number;
  createdAt?: Date;
};

export function foundationDataBuilder(props: Props): FoundationProps {
  return {
    project: props.project ?? faker.string.alphanumeric(5),
    revision: props.revision ?? faker.string.alphanumeric(2),
    description: props.description ?? faker.string.alphanumeric(5),
    excavation_volume:
      props.excavation_volume ?? faker.number.float({ precision: 0.1 }),
    concrete_volume:
      props.concrete_volume ?? faker.number.float({ precision: 0.1 }),
    backfill_volume:
      props.backfill_volume ?? faker.number.float({ precision: 0.1 }),
    steel_volume: props.steel_volume ?? faker.number.float({ precision: 0.1 }),
    createdAt: props.createdAt ?? new Date(),
  };
}
