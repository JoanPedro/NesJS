import { Injectable } from "@nestjs/common";
import { TaskStatus } from "..";

export interface SearchTaskInterface {
  status: TaskStatus
  search: string
  log (): void
}

@Injectable()
export class SearchTask implements SearchTaskInterface {
  readonly status: TaskStatus
  readonly search: string

  log() {
    console.log('Oi')
  }
}
