import { EquipmentOutput } from '@/equipments/application/dto/equipments-output';
import { ListEquipmentsUseCase } from '@/equipments/application/usecases/list-equipment.usecase';
import { Status } from '@/equipments/domain/entities/equipments.entity';
import { CollectionPresenter } from '@/shared/infrastructure/presenters/collection.presenter';
import { Transform } from 'class-transformer';

export class EquipmentPresenter {
  id: string;
  registration: string;
  model: string;
  manufacturer: string;
  licensePlate: string;
  provider: string;
  teamId: string | null;
  status: Status;

  @Transform(({ value }: { value: Date }) => value.toISOString())
  createdAt: Date;

  constructor(output: EquipmentOutput) {
    this.id = output.id;
    this.registration = output.registration;
    this.model = output.model;
    this.manufacturer = output.manufacturer;
    this.licensePlate = output.licensePlate;
    this.provider = output.provider;
    this.status = output.status;
    this.teamId = output.teamId ?? null;
    this.createdAt = output.createdAt;
  }
}

export class EquipmentsCollectionPresenter extends CollectionPresenter {
  data: EquipmentPresenter[];
  constructor(output: ListEquipmentsUseCase.Output) {
    const { items, ...paginationProps } = output;
    super(paginationProps);
    this.data = items.map(item => new EquipmentPresenter(item));
  }
}
