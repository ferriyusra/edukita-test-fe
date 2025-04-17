import { FaFile } from "react-icons/fa6"

const SIDEBAR_STUDENT = [
  {
    key: "assignment",
    label: "Assignment",
    href: "/student/assignment",
    icon: <FaFile />
  },
]

const SIDEBAR_TEACHER = [
  {
    key: "assignment",
    label: "Assignment",
    href: "/teacher/assignment",
    icon: <FaFile />
  },
]

export {
  SIDEBAR_TEACHER,
  SIDEBAR_STUDENT
}