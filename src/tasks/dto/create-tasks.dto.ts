import { Injectable } from "@nestjs/common"

export interface CreateTaskInterface {
  title: string,
  description: string
}

@Injectable()
export class CreateTask implements CreateTaskInterface {
  readonly title: string
  readonly description: string
}
