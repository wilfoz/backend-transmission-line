import { faker } from '@faker-js/faker';
import { Stage, TaskProps } from '../entities/task.entity';

type Props = {
  code?: number;
  stage?: Stage;
  group?: string;
  name?: string;
  unit?: string;
  createdAt?: Date;
};

export function taskDataBuilder(props: Props): TaskProps {
  return {
    code: props.code ?? faker.number.int({ max: 800 }),
    stage: props.stage ?? 'CIVIL',
    group: props.group ?? 'Montagem Estaiada',
    name: props.name ?? 'Concretagem 100%',
    unit: props.unit ?? 'torre',
    createdAt: props.createdAt ?? new Date(),
  };
}
