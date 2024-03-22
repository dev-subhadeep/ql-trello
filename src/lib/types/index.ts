import { UniqueIdentifier } from "@dnd-kit/core"
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

export type DNDType = {
  id: UniqueIdentifier
  title: string
  items: {
    id: UniqueIdentifier
    title: string
    label: string
    comments: number
  }[]
}
