import { UniqueIdentifier } from "@dnd-kit/core"
import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import React from "react"

interface ContainerProps {
  id: UniqueIdentifier
  children: React.ReactNode
  title: string
  onAddItem?: () => void
}

const Container = ({ id, children, title, onAddItem }: ContainerProps) => {
  const {
    attributes,
    setNodeRef,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: id,
    data: {
      type: "container",
    },
  })
  return (
    <div
      className=" min-h-[200px] h-fit w-[400px] bg-slate-300 rounded-lg p-4"
      {...attributes}
      ref={setNodeRef}
      style={{
        transition,
        transform: CSS.Translate.toString(transform),
      }}
    >
      <h1 className="capitalize font-bold flex justify-between items-start mb-4 text-slate-800">
        {title}{" "}
        <button {...listeners}>
          {/* <HorizontalEllipsisIcon /> */}
          ...
        </button>
      </h1>
      {children}
      <div>
        <button className="pt-2 text-slate-600">+ Add a card</button>
      </div>
    </div>
  )
}

export default Container
