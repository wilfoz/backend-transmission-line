import { instanceToPlain } from 'class-transformer';
import { PaginationPresenter } from '@/shared/infrastructure/presenters/pagination.presenter';
import {
  FoundationPresenter,
  FoundationsCollectionPresenter,
} from '../foundation.presenter';

describe('FoundationPresenter', () => {
  let sut: FoundationPresenter;
  const createdAt = new Date();
  const props = {
    id: '9354d4ca-2142-4e54-adb4-53ec3c3540d4',
    project: 'AT-FUN-MCA-0001',
    revision: '0A',
    description: 'AT-TCB-AFL-0.5',
    excavation_volume: 20,
    concrete_volume: 15,
    backfill_volume: 18,
    steel_volume: 1000,
    createdAt,
  };

  beforeEach(() => {
    sut = new FoundationPresenter(props);
  });

  describe('Constructor', () => {
    it('should set values', () => {
      expect(sut.id).toEqual(props.id);
      expect(sut.project).toEqual(props.project);
      expect(sut.revision).toEqual(props.revision);
      expect(sut.description).toEqual(props.description);
      expect(sut.excavation_volume).toEqual(props.excavation_volume);
      expect(sut.concrete_volume).toEqual(props.concrete_volume);
      expect(sut.backfill_volume).toEqual(props.backfill_volume);
      expect(sut.steel_volume).toEqual(props.steel_volume);
      expect(sut.createdAt).toEqual(props.createdAt);
    });
  });

  it('should presenter data', () => {
    const output = instanceToPlain(sut);
    expect(output).toStrictEqual({
      id: '9354d4ca-2142-4e54-adb4-53ec3c3540d4',
      project: 'AT-FUN-MCA-0001',
      revision: '0A',
      description: 'AT-TCB-AFL-0.5',
      excavation_volume: 20,
      concrete_volume: 15,
      backfill_volume: 18,
      steel_volume: 1000,
      createdAt: createdAt.toISOString(),
    });
  });
});

describe('FoundationsCollectionPresenter', () => {
  let sut: FoundationsCollectionPresenter;
  const createdAt = new Date();
  const props = {
    id: '9354d4ca-2142-4e54-adb4-53ec3c3540d4',
    project: 'AT-FUN-MCA-0001',
    revision: '0A',
    description: 'AT-TCB-AFL-0.5',
    excavation_volume: 20,
    concrete_volume: 15,
    backfill_volume: 18,
    steel_volume: 1000,
    createdAt,
  };

  describe('Constructor', () => {
    it('should set values', () => {
      const sut = new FoundationsCollectionPresenter({
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
      expect(sut.data).toStrictEqual([new FoundationPresenter(props)]);
    });
  });

  it('should presenter data', () => {
    let sut = new FoundationsCollectionPresenter({
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
          project: 'AT-FUN-MCA-0001',
          revision: '0A',
          description: 'AT-TCB-AFL-0.5',
          excavation_volume: 20,
          concrete_volume: 15,
          backfill_volume: 18,
          steel_volume: 1000,
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

    sut = new FoundationsCollectionPresenter({
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
          project: 'AT-FUN-MCA-0001',
          revision: '0A',
          description: 'AT-TCB-AFL-0.5',
          excavation_volume: 20,
          concrete_volume: 15,
          backfill_volume: 18,
          steel_volume: 1000,
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
