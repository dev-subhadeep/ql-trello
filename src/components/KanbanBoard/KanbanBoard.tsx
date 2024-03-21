import React, { useState } from "react"
import Container from "../Container/Container"
import { Task } from "../Task/Task.types"

const KanbanBoard = () => {
  const [tasks, setTasks] = useState<Task[] | null>([
    { id: "1", title: "Project A", container: "todo", label: "green" },
    { id: "2", title: "Project B", container: "todo", label: "yellow" },
    { id: "6", title: "Project G", container: "in-progress", label: "pink" },
  ])
  return (
    <div className="bg-blue-500 min-h-screen flex gap-2 p-2">
      <Container
        title="todo"
        id="todo"
        tasks={tasks?.filter((task) => task.container === "todo")}
      />
      <Container
        title="in progress"
        id="in-progress"
        tasks={tasks?.filter((task) => task.container === "in-progress")}
      />
      <Container
        title="review"
        id="review"
        tasks={tasks?.filter((task) => task.container === "review")}
      />
      <Container
        title="done"
        id="done"
        tasks={tasks?.filter((task) => task.container === "done")}
      />
    </div>
  )
}

export default KanbanBoard
