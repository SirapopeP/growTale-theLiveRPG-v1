import { IsString, Length } from 'class-validator';

export class JoinFamilyDto {
  @IsString()
  @Length(6, 20)
  inviteCode: string;
}
