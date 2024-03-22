import { UniqueIdentifier } from "@dnd-kit/core"
import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import DocumentIcon from "./Icons/DocumentIcon"
import CommentIcon from "./Icons/CommentIcon"

type ItemsType = {
  id: UniqueIdentifier
  title: string
  label: string
  comments: number
}

const Items = ({ id, title, label, comments }: ItemsType) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: id,
      data: {
        type: "item",
      },
    })
  return (
    <div
      className="mb-2"
      ref={setNodeRef}
      {...attributes}
      style={{
        transition,
        transform: CSS.Translate.toString(transform),
      }}
    >
      <div
        className="bg-white p-2 min-h-[90px] shadow-sm border border-b-2 flex flex-col justify-between rounded-lg"
        {...listeners}
      >
        <div>
          <span
            style={{ backgroundColor: label }}
            className={`h-2 w-12 top-0 left-0 block rounded-full`}
          ></span>
        </div>
        <div>{title}</div>
        <div className="flex gap-2 text-slate-700 items-center">
          <DocumentIcon />
          <div className="flex items-center">
            {comments > 0 && <CommentIcon />}
            {comments > 0 && <span>{comments}</span>}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Items
