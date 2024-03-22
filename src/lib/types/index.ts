import { Dispatch, SetStateAction } from "react"

export interface ModalProps {
  children: React.ReactNode
  showModal: boolean
  setShowModal: Dispatch<SetStateAction<boolean>>
}

export interface Color {
  name: string
  value: string
}
