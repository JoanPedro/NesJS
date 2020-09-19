import { Injectable } from "@nestjs/common"
import { IsNotEmpty } from 'class-validator'

export interface CreateTaskInterface {
  readonly title: string
  readonly description: string
}

@Injectable()
export class CreateTaskDTO implements CreateTaskInterface {
  @IsNotEmpty()
  readonly title: string
  @IsNotEmpty()
  readonly description: string
}
