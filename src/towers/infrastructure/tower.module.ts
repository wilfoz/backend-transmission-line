import { Module } from '@nestjs/common';
import { TowerController } from './tower.controller';
import { CreateTowerUseCase } from '../application/usecases/create-tower.usecase';
import { TowerRepository } from '../domain/repositories/tower.repository';
import { GetTowerUseCase } from '../application/usecases/get-tower.usecase';
import { ListTowersUseCase } from '../application/usecases/list-towers.usecase';
import { UpdateTowerUseCase } from '../application/usecases/update-tower.usecase';
import { DeleteTowerUseCase } from '../application/usecases/delete-tower.usecase';
import { PrismaService } from '@/shared/infrastructure/database/prisma/prisma.service';
import { TowerPrismaRepository } from './database/prisma/tower-prisma.repository';

@Module({
  controllers: [TowerController],
  providers: [
    // {
    //   provide: 'TowerRepository',
    //   useClass: TowerInMemoryRepository,
    // },
    {
      provide: 'PrismaService',
      useClass: PrismaService,
    },
    {
      provide: 'TowerRepository',
      useFactory: (prismaService: PrismaService) => {
        return new TowerPrismaRepository(prismaService);
      },
      inject: ['PrismaService'],
    },
    {
      provide: CreateTowerUseCase.UseCase,
      useFactory: (towerRepository: TowerRepository.Repository) => {
        return new CreateTowerUseCase.UseCase(towerRepository);
      },
      inject: ['TowerRepository'],
    },
    {
      provide: GetTowerUseCase.UseCase,
      useFactory: (towerRepository: TowerRepository.Repository) => {
        return new GetTowerUseCase.UseCase(towerRepository);
      },
      inject: ['TowerRepository'],
    },
    {
      provide: UpdateTowerUseCase.UseCase,
      useFactory: (towerRepository: TowerRepository.Repository) => {
        return new UpdateTowerUseCase.UseCase(towerRepository);
      },
      inject: ['TowerRepository'],
    },
    {
      provide: ListTowersUseCase.UseCase,
      useFactory: (towerRepository: TowerRepository.Repository) => {
        return new ListTowersUseCase.UseCase(towerRepository);
      },
      inject: ['TowerRepository'],
    },
    {
      provide: DeleteTowerUseCase.UseCase,
      useFactory: (towerRepository: TowerRepository.Repository) => {
        return new DeleteTowerUseCase.UseCase(towerRepository);
      },
      inject: ['TowerRepository'],
    },
  ],
})
export class TowerModule { }
