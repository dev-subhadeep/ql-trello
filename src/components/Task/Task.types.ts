export interface Comment {
  id: string | number
  user: string | number
  comment: string
}

export interface Task {
  id: string | number
  title: string
  label: string
  description?: string
  container: string
  comments?: Comment[] | null
}
