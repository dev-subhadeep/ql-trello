import { UniqueIdentifier } from "@dnd-kit/core"
import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"

type ItemsType = {
  id: UniqueIdentifier
  title: string
}

const Items = ({ id, title }: ItemsType) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: id,
    data: {
      type: "item",
    },
  })
  return (
    <div
      className="bg-white p-2 min-h-[90px] shadow-sm border border-b-2 flex flex-col justify-between rounded-lg"
      ref={setNodeRef}
      {...attributes}
      style={{
        transition,
        transform: CSS.Translate.toString(transform),
      }}
    >
      <div {...listeners}>
        <div>{title}</div>
        <div className="border p-2 text-xs rounded-xl shadow-lg hover:shadow-xl">
          Drag Handle
        </div>
      </div>
    </div>
  )
}

export default Items
