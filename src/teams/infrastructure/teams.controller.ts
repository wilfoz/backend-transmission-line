import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Inject,
  HttpCode,
  Query,
  Put,
} from '@nestjs/common';
import { CreateTeamUseCase } from '../application/usecases/create-team.usecase';
import { UpdateTeamUseCase } from '../application/usecases/update-team.usecase';
import { GetTeamUseCase } from '../application/usecases/get-team.usecase';
import { ListTeamsUseCase } from '../application/usecases/list-team.usecase';
import { DeleteTeamUseCase } from '../application/usecases/delete-team.usecase';
import {
  TeamCollectionPresenter,
  TeamPresenter,
} from './presenters/team.presenter';
import { TeamOutput } from '../application/dto/team-output';
import { CreateTeamDto } from './dto/create-team.dto';
import { ListTeamDto } from './dto/list-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';
import { AddEmployeeTeamUseCase } from '../application/usecases/add-employee-team.usecase';
import { UpdateResourceTeamDto } from './dto/update-resource-team.dto';
import { RemoveEmployeeTeamUseCase } from '../application/usecases/remove-employee-team.usecase';

@Controller('team')
export class TeamsController {
  @Inject(CreateTeamUseCase.UseCase)
  private createTeamUseCase: CreateTeamUseCase.UseCase;

  @Inject(UpdateTeamUseCase.UseCase)
  private updateTeamUseCase: UpdateTeamUseCase.UseCase;

  @Inject(GetTeamUseCase.UseCase)
  private getTeamUseCase: GetTeamUseCase.UseCase;

  @Inject(ListTeamsUseCase.UseCase)
  private listTeamsUseCase: ListTeamsUseCase.UseCase;

  @Inject(DeleteTeamUseCase.UseCase)
  private deleteTeamUseCase: DeleteTeamUseCase.UseCase;

  @Inject(AddEmployeeTeamUseCase.UseCase)
  private addEmployeeTeamUseCase: AddEmployeeTeamUseCase.UseCase;

  @Inject(RemoveEmployeeTeamUseCase.UseCase)
  private removeEmployeeTeamUseCase: RemoveEmployeeTeamUseCase.UseCase;

  static teamToResponse(output: TeamOutput) {
    return new TeamPresenter(output);
  }

  static listTeamsToResponse(output: ListTeamsUseCase.Output) {
    return new TeamCollectionPresenter(output);
  }

  @Post()
  async create(@Body() createTeamDto: CreateTeamDto) {
    const output = await this.createTeamUseCase.execute(createTeamDto);
    return TeamsController.teamToResponse(output);
  }

  @Get()
  async search(@Query() searchParams: ListTeamDto) {
    const output = await this.listTeamsUseCase.execute(searchParams);
    return TeamsController.listTeamsToResponse(output);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const output = await this.getTeamUseCase.execute({ id });
    return TeamsController.teamToResponse(output);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateTeamDto: UpdateTeamDto) {
    const output = await this.updateTeamUseCase.execute({
      id,
      ...updateTeamDto,
    });
    return TeamsController.teamToResponse(output);
  }

  @Put('add-employee/:id')
  async addEmployee(
    @Param('id') id: string,
    @Body() updateResourceTeamDto: UpdateResourceTeamDto,
  ) {
    const output = await this.addEmployeeTeamUseCase.execute({
      ...updateResourceTeamDto,
      employeeId: id,
    });
    return TeamsController.teamToResponse(output);
  }

  @Put('del-employee/:id')
  async removeEmployee(
    @Param('id') id: string,
    @Body() updateResourceTeamDto: UpdateResourceTeamDto,
  ) {
    const output = await this.removeEmployeeTeamUseCase.execute({
      ...updateResourceTeamDto,
      employeeId: id,
    });
    return TeamsController.teamToResponse(output);
  }

  @HttpCode(204)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.deleteTeamUseCase.execute({ id });
  }
}
