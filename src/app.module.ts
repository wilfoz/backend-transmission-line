import { Module } from '@nestjs/common';
import { EnvConfigModule } from './shared/infrastructure/env-config/env-config.module';
import { UsersModule } from './users/infrastructure/users.module';
import { DatabaseModule } from './shared/infrastructure/database/database.module';
import { AuthModule } from './auth/infrastructure/auth.module';
import { TowerModule } from './towers/infrastructure/tower.module';
import { TaskModule } from './task/infrastructure/task.module';
import { EmployeesModule } from './employees/infrastructure/employees.module';
import { EquipmentsModule } from './equipments/equipments.module';
import { TeamsModule } from './teams/teams.module';

@Module({
  imports: [
    EnvConfigModule,
    UsersModule,
    DatabaseModule,
    AuthModule,
    TowerModule,
    TaskModule,
    EmployeesModule,
    EquipmentsModule,
    TeamsModule,
  ],
})
export class AppModule { }
