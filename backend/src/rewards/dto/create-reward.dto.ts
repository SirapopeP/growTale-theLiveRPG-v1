import {
  IsString,
  IsOptional,
  IsInt,
  Min,
  IsDateString,
  ValidateIf,
} from 'class-validator';

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

  @ValidateIf((o) => o.expireAt != null && o.expireAt !== '')
  @IsDateString()
  @IsOptional()
  expireAt?: string;
}
