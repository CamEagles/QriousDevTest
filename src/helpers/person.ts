import { HierarchyLink } from "../types/hierarchyLink";
import { HierarchyNode } from "../types/hierarchyNode";
import { Person } from "../types/person";
import { arrayComparision } from "./array";
import { createHierarchyNodeAndLink } from "./hierarchy";

export const findRootParents = (hierarchyData: Person[]): Person[] => {
  // slim the list down to only people with no children.
  const peopleWithOutParents = hierarchyData.filter(
    (people) => people.parents.length === 0
  );

  for (let i = 0; i < peopleWithOutParents.length; i++) {
    var matchedPartner = findPartner(
      peopleWithOutParents,
      peopleWithOutParents[i]
    );
    if (matchedPartner !== null) {
      return [peopleWithOutParents[i], matchedPartner];
    }
  }
  return [];
};

export const findPartner = (
  hierarchyData: Person[],
  person: Person
): Person | null => {
  for (let i = 0; i < hierarchyData.length; i++) {
    if (
      hierarchyData[i].children.length === 0 ||
      person.children.length === 0
    ) {
      continue;
    }
    if (
      arrayComparision(
        hierarchyData[i].children.sort(),
        person.children.sort()
      ) &&
      hierarchyData[i] !== person
    ) {
      return hierarchyData[i];
    }
  }
  return null;
};

export const findChildrenAndTheirPartner = (
  hierarchyData: Person[],
  parents: Person[],
  parentNode?: HierarchyNode
) => {
  const children = hierarchyData.filter((x) =>
    parents[0].children.includes(x.id)
  );

  var newNodes: HierarchyNode[] = [];
  var newLinks: HierarchyLink[] = [];

  children.forEach((child) => {
    const people = [child];
    const partner = findPartner(hierarchyData, child);
    if (partner) {
      people.push(partner);
    }
    const { node, link } = createHierarchyNodeAndLink(
      people,
      child.gender === "female",
      parentNode
    );

    node && newNodes.push(node);
    link && newLinks.push(link);

    const { newNodes: childNodes, newLinks: childLinks } =
      findChildrenAndTheirPartner(hierarchyData, people, node);
    newNodes.push(...childNodes);
    newLinks.push(...childLinks);
  });

  return { newNodes, newLinks };
};
