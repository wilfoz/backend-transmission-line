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
import { CreateEmployeeUseCase } from '../application/usecases/create-employee.usecase';
import { UpdateEmployeeUseCase } from '../application/usecases/update-employee.usecase';
import { GetEmployeeUseCase } from '../application/usecases/get-employee.usecase';
import { ListEmployeesUseCase } from '../application/usecases/list-employee.usecase';
import { DeleteEmployeeUseCase } from '../application/usecases/delete-employee.usecase';
import {
  EmployeePresenter,
  EmployeesCollectionPresenter,
} from './presenters/employee.presenter';
import { EmployeeOutput } from '../application/dto/employee-output';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { ListEmployeeDto } from './dto/list-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('employees')
@Controller('employee')
export class EmployeesController {
  @Inject(CreateEmployeeUseCase.UseCase)
  private createEmployeeUseCase: CreateEmployeeUseCase.UseCase;

  @Inject(UpdateEmployeeUseCase.UseCase)
  private updateEmployeeUseCase: UpdateEmployeeUseCase.UseCase;

  @Inject(GetEmployeeUseCase.UseCase)
  private getEmployeeUseCase: GetEmployeeUseCase.UseCase;

  @Inject(ListEmployeesUseCase.UseCase)
  private listEmployeesUseCase: ListEmployeesUseCase.UseCase;

  @Inject(DeleteEmployeeUseCase.UseCase)
  private deleteEmployeeUseCase: DeleteEmployeeUseCase.UseCase;

  static employeeToResponse(output: EmployeeOutput) {
    return new EmployeePresenter(output);
  }

  static listEmployeesToResponse(output: ListEmployeesUseCase.Output) {
    return new EmployeesCollectionPresenter(output);
  }

  @Post()
  async create(@Body() createEmployeeDto: CreateEmployeeDto) {
    const output = await this.createEmployeeUseCase.execute(createEmployeeDto);
    return EmployeesController.employeeToResponse(output);
  }

  @Get()
  async search(@Query() searchParams: ListEmployeeDto) {
    const output = await this.listEmployeesUseCase.execute(searchParams);
    return EmployeesController.listEmployeesToResponse(output);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const output = await this.getEmployeeUseCase.execute({ id });
    return EmployeesController.employeeToResponse(output);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateEmployeeDto: UpdateEmployeeDto,
  ) {
    const output = await this.updateEmployeeUseCase.execute({
      id,
      ...updateEmployeeDto,
    });
    return EmployeesController.employeeToResponse(output);
  }

  @HttpCode(204)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.deleteEmployeeUseCase.execute({ id });
  }
}
