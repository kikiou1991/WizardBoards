export interface Workspace {
  _id: string;
  name: string;
  uuid: string;
  users: string[];
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

export interface Cards {
  title: string;
  _id: string;
  uuid: string;
  cardIndex: number;
  listUuid: string;
  position: number;
  list: string[];
}
