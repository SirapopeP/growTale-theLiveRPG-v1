import { IsString, IsOptional, IsInt, Min, IsDateString } from 'class-validator';

export class CreateRewardDto {
  @IsString()
  title: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsInt()
  @Min(1)
  costCoin: number;

  @IsInt()
  @Min(0)
  @IsOptional()
  stock?: number;

  @IsDateString()
  @IsOptional()
  expireAt?: string;
}
