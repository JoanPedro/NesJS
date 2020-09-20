import { Injectable } from "@nestjs/common";
import { IsIn, IsNotEmpty, IsOptional } from "class-validator";
import { TaskStatus } from "..";

export interface SearchTaskInterface {
  readonly status: TaskStatus
  readonly search: string
}

@Injectable()
export class SearchTaskDTO implements SearchTaskInterface {
  @IsOptional()
  @IsIn([TaskStatus.DONE, TaskStatus.IN_PROGRESS, TaskStatus.OPEN])
  readonly status: TaskStatus

  @IsOptional()
  @IsNotEmpty()
  readonly search: string
}
