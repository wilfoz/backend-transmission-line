import {
  ProductionEntity,
  STATUS_PRODUCTION,
} from '../../domain/entities/production.entity';

export type ProductionOutput = {
  id: string;
  status: STATUS_PRODUCTION | string;
  comments: string;
  startTime?: Date;
  finalTime?: Date;
  teams: string[];
  towers: string[];
  taskId: string;
  createdAt: Date;
};

export class ProductionOutputMapper {
  static toOutput(entity: ProductionEntity): ProductionOutput {
    return entity.toJSON();
  }
}
