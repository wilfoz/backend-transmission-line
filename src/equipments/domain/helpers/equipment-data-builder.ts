import { fa, faker } from '@faker-js/faker';
import { EquipmentProps, Status } from '../entities/equipments.entity';

type Props = {
  registration?: string;
  model?: string;
  manufacturer?: string;
  licensePlate?: string;
  provider?: string;
  status?: Status;
  createdAt?: Date;
};

export function equipmentDataBuilder(props: Props): EquipmentProps {
  return {
    registration: props.registration ?? faker.string.alphanumeric(5),
    model: props.model ?? faker.vehicle.model(),
    manufacturer: props.manufacturer ?? faker.vehicle.model(),
    licensePlate: props.licensePlate ?? faker.vehicle.vrm(),
    provider: props.provider ?? faker.commerce.productDescription(),
    status: props.status ?? 'ACTIVE',
    createdAt: props.createdAt ?? new Date(),
  };
}
