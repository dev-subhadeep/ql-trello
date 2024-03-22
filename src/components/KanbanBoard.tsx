import {
  closestCorners,
  DndContext,
  DragEndEvent,
  DragMoveEvent,
  DragStartEvent,
  //   KeyboardSensor,
  UniqueIdentifier,
  //   useSensor,
} from "@dnd-kit/core"
import { arrayMove, SortableContext } from "@dnd-kit/sortable"
import { useState } from "react"
import { v4 as uuidv4 } from "uuid"
import Container from "./Container"
import Items from "./Items"

type DNDType = {
  id: UniqueIdentifier
  title: string
  items: {
    id: UniqueIdentifier
    title: string
  }[]
}

const KanbanBoard = () => {
  const [containers, setContainers] = useState<DNDType[]>([
    {
      id: `container-${uuidv4()}`,
      title: "Container 1",
      items: [
        {
          id: `item-${uuidv4()}`,
          title: "Item 1",
        },
      ],
    },
    {
      id: `container-${uuidv4()}`,
      title: "Container 2",
      items: [
        {
          id: `item-${uuidv4()}`,
          title: "Item 2",
        },
      ],
    },
  ])
  const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null)
  const [currentContainerId, setCurrentContainerId] =
    useState<UniqueIdentifier>()
  const [containerName, setContainerName] = useState("")
  const [itemName, setItemName] = useState("")
  const [showAddItemModal, setShowAddItemModal] = useState(false)

  function findValueOfItems(id: UniqueIdentifier | undefined, type: string) {
    if (type === "container") {
      return containers.find((item) => item.id === id)
    }
    if (type === "item") {
      return containers.find((container) =>
        container.items.find((item) => item.id === id)
      )
    }
  }

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event
    const { id } = active
    setActiveId(id)
  }
  const handleDragMove = (event: DragMoveEvent) => {
    const { active, over } = event

    // Handle Items Sorting
    if (
      active.id.toString().includes("item") &&
      over?.id.toString().includes("item") &&
      active &&
      over &&
      active.id !== over.id
    ) {
      // Find the active container and over container
      const activeContainer = findValueOfItems(active.id, "item")
      const overContainer = findValueOfItems(over.id, "item")

      // If the active or over container is not found, return
      if (!activeContainer || !overContainer) return

      // Find the index of the active and over container
      const activeContainerIndex = containers.findIndex(
        (container) => container.id === activeContainer.id
      )
      const overContainerIndex = containers.findIndex(
        (container) => container.id === overContainer.id
      )

      // Find the index of the active and over item
      const activeitemIndex = activeContainer.items.findIndex(
        (item) => item.id === active.id
      )
      const overitemIndex = overContainer.items.findIndex(
        (item) => item.id === over.id
      )
      // In the same container
      if (activeContainerIndex === overContainerIndex) {
        let newItems = [...containers]
        newItems[activeContainerIndex].items = arrayMove(
          newItems[activeContainerIndex].items,
          activeitemIndex,
          overitemIndex
        )

        setContainers(newItems)
      } else {
        // In different containers
        let newItems = [...containers]
        const [removeditem] = newItems[activeContainerIndex].items.splice(
          activeitemIndex,
          1
        )
        newItems[overContainerIndex].items.splice(overitemIndex, 0, removeditem)
        setContainers(newItems)
      }
    }

    // Handling Item Drop Into a Container
    if (
      active.id.toString().includes("item") &&
      over?.id.toString().includes("container") &&
      active &&
      over &&
      active.id !== over.id
    ) {
      // Find the active and over container
      const activeContainer = findValueOfItems(active.id, "item")
      const overContainer = findValueOfItems(over.id, "container")

      // If the active or over container is not found, return
      if (!activeContainer || !overContainer) return

      // Find the index of the active and over container
      const activeContainerIndex = containers.findIndex(
        (container) => container.id === activeContainer.id
      )
      const overContainerIndex = containers.findIndex(
        (container) => container.id === overContainer.id
      )

      // Find the index of the active and over item
      const activeitemIndex = activeContainer.items.findIndex(
        (item) => item.id === active.id
      )

      // Remove the active item from the active container and add it to the over container
      let newItems = [...containers]
      const [removeditem] = newItems[activeContainerIndex].items.splice(
        activeitemIndex,
        1
      )
      newItems[overContainerIndex].items.push(removeditem)
      setContainers(newItems)
    }
  }

  const handleDragEnd = (event: DragEndEvent) => {}

  return (
    <div className="grid grid-col-4 gap-4">
      <DndContext
        collisionDetection={closestCorners}
        onDragStart={handleDragStart}
        onDragMove={handleDragMove}
        onDragEnd={handleDragEnd}
      >
        <SortableContext items={containers.map((container) => container.id)}>
          {containers.map((container) => (
            <Container
              id={container.id}
              key={container.id}
              title={container.title}
              onAddItem={() => {}}
            >
              <SortableContext items={container.items.map((item) => item.id)}>
                <div>
                  {container.items.map((item) => (
                    <Items key={item.id} id={item.id} title={item.title} />
                  ))}
                </div>
              </SortableContext>
            </Container>
          ))}
        </SortableContext>
      </DndContext>
    </div>
  )
}

export default KanbanBoard
