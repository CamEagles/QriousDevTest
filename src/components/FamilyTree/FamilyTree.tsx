import { useEffect, useState } from "react";
import styles from "./familyTree.module.css";
import { Person } from "../../types/person";
import {
  findChildrenAndTheirPartner,
  findRootParents,
} from "../../helpers/personHelpers";
import { HierarchyNode } from "../../types/hierarchyNode";
import { HierarchyLink } from "../../types/hierarchyLink";
import { createNodeMappingPoints } from "../../helpers/layoutEngine";
import Couple from "../Couple/Couple";
import { createHierarchyNodeAndLink } from "../../helpers/hierarchyHelpers";
import Link from "../Link/Link";

type FamilyTreeProps = {
  title: string;
  data: Person[];
};

const FamilyTree = (props: FamilyTreeProps) => {
  const [hierarchy, setHierarchy] = useState<Person[]>([]);

  const [hierarchyNodes, setHierarchyNodes] = useState<HierarchyNode[]>([]);
  const [hierarchyLinks, setHierarchyLinks] = useState<HierarchyLink[]>([]);

  useEffect(() => {
    setHierarchy([...props.data]);
  }, [props.data]);

  useEffect(() => {
    if (hierarchy.length > 0) {
      const root = findRootParents(hierarchy);
      var rootNode = createHierarchyNodeAndLink(root, true);

      if (root.length > 0 && rootNode?.node) {
        var { newNodes, newLinks } = findChildrenAndTheirPartner(
          hierarchy,
          root,
          rootNode.node
        );

        const nodes = [rootNode.node, ...newNodes];
        var nodesWithPosition = createNodeMappingPoints(nodes, newLinks);

        setHierarchyNodes(nodesWithPosition);
        setHierarchyLinks(newLinks);
      }
    }
  }, [hierarchy, setHierarchyNodes, setHierarchyLinks]);

  return (
    <div className={styles.gridBackground}>
      <div className={styles.title}>{props.title}</div>
      {hierarchyNodes.map(
        (node) =>
          node.x &&
          node.y && (
            <Couple id={node.id} people={node.people} x={node.x} y={node.y} />
          )
      )}
      {hierarchyLinks.map((link) => (
        <Link parentNodeId={link.ParentNodeId} childNodeId={link.ChildNodeId} />
      ))}
    </div>
  );
};

export default FamilyTree;
