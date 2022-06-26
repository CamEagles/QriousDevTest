import { HierarchyLink } from "../types/hierarchyLink";
import { HierarchyNode } from "../types/hierarchyNode";
import { Person } from "../types/person";

export const createHierarchyNodeAndLink = (
  people: Person[],
  isTheMotherTheBloodLineLink: boolean,
  parentNode?: HierarchyNode
) => {
  const father = people.find((x) => x.gender === "male");
  const mother = people.find((x) => x.gender === "female");

  let id = "";
  id = father ? id + father?.id.toString() : id;
  id = mother ? id + mother?.id.toString() : id;

  let newNode: HierarchyNode | undefined;
  let newLink: HierarchyLink | undefined;

  // Make sure that the order of the people inside of a node is the correct way.
  // We want the child that is born from the parents first.
  const peopleToAddToNode = [];
  if (isTheMotherTheBloodLineLink) {
    mother && peopleToAddToNode.push(mother);
    father && peopleToAddToNode.push(father);
  } else {
    father && peopleToAddToNode.push(father);
    mother && peopleToAddToNode.push(mother);
  }

  if (peopleToAddToNode.length > 0) {
    newNode = {
      id: id,
      people: peopleToAddToNode,
    };

    if (parentNode) {
      newLink = {
        ParentNodeId: parentNode.id,
        ChildNodeId: id,
      };
    }
  }

  return {
    node: newNode,
    link: newLink,
  };
};
