import { FoundationOutput } from '../../application/dto/foundation-output';
import { CreateFoundationUseCase } from '../../application/usecases/create-foundation.usecase';
import { GetFoundationUseCase } from '../../application/usecases/get-foundation.usecase';
import { ListFoundationsUseCase } from '../../application/usecases/list-foundation.usecase';
import { UpdateFoundationUseCase } from '../../application/usecases/update-foundation.usecase';
import { CreateFoundationDto } from '../dto/create-foundation.dto';
import { UpdateFoundationDto } from '../dto/update-foundation.dto';
import { FoundationsController } from '../foundations.controller';
import {
  FoundationPresenter,
  FoundationsCollectionPresenter,
} from '../presenters/foundation.presenter';

describe('FoundationController Unit Tests', () => {
  let sut: FoundationsController;
  let id: string;
  let props: FoundationOutput;

  beforeEach(async () => {
    sut = new FoundationsController();
    id: 'e8425c05-8d65-4a17-aad4-7e6087774e5f';
    props = {
      id,
      project: 'AT-FUN-MCA-0001',
      revision: '0A',
      description: 'AT-TCB-AFL-0.5',
      excavation_volume: 20,
      concrete_volume: 15,
      backfill_volume: 18,
      steel_volume: 1000,
      createdAt: new Date(),
    };
  });

  it('should be defined', () => {
    expect(sut).toBeDefined();
  });

  it('should create a foundation', async () => {
    const output: CreateFoundationUseCase.Output = props;
    const mockCreateFoundationUseCase = {
      execute: jest.fn().mockReturnValue(Promise.resolve(output)),
    };
    sut['createFoundationUseCase'] = mockCreateFoundationUseCase as any;
    const input: CreateFoundationDto = props;
    const presenter = await sut.create(input);
    expect(presenter).toBeInstanceOf(FoundationPresenter);
    expect(presenter).toStrictEqual(new FoundationPresenter(output));
    expect(mockCreateFoundationUseCase.execute).toHaveBeenCalledWith(input);
  });

  it('should update a foundation', async () => {
    const output: UpdateFoundationUseCase.Output = props;
    const mockUpdateFoundationUseCase = {
      execute: jest.fn().mockReturnValue(Promise.resolve(output)),
    };
    sut['updateFoundationUseCase'] = mockUpdateFoundationUseCase as any;
    const input: UpdateFoundationDto = {
      project: 'AT-FUN-MCA-0001',
      revision: '0A',
      description: 'AT-TCB-AFL-0.5',
      excavation_volume: 20,
      concrete_volume: 15,
      backfill_volume: 18,
      steel_volume: 1000,
    };
    const presenter = await sut.update(id, input);
    expect(presenter).toBeInstanceOf(FoundationPresenter);
    expect(presenter).toStrictEqual(new FoundationPresenter(output));
    expect(mockUpdateFoundationUseCase.execute).toHaveBeenCalledWith({
      id,
      ...input,
    });
  });

  it('should gets a foundation', async () => {
    const output: GetFoundationUseCase.Output = props;
    const mockGetFoundationUseCase = {
      execute: jest.fn().mockReturnValue(Promise.resolve(output)),
    };
    sut['getFoundationUseCase'] = mockGetFoundationUseCase as any;
    const presenter = await sut.findOne(id);
    expect(presenter).toBeInstanceOf(FoundationPresenter);
    expect(presenter).toStrictEqual(new FoundationPresenter(output));
    expect(mockGetFoundationUseCase.execute).toHaveBeenCalledWith({ id });
  });

  it('should delete a foundation', async () => {
    const output = undefined;
    const mockDeleteFoundationUseCase = {
      execute: jest.fn().mockReturnValue(Promise.resolve(output)),
    };
    sut['deleteFoundationUseCase'] = mockDeleteFoundationUseCase as any;
    const result = await sut.remove(id);
    expect(output).toStrictEqual(result);
    expect(mockDeleteFoundationUseCase.execute).toHaveBeenCalledWith({ id });
  });

  it('should list a foundations', async () => {
    const output: ListFoundationsUseCase.Output = {
      items: [props],
      currentPage: 1,
      lastPage: 1,
      perPage: 1,
      total: 1,
    };
    const mockListFoundationsUseCase = {
      execute: jest.fn().mockReturnValue(Promise.resolve(output)),
    };
    sut['listFoundationsUseCase'] = mockListFoundationsUseCase as any;
    const searchParams = {
      page: 1,
      perPage: 1,
    };
    const presenter = await sut.search(searchParams);
    expect(presenter).toBeInstanceOf(FoundationsCollectionPresenter);
    expect(presenter).toEqual(new FoundationsCollectionPresenter(output));
    expect(mockListFoundationsUseCase.execute).toHaveBeenCalledWith(
      searchParams,
    );
  });
});
