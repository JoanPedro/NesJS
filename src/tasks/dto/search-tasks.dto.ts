import { Injectable } from "@nestjs/common";
import { TaskStatus } from "..";

export interface SearchTaskInterface {
  readonly status: TaskStatus
  readonly search: string
}

@Injectable()
export class SearchTaskDTO implements SearchTaskInterface {
  readonly status: TaskStatus
  readonly search: string
}
