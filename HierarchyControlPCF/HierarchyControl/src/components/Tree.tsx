// src/components/Tree.tsx
import * as React from "react";
import { TreeNode, fetchChildren, RelationshipType } from "../dataService";

interface TreeProps {
  node: TreeNode;
  relationshipType: RelationshipType;
  // Optionally, you can pass a custom data loader function as a prop.
  loadChildren?: (nodeId: string, relationshipType: RelationshipType) => Promise<TreeNode[]>;
}

const Tree: React.FC<TreeProps> = ({ node, relationshipType, loadChildren }) => {
  const [children, setChildren] = React.useState<TreeNode[] | null>(node.children || null);
  const [expanded, setExpanded] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  // Use the passed loadChildren function or default to our dataService.fetchChildren
  const getChildren = loadChildren || fetchChildren;

  const handleExpand = async () => {
    if (!expanded && node.hasChildren && !children) {
      setLoading(true);
      try {
        const loadedChildren = await getChildren(node.id, relationshipType);
        setChildren(loadedChildren);
      } catch (err) {
        console.error("Failed to load children", err);
      } finally {
        setLoading(false);
      }
    }
    setExpanded(!expanded);
  };

  return (
    <div style={{ marginLeft: "20px" }}>
      <div style={{ cursor: "pointer" }} onClick={handleExpand}>
        {node.hasChildren && (expanded ? "[-] " : "[+] ")}
        {node.name}
        {loading && " (loading...)"}
      </div>
      {expanded && children && (
        <div>
          {children.map((child) => (
            <Tree key={child.id} node={child} relationshipType={relationshipType} loadChildren={getChildren} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Tree;
