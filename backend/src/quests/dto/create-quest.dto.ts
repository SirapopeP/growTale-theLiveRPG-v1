import { IsString, IsOptional, IsInt, Min, Max, IsDateString } from 'class-validator';
import { QuestCategory } from '../../common/enums';

export class CreateQuestDto {
  @IsString()
  title: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsInt()
  @Min(QuestCategory.HOME)
  @Max(QuestCategory.BEHAVIOR)
  @IsOptional()
  category?: number;

  @IsInt()
  @Min(0)
  @IsOptional()
  rewardExp?: number;

  @IsInt()
  @Min(0)
  @IsOptional()
  rewardCoin?: number;

  @IsDateString()
  @IsOptional()
  dueDate?: string;

  @IsInt()
  @IsOptional()
  assignedTo?: number;
}
