import { instanceToPlain } from 'class-transformer';
import { PaginationPresenter } from '@/shared/infrastructure/presenters/pagination.presenter';
import {
  ProductionCollectionPresenter,
  ProductionPresenter,
} from '../production.presenter';

describe('ProductionPresenter', () => {
  let sut: ProductionPresenter;
  const createdAt = new Date();
  const props = {
    id: '9354d4ca-2142-4e54-adb4-53ec3c3540d4',
    status: 'EXECUTED',
    comments: 'SN',
    startTime: new Date(createdAt.setHours(7)),
    finalTime: new Date(createdAt.setHours(17)),
    teams: ['2bdfebd2-e47b-4134-bb3d-6fe8fdbbc9a4'],
    towers: ['2bdfebd2-e47b-4134-bb3d-6fe8fdbbc9a4'],
    taskId: '96010fff-fc27-406c-bba0-44182c7b67a0',
    createdAt,
  };

  beforeEach(() => {
    sut = new ProductionPresenter(props);
  });

  describe('Constructor', () => {
    it('should set values', () => {
      expect(sut.id).toEqual(props.id);
      expect(sut.status).toEqual(props.status);
      expect(sut.comments).toEqual(props.comments);
      expect(sut.startTime).toEqual(props.startTime);
      expect(sut.finalTime).toEqual(props.finalTime);
      expect(sut.teams).toEqual(props.teams);
      expect(sut.towers).toEqual(props.towers);
      expect(sut.taskId).toEqual(props.taskId);
      expect(sut.createdAt).toEqual(props.createdAt);
    });
  });

  it('should presenter data', () => {
    const output = instanceToPlain(sut);
    expect(output).toStrictEqual({
      ...props,
      createdAt: createdAt.toISOString(),
    });
  });
});

describe('ProductionCollectionPresenter', () => {
  let sut: ProductionCollectionPresenter;
  const createdAt = new Date();
  const props = {
    id: '9354d4ca-2142-4e54-adb4-53ec3c3540d4',
    status: 'EXECUTED',
    comments: 'SN',
    startTime: new Date(createdAt.setHours(7)),
    finalTime: new Date(createdAt.setHours(17)),
    teams: ['2bdfebd2-e47b-4134-bb3d-6fe8fdbbc9a4'],
    towers: ['2bdfebd2-e47b-4134-bb3d-6fe8fdbbc9a4'],
    taskId: '96010fff-fc27-406c-bba0-44182c7b67a0',
    createdAt,
  };

  describe('Constructor', () => {
    it('should set values', () => {
      const sut = new ProductionCollectionPresenter({
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
      expect(sut.data).toStrictEqual([new ProductionPresenter(props)]);
    });
  });

  it('should presenter data', () => {
    let sut = new ProductionCollectionPresenter({
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
          status: 'EXECUTED',
          comments: 'SN',
          startTime: new Date(createdAt.setHours(7)),
          finalTime: new Date(createdAt.setHours(17)),
          teams: ['2bdfebd2-e47b-4134-bb3d-6fe8fdbbc9a4'],
          towers: ['2bdfebd2-e47b-4134-bb3d-6fe8fdbbc9a4'],
          taskId: '96010fff-fc27-406c-bba0-44182c7b67a0',
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

    sut = new ProductionCollectionPresenter({
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
          status: 'EXECUTED',
          comments: 'SN',
          startTime: new Date(createdAt.setHours(7)),
          finalTime: new Date(createdAt.setHours(17)),
          teams: ['2bdfebd2-e47b-4134-bb3d-6fe8fdbbc9a4'],
          towers: ['2bdfebd2-e47b-4134-bb3d-6fe8fdbbc9a4'],
          taskId: '96010fff-fc27-406c-bba0-44182c7b67a0',
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
