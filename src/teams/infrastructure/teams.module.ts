import { Module } from '@nestjs/common';
import { TeamsController } from './teams.controller';
import { PrismaService } from '../../shared/infrastructure/database/prisma/prisma.service';
import { TeamPrismaRepository } from './database/prisma/team-prisma.repository';
import { CreateTeamUseCase } from '../application/usecases/create-team.usecase';
import { TeamRepository } from '../domain/repositories/team.repository';
import { GetTeamUseCase } from '../application/usecases/get-team.usecase';
import { UpdateTeamUseCase } from '../application/usecases/update-team.usecase';
import { ListTeamsUseCase } from '../application/usecases/list-team.usecase';
import { DeleteTeamUseCase } from '../application/usecases/delete-team.usecase';
import { AddEmployeeTeamUseCase } from '../application/usecases/add-employee-team.usecase';
import { RemoveEmployeeTeamUseCase } from '../application/usecases/remove-employee-team.usecase';

@Module({
  controllers: [TeamsController],
  providers: [
    // {
    //   provide: 'TeamRepository',
    //   useClass: TeamInMemoryRepository,
    // },
    {
      provide: 'PrismaService',
      useClass: PrismaService,
    },
    {
      provide: 'TeamRepository',
      useFactory: (prismaService: PrismaService) => {
        return new TeamPrismaRepository(prismaService);
      },
      inject: ['PrismaService'],
    },
    {
      provide: CreateTeamUseCase.UseCase,
      useFactory: (TeamRepository: TeamRepository.Repository) => {
        return new CreateTeamUseCase.UseCase(TeamRepository);
      },
      inject: ['TeamRepository'],
    },
    {
      provide: GetTeamUseCase.UseCase,
      useFactory: (TeamRepository: TeamRepository.Repository) => {
        return new GetTeamUseCase.UseCase(TeamRepository);
      },
      inject: ['TeamRepository'],
    },
    {
      provide: UpdateTeamUseCase.UseCase,
      useFactory: (TeamRepository: TeamRepository.Repository) => {
        return new UpdateTeamUseCase.UseCase(TeamRepository);
      },
      inject: ['TeamRepository'],
    },
    {
      provide: ListTeamsUseCase.UseCase,
      useFactory: (TeamRepository: TeamRepository.Repository) => {
        return new ListTeamsUseCase.UseCase(TeamRepository);
      },
      inject: ['TeamRepository'],
    },
    {
      provide: DeleteTeamUseCase.UseCase,
      useFactory: (TeamRepository: TeamRepository.Repository) => {
        return new DeleteTeamUseCase.UseCase(TeamRepository);
      },
      inject: ['TeamRepository'],
    },
    {
      provide: AddEmployeeTeamUseCase.UseCase,
      useFactory: (TeamRepository: TeamRepository.Repository) => {
        return new AddEmployeeTeamUseCase.UseCase(TeamRepository);
      },
      inject: ['TeamRepository'],
    },
    {
      provide: RemoveEmployeeTeamUseCase.UseCase,
      useFactory: (TeamRepository: TeamRepository.Repository) => {
        return new RemoveEmployeeTeamUseCase.UseCase(TeamRepository);
      },
      inject: ['TeamRepository'],
    },
  ],
})
export class TeamsModule { }
