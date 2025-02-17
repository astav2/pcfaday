// src/dataService.ts

export type RelationshipType = "self" | "oneToMany";

export interface TreeNode {
  id: string;
  name: string;
  hasChildren: boolean;
  children?: TreeNode[];
}

// A mock function to simulate fetching children nodes based on relationship type.
export async function fetchChildren(
  nodeId: string,
  relationshipType: RelationshipType
): Promise<TreeNode[]> {
  // In a real scenario, use nodeId and relationshipType to form your query.
  // For demonstration, we are returning a static array.
  await new Promise((resolve) => setTimeout(resolve, 500)); // simulate latency

  // Example: For a self-referencing lookup, every node has similar structure.
  // For a one-to-many lookup, you might have additional data transformations.
  return [
    {
      id: `${nodeId}-child1`,
      name: `Child 1 of ${nodeId}`,
      hasChildren: Math.random() > 0.5, // randomize for demo purposes
    },
    {
      id: `${nodeId}-child2`,
      name: `Child 2 of ${nodeId}`,
      hasChildren: Math.random() > 0.5,
    },
  ];
}
