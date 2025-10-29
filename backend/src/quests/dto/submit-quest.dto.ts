import { IsString, IsOptional, IsUrl } from 'class-validator';

export class SubmitQuestDto {
  @IsString()
  @IsOptional()
  note?: string;

  @IsUrl()
  @IsOptional()
  evidenceUrl?: string;
}
