import { faker } from '@faker-js/faker';
import {
  ProductionProps,
  STATUS_PRODUCTION,
} from '../entities/production.entity';

type Props = {
  status?: STATUS_PRODUCTION;
  comments?: string;
  startTime?: Date;
  finalTime?: Date;
  teams?: string[];
  towers?: string[];
  taskId?: string;
  createdAt?: Date;
};

export function productionDataBuilder(props: Props): ProductionProps {
  return {
    status: props.status ?? 'EXECUTED',
    comments: props.comments ?? faker.lorem.lines(),
    startTime: props.startTime ?? new Date(),
    finalTime: props.finalTime ?? new Date(),
    teams: props.teams ?? [faker.string.uuid()],
    towers: props.towers ?? [faker.string.uuid()],
    taskId: props.taskId ?? faker.string.uuid(),
    createdAt: props.createdAt ?? new Date(),
  };
}
