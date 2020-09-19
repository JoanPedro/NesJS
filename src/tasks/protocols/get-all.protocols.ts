import { TaskModel } from "..";
import { SearchTaskInterface } from "../dto/search-tasks.dto";

export interface GetAllBehaviour {
  getTasks(seachTask: SearchTaskInterface, tasks: Array<TaskModel>): Array<TaskModel>
}
