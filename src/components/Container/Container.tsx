import React from "react"
import { Container as IContainer } from "./Container.types"
import Task from "../Task/Task"
import HorizontalEllipsisIcon from "../Icons/HorizontalEllipsisIcon"

const Container = ({ title, tasks }: IContainer) => {
  return (
    <div className=" min-h-[200px] h-fit w-[400px] bg-slate-300 rounded-lg p-4">
      <h1 className="capitalize font-bold flex justify-between items-start mb-4">
        {title}{" "}
        <button>
          <HorizontalEllipsisIcon />
        </button>
      </h1>
      <div className="flex flex-col gap-2">
        {tasks?.map((task) => (
          <Task
            key={task.id}
            id={task.id}
            container="task.id"
            title={task.title}
            label={task.label}
            description={task.description}
          />
        ))}
      </div>
      <div>
        <button className="pt-2 text-slate-600">+ Add a card</button>
      </div>
    </div>
  )
}

export default Container
