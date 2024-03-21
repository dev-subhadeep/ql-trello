import React from "react"

const CreateTask = ({ isOpen }: { isOpen: boolean }) => {
  // const createTask = () => {

  // }
  return (
    <div
      className={`fixed top-0 left-0 bg-white bg-opacity-70 flex justify-center items-center min-h-screen min-w-full ${
        isOpen ? `block` : `hidden`
      }`}
    >
      <div className="min-w-[500px] bg-white rounded-lg p-6">
        <h1 className="text-xl font-semibold mb-2">Create New Task</h1>
        <div>
          <form action="" className="flex flex-col gap-4">
            <input
              type="text"
              className="focus:outline-blue-400 p-2 rounded-lg bg-slate-100"
            />
            <textarea
              name=""
              className="focus:outline-blue-400 p-2 rounded-lg bg-slate-100"
            ></textarea>
            <button className="bg-blue-400 text-white font-bold py-2 rounded-lg">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default CreateTask
