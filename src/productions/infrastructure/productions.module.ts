import { Module } from '@nestjs/common';
import { ProductionsController } from './productions.controller';
import { PrismaService } from '../../shared/infrastructure/database/prisma/prisma.service';
import { ProductionPrismaRepository } from './database/prisma/production-prisma.repository';
import { CreateProductionUseCase } from '../application/usecases/create-production.usecase';
import { ProductionRepository } from '../domain/repositories/production.repository';
import { GetProductionUseCase } from '../application/usecases/get-production.usecase';
import { UpdateProductionUseCase } from '../application/usecases/update-production.usecase';
import { ListProductionsUseCase } from '../application/usecases/list-production.usecase';
import { DeleteProductionUseCase } from '../application/usecases/delete-production.usecase';
import { AddTeamToProductionUseCase } from '../application/usecases/add-team-production.usecase';
import { RemoveTeamToProductionUseCase } from '../application/usecases/remove-team-production.usecase';
import { AddTowerToProductionUseCase } from '../application/usecases/add-tower-production.usecase';
import { RemoveTowerToProductionUseCase } from '../application/usecases/remove-tower-production.usecase';

@Module({
  controllers: [ProductionsController],
  providers: [
    {
      provide: 'PrismaService',
      useClass: PrismaService,
    },
    {
      provide: 'ProductionRepository',
      useFactory: (prismaService: PrismaService) => {
        return new ProductionPrismaRepository(prismaService);
      },
      inject: ['PrismaService'],
    },
    {
      provide: CreateProductionUseCase.UseCase,
      useFactory: (productionRepository: ProductionRepository.Repository) => {
        return new CreateProductionUseCase.UseCase(productionRepository);
      },
      inject: ['ProductionRepository'],
    },
    {
      provide: GetProductionUseCase.UseCase,
      useFactory: (productionRepository: ProductionRepository.Repository) => {
        return new GetProductionUseCase.UseCase(productionRepository);
      },
      inject: ['ProductionRepository'],
    },
    {
      provide: UpdateProductionUseCase.UseCase,
      useFactory: (productionRepository: ProductionRepository.Repository) => {
        return new UpdateProductionUseCase.UseCase(productionRepository);
      },
      inject: ['ProductionRepository'],
    },
    {
      provide: ListProductionsUseCase.UseCase,
      useFactory: (productionRepository: ProductionRepository.Repository) => {
        return new ListProductionsUseCase.UseCase(productionRepository);
      },
      inject: ['ProductionRepository'],
    },
    {
      provide: DeleteProductionUseCase.UseCase,
      useFactory: (productionRepository: ProductionRepository.Repository) => {
        return new DeleteProductionUseCase.UseCase(productionRepository);
      },
      inject: ['ProductionRepository'],
    },
    {
      provide: AddTeamToProductionUseCase.UseCase,
      useFactory: (productionRepository: ProductionRepository.Repository) => {
        return new AddTeamToProductionUseCase.UseCase(productionRepository);
      },
      inject: ['ProductionRepository'],
    },
    {
      provide: RemoveTeamToProductionUseCase.UseCase,
      useFactory: (productionRepository: ProductionRepository.Repository) => {
        return new RemoveTeamToProductionUseCase.UseCase(productionRepository);
      },
      inject: ['ProductionRepository'],
    },
    {
      provide: AddTowerToProductionUseCase.UseCase,
      useFactory: (productionRepository: ProductionRepository.Repository) => {
        return new AddTowerToProductionUseCase.UseCase(productionRepository);
      },
      inject: ['ProductionRepository'],
    },
    {
      provide: RemoveTowerToProductionUseCase.UseCase,
      useFactory: (productionRepository: ProductionRepository.Repository) => {
        return new RemoveTowerToProductionUseCase.UseCase(productionRepository);
      },
      inject: ['ProductionRepository'],
    },
  ],
})
export class ProductionsModule { }
