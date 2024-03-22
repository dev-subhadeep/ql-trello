import { v4 as uuidv4 } from "uuid"

export const containersData = [
  {
    id: `container-${uuidv4()}`,
    title: "To Do",
    items: [
      {
        id: `item-${uuidv4()}`,
        title: "Project A",
        label: "#7BC86C",
        comments: 0,
      },
      {
        id: `item-${uuidv4()}`,
        title: "Project B",
        label: "#E6C60D",
        comments: 2,
      },

      {
        id: `item-${uuidv4()}`,
        title: "Project C",
        label: "#C883E2",
        comments: 1,
      },
      {
        id: `item-${uuidv4()}`,
        title: "Project M",
        label: "#FFA82E",
        comments: 0,
      },
      {
        id: `item-${uuidv4()}`,
        title: "Project K",
        label: "#2ACCE5",
        comments: 2,
      },
    ],
  },
  {
    id: `container-${uuidv4()}`,
    title: "In Progress",
    items: [
      {
        id: `item-${uuidv4()}`,
        title: "Project G",
        label: "#FF90D4",
        comments: 0,
      },
      {
        id: `item-${uuidv4()}`,
        title: "Project P",
        label: "#EF7564",
        comments: 0,
      },
      {
        id: `item-${uuidv4()}`,
        title: "Project F",
        label: "#6DECA9",
        comments: 0,
      },
      {
        id: `item-${uuidv4()}`,
        title: "Project Z",
        label: "#C0C6D0",
        comments: 0,
      },
    ],
  },
  {
    id: `container-${uuidv4()}`,
    title: "Review",
    items: [
      {
        id: `item-${uuidv4()}`,
        title: "Project W",
        label: "#5BA4CF",
        comments: 14,
      },
      {
        id: `item-${uuidv4()}`,
        title: "Project T",
        label: "#C0C6D0",
        comments: 10,
      },
      {
        id: `item-${uuidv4()}`,
        title: "Project U",
        label: "#7BC86C",
        comments: 6,
      },
      {
        id: `item-${uuidv4()}`,
        title: "Project Q",
        label: "#C883E2",
        comments: 0,
      },
      {
        id: `item-${uuidv4()}`,
        title: "Project V",
        label: "#E6C60D",
        description: "",
        container: "review",
        comments: 2,
      },
    ],
  },
  {
    id: `container-${uuidv4()}`,
    title: "Done",
    items: [
      {
        id: `item-${uuidv4()}`,
        title: "Project D",
        label: "#2ACCE5",
        comments: 9,
      },
      {
        id: `item-${uuidv4()}`,
        title: "Project N",
        label: "#C883E2",
        comments: 4,
      },
      {
        id: `item-${uuidv4()}`,
        title: "Project X",
        label: "#E6C60D",
        comments: 24,
      },
      {
        id: `item-${uuidv4()}`,
        title: "Project R",
        label: "#C0C6D0",
        comments: 2,
      },
    ],
  },
]
