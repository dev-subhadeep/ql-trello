import ModalProps from "../lib/types"

const Modal = ({ children, showModal, setShowModal }: ModalProps) => {
  return (
    <>
      {showModal && (
        <div className="fixed min-h-screen w-full top-0 left-0 backdrop-blur-md bg-white/30 flex justify-center items-center">
          <div className="bg-white p-4 flex flex-col gap-4 w-[500px] max-w-full rounded-lg">
            {children}
            <button
              onClick={() => setShowModal(false)}
              className="border border-slate-300 px-4 py-2 rounded-lg"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  )
}

export default Modal
