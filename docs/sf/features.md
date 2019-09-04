---
title: Features
---

Using a more functional approach instead of a process-oriented approach, the feature tree allows [Requirements](requirements) and [Work](work) to be categorized in a feature tree.

A feature tree can be configured freely. For instance, the feature tree can have various *applications* defined at the top-level, with *modules* and *sub-modules*, bundling the requirements and work in *features* at the lowest level. The granularity and the depth is completely up to the analysts.

The work and requirements are shared between the [Business processes](business_processes), Features and [Iterations](iterations).

### Adding nodes

When adding a new node in the tree, the type of node will be determined by the node that was selected. 
- When a feature node was selected, a new feature node will be created. 
- When a requirement node was selected, a requirement node will be created.
- When a work node was selected, a work node will be created.

The new node will be placed next to the previously selected node by default, with the same parent and at the same level.

Alternatively, new child nodes at a certain location can be added via the *Sub-features*, *Linked requirements* or *Linked work* tab.

### Work state

When work is linked to a requirement, repositioning the requirement will also reposition the work. However, the work can be placed at a different location in the feature tree while retaining its link with the requirement. The work will receive a different icon and a task will be available to move the work to the same location in the feature tree as its requirement.

| Icon | Work state |
| ---- | ---------- |
| ![](assets/icons8-briefcase_blue.svg)| The work is not linked to a requirement, placed freely in the feature tree |
| ![](assets/icons8-briefcase-blue-linked-orange.svg) | The work is linked to a requirement and is in sync when it comes to positioning in the feature tree |
| ![](assets/icons8-briefcase-blue-warn-orange.svg) | The work is linked to a requirement but is manually placed elsewhere in the feature tree |

### Impact analysis

The *Impact analysis* tab can also be used to get an overview of all underlying requirements and all underlying work for a certain feature. These overviews differ from the *Linked requirements* and *Linked work* details as they also include the requirements and work of all sub-processes.

The arrow can be used to navigate to the selected requirement or the selected work in the feature tree.

> TODO: Images?

To find out which [business processes](business_processes) and [iterations](iterations) share the same underlying requirements and/or underlying work, the *Related business processes* and *Related iterations* details can be used in the *Impact analysis* tab.

The arrow can be used to navigate to the node in the business process or iteration tree, respectively.

### Tags

To quickly and freely categorize features, tags are available.

### Unassigned node

The *Unassigned* node is used to group requirements and work that have not yet been assigned to a feature.

### Drag-drop

Drag-drop can be used to reposition nodes. The dragged node will be positioned as a child of the drop target node.

### Status

The status of the features is aggregated from the underlying requirements and work. 

> For more information, see the documentation on requirements and work.

### Roles

The *Specification analysis* role can be used to manage all specifications in the Software Factory.

The *Specification review* role can be granted to stakeholders, allowing them read-only access to the specifications. Stakeholders can participate in discussions regarding requirements and can change the *specification* state and *acceptance* state of requirements.

The *Specification review* role can access the Software Factory via a Web GUI.