import { IsNotEmpty } from 'class-validator';

export class CreateTaskDto {
  readonly title: string;

  readonly project: string;

  @IsNotEmpty()
  readonly duration: string;
}