export interface Workspace {
  _id: string;
  name: string;
  uuid: string;
  users: string[];
}

export interface User {
  _id: string;
  name: string;
  email: string;
  uuid: string;
  workspaces: Workspace[];
  boards: Boards[];
}

export interface Boards {
  _id: string;
  name: string;
  uuid: string;
  isStared: boolean;
  workspace: Workspace;
  lists: Lists[];
}

export interface Lists {
  _id: string;
  name: string;
  uuid: string;
  boardId: string;
  cards: Cards[];
}
export interface Comment {
  _id: string;
  text: string;
  user: User;
  createdAt: string;
}

export interface Cards {
  title: string;
  _id: string;
  uuid: string;
  cardIndex: number;
  listUuid: string;
  position: number;
  list: string[];
  users: User[];
  comments: Comment[];
}
