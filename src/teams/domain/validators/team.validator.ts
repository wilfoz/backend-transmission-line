import {
  IsDate,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';
import { ClassValidatorFields } from '@/shared/domain/validators/class-validator-fields';
import { TeamProps } from '../entities/team.entity';

export class TeamRules {
  @MaxLength(255)
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsOptional()
  employees?: string[];

  @IsOptional()
  equipments?: string[];

  @IsDate()
  @IsOptional()
  createdAt?: Date;

  constructor({ name, employees, equipments, createdAt }: TeamRules) {
    Object.assign(this, {
      name,
      employees,
      equipments,
      createdAt,
    });
  }
}

export class TeamValidator extends ClassValidatorFields<TeamRules> {
  validate(data: TeamProps): boolean {
    return super.validate(new TeamRules(data ?? ({} as TeamProps)));
  }
}
export class TeamValidatorFactory {
  static create(): TeamValidator {
    return new TeamValidator();
  }
}
