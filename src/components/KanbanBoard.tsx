import {
  closestCorners,
  DndContext,
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
import Modal from "./Modal"
import { colors } from "../lib/data/colors"
import { DNDType } from "../lib/types"
import { containersData } from "../lib/data/initialData"

const KanbanBoard = () => {
  const [containers, setContainers] = useState<DNDType[]>(containersData)
  const [, setActiveId] = useState<UniqueIdentifier | null>(null)
  const [currentContainerId, setCurrentContainerId] =
    useState<UniqueIdentifier>()

  const [itemName, setItemName] = useState("")
  const [showAddItemModal, setShowAddItemModal] = useState(false)
  const [label, setLabel] = useState("")

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

  const handleAddItem = () => {
    if (!itemName || !label) return
    const id = `item-${uuidv4()}`
    const container = containers.find(
      (container) => container.id === currentContainerId
    )
    if (!container) return

    container.items.push({ id, title: itemName, label: label, comments: 0 })
    setContainers([...containers])
    setShowAddItemModal(false)
    setItemName("")
    setLabel("")
  }

  return (
    <>
      <Modal showModal={showAddItemModal} setShowModal={setShowAddItemModal}>
        <div className="flex flex-col gap-4">
          <h1 className="text-xl font-semibold">Create a new task</h1>
          <input
            type="text"
            placeholder="Task Name"
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
            className="outline-1 border border-blue-300 px-4 py-2 rounded-lg"
          />
          <select
            value={label}
            onChange={(e) => setLabel(e.target.value)}
            className="outline-1 border border-blue-300 px-4 py-2 rounded-lg capitalize"
          >
            <option>Choose Label</option>
            {colors.map((color) => (
              <option value={color.value}>{color.name}</option>
            ))}
          </select>
          <button
            onClick={handleAddItem}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg"
          >
            Add Task
          </button>
        </div>
      </Modal>
      <div className="bg-blue-500 min-h-screen flex gap-2 p-2">
        <DndContext
          collisionDetection={closestCorners}
          onDragStart={handleDragStart}
          onDragMove={handleDragMove}
        >
          <SortableContext items={containers.map((container) => container.id)}>
            {containers.map((container) => (
              <Container
                id={container.id}
                key={container.id}
                title={container.title}
                onAddItem={() => {
                  setShowAddItemModal(true)
                  setCurrentContainerId(container.id)
                }}
              >
                <SortableContext items={container.items.map((item) => item.id)}>
                  <div>
                    {container.items.map((item) => (
                      <Items
                        key={item.id}
                        id={item.id}
                        title={item.title}
                        label={item.label}
                        comments={item.comments}
                      />
                    ))}
                  </div>
                </SortableContext>
              </Container>
            ))}
          </SortableContext>
        </DndContext>
      </div>
    </>
  )
}

export default KanbanBoard
