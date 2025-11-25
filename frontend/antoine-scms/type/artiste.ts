export interface Block {
  id: string;
  type: string;
  props: Record<string, any>;
}

export interface artiste {
  id: number;
  pseudo: string;
  description: string;
  pageLayout?: Block[];
}
