import { Module } from '@nestjs/common';
import { EnvConfigModule } from './shared/infrastructure/env-config/env-config.module';
import { UsersModule } from './users/infrastructure/users.module';
import { DatabaseModule } from './shared/infrastructure/database/database.module';
import { AuthModule } from './auth/infrastructure/auth.module';
import { TowerModule } from './towers/infrastructure/tower.module';
import { TaskModule } from './task/infrastructure/task.module';
import { EmployeesModule } from './employees/infrastructure/employees.module';
import { EquipmentsModule } from './equipments/infrastructure/equipments.module';
import { TeamsModule } from './teams/infrastructure/teams.module';
import { ProductionsModule } from './productions/infrastructure/productions.module';

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
    ProductionsModule,
  ],
})
export class AppModule { }
