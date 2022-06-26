// using dagre to help map the nodes on a screen
import dagre from "dagre";
import { HierarchyLink } from "../types/hierarchyLink";
import { HierarchyNode } from "../types/hierarchyNode";

export const createNodeMappingPoints = (
  nodes: HierarchyNode[],
  links: HierarchyLink[]
) => {
  // setup of dagre graphs
  var g = new dagre.graphlib.Graph();
  g.setGraph({});
  g.setDefaultEdgeLabel(function () {
    return {};
  });

  // foreach node, we have a defined height of 90, 40 (the size of 1 person) * 2, plus a 10 gap between them.
  nodes.forEach((node) => {
    g.setNode(node.id, { width: 200, height: 90 });
  });

  links.forEach((link) => {
    g.setEdge(link.ParentNodeId, link.ChildNodeId);
  });

  // TB = Top to Bottom
  dagre.layout(g, { rankdir: "TB" });

  const nodesWithPositions = [...nodes];

  g.nodes().forEach((nodeId) => {
    let node = nodesWithPositions.find((node) => node.id === nodeId);
    if (node) {
      const nodeWithPosition = g.node(nodeId);
      node.x = nodeWithPosition.x;
      node.y = nodeWithPosition.y;
    }
  });

  return nodesWithPositions;
};
