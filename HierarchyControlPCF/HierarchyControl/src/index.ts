// src/index.ts
import * as React from "react";
import { IInputs, IOutputs } from "../generated/ManifestTypes";
import Tree from "./components/Tree";
import { TreeNode } from "./dataService";
import * as ReactDOM from "react-dom";

export class HierarchyControl implements ComponentFramework.StandardControl<IInputs, IOutputs> {
  private _container: HTMLDivElement;
  private _relationshipType: "self" | "oneToMany" = "self"; // default value

  // Initial root node for the tree
  private _rootNode: TreeNode = {
    id: "root",
    name: "Root Node",
    hasChildren: true,
  };

  constructor() {}

  public init(
    context: ComponentFramework.Context<IInputs>,
    notifyOutputChanged: () => void,
    state: ComponentFramework.Dictionary,
    container: HTMLDivElement
  ): void {
    this._container = container;

    // Read the relationship type from properties (if defined in the manifest)
    const relType = context.parameters.relationshipType?.raw;
    if (relType === "self" || relType === "oneToMany") {
      this._relationshipType = relType;
    }

    // Render the control
    ReactDOM.render(
      <Tree node={this._rootNode} relationshipType={this._relationshipType} />,
      this._container
    );
  }

  public updateView(context: ComponentFramework.Context<IInputs>): void {
    // You can update your tree based on context changes if needed.
    // For now, we’re keeping it simple.
  }

  public getOutputs(): IOutputs {
    return {};
  }

  public destroy(): void {
    ReactDOM.unmountComponentAtNode(this._container);
  }
}
