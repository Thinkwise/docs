---
title: Iterations
---

Focusing on the implementation process, the iteration tree allows [Work](work) to be planned. Iterations can be divided into sub-iterations as many times as desired. For instance, the iteration tree could be used to create top-level iterations as *phases*, sub-level iterations as *releases* and sub-sub-level iterations as *sprints*.

The work and requirements are shared between the [business processes](business_processes), [Features](features) and iterations.

The lowest level nodes in the iteration tree can be used as [Kanban boards](kanban_board).

### Adding nodes

When adding a new node in the tree, the type of node will be determined by the node that was selected. 
- When a iteration node was selected, a new iteration node will be created. 
- When a requirement node was selected, a requirement node will be created.
- When a work node was selected, a work node will be created.

The new node will be placed next to the previously selected node by default, with the same parent and at the same level.

Alternatively, new child nodes at a certain location can be added via the *Sub-iterations*, *Linked requirements* or *Linked work* tab.

### Work state

When work is linked to a requirement, repositioning the requirement will also reposition the work. However, the work can be placed at a different location in the iteration tree while retaining its link with the requirement. The work will receive a different icon and a task will be available to move the work to the same location in the iteration tree as its requirement.

| Icon | Work state |
| ---- | ---------- |
| ![](assets/icons8-briefcase_blue.svg)| The work is not linked to a requirement, placed freely in the iteration tree |
| ![](assets/icons8-briefcase-blue-linked-orange.svg) | The work is linked to a requirement and is in sync when it comes to positioning in the iteration tree |
| ![](assets/icons8-briefcase-blue-warn-orange.svg) | The work is linked to a requirement but is manually placed elsewhere in the iteration tree |

### Attachments

To supplement the description of business processes, attachments can be added. These attachments will be stored in the database.

### Linked requirements and linked work

The *Linked requirements* and *Linked work* details show the requirements and the work that is directly linked to the iteration.

### Impact analysis

The *Impact analysis* tab can also be used to get an overview of all underlying requirements and all underlying work for a certain iteration. These overviews differ from the *Linked requirements* and *Linked work* details as they also include the requirements and work of all sub-processes.

The arrow can be used to navigate to the selected requirement or the selected work in the iteration tree.

To find out which [business processes](business_processes) and [features](features) share the same underlying requirements and/or underlying work, the *Related business processes* and *Related features* details can be used in the *Impact analysis* tab.

> TODO: Images?

The arrow can be used to navigate to the node in the business process or feature tree, respectively.

### Tags

To quickly and freely categorize iterations, tags are available.

### Unplanned nodes

The *Unplanned* node is used to group requirements and work that have not yet been assigned to an iteration that can function as a kanban board. Ideally, no work is present in an unplanned node.

### Drag-drop

Drag-drop can be used to reposition nodes. The dragged node will be positioned as a child of the drop target node.

### Status

The status of the iterations is aggregated from the underlying requirements and work. 

> For more information, see the documentation on requirements and work.