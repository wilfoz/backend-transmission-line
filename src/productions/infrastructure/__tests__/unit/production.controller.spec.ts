import { ProductionOutput } from '../../../application/dto/production-output';
import { AddTeamToProductionUseCase } from '../../../application/usecases/add-team-production.usecase';
import { AddTowerToProductionUseCase } from '../../../application/usecases/add-tower-production.usecase';
import { CreateProductionUseCase } from '../../../application/usecases/create-production.usecase';
import { GetProductionUseCase } from '../../../application/usecases/get-production.usecase';
import { ListProductionsUseCase } from '../../../application/usecases/list-production.usecase';
import { RemoveTeamToProductionUseCase } from '../../../application/usecases/remove-team-production.usecase';
import { RemoveTowerToProductionUseCase } from '../../../application/usecases/remove-tower-production.usecase';
import { UpdateProductionUseCase } from '../../../application/usecases/update-production.usecase';
import { STATUS_PRODUCTION } from '../../../domain/entities/production.entity';
import { CreateProductionDto } from '../../dto/create-production.dto';
import { UpdateProductionDto } from '../../dto/update-production.dto';
import { UpdateResourceProductionDto } from '../../dto/update-resource-production.dto';
import {
  ProductionCollectionPresenter,
  ProductionPresenter,
} from '../../presenters/production.presenter';
import { ProductionsController } from '../../productions.controller';

describe('ProductionController Unit Tests', () => {
  let sut: ProductionsController;
  let id: string;
  let props: ProductionOutput;

  beforeEach(async () => {
    sut = new ProductionsController();
    id = 'e8425c05-8d65-4a17-aad4-7e6087774e5f';
    props = {
      id,
      status: 'EXECUTED',
      comments: 'Pré-montagem',
      teams: [],
      towers: [],
      taskId: 'ec11a450-fb24-48e8-9a2e-d717d623681d',
      createdAt: new Date(),
    };
  });

  it('should be defined', () => {
    expect(sut).toBeDefined();
  });

  it('should create a Production', async () => {
    const output: CreateProductionUseCase.Output = props;
    const mockCreateProductionUseCase = {
      execute: jest.fn().mockReturnValue(Promise.resolve(output)),
    };
    sut['createProductionUseCase'] = mockCreateProductionUseCase as any;
    const input: CreateProductionDto = {
      ...props,
      status: props.status as STATUS_PRODUCTION,
    };
    const presenter = await sut.create(input);
    expect(presenter).toBeInstanceOf(ProductionPresenter);
    expect(presenter).toStrictEqual(new ProductionPresenter(output));
    expect(mockCreateProductionUseCase.execute).toHaveBeenCalledWith(input);
  });

  it('should update a Production', async () => {
    const output: UpdateProductionUseCase.Output = props;
    const mockUpdateProductionUseCase = {
      execute: jest.fn().mockReturnValue(Promise.resolve(output)),
    };
    sut['updateProductionUseCase'] = mockUpdateProductionUseCase as any;
    const input: UpdateProductionDto = {
      ...props,
      status: 'EXECUTED',
    };
    const presenter = await sut.update(id, input);
    expect(presenter).toBeInstanceOf(ProductionPresenter);
    expect(presenter).toStrictEqual(new ProductionPresenter(output));
    expect(mockUpdateProductionUseCase.execute).toHaveBeenCalledWith({
      id,
      ...input,
    });
  });

  it('should add a team in Production', async () => {
    const output: AddTeamToProductionUseCase.Output = props;
    const mockUpdateProductionUseCase = {
      execute: jest.fn().mockReturnValue(Promise.resolve(output)),
    };
    sut['addTeamToProductionUseCase'] = mockUpdateProductionUseCase as any;
    const input: UpdateResourceProductionDto = {
      id: 'e8425c05-8d65-4a17-aad4-7e6087774e5f',
      status: 'EXECUTED',
      comments: 'test',
      taskId: 'fake',
    };
    const presenter = await sut.addTeam(id, input);
    expect(presenter).toBeInstanceOf(ProductionPresenter);
    expect(presenter).toStrictEqual(new ProductionPresenter(output));
    expect(mockUpdateProductionUseCase.execute).toHaveBeenCalledWith({
      id: 'e8425c05-8d65-4a17-aad4-7e6087774e5f',
      status: 'EXECUTED',
      comments: 'test',
      taskId: 'fake',
      teamId: id,
    });
  });

  it('should add a tower in Production', async () => {
    const output: AddTowerToProductionUseCase.Output = props;
    const mockUpdateProductionUseCase = {
      execute: jest.fn().mockReturnValue(Promise.resolve(output)),
    };
    sut['addTowerToProductionUseCase'] = mockUpdateProductionUseCase as any;
    const input: UpdateResourceProductionDto = {
      id: 'e8425c05-8d65-4a17-aad4-7e6087774e5f',
      status: 'EXECUTED',
      comments: 'test',
      taskId: 'fake',
    };
    const presenter = await sut.addTower(id, input);
    expect(presenter).toBeInstanceOf(ProductionPresenter);
    expect(presenter).toStrictEqual(new ProductionPresenter(output));
    expect(mockUpdateProductionUseCase.execute).toHaveBeenCalledWith({
      id: 'e8425c05-8d65-4a17-aad4-7e6087774e5f',
      status: 'EXECUTED',
      comments: 'test',
      taskId: 'fake',
      towerId: id,
    });
  });

  it('should remove a team in Production', async () => {
    const output: RemoveTeamToProductionUseCase.Output = props;
    const mockRemoveTeamProductionUseCase = {
      execute: jest.fn().mockReturnValue(Promise.resolve(output)),
    };
    sut['removeTeamToProductionUseCase'] =
      mockRemoveTeamProductionUseCase as any;
    const input: UpdateResourceProductionDto = {
      id: 'e8425c05-8d65-4a17-aad4-7e6087774e5f',
      status: 'EXECUTED',
      comments: 'test',
      taskId: 'fake',
    };
    const presenter = await sut.removeTeam(id, input);
    expect(presenter).toBeInstanceOf(ProductionPresenter);
    expect(presenter).toStrictEqual(new ProductionPresenter(output));
    expect(mockRemoveTeamProductionUseCase.execute).toHaveBeenCalledWith({
      id: 'e8425c05-8d65-4a17-aad4-7e6087774e5f',
      status: 'EXECUTED',
      comments: 'test',
      taskId: 'fake',
      teamId: id,
    });
  });

  it('should remove a tower in Production', async () => {
    const output: RemoveTowerToProductionUseCase.Output = props;
    const mockRemoveTowerProductionUseCase = {
      execute: jest.fn().mockReturnValue(Promise.resolve(output)),
    };
    sut['removeTowerToProductionUseCase'] =
      mockRemoveTowerProductionUseCase as any;
    const input: UpdateResourceProductionDto = {
      id: 'e8425c05-8d65-4a17-aad4-7e6087774e5f',
      status: 'EXECUTED',
      comments: 'test',
      taskId: 'fake',
    };
    const presenter = await sut.removeTower(id, input);
    expect(presenter).toBeInstanceOf(ProductionPresenter);
    expect(presenter).toStrictEqual(new ProductionPresenter(output));
    expect(mockRemoveTowerProductionUseCase.execute).toHaveBeenCalledWith({
      id: 'e8425c05-8d65-4a17-aad4-7e6087774e5f',
      status: 'EXECUTED',
      comments: 'test',
      taskId: 'fake',
      towerId: id,
    });
  });

  it('should gets a Production', async () => {
    const output: GetProductionUseCase.Output = props;
    const mockGetProductionUseCase = {
      execute: jest.fn().mockReturnValue(Promise.resolve(output)),
    };
    sut['getProductionUseCase'] = mockGetProductionUseCase as any;
    const presenter = await sut.findOne(id);
    expect(presenter).toBeInstanceOf(ProductionPresenter);
    expect(presenter).toStrictEqual(new ProductionPresenter(output));
    expect(mockGetProductionUseCase.execute).toHaveBeenCalledWith({ id });
  });

  it('should delete a Production', async () => {
    const output = undefined;
    const mockDeleteProductionUseCase = {
      execute: jest.fn().mockReturnValue(Promise.resolve(output)),
    };
    sut['deleteProductionUseCase'] = mockDeleteProductionUseCase as any;
    const result = await sut.remove(id);
    expect(output).toStrictEqual(result);
    expect(mockDeleteProductionUseCase.execute).toHaveBeenCalledWith({ id });
  });

  it('should list a Productions', async () => {
    const output: ListProductionsUseCase.Output = {
      items: [props],
      currentPage: 1,
      lastPage: 1,
      perPage: 1,
      total: 1,
    };
    const mockListProductionsUseCase = {
      execute: jest.fn().mockReturnValue(Promise.resolve(output)),
    };
    sut['listProductionsUseCase'] = mockListProductionsUseCase as any;
    const searchParams = {
      page: 1,
      perPage: 1,
    };
    const presenter = await sut.search(searchParams);
    expect(presenter).toBeInstanceOf(ProductionCollectionPresenter);
    expect(presenter).toEqual(new ProductionCollectionPresenter(output));
    expect(mockListProductionsUseCase.execute).toHaveBeenCalledWith(
      searchParams,
    );
  });
});
