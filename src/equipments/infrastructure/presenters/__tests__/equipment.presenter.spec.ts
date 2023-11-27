import { instanceToPlain } from 'class-transformer';
import { PaginationPresenter } from '@/shared/infrastructure/presenters/pagination.presenter';
import {
  EquipmentPresenter,
  EquipmentsCollectionPresenter,
} from '../equipment.presenter';
import { Status } from '@/equipments/domain/entities/equipments.entity';

describe('EquipmentPresenter', () => {
  let sut: EquipmentPresenter;
  const createdAt = new Date();
  const props = {
    id: '9354d4ca-2142-4e54-adb4-53ec3c3540d4',
    registration: '1',
    model: 'Fiat 47',
    manufacturer: 'Ajudante',
    licensePlate: 'AAA:2133',
    provider: 'Fiat',
    status: 'ACTIVE' as Status,
    createdAt,
  };

  beforeEach(() => {
    sut = new EquipmentPresenter(props);
  });

  describe('Constructor', () => {
    it('should set values', () => {
      expect(sut.id).toEqual(props.id);
      expect(sut.registration).toEqual(props.registration);
      expect(sut.model).toEqual(props.model);
      expect(sut.manufacturer).toEqual(props.manufacturer);
      expect(sut.licensePlate).toEqual(props.licensePlate);
      expect(sut.provider).toEqual(props.provider);
      expect(sut.status).toEqual(props.status);
    });
  });

  it('should presenter data', () => {
    const output = instanceToPlain(sut);
    expect(output).toStrictEqual({
      id: '9354d4ca-2142-4e54-adb4-53ec3c3540d4',
      registration: '1',
      model: 'Fiat 47',
      manufacturer: 'Ajudante',
      licensePlate: 'AAA:2133',
      provider: 'Fiat',
      status: 'ACTIVE' as Status,
      createdAt: createdAt.toISOString(),
    });
  });
});

describe('EquipmentsCollectionPresenter', () => {
  let sut: EquipmentsCollectionPresenter;
  const createdAt = new Date();
  const props = {
    id: '9354d4ca-2142-4e54-adb4-53ec3c3540d4',
    registration: '1',
    model: 'Fiat 47',
    manufacturer: 'Ajudante',
    licensePlate: 'AAA:2133',
    provider: 'Fiat',
    status: 'ACTIVE' as Status,
    createdAt,
  };

  describe('Constructor', () => {
    it('should set values', () => {
      const sut = new EquipmentsCollectionPresenter({
        items: [props],
        currentPage: 1,
        perPage: 2,
        lastPage: 1,
        total: 1,
      });

      expect(sut.meta).toBeInstanceOf(PaginationPresenter);
      expect(sut.meta).toStrictEqual(
        new PaginationPresenter({
          currentPage: 1,
          perPage: 2,
          lastPage: 1,
          total: 1,
        }),
      );
      expect(sut.data).toStrictEqual([new EquipmentPresenter(props)]);
    });
  });

  it('should presenter data', () => {
    let sut = new EquipmentsCollectionPresenter({
      items: [props],
      currentPage: 1,
      perPage: 2,
      lastPage: 1,
      total: 1,
    });
    let output = instanceToPlain(sut);
    expect(output).toStrictEqual({
      data: [
        {
          id: '9354d4ca-2142-4e54-adb4-53ec3c3540d4',
          registration: '1',
          model: 'Fiat 47',
          manufacturer: 'Ajudante',
          licensePlate: 'AAA:2133',
          provider: 'Fiat',
          status: 'ACTIVE' as Status,
          createdAt: createdAt.toISOString(),
        },
      ],
      meta: {
        currentPage: 1,
        perPage: 2,
        lastPage: 1,
        total: 1,
      },
    });

    sut = new EquipmentsCollectionPresenter({
      items: [props],
      currentPage: '1' as any,
      perPage: '2' as any,
      lastPage: '1' as any,
      total: '1' as any,
    });
    output = instanceToPlain(sut);
    expect(output).toStrictEqual({
      data: [
        {
          id: '9354d4ca-2142-4e54-adb4-53ec3c3540d4',
          registration: '1',
          model: 'Fiat 47',
          manufacturer: 'Ajudante',
          licensePlate: 'AAA:2133',
          provider: 'Fiat',
          status: 'ACTIVE' as Status,
          createdAt: createdAt.toISOString(),
        },
      ],
      meta: {
        currentPage: 1,
        perPage: 2,
        lastPage: 1,
        total: 1,
      },
    });
  });
});
