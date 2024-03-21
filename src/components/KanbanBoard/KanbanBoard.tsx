import React, { useState } from "react"
import Container from "../Container/Container"
import { Task } from "../Task/Task.types"
import { v4 as uuid } from "uuid"
import CreateTask from "../CreateTask/CreateTask"
import taskList from "../../data/tasks/tasks"

const KanbanBoard = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [tasks, setTasks] = useState<Task[] | null>(taskList)
  const addTask = (containerId: string) => {
    // const randomId = uuid().toString()
    // const newTask = {
    //   id: randomId,
    //   title: "Project",
    //   label: "orange",
    //   description: "Random description",
    //   container: containerId,
    // }
    setIsOpen(true)
  }
  return (
    <>
      <div className="bg-blue-500 min-h-screen flex gap-2 p-2">
        <Container
          title="todo"
          id="todo"
          tasks={tasks?.filter((task) => task.container === "todo")}
          addTask={() => addTask("todo")}
        />
        <Container
          title="in progress"
          id="in-progress"
          tasks={tasks?.filter((task) => task.container === "in-progress")}
          addTask={() => addTask("in-progress")}
        />
        <Container
          title="review"
          id="review"
          tasks={tasks?.filter((task) => task.container === "review")}
          addTask={() => addTask("review")}
        />
        <Container
          title="done"
          id="done"
          tasks={tasks?.filter((task) => task.container === "done")}
          addTask={() => addTask("done")}
        />
      </div>
      <CreateTask isOpen={isOpen} />
    </>
  )
}

export default KanbanBoard
