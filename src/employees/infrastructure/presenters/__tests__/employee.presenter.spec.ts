import { instanceToPlain } from 'class-transformer';
import { PaginationPresenter } from '@/shared/infrastructure/presenters/pagination.presenter';
import {
  EmployeePresenter,
  EmployeesCollectionPresenter,
} from '../employee.presenter';
import { Status } from '@/employees/domain/entities/employee.entity';

describe('EmployeePresenter', () => {
  let sut: EmployeePresenter;
  const createdAt = new Date();
  const props = {
    id: '9354d4ca-2142-4e54-adb4-53ec3c3540d4',
    registration: '1',
    fullName: 'Marcos',
    occupation: 'Encarregado',
    leadership: true,
    status: 'ACTIVE' as Status,
    createdAt,
  };

  beforeEach(() => {
    sut = new EmployeePresenter(props);
  });

  describe('Constructor', () => {
    it('should set values', () => {
      expect(sut.id).toEqual(props.id);
      expect(sut.registration).toEqual(props.registration);
      expect(sut.fullName).toEqual(props.fullName);
      expect(sut.occupation).toEqual(props.occupation);
      expect(sut.leadership).toEqual(props.leadership);
      expect(sut.status).toEqual(props.status);
      expect(sut.createdAt).toEqual(props.createdAt);
    });
  });

  it('should presenter data', () => {
    const output = instanceToPlain(sut);
    expect(output).toStrictEqual({
      id: '9354d4ca-2142-4e54-adb4-53ec3c3540d4',
      registration: '1',
      fullName: 'Marcos',
      occupation: 'Encarregado',
      leadership: true,
      status: 'ACTIVE' as Status,
      createdAt: createdAt.toISOString(),
    });
  });
});

describe('EmployeesCollectionPresenter', () => {
  let sut: EmployeesCollectionPresenter;
  const createdAt = new Date();
  const props = {
    id: '9354d4ca-2142-4e54-adb4-53ec3c3540d4',
    registration: '1',
    fullName: 'Marcos',
    occupation: 'Encarregado',
    leadership: true,
    status: 'ACTIVE' as Status,
    createdAt,
  };

  describe('Constructor', () => {
    it('should set values', () => {
      const sut = new EmployeesCollectionPresenter({
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
      expect(sut.data).toStrictEqual([new EmployeePresenter(props)]);
    });
  });

  it('should presenter data', () => {
    let sut = new EmployeesCollectionPresenter({
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
          fullName: 'Marcos',
          occupation: 'Encarregado',
          leadership: true,
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

    sut = new EmployeesCollectionPresenter({
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
          fullName: 'Marcos',
          occupation: 'Encarregado',
          leadership: true,
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
