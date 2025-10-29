import { IsString, IsOptional, IsInt, Min, IsDateString, IsEnum } from 'class-validator';

export enum QuestCategory {
  HOME = 'บ้าน',
  STUDY = 'เรียน',
  HEALTH = 'สุขภาพ',
  BEHAVIOR = 'พฤติกรรม',
}

export class CreateQuestDto {
  @IsString()
  title: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsEnum(QuestCategory)
  @IsOptional()
  category?: QuestCategory;

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
