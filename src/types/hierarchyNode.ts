import { Person } from "./person";

export type HierarchyNode = {
  id: string;
  people: Person[];
  x?: number;
  y?: number;
};
