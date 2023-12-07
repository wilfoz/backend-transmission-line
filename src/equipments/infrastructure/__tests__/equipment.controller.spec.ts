import { EquipmentOutput } from '@/equipments/application/dto/equipments-output';
import { EquipmentsController } from '../equipments.controller';
import { CreateEquipmentUseCase } from '@/equipments/application/usecases/create-equipment.usecase';
import { CreateEquipmentDto } from '../dto/create-equipment.dto';
import {
  EquipmentPresenter,
  EquipmentsCollectionPresenter,
} from '../presenters/equipment.presenter';
import { UpdateEquipmentUseCase } from '@/equipments/application/usecases/update-equipment.usecase';
import { UpdateEquipmentDto } from '../dto/update-equipment.dto';
import { GetEquipmentUseCase } from '@/equipments/application/usecases/get-equipment.usecase';
import { ListEquipmentsUseCase } from '@/equipments/application/usecases/list-equipment.usecase';

describe('EquipmentController Unit Tests', () => {
  let sut: EquipmentsController;
  let id: string;
  let props: EquipmentOutput;

  beforeEach(async () => {
    sut = new EquipmentsController();
    id: 'e8425c05-8d65-4a17-aad4-7e6087774e5f';
    props = {
      id,
      registration: '1',
      model: 'Fiat 47',
      manufacturer: 'Ajudante',
      licensePlate: 'AAA:2133',
      provider: 'Fiat',
      status: 'ACTIVE',
      teamId: null,
      createdAt: new Date(),
    };
  });

  it('should be defined', () => {
    expect(sut).toBeDefined();
  });

  it('should create a Equipment', async () => {
    const output: CreateEquipmentUseCase.Output = props;
    const mockCreateEquipmentUseCase = {
      execute: jest.fn().mockReturnValue(Promise.resolve(output)),
    };
    sut['createEquipmentUseCase'] = mockCreateEquipmentUseCase as any;
    const input: CreateEquipmentDto = props;
    const presenter = await sut.create(input);
    expect(presenter).toBeInstanceOf(EquipmentPresenter);
    expect(presenter).toStrictEqual(new EquipmentPresenter(output));
    expect(mockCreateEquipmentUseCase.execute).toHaveBeenCalledWith(input);
  });

  it('should update a Equipment', async () => {
    const output: UpdateEquipmentUseCase.Output = props;
    const mockUpdateEquipmentUseCase = {
      execute: jest.fn().mockReturnValue(Promise.resolve(output)),
    };
    sut['updateEquipmentUseCase'] = mockUpdateEquipmentUseCase as any;
    const input: UpdateEquipmentDto = {
      registration: '1',
      model: 'Fiat 47',
      manufacturer: 'Ajudante',
      licensePlate: 'AAA:2133',
      provider: 'Fiat',
      status: 'ACTIVE',
    };
    const presenter = await sut.update(id, input);
    expect(presenter).toBeInstanceOf(EquipmentPresenter);
    expect(presenter).toStrictEqual(new EquipmentPresenter(output));
    expect(mockUpdateEquipmentUseCase.execute).toHaveBeenCalledWith({
      id,
      ...input,
    });
  });

  it('should gets a Equipment', async () => {
    const output: GetEquipmentUseCase.Output = props;
    const mockGetEquipmentUseCase = {
      execute: jest.fn().mockReturnValue(Promise.resolve(output)),
    };
    sut['getEquipmentUseCase'] = mockGetEquipmentUseCase as any;
    const presenter = await sut.findOne(id);
    expect(presenter).toBeInstanceOf(EquipmentPresenter);
    expect(presenter).toStrictEqual(new EquipmentPresenter(output));
    expect(mockGetEquipmentUseCase.execute).toHaveBeenCalledWith({ id });
  });

  it('should delete a Equipment', async () => {
    const output = undefined;
    const mockDeleteEquipmentUseCase = {
      execute: jest.fn().mockReturnValue(Promise.resolve(output)),
    };
    sut['deleteEquipmentUseCase'] = mockDeleteEquipmentUseCase as any;
    const result = await sut.remove(id);
    expect(output).toStrictEqual(result);
    expect(mockDeleteEquipmentUseCase.execute).toHaveBeenCalledWith({ id });
  });

  it('should list a Equipments', async () => {
    const output: ListEquipmentsUseCase.Output = {
      items: [props],
      currentPage: 1,
      lastPage: 1,
      perPage: 1,
      total: 1,
    };
    const mockListEquipmentsUseCase = {
      execute: jest.fn().mockReturnValue(Promise.resolve(output)),
    };
    sut['listEquipmentsUseCase'] = mockListEquipmentsUseCase as any;
    const searchParams = {
      page: 1,
      perPage: 1,
    };
    const presenter = await sut.search(searchParams);
    expect(presenter).toBeInstanceOf(EquipmentsCollectionPresenter);
    expect(presenter).toEqual(new EquipmentsCollectionPresenter(output));
    expect(mockListEquipmentsUseCase.execute).toHaveBeenCalledWith(
      searchParams,
    );
  });
});
