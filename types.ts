
export interface ListItem {
  id: string;
  text: string;
  completed: boolean;
}

export interface List {
  id: string;
  title: string;
  description: string;
  items: ListItem[];
  isPublic: boolean;
  createdAt: string;
}
