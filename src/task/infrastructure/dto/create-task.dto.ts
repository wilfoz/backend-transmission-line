import { CreateTaskUseCase } from '@/task/application/usecases/create-task.usecase';
import { Stage } from '@/task/domain/entities/task.entity';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateTaskDto implements CreateTaskUseCase.Input {
  @IsNumber()
  @IsNotEmpty()
  code: number;

  @IsString()
  @IsNotEmpty()
  stage: Stage;

  @IsString()
  @IsNotEmpty()
  group: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  unit: string;
}
