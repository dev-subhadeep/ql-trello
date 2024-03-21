import CommentIcon from "../Icons/CommentIcon"
import DocumentIcon from "../Icons/DocumentIcon"
import { Task as ITask } from "./Task.types"

const Task = ({ title, description, comments, label }: ITask) => {
  return (
    <div className="bg-white p-2 min-h-[100px] shadow-sm border border-b-2 flex flex-col justify-between rounded-lg">
      <div>
        <span
          style={{ backgroundColor: label }}
          className={`h-2 w-12 top-0 left-0 block rounded-full`}
        ></span>
      </div>
      <div>{title}</div>
      <div>{description}</div>
      <div>
        <DocumentIcon />
        {comments?.length && <CommentIcon />}
      </div>
    </div>
  )
}

export default Task
