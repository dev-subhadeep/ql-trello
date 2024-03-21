import { Task } from "../Task/Task.types"

export interface Container {
  id: string | number
  title: string
  tasks?: Task[]
}
